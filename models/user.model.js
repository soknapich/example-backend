const { DataTypes } = require('sequelize');
const sequelize = require('@config/db.config');

const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value) { // Custom setter for 'username'
            this.setDataValue('username', value.toLowerCase());
        }
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        set(value) { // Custom setter for 'email'
            this.setDataValue('email', value.toLowerCase());
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        get() {
            return undefined; // hide password
        }
    }
}, {
    tableName: 'users',
    timestamps: true,
    createdAt: 'created_at', // rename createdAt
    updatedAt: 'updated_at', // rename updatedAt
});

module.exports = User;
