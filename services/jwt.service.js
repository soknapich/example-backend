
const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET_KEY;

module.exports.generateToken = (payload) => {
    const token = jwt.sign(payload, secretKey, {
        expiresIn: '15m'
    }
    ); // Token expires in 15 minutes
    return token;
}

module.exports.verifyToken = (tokenToVerify) => {
    try {
        const decoded = jwt.verify(tokenToVerify, secretKey);
        return decoded;
    } catch (err) {
        if (err.name === "TokenExpiredError") {
            console.log("Token has expired");
        } else {
            console.log("Invalid token");
        }
        return false;
    }
}

module.exports.refreshToken = (payload) => {
    const token = jwt.sign(payload, secretKey, {
        expiresIn: '7d'
    }
    ); // Token expires in 7 days
    return token;
}