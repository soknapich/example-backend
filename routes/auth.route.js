const express = require("express");
const authRoute = express.Router();

const {
    login,
    register,
    refreshToken,
	verifyToken
} = require("@controllers/auth.controller");

const {
    loginValidator,
    registerValidator
} = require('@validators/user.validator');

//Get login
authRoute.post("/login", loginValidator, login);

//Register
authRoute.post("/register", registerValidator, register);

//refreshToken
authRoute.post("/refreshToken", refreshToken);


//verifyToken
authRoute.post("/verifyToken", verifyToken);


module.exports = authRoute;
