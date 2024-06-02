const express = require("express");
const { registerUser, loginUser, profile } = require("./user.controllers");
const { tokenValidation } = require("../../utils/jsonwebtoken");
const route = express.Router();

route.post("/register", registerUser);
route.post("/login", loginUser);
route.get("/profile", tokenValidation, profile);

module.exports = route;
