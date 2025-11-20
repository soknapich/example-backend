const User = require('@models/user.model');
const { generateToken, generateRefreshToken } = require('@services/jwt.service');
const { hashedPassword, comparePassword } = require("@utils/bcrypt.password");
const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET_KEY;

module.exports.login = async (req, res) => {

    const { email, username, password } = req.body;

    let fieldValue = {};

    if (username) {
        fieldValue = { username: username.toLowerCase() };
    } else {
        fieldValue = { email: email.toLowerCase() };
    }

    try {
        const user = await User.findOne({
            where: fieldValue
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
        const refToken = generateRefreshToken(result);

        res.json({
            "user": result,
            "token": token,
            "refreshToken": refToken
        });

    } catch (error) {
        res.status(500).json({ error });
    }
}

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
}

module.exports.refreshToken = async (req, res) => {
    const { token } = req.body;
    if (!token) return res.sendStatus(401);
    jwt.verify(token, secretKey, (err, user) => {
        if (err) return res.sendStatus(403);
        // Optionally check DB if refresh token is still valid
        const result = {
            id: user.id,
            username: user.username,
            email: user.email
        };

        //const refToken = generateRefreshToken(result);
        const newAccessToken = generateToken(result);
        res.json({
            "token": newAccessToken, 
            //"refreshToken": refToken
        });

    });
}