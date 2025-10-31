const multer = require("multer");
const path = require("path");

// Configure storage for Multer
const storage = multer.diskStorage({
  // Where to save the files
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Make sure this 'uploads' folder exists in your Backend directory
  },
  // How to name the files
  filename: function (req, file, cb) {
    // Create a unique filename to avoid overwriting files with the same name
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
  },
});

// Filter to allow only image files
const fileFilter = (req, file, cb) => {
  // Regular expression to check for image extensions
  const allowedTypes = /jpeg|jpg|png/;
  const isMimeTypeAllowed = allowedTypes.test(file.mimetype);
  const isExtensionAllowed = allowedTypes.test(path.extname(file.originalname).toLowerCase());

  if (isMimeTypeAllowed && isExtensionAllowed) {
    // Accept the file
    cb(null, true);
  } else {
    // Reject the file
    cb(new Error("Error: Only image files (jpeg, jpg, png) are allowed!"), false);
  }
};

// Initialize multer with the storage and file filter configurations
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 1024 * 1024 * 5 }, // Optional: Limit file size to 5MB
});

module.exports = upload;