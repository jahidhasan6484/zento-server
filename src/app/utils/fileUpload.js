const multer = require("multer");
const { upload } = require("./multer.config");

const singleImageUploader = (req, res, next) => {
  upload.single("image")(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({
        success: false,
        error: "Failed to upload image",
      });
    } else if (err) {
      return res.status(500).json({
        success: false,
        error: "Failed to upload image",
      });
    }

    if (req.method === "POST" && !req.file) {
      return res.status(400).json({
        success: false,
        error: "No file uploaded.",
      });
    }

    const basePath = `${req.protocol}://${req.get("host")}/api/public/uploads`;
    const imageUrl = req.file ? `${basePath}/${req.file.filename}` : null;

    req.image = imageUrl;

    next();
  });
};

module.exports = {
  singleImageUploader,
};
