const express = require("express");
const { tokenValidation } = require("../../utils/jsonwebtoken");
const {
  addBlog,
  myBlogs,
  deleteBlog,
  getBlogById,
  updateBlog,
  blogCount,
  getAllBlogs,
} = require("./blog.controllers");
const { singleImageUploader } = require("../../utils/fileUpload");
const route = express.Router();

route.post("/add", tokenValidation, singleImageUploader, addBlog);
route.get("/my-blogs", tokenValidation, myBlogs);
route.delete("/delete", tokenValidation, deleteBlog);
route.get("/one", getBlogById);
route.patch("/update", tokenValidation, singleImageUploader, updateBlog);
route.get("/count", tokenValidation, blogCount);
route.get("/all", getAllBlogs);

module.exports = route;
