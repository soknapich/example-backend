const express = require("express");
const { index } = require("@controllers/product.controller");
const productRoute = express.Router();

//Get all products
productRoute.get("/", index);

module.exports = productRoute;