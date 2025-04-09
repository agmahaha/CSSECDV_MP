import mongoose from "mongoose"

const LogSchema = new mongoose.Schema(
    {
        username:{
            type: String, 
            required: true,
        },
        message:{
            type: String, 
            required: true,
        },
        userType:{
            type: String,
            required: false,
        },
        errorType:{
            type: String,
            required: false,
        },
    }, {timestamps: true}
)

const Logs = mongoose.model("Logs", LogSchema)
export default Logs