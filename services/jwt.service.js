
const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET_KEY;

module.exports.generateToken = function (payload) {
    // Store in environment variables for security
    const token = jwt.sign(payload, secretKey, { expiresIn: '1h' }); // Token expires in 1 hour
    return token;
}


module.exports.verifyToken = function (tokenToVerify) {
    try {
        const decoded = jwt.verify(tokenToVerify, secretKey);
        //console.log('Token verified:', decoded);
        //Access decoded.userId, decoded.username, etc.
        return decoded;
    } catch (err) {
        console.error('Token verification failed:', err.message);
        // Handle expired tokens or invalid signatures
        return false;
    }
}