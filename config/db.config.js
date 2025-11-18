const { Sequelize } = require('sequelize');
const DB_HOST_NAME = process.env.DB_HOST_NAME || 'localhost';
const DB_NAME = process.env.DB_NAME || '';
const DB_USER_NAME = process.env.DB_USER_NAME || 'root';
const DB_PASSWORD = process.env.DB_PASSWORD || '';

const sequelize = new Sequelize(DB_NAME, DB_USER_NAME, DB_PASSWORD, {
    host: DB_HOST_NAME,
    dialect: 'mysql',
    logging: false, // disable SQL logs
});

module.exports = sequelize;
