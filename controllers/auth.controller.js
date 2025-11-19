const User = require('@models/user.model');
const { generateToken } = require('@services/jwt.service');
const { refreshToken } = require('@services/jwt.service');
const { hashedPassword, comparePassword } = require("@utils/bcrypt.password");

module.exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({
            where: { email: email.toLowerCase() }
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Compare password
        const isMatch = await comparePassword(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: "Wrong password" });
        }

        const result = {
            id: user.id,
            username: user.username,
            email: user.email
        };

        const token = generateToken(result);
        const refToken = refreshToken(result);

        res.json({
            "user": result,
            "token": token,
            "refreshToken": refToken
        });

    } catch (error) {
        res.status(500).json({ error });
    }
};

module.exports.register = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        // hash password
        const newPassword = await hashedPassword(password);
        const user = await User.create({ username, email, password: newPassword });
        if (user) {
            const result = {
                id: user.id,
                username: user.username,
                email: user.email
            };

            res.json({ data: result });
        }
    } catch (error) {
        res.status(500).json({ error });
    }
};