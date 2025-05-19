import mongoose from 'mongoose';

const issueSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  priority: { type: String, enum: ['high', 'medium', 'low'], required: true },
  status: {
    type: String,
    enum: ['pending', 'in_progress', 'resolved'], // Match frontend/test values
    required: true,
  },
  author: {
    type: String,
    required: [true, 'Author is required'], // Add custom error message
  },
  createdAt: { type: Date, default: Date.now },
});

const Issue = mongoose.model('Issue', issueSchema);

export default Issue;
