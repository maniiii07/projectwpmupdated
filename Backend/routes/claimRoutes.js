const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middlewares/authMiddleware");
// ✅ Correct
const { createClaim, updateClaimStatus, getClaimsForItem, getMyClaims } = require("../controllers/claimController");
//... existing routes


//... existing routes for creating, getting, and patching claims

// GET /api/claims/my-claims - Get claims made by the logged-in user
router.get("/claims/my-claims", authMiddleware, getMyClaims); // <-- ADD THIS LINE


// A route to create a claim on a specific item
// POST /api/items/:itemId/claims
router.post("/items/:itemId/claims", authMiddleware, createClaim);

// A route for an item's owner to see all claims on their item
// GET /api/items/:itemId/claims
router.get("/items/:itemId/claims", authMiddleware, getClaimsForItem);

// A route for an item's owner to accept or reject a claim
// PATCH /api/claims/:claimId
router.patch("/claims/:claimId", authMiddleware, updateClaimStatus);

module.exports = router;