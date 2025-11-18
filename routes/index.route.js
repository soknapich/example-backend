const express = require("express");
const { index } = require("@controllers/index.controller");
const indexRoute = express.Router();

indexRoute.get("/", index);

module.exports = indexRoute;
