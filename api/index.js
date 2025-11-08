import axios from 'axios';

export default async function handler(req, res) {
  const { method, query, url } = req;

  // ✅ Root endpoint
  if (url === '/' || url === '/api' || url === '/api/') {
    return res.status(200).send('✅ MYAAR backend is running!');
  }

  // ✅ Stock endpoint
  if (method === 'GET' && url.startsWith('/api/stocks/')) {
    const ticker = url.split('/api/stocks/')[1];
    if (!ticker) {
      return res.status(400).json({ error: 'Ticker symbol missing' });
    }

    try {
      const polygonKey = process.env.POLYGON_API_KEY;
      const response = await axios.get(
        `https://api.polygon.io/v2/last/trade/${ticker}?apiKey=${polygonKey}`
      );
      return res.status(200).json(response.data);
    } catch (error) {
      console.error('Error fetching stock data:', error.message);
      return res.status(500).json({ error: 'Failed to fetch stock data' });
    }
  }

  // ✅ Fallback
  return res.status(404).json({ error: 'Not Found' });
}