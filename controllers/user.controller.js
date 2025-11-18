const User = require('@models/user.model');
const { generateToken } = require('@services/jwt.service');

module.exports.index = async (req, res) => {
    const users = await User.findAll();
    res.json({ data: users });
};

module.exports.find = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports.create = async (req, res) => {
    try {
        const user = await User.create(req.body);
        if (user) {
            const payload = {
                id: user.id,
                username: user.username,
                email: user.email
            };
            const token = generateToken(payload);
            res.json({ data: payload, token: token });
        }
    } catch (error) {
        res.status(500).json({ error });
    }
};