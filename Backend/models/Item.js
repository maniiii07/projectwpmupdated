const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["lost", "found"], // Can only be 'lost' or 'found'
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    location: {
      type: String,
      required: true,
    },
    photo: {
      type: String, // We will store the filename of the image
      default: null,
    },
    status: {
      type: String,
      enum: ["pending", "claimed"],
      default: "pending",
    },
    // Link to the user who posted this item
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // This refers to the User model
      required: true,
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

module.exports = mongoose.model("Item", itemSchema);