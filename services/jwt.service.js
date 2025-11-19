
const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET_KEY;

module.exports.generateToken = function (payload) {
    const token = jwt.sign(payload, secretKey, {
        expiresIn: '15m'
    }
    ); // Token expires in 15 minutes
    return token;
}

module.exports.verifyToken = function (tokenToVerify) {
    try {
        const decoded = jwt.verify(tokenToVerify, secretKey);
        return decoded;
    } catch (err) {
        console.error('Token verification failed:', err.message);
        return false;
    }
}

module.exports.refreshToken = function (payload) {
    const token = jwt.sign(payload, secretKey, {
        expiresIn: '7d'
    }
    ); // Token expires in 7 days
    return token;
}