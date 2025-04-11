import bcrypt from "bcrypt"
import User from "../models/users.js"
import { logError, logUser } from "./logs.js"

export const getUser = async (req, res) => {
        console.log(req.params)
    try{
        
        const {id} = req.params
        const user = await User.findById(id)
        res.status(200).json(user)

    } catch(err){
        res.status(404).json({ message: err.message })
    }
}

export const adminGetUser = async (req, res) => {
    console.log(req.params)
try{
    
    const {id} = req.params
    const user = await User.findById(id)
    res.status(200).json(user)

} catch(err){
    res.status(404).json({ message: err.message })
}
}

export const updateUser = async(req, res) =>{
    try{
        const{
            id, 
            phone_num,
        } = req.body

        const user = await User.updateOne({_id: id},
            {
                $set: {
                    phone_num: phone_num,
                }
            })
        res.status(200).json(user)

    } catch(err){
        res.status(404).json({ message: err.message })
    }
}

export const getAllUsers = async (req, res) => {
    try {
        console.log("went in");
        const orders = await User.find();
        console.log("testing: " + orders);
        res.status(200).json(orders);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
      }
}

export const changePassword = async (req, res) => {
    console.log(req.body)
    const { id, securityAnswerInput, currentPassword, newPassword } = req.body;
  
    try {
      const user = await User.findOne({ _id: id });
  
      if (!user) {
        const errorMessage = `[Auth Failed] User not found: ID ${id}, IP: ${req.ip}`;
        await logError(errorMessage, "Authentication", id);
        return res.status(404).json({ msg: "User not found" });
      }
  
      // 🔐 Check if security answer matches (hashed)
      const isAnswerCorrect = await bcrypt.compare(securityAnswerInput, user.securityAnswer);
      if (!isAnswerCorrect) {
        return res.status(401).json({ msg: "Incorrect answer to security question." });
      }
  
      // 🔐 Check if current password is correct (match the latest password)
      const isCurrentPasswordCorrect = await bcrypt.compare(currentPassword, user.password);
      if (!isCurrentPasswordCorrect) {
        return res.status(401).json({ msg: "Current password is incorrect." });
      }
  
      // 🕒 Enforce 24-hour rule for password change
      const oneDay = 24 * 60 * 60 * 1000;
      const now = Date.now();
      if (now - user.passwordChangedAt.getTime() < oneDay) {
        const changeTimeLeft = oneDay - (now - user.passwordChangedAt);
        return res.status(400).json({
          msg: `Password change not allowed. Try again in ${Math.ceil(changeTimeLeft / 1000 / 60)} minutes.`,
        });
      }
  
      // 🔁 Check if new password was used before (including current one)
      const isReused = await Promise.any(
        user.passwordHistory.map(oldHash => bcrypt.compare(newPassword, oldHash))
      ).then(() => true).catch(() => false);
  
      if (isReused) {
        return res.status(400).json({
          msg: "You cannot reuse a previous password or change it more than once in 24 hours.",
        });
      }
  
      // ✅ Proceed with password update
      const newHash = await bcrypt.hash(newPassword, 10);
      user.password = newHash;
      user.passwordHistory.push(newHash);
      user.passwordChangedAt = now;
  
      // 🧹 Keep last 5 password hashes
      if (user.passwordHistory.length > 5) {
        user.passwordHistory = user.passwordHistory.slice(-5);
      }
  
      await user.save();
      return res.status(200).json({ msg: "Password changed successfully." });
  
    } catch (err) {
      console.error("[Password Change Error]", err);
      return res.status(500).json({ msg: "Internal server error." });
    }
  };