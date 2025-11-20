
const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET_KEY;
const logger = require('@utils/logger');

module.exports.generateToken = (payload) => {
    const token = jwt.sign(payload, secretKey, {
        expiresIn: '15m'
    }
    ); // Token expires in 15 minutes
    return token;
}

module.exports.generateRefreshToken = (payload) => {
    const token = jwt.sign(payload, secretKey, {
        expiresIn: '7d'
    }
    ); // Token expires in 7 days
    return token;
}

module.exports.verifyToken = (tokenToVerify) => {
    try {
        const decoded = jwt.verify(tokenToVerify, secretKey);
        return decoded;
    } catch (err) {
        if (err.name === "TokenExpiredError") {
            logger.warn("Token has expired");
        } else {
            logger.warn("Invalid token");
        }
        return false;
    }
}