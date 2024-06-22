// server/app.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Question = require('./models/Question');

require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Greeting route
app.get('/greet', (req, res) => {
  res.send('Hello! How can I help you today?');
});

// Static questions route
app.get('/questions', async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Question and answer route
app.post('/query', async (req, res) => {
  const { question } = req.body;
  try {
    const answer = await Question.findOne({ question });
    if (answer) {
      res.json({ answer: answer.answer });
    } else {
      res.json({ answer: 'Please contact our customer care at 123-456-7890.' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
