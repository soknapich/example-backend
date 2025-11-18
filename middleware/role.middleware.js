// middleware/authorize.js
const authorize = (roles = []) => {
    // roles can be a string or an array
    if (typeof roles === 'string') {
        roles = [roles];
    }

    return (req, res, next) => {
        const user = req.user; // user should be set by auth middleware
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        if (roles.length && !roles.includes(user.role)) {
            return res.status(403).json({ message: 'Forbidden: Access denied' });
        }

        next();
    };
}

module.exports = authorize;