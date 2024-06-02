const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname;
    const sanitizedFileName = `${Date.now()}-${fileName.replace(/\s/g, "")}`;
    cb(null, sanitizedFileName);
  },
});

const upload = multer({ storage });

module.exports = { upload };
