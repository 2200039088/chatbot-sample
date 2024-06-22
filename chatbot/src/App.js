// client/src/App.js
import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');

  const handleGreet = async () => {
    const res = await axios.get('http://localhost:5000/greet');
    setResponse(res.data);
  };

  const handleQuery = async () => {
    const res = await axios.post('http://localhost:5000/query', { question: message });
    setResponse(res.data.answer);
  };

  const handleQuestions = async () => {
    const res = await axios.get('http://localhost:5000/questions');
    setResponse(res.data.map(q => q.question).join(', '));
  };

  return (
    <div>
      <h1>Chatbot</h1>
      <button onClick={handleGreet}>Greet</button>
      <button onClick={handleQuestions}>Show All Questions</button>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Ask a question"
      />
      <button onClick={handleQuery}>Ask</button>
      <p>Response: {response}</p>
    </div>
  );
}

export default App;
