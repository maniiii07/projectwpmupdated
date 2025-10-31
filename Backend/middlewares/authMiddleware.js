const jwt = require("jsonwebtoken");
const User = require("../models/User");

// This middleware protects routes by checking the user's token
exports.authMiddleware = async (req, res, next) => {
  let token;

  // Check for token in the authorization header
  if (req.header("Authorization") && req.header("Authorization").startsWith("Bearer")) {
    try {
      // Get token from header (format: "Bearer <token>")
      token = req.header("Authorization").split(" ")[1];

      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find the user by ID from the token and attach it to the request object
      // We exclude the password for security
      req.user = await User.findById(decoded.id).select("-password");

      next(); // Move to the next function (the controller)
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};