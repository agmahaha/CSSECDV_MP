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
            return res.status(400).json({ msg: "User not Found" });
            
        }
        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            const errorMessage =`[Auth Failed] Invalid password for: ${username}, IP: ${req.ip}`
            console.error(errorMessage);
            await logError (errorMessage, "Authentication", username)
            return res.status(400).json({ msg: "Password Invalid" });
        }

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET) /* Add expiration? */
        delete user.password
        const message = `User logged-in successful at ${new Date().toISOString()} from ${req.ip}`;
        await logUser(username, message, userType)
        res.status(200).json({token, user})
    } catch(err){
        console.error(`[Login Error] ${err.message}, IP: ${req.ip}`);
        res.status(500).json({ error: err.message });
    }
}