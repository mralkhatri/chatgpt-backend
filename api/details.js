const axios = require("axios");

module.exports = async (req, res) => {
  try {
    const ticker = req.query.ticker?.toUpperCase();
    if (!ticker) {
      return res.status(400).json({ error: "Missing ticker" });
    }

    const apiKey = process.env.POLYGON_API_KEY;
    const url = `https://api.polygon.io/v3/reference/tickers/${ticker}?apiKey=${apiKey}`;

    const { data } = await axios.get(url);

    if (!data.results) {
      return res.status(500).json({ 
        error: "Invalid response", 
        details: data 
      });
    }

    res.status(200).json(data.results);
  } catch (err) {
    console.error("details error:", err);
    res.status(500).json({ error: err.message });
  }
};