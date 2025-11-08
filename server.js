const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('✅ MYAAR backend is running!');
});

app.get('/stocks/:ticker', async (req, res) => {
  const { ticker } = req.params;
  try {
    const response = await axios.get(
      `https://api.polygon.io/v2/last/trade/${ticker}?apiKey=h_hnPSJEKwypKly2VvcQ7arnoU0fT1l1`
    );
    res.json(response.data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Failed to fetch stock data' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});