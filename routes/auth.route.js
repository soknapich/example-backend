const express = require("express");
const { login, register, refreshToken } = require("@controllers/auth.controller");
const authRoute = express.Router();

const { loginValidator, registerValidator } = require('@validators/user.validator');

//Get login
authRoute.post("/login", loginValidator, login);

//Register
authRoute.post("/register", registerValidator, register);

//refreshToken
authRoute.post("/refreshToken", refreshToken);

module.exports = authRoute;
