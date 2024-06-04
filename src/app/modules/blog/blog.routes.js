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
  totalBlogCount,
  getKeyBlogs,
} = require("./blog.controllers");
const route = express.Router();

route.post("/add", tokenValidation, addBlog);
route.get("/my-blogs", tokenValidation, myBlogs);
route.delete("/delete", tokenValidation, deleteBlog);
route.get("/one", getBlogById);
route.patch("/update", tokenValidation, updateBlog);
route.get("/count", tokenValidation, blogCount);
route.get("/totalCount", totalBlogCount);
route.get("/all", getAllBlogs);
route.get("/key", getKeyBlogs);

module.exports = route;
