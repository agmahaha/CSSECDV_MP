import jwt from "jsonwebtoken"

export const verifyToken = async (req, res, next) => {
    try {
        let token = req.header("Authorization");

        if (!token) {
            return res.status(403).send("Access Denied");
        }

        if (token.startsWith("Bearer ")) {
            token = token.slice(7, token.length).trimLeft(); 
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export const isAdmin = (req, res, next) => {
    const { userType } = req.query; // Extract userType from query parameters
    console.log(userType + " user");
    if (userType === 'admin') {
        next();
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
};