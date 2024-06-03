const tags = require("../../utils/localDB");
const User = require("../user/user.model");
const Blog = require("./blog.model");
const fs = require("fs");
const path = require("path");

const addBlog = async (req, res) => {
  try {
    const { title, content, tag } = req.body;
    const image = req.image;
    const email = req.email;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Can't get your identity" });
    }

    const newBlog = new Blog({
      title,
      authorId: user?._id,
      content,
      image,
      tag,
    });

    await newBlog.save();

    res.status(201).json({ message: "Blog added successfully" });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while adding the blog",
    });
  }
};

const myBlogs = async (req, res) => {
  try {
    const email = req.email;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Can't get your identity" });
    }

    const myBlogs = await Blog.find({ authorId: user._id }).lean();

    const populatedBlogs = await Promise.all(
      myBlogs.map(async (blog) => {
        const author = await User.findById(blog.authorId).select("name image");
        return { ...blog, author };
      })
    );

    res.status(200).json({ data: populatedBlogs });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred while fetching your blogs" });
  }
};

const deleteBlog = async (req, res) => {
  try {
    const { blogId } = req.query;
    const email = req.email;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Can't get your identity" });
    }

    const blog = await Blog.findOne({ _id: blogId, authorId: user._id });
    if (!blog) {
      return res.status(404).json({
        message: "Blog not found or you are not authorized to delete this blog",
      });
    }

    await Blog.deleteOne({ _id: blogId });

    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred while deleting the blog" });
  }
};

const getBlogById = async (req, res) => {
  try {
    const { id } = req.query;

    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    const author = await User.findById(blog.authorId).select("name image");

    res.status(200).json({ data: { ...blog.toObject(), author } });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred while fetching the blog" });
  }
};

const updateBlog = async (req, res) => {
  try {
    const { id } = req.query;

    const { title, content, tag } = req.body;
    const newImage = req?.image;
    const email = req.email;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Can't get your identity" });
    }

    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Ensure the user updating the blog is the author
    if (blog.authorId.toString() !== user._id.toString()) {
      return res
        .status(403)
        .json({ message: "You are not authorized to update this blog" });
    }

    // Update blog fields
    blog.title = title;
    blog.content = content;
    blog.tag = tag;

    // If there's a new image, update the image URL
    if (newImage) {
      // Optionally, delete the old image file if it exists
      if (blog.image) {
        const oldImagePath = path.join(
          __dirname,
          "..",
          "public",
          "uploads",
          path.basename(blog.image)
        );
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }

      blog.image = newImage;
    }

    await blog.save();

    res.status(200).json({ message: "Blog updated successfully", blog });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while updating the blog",
      error: error.message,
    });
  }
};

const blogCount = async (req, res) => {
  try {
    const email = req.email;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const userId = user._id;

    const tagCounts = {};

    for (const tag of tags) {
      const count = await Blog.countDocuments({ tag, authorId: userId });
      tagCounts[tag] = count;
    }

    res.status(200).json({
      data: tagCounts,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while fetching blog counts",
      error: error.message,
    });
  }
};

module.exports = {
  addBlog,
  myBlogs,
  deleteBlog,
  getBlogById,
  updateBlog,
  blogCount,
};
