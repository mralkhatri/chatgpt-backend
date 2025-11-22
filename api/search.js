const axios = require("axios");

module.exports = async (req, res) => {
  try {
    const query = req.query.q;
    if (!query) {
      return res.status(400).json({ error: "Missing query" });
    }

    const apiKey = process.env.POLYGON_API_KEY;
    const url = `https://api.polygon.io/v3/reference/tickers?search=${query}&limit=20&active=true&apiKey=${apiKey}`;

    const { data } = await axios.get(url);

    res.status(200).json(data);
  } catch (err) {
    console.error("search error:", err);
    res.status(500).json({ error: err.message });
  }
};