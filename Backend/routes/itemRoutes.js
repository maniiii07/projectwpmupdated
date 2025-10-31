const express = require("express");
const router = express.Router();

const { authMiddleware } = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware");
const { postItem, getItems, getMyPostedItems, deleteItem, updateItemPhoto } = require("../controllers/itemController");

// POST /api/items - Create a new item (protected route, requires image upload)
// Middlewares run in order: 1. check token, 2. handle photo upload, 3. run controller
router.post("/", authMiddleware, upload.single("photo"), postItem);
router.get("/my-items", authMiddleware, getMyPostedItems);

// GET /api/items - Get all items (protected route)
router.get("/", authMiddleware, getItems);
router.delete("/:id", authMiddleware, deleteItem);
// This route will use the upload middleware to handle the new file
router.patch("/:id/photo", authMiddleware, upload.single('photo'), updateItemPhoto);


module.exports = router;



