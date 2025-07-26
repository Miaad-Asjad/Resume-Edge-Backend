import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import contactRoutes from './routes/contactRoutes.js';


dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/contact", contactRoutes);

app.get("/", (req, res) => {
  res.send("🎉 Resume Edge Backend is Live!");
});

// Start server
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
