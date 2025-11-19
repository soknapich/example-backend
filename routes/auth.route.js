const express = require("express");
const { login, register } = require("@controllers/auth.controller");
const authRoute = express.Router();

//Get login
authRoute.post("/login", login);

//Register
authRoute.post("/register", register);
module.exports = authRoute;
