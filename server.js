// server.js
require('module-alias/register');
const sequelize = require('@config/db.config');
const app = require('@app');

const PORT = process.env.APP_PORT || 3000;
const logger = require('@utils/logger');

// auto create/update tables
sequelize.sync({ alter: false })  
  .then(() => logger.info("Database synced"))
  .catch(err => logger.error(err));

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
