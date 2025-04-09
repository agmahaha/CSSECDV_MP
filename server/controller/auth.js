import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import User from '../models/users.js'
import { logError, logUser } from "./logs.js"

export const registerUser = async (req, res) => {
    console.log(req.body)
    try{
        const{
            username,
            password,
            email,
            userType,
            phone_num,
            failedAttempts,
            lockUntil,
        } = req.body
        
        if (!username || !password || !email) {
            const errorMessage = "Validation Error: Missing fields in registration input";
            console.error(errorMessage);
            await logError (errorMessage, "Validation", username)
            return res.status(400).json({ msg: "Missing required fields." });
        }

        
        const hash = await bcrypt.hash(password, 10)
        
        const newUser = new User({
            username,
            password: hash,
            email,
            userType,
            phone_num,
            failedAttempts,
            lockUntil,
            passwordHistory: [hash],
            passwordChangedAt: Date.now()
        })
        const savedUser = await newUser.save()
        const message = `User registration successful at ${new Date().toISOString()} from ${req.ip}`;
        await logUser(username, message, userType)
        res.status(201).json(savedUser)

    } catch(err){
        res.status(500).json({ error: err.message })
    }
}

export const loginUser = async (req, res) => {
    try{
        const {username, password, userType} = req.body

        const user = await User.findOne({username: username})
       
        if (!user) {
            const errorMessage = `[Auth Failed] User not found: ${username}, IP: ${req.ip}`
            console.error(errorMessage);
            await logError (errorMessage, "Authentication", username)
            return res.status(400).json({ msg: "Invalid username or password" });
            
        }


        if (user.lockUntil && user.lockUntil > Date.now()) {
            const lockTimeLeft = user.lockUntil - Date.now();
            return res.status(403).json({
                msg: `Account locked. Try again in ${Math.ceil(lockTimeLeft / 1000)} seconds.`,
            });
        }
        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            user.failedAttempts += 1;

            if (user.failedAttempts >= 5) {
                user.lockUntil = Date.now() + 1 * 60 * 1000;
                console.error(user.lockUntil);
            }
            const errorMessage =`[Auth Failed] Password Incorrect for: ${username}, IP: ${req.ip}`
            console.error(user.failedAttempts);
            await logError (errorMessage, "Authentication", username)
            await user.save();
            return res.status(400).json({ msg: "Invalid username or password" });
        }

        user.failedAttempts = 0;
        

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET) /* Add expiration? */
        delete user.password
        const message = `User logged-in successful at ${new Date().toISOString()} from ${req.ip}`;

        const lastTimeUsed = user.lockUntil || Date.now();

        await logUser(username, message, userType)
        res.status(200).json({token, user, msg: `Last used: ${lastTimeUsed}` })
        user.lockUntil = Date.now();
        await user.save();
    } catch(err){
        console.error(`[Login Error] ${err.message}, IP: ${req.ip}`);
        res.status(500).json({ error: err.message });
    }
}

export const changePassword = async (req, res) => {
    const { username, newPassword } = req.body
    const user = await User.findOne({ username })
  
    if (!user) {
        const errorMessage = `[Auth Failed] User not found: ${username}, IP: ${req.ip}`
        await logError (errorMessage, "Authentication", username)
        return res.status(404).json({ msg: "Invalid username and password invalid" });
    }
  
    const oneDay = 24 * 60 * 60 * 1000;
    const now = Date.now();
    if (now - user.passwordChangedAt.getTime() < oneDay) {
        const changeTimeLeft = oneDay - (now - user.passwordChangedAt);
      return res.status(400).json({ msg: `Password Change not allowed. Try again in ${Math.ceil(changeTimeLeft / 1000 / 60)} minutes.` });
    }
  
    const isReused = await Promise.any(user.passwordHistory.map(oldHash => bcrypt.compare(newPassword, oldHash)))
      .then(() => true)
      .catch(() => false);
  
    if (isReused) {
      return res.status(400).json({ msg: "You cannot reuse a previous password or change it more than once in 24 hours." });
    }
  
    // Proceed with update
    const newHash = await bcrypt.hash(newPassword, 10);
    user.password = newHash;
    user.passwordHistory.push(newHash);
    user.passwordChangedAt = now;
  
    // Limit history to last 5 passwords (optional)
    if (user.passwordHistory.length > 5) {
      user.passwordHistory = user.passwordHistory.slice(-5);
    }
  
    await user.save();
    return res.status(200).json({ msg: "Password changed successfully." });
  }