const express = require("express");
const { tokenValidation } = require("../../utils/jsonwebtoken");
const { addBlog, myBlogs } = require("./blog.controllers");
const { singleImageUploader } = require("../../utils/fileUpload");
const route = express.Router();

route.post("/add", tokenValidation, singleImageUploader, addBlog);
route.get("/my-blogs", tokenValidation, myBlogs);

module.exports = route;
