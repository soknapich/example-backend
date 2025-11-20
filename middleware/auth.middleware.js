const jwt = require('jsonwebtoken');
const { verifyToken } = require('@services/jwt.service');
const logger = require('@utils/logger');

module.exports = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        logger.warn('No token provided');
        return res.status(401).json({ message: 'No token provided' });
    }
    const user = verifyToken(token);
    if (user) {
        next();
    } else {
        logger.warn("Unauthorized");
        res.status(401).json({ message: "Unauthorized" });
    }
};