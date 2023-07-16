import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState({
    title: '',
    description: '',
    author: '',
  });

  useEffect(() => {
    
    axios.get('/api/questions')
      .then(response => {
        setQuestions(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleInputChange = e => {
    setNewQuestion({
      ...newQuestion,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = e => {
    e.preventDefault();

    axios.post('/api/questions', newQuestion)
      .then(response => {
        console.log(response)
