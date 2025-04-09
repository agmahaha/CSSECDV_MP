import jwt from "jsonwebtoken"
import {logError, logUser} from "../controller/logs.js"

export const verifyToken = async (req, res, next) => {
    try {
        let token = req.header("Authorization");

        if (!token) {
            const errorMessage = "Access Denied: No token provided";
            console.error(errorMessage);
            await logError(errorMessage, "Access Control", req.user || null);
            return res.status(403).send("Access Denied");
        }

        if (token.startsWith("Bearer ")) {
            token = token.slice(7, token.length).trimLeft(); 
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;

        await logUser(req.username, `User ${verified.id} authenticated successfully`, req.userType)
        next();

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export const isAdmin = async (req, res, next) => {
    try {
        console.log(req.params);
        const { username, userType } = req.query; // Extract user info from query parameters
        console.log(`${userType} user ${username}`);

        if (userType === 'admin') {
            await logUser(username, `Admin access granted to user ${username}`, userType);
            return next(); // Proceed to the next middleware/handler
        } else {
            const errorMessage = "Unauthorized access attempt: User is not an admin";
            console.error(errorMessage);
            await logError(errorMessage, "Access Control", username || null);
            return res.status(401).json({ message: 'Unauthorized' });
        }
    } catch (err) {
        console.error("Error in isAdmin middleware:", err);
        await logError("Unexpected error during admin check", "Access Control", req.query.username || null);
        return res.status(500).json({ message: 'Internal server error' });
    }
};