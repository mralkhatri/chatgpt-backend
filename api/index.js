const axios = require('axios');

module.exports = async (req, res) => {
  if (req.method === 'GET' && req.url.startsWith('/stocks/')) {
    const ticker = req.url.split('/stocks/')[1];
    try {
      const response = await axios.get(
        `https://api.polygon.io/v2/last/trade/${ticker}?apiKey=${process.env.POLYGON_API_KEY}`
      );
      res.status(200).json(response.data);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch stock data', details: error.message });
    }
  } else {
    res.status(200).send('✅ MYAAR backend is running!');
  }
};