const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.json());
app.use(cors());


mongoose.connect('mongodb://localhost/stackoverflow_clone', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(error => {
    console.log('Failed to connect to MongoDB', error);
  });


const questionSchema = new mongoose.Schema({
  title: String,
  description: String,
  author: String,
});


const Question = mongoose.model('Question', questionSchema);

app.get('/api/questions', (req, res) => {
  Question.find({}, (error, questions) => {
    if (error) {
      console.log(error);
      res.status(500).json({ error: 'An error occurred' });
    } else {
      res.json(questions);
    }
  });
});

// Example route for creating a new question
app.post('/api/questions', (req, res) => {
  // Extract question details from the request body
  const { title, description, author } = req.body;

  // Create a new question object
  const newQuestion = new Question({
    title,
    description,
    author,
  });

  // Save the question to the database
  newQuestion.save((error, savedQuestion) => {
    if (error) {
      console.log(error);
      res.status(500).json({ error: 'An error occurred' });
    } else {
      res.json({ success: true, message: 'Question created successfully.', question: savedQuestion });
    }
  });
});

const port = 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
