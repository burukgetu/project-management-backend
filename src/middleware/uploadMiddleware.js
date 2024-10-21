const multer = require("multer");
const path = require('path');

// Set up storage engine
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/'); // Uploads will be saved in the 'uploads' folder
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });

  // File filter
const fileFilter = (req, file, cb) => {
    // Accept only certain file types (e.g., images, PDFs)
    const allowedTypes = /jpeg|jpg|png|pdf/;
    const mimeType = allowedTypes.test(file.mimetype);
    const extName = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  
    if (mimeType && extName) {
      return cb(null, true);
    } else {
      cb(new Error('File type not allowed'));
    }
  };

  const upload = multer({
    storage,
    limits: { fileSize: 1024 * 1024 * 5 }, // 5MB file size limit
    fileFilter,
  });

  module.exports = upload;