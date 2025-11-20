// logger.js
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf, colorize } = format;
// Generate timestamp for file names
const date = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
// Custom log output format
const logFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}] : ${message}`;
});

const logger = createLogger({
  level: 'info', // default level
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    colorize(),
    logFormat
  ),
  transports: [
    new transports.Console(), // log to console
    new transports.File({ filename: `logs/${date}_error.log`, level: 'error' }),
    new transports.File({ filename: `logs/${date}.log` })
  ]
});

module.exports = logger;
