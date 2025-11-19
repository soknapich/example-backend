const jwt = require('jsonwebtoken');
const { verifyToken } = require('@services/jwt.service');

module.exports = (req, res, next) => {

    const authHeader = req.headers['authorization'];
    
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ message: 'No token provided' });

    const user = verifyToken(token);
    
    if (user) {
        next();
    } else {
        console.log("Unauthorized");
        res.status(401).json({ message: "Unauthorized" });
    }
};