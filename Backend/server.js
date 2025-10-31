const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require('cors');
const path = require('path');

dotenv.config();
const app = express();

// CORS Configuration
const allowedOrigins = [
  'http://localhost:4200',
  // Add your deployed frontend URL here
  'https://projectwpmupdated-1.onrender.com'
];
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};
app.use(cors(corsOptions));

// Middleware
app.use(express.json());

// DB Connect
connectDB();

// ✅ --- ADD THIS ROOT ROUTE ---
// This will be the message shown when you visit the base backend URL
app.get('/', (req, res) => {
  res.status(200).json({ 
    message: "Welcome to the WPM Lost & Found API!",
    status: "Server is running correctly." 
  });
});
// ---

// API Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/items", require("./routes/itemRoutes"));
app.use("/api", require("./routes/claimRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/admin", require("./routes/adminRoutes")); 

// Static folder for uploads
app.use("/uploads", express.static("uploads"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));