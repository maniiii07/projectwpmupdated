const mongoose = require("mongoose");

const claimSchema = new mongoose.Schema(
  {
    // The specific item that is being claimed
    item: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
      required: true,
    },
    // The user who is making the claim
    claimant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // A message from the claimant to help prove ownership
    message: {
      type: String,
      required: true,
    },
    // The current status of the claim
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt
);

module.exports = mongoose.model("Claim", claimSchema);