const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const cors =require("cors");

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017', { // yaha tera url dalna padega , mongoDB Compass
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Define a schema for comments
const commentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Create a model for comments
const Comment = mongoose.model('Comment', commentSchema);

// Middleware to parse request body
app.use(express.json());
app.use(cors());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));



// Route to handle POST request for submitting a comment
app.post('/submit-comment', async (req, res) => {
  const { name, email, comment } = req.body;

  // Perform validation or sanitization if needed
  if (!name || !email || !comment) {
    return res.status(400).json({ error: 'Please provide name, email, and comment' });
  }

  try {
    // Create a new comment document
    const newComment = new Comment({ name, email, comment });

    // Save the comment to the database
    const savedComment = await newComment.save();

    // Send a response back to the client
    res.status(200).json({ message: 'Comment submitted successfully', comment: savedComment });
  } catch (err) {
    // Handle any errors that occurred during the save operation
    console.error(err);
    res.status(500).json({ error: 'An error occurred while saving the comment' });
  }
});

app.get('/comments', async (req, res) => {
  try {
    const comments = await Comment.find().sort({ createdAt: -1 });
    res.status(200).json(comments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while fetching comments' });
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});