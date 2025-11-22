const axios = require("axios");

module.exports = async (req, res) => {
  try {
    const ticker = req.query.ticker?.toUpperCase();
    const limit = Number(req.query.limit) || 30;

    if (!ticker) {
      return res.status(400).json({ error: "Missing ticker" });
    }

    const apiKey = process.env.POLYGON_API_KEY;

    // Use yesterday as end date because Polygon rejects today's date
    const end = new Date(Date.now() - 24 * 3600 * 1000);
    const start = new Date(end.getTime() - limit * 24 * 3600 * 1000);

    // Convert to YYYY-MM-DD
    const startStr = start.toISOString().split("T")[0];
    const endStr = end.toISOString().split("T")[0];

    const url = `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/${startStr}/${endStr}?apiKey=${apiKey}`;

    const { data } = await axios.get(url);

    if (!data.results) {
      return res.status(500).json({
        error: "Invalid candle response",
        details: data
      });
    }

    res.status(200).json({
      ticker,
      results: data.results
    });

  } catch (err) {
    console.error("candles error:", err);
    res.status(500).json({ error: err.message });
  }
};