const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require('cors');
const path = require('path'); // <-- 1. IMPORT PATH

dotenv.config();
const app = express();

// --- 2. DEFINE YOUR CORS OPTIONS ---
const allowedOrigins = [
  'http://localhost:4200',
  // Use the correct URL of your deployed frontend
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

// --- 3. USE CORS *ONLY ONCE* AS YOUR FIRST MIDDLEWARE ---
app.use(cors(corsOptions));

// Other middleware
app.use(express.json());

// DB connect
connectDB();

// API Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/items", require("./routes/itemRoutes"));
app.use("/api", require("./routes/claimRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/admin", require("./routes/adminRoutes")); 

app.use("/uploads", express.static("uploads"));

// --- 4. ADD ANGULAR CATCH-ALL ROUTE ---
// This must be AFTER all your API routes
// It tells the server to send the Angular app for any non-API route
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist/frontend/browser/index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));