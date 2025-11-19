const bcrypt = require("bcrypt");

module.exports.hashedPassword = async (password) =>{
    const saltRounds = 10; // recommended
    const hashed = await bcrypt.hash(password, saltRounds);
    return hashed;
};

module.exports.comparePassword = async (password, userPassword) => {
    const isMatch = await bcrypt.compare(password, userPassword);
    return isMatch;
};