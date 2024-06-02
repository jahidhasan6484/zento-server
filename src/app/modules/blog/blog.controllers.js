const User = require("../user/user.model");
const Blog = require("./blog.model");

const addBlog = async (req, res) => {
  try {
    const { title, content } = req.body;
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

    const myBlogs = await Blog.find({ authorId: user._id });

    res.status(200).json({ data: myBlogs });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred while fetching your blogs" });
  }
};

module.exports = {
  addBlog,
  myBlogs,
};
