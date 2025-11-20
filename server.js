// server.js
const app = require('./app');
const sequelize = require('@config/db.config');
const PORT = process.env.APP_PORT || 3000;
const logger = require('@utils/logger');

// auto create/update tables
sequelize.sync({ alter: false })  
  .then(() => logger.info("Database synced"))
  .catch(err => logger.error(err));

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
