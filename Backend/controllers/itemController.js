const Item = require("../models/Item");
const fs = require('fs'); // <-- 1. IMPORT FILE SYSTEM MODULE
const path = require('path');

// This version includes the 'category' field
exports.postItem = async (req, res) => {
  try {
    const { type, title, description, location, category } = req.body;
    const postedBy = req.user.id;

    const newItem = new Item({
      type: type.toLowerCase(),
      title,
      description,
      location,
      category,
      postedBy,
      photo: req.file ? req.file.filename : null,
    });

    await newItem.save();
    res.status(201).json({ message: "✅ Item posted successfully!", item: newItem });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error while posting item." });
  }
};

// This is the updated version with full search and filter capabilities
exports.getItems = async (req, res) => {
  try {
    const filter = {};

    if (req.query.type) {
      filter.type = req.query.type;
    }
    if (req.query.category) {
      filter.category = req.query.category;
    }
    if (req.query.location) {
      filter.location = { $regex: req.query.location, $options: 'i' };
    }
    if (req.query.search) {
      filter.$or = [
        { title: { $regex: req.query.search, $options: "i" } },
        { description: { $regex: req.query.search, $options: "i" } },
      ];
    }

    const items = await Item.find(filter)
      .sort({ createdAt: -1 })
      .populate("postedBy", "name email");
      
    res.status(200).json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error while fetching items." });
  }
};

// This function is already correct
exports.getMyPostedItems = async (req, res) => {
  try {
    const items = await Item.find({ postedBy: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// Add this new function to your itemController.js
exports.deleteItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    // Security Check: Make sure the user deleting the item is the one who posted it
    if (item.postedBy.toString() !== req.user.id) {
      return res.status(401).json({ message: "User not authorized" });
    }

    await item.deleteOne(); // Mongoose v6+ uses deleteOne()

    res.status(200).json({ message: "✅ Item removed successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error while deleting item." });
  }
};

exports.updateItemPhoto = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    // Security Check: Make sure the user updating the item is the one who posted it
    if (item.postedBy.toString() !== req.user.id) {
      return res.status(401).json({ message: "User not authorized" });
    }

    // If there was an old photo, delete it from the server
    if (item.photo) {
      const oldPhotoPath = path.join(__dirname, '..', 'uploads', item.photo);
      if (fs.existsSync(oldPhotoPath)) {
        fs.unlinkSync(oldPhotoPath);
      }
    }

    // Update the item's photo field with the new filename
    item.photo = req.file.filename;
    const updatedItem = await item.save();

    res.status(200).json({ message: "✅ Photo updated successfully", item: updatedItem });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error while updating photo." });
  }
};