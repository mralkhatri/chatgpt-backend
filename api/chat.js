const fetch = require('node-fetch');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).send('Only POST allowed');
    return;
  }

  let messages = [];
  try {
    messages = req.body.messages;
  } catch (e) {
    res.status(400).json({ error: 'Invalid messages format' });
    return;
  }

  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages
    })
  });
  const data = await response.json();
  res.status(200).json(data);
};