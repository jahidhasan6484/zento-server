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

    // If it's a POST request, require the image file
    if (req.method === "POST" && !req.file) {
      return res.status(400).json({
        success: false,
        error: "No file uploaded.",
      });
    }

    // For PUT requests, set the image URL only if a file is uploaded
    const basePath = `${req.protocol}://${req.get("host")}/api/public/uploads`;
    const imageUrl = req.file ? `${basePath}/${req.file.filename}` : null;

    // Attach imageUrl to the request object if an image was uploaded
    if (imageUrl) {
      req.image = imageUrl;
    }

    next();
  });
};

module.exports = {
  singleImageUploader,
};
