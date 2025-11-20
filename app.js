require("./config/app.config");
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const logMiddleware = require("@middleware/log.middleware");
const routers = require("@constants/routers.constant");
const logger = require("@utils/logger");


// Enable CORS for all origins
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(logMiddleware);

//Routes
routers.forEach((r) => {
  app.use(r.uri, r.middleware, r.route);
});

// 404 middleware (must be AFTER all routes)
app.use((req, res, next) => {
  logger.error('Not Found');
  res.status(404).json({ message: "Not Found" });
});
// Error handling middleware (optional)
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).json({ message: "Server Error" });
});

module.exports = app;