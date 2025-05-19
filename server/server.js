import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import issueRoutes from './routes/issues.js';
import userRoutes from './routes/users.js';

const app = express();
const PORT = 3000;

// MongoDB Connection
dotenv.config();
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Middleware
app.use(cors()); // Enable CORS for cross-origin requests
app.use(express.json()); // Parse JSON request bodies
app.use('/api/issues', issueRoutes);
app.use('/api/users', userRoutes);

// Example Route
app.get('/', (req, res) => {
  res.send('Express server is running!');
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
