const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require('cors');

dotenv.config();
const app = express();
// ✅ --- START OF THE FIX ---
// Define which frontend URLs are allowed to connect
const allowedOrigins = [
  'http://localhost:4200',
  'https://projectwpmupdated-1.onrender.com'
];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
};

// Use CORS as the very first middleware with the new options
app.use(cors(corsOptions));
// ✅ --- END OF THE FIX ---
app.use(cors());
app.use(express.json());

connectDB();

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/items", require("./routes/itemRoutes"));
app.use("/api", require("./routes/claimRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
// This line tells the app to use the admin routes
app.use("/api/admin", require("./routes/adminRoutes")); 

app.use("/uploads", express.static("uploads"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));   