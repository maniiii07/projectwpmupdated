const Claim = require("../models/Claim");
const Item = require("../models/Item");

// Logic to create a new claim for an item
exports.createClaim = async (req, res) => {
  try {
    const { message } = req.body;
    const itemId = req.params.itemId;
    const claimantId = req.user.id;

    // Find the item to make sure it exists and is available
    const item = await Item.findById(itemId);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    if (item.status === "claimed") {
      return res.status(400).json({ message: "This item has already been claimed" });
    }
    // A user cannot claim an item they posted themselves
    if (item.postedBy.toString() === claimantId) {
      return res.status(400).json({ message: "You cannot claim your own item" });
    }

    // Create and save the new claim
    const newClaim = new Claim({
      item: itemId,
      claimant: claimantId,
      message,
    });
    await newClaim.save();
    
    res.status(201).json({ message: "✅ Claim submitted successfully!", claim: newClaim });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// Logic for the item owner to update a claim's status (accept/reject)
exports.updateClaimStatus = async (req, res) => {
  try {
    const { status } = req.body; // The new status: "accepted" or "rejected"
    const { claimId } = req.params;
    const userId = req.user.id;

    const claim = await Claim.findById(claimId).populate("item");
    if (!claim) {
      return res.status(404).json({ message: "Claim not found" });
    }

    // Security check: Only the user who posted the item can update its claims
    if (claim.item.postedBy.toString() !== userId) {
      return res.status(401).json({ message: "Not authorized to update this claim" });
    }

    // Update the claim's status
    claim.status = status;
    await claim.save();

    // If the claim is accepted, update the original item's status to "claimed"
    if (status === "accepted") {
      await Item.findByIdAndUpdate(claim.item._id, { status: "claimed" });
    }

    res.status(200).json({ message: `Claim has been ${status}`, claim });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// Logic to get all claims made on a specific item
exports.getClaimsForItem = async (req, res) => {
    try {
        const { itemId } = req.params;
        const claims = await Claim.find({ item: itemId }).populate('claimant', 'name email');
        res.status(200).json(claims);
    } catch (err) {
        res.status(500).json({ message: "Server Error", error: err.message });
    }
}










// Get all claims made by the currently logged-in user
exports.getMyClaims = async (req, res) => {
  try {
    const claims = await Claim.find({ claimant: req.user.id })
      .sort({ createdAt: -1 })
      .populate("item", "title type status"); // Populate item details for context

    res.status(200).json(claims);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};



