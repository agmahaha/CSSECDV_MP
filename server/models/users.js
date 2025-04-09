import mongoose from "mongoose"

const UserSchema = new mongoose.Schema(
    {
        username:{
            type: String, 
            required: true,

        },
        password:{
            type: String, 
            required: true,
        },
        email:{
            type: String, 
            required: true,
            unique: true
        },
        userType:{
            type: String,
            required: true,
        },
        phone_num:{
            type: Number,
            required: false
        },
        failedAttempts:{
            type: Number,
            default: 0
        },
        lockUntil: {
            type: Date,
            default: null
        },
        passwordHistory:{
            type: [String],
            default: [],
        },
        passwordChangedAt: {
            type: Date,
            default: Date.now,
        },
        
    }, {timestamps: true}
)

const Users = mongoose.model("Users", UserSchema)
export default Users