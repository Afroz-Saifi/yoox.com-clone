const express = require("express");
const { userExists } = require("../middleware/user.exists");
const { registerUser, loginUser } = require("../controller/user.controller");

const userRouter = express.Router();

userRouter.post("/register", userExists, registerUser);
userRouter.post("/login", loginUser);

module.exports = { userRouter };
