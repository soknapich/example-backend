const express = require("express");
const { index, find, create } = require("@controllers/user.controller");
const userRoute = express.Router();

//Get all users
userRoute.get("/", index);

//Get single user
userRoute.get("/:id", find);

//Create user
userRoute.post("/", create);

module.exports = userRoute;
