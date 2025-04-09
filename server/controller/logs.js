import Log from '../models/logs.js'

export const logUser = async (username, message, userType) => {
    console.log("Incoming log request body:", username, "", message, " ", userType)
    try{

        const newLoggedUser = new Log({
            username,
            message,
            userType,
        })

        await newLoggedUser.save()

    } catch(err){
        console.error("Error while logging to MongoDB:", err);
    }
}

export const logError = async (message, errorType, username) => {
    try {
      const log = new Log({
        message,
        errorType,
        username,
      });
      
      await log.save();
      
    } catch (err) {
      console.error("Error while logging to MongoDB:", err);
    }
  };