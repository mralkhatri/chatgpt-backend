const axios = require("axios");

module.exports = async (req, res) => {
  try {
    const ticker = req.query.ticker?.toUpperCase();
    if (!ticker) {
      return res.status(400).json({ error: "Missing ticker" });
    }

    const apiKey = process.env.POLYGON_API_KEY;
    const url = `https://api.polygon.io/v2/reference/news?ticker=${ticker}&limit=20&apiKey=${apiKey}`;

    const { data } = await axios.get(url);

    res.status(200).json(data);
  } catch (err) {
    console.error("news error:", err);
    res.status(500).json({ error: err.message });
  }
};