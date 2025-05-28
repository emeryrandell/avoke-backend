const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
app.use(cors());
app.use(express.json());

const OPENAI_API_KEY = 'sk-REPLACE_WITH_YOUR_KEY';

app.post('/chat', async (req, res) => {
  const messages = req.body.messages;

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: messages,
      temperature: 0.85,
      max_tokens: 400
    })
  });

  const data = await response.json();
  res.json(data);
});

app.listen(3000, () => console.log('Server running on port 3000'));
