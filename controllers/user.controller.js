const User = require('@models/user.model');
const bcrypt = require("bcrypt");

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
    const { username, email, password } = req.body;
    try {
        const saltRounds = 10; // recommended
        // hash password
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const user = await User.create({ username, email, password: hashedPassword });

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