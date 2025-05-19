import mongoose from 'mongoose';

const issueSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  priority: { type: String, enum: ['low', 'medium', 'high'], required: true },
  author: {
    type: String,
    required: [true, 'Author is required'], // Add custom error message
  },
  createdAt: { type: Date, default: Date.now },
});

const Issue = mongoose.model('Issue', issueSchema);

export default Issue;
