import express from 'express';
import Issue from '../models/Issue.js';

const router = express.Router();

// Create an issue
router.post('/', async (req, res) => {
  const { title, description, priority, author, status } = req.body;

  try {
    const newIssue = new Issue({
      title,
      description,
      priority,
      author,
      status,
      createdAt: new Date(), // Set createdAt field
    });

    await newIssue.save();
    res.status(201).json(newIssue);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all issues
router.get('/', async (req, res) => {
  try {
    const issues = await Issue.find();
    res.json(issues);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get issue by ID
router.get('/:id', async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id);
    if (!issue) return res.status(404).json({ error: 'Issue not found' });
    res.json(issue);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update an issue
router.put('/:id', async (req, res) => {
  try {
    const issue = await Issue.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!issue) return res.status(404).json({ error: 'Issue not found' });
    res.json(issue);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete an issue
router.delete('/:id', async (req, res) => {
  try {
    const issue = await Issue.findByIdAndDelete(req.params.id);
    if (!issue) return res.status(404).json({ error: 'Issue not found' });
    res.json({ message: 'Issue deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const selfPing = async () => {
  try {
    const response = await fetch(
      'https://issue-tracker-m82y.onrender.com/api/issues'
    );
    if (response.ok) {
      console.log('Self-ping successful');
    } else {
      console.error('Self-ping failed:', response.statusText);
    }
  } catch (error) {
    console.error('Error during self-ping:', error);
  }
};

// Schedule self-ping every 5 minutes
setInterval(selfPing, 5 * 60 * 1000);

export default router;
