const express = require("express");
const { login, register, refreshToken } = require("@controllers/auth.controller");
const authRoute = express.Router();

//Get login
authRoute.post("/login", login);

//Register
authRoute.post("/register", register);

//refreshToken
authRoute.post("/refreshToken", refreshToken);

module.exports = authRoute;
