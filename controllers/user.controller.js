const User = require('@models/user.model');
const { hashedPassword } = require("@utils/bcrypt.password");

module.exports.index = async (req, res) => {
    try {
        // Get pagination params from query (with default values)
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        // Query with pagination
        const { rows: users, count: total } = await User.findAndCountAll({
            attributes: { exclude: ["password"] },
            limit,
            offset,
            order: [["created_at", "DESC"]] // optional
        });

        return res.json({
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
            data: users
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
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