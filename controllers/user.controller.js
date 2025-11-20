const User = require('@models/user.model');
const { hashedPassword } = require("@utils/bcrypt.password");

module.exports.index = async (req, res) => {
    const users = await User.findAll({
        attributes: { exclude: ["password"] }
    });
    res.json({ data: users });
}

module.exports.find = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id, {
            attributes: { exclude: ["password"] }
        });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports.create = async (req, res) => {
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