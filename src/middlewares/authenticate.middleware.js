const jwt = require("jsonwebtoken");
const env = require("../config/env");
const authenticate = (req, res, next) => {

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            message: "Authentication token missing",
        });
    }

    const token = authHeader.split(" ")[1];

    try {

        const decoded = jwt.verify(token,env.JWT_SECRET);

        req.user = decoded;

        next();

    } catch (err) {

        return res.status(401).json({
            message: "Invalid or expired token",
        });

    }

};

module.exports = authenticate;