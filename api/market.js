
// market.js - Fixed live data fetching using Polygon API

const axios = require("axios");

module.exports = async (req, res) => {
  try {
    const indexes = [
      { symbol: "SPX", name: "S&P 500" },
      { symbol: "NDX", name: "Nasdaq 100" },
      { symbol: "DJI", name: "Dow Jones" }
    ];

    const results = [];

    for (const idx of indexes) {
      const url = `https://api.polygon.io/v2/aggs/ticker/I:${idx.symbol}/prev?apiKey=${process.env.POLYGON_API_KEY}`;
      const response = await axios.get(url);
      const data = response.data;

      if (!data.results || data.results.length === 0) continue;

      const agg = data.results[0];

      results.push({
        id: idx.symbol.toLowerCase(),
        name: idx.name,
        symbol: idx.symbol,
        price: agg.c,
        change: agg.c - agg.o,
        changePercent: ((agg.c - agg.o) / agg.o) * 100
      });
    }

    res.json(results);
  } catch (err) {
    console.error("Market route error:", err);
    res.status(500).json({ error: "Failed to load market data" });
  }
};
