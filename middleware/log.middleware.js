const logger = require('@utils/logger');
module.exports = (req, res, next) => {
  const now = new Date().toISOString();
  logger.info(`[${now}] ${req.method} ${req.originalUrl}`);
  next();
};
