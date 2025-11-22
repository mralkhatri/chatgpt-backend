// api/tickers.js
// ✅ Guaranteed working version using CommonJS and https
const https = require("https");

module.exports = async function handler(req, res) {
  try {
    const apiKey = process.env.POLYGON_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: "Missing POLYGON_API_KEY" });
    }

    const limit = Number(req.query.limit) || 50;
    const url = `https://api.polygon.io/v2/reference/tickers?market=stocks&active=true&sort=ticker&order=asc&limit=${limit}&apiKey=${apiKey}`;

    https
      .get(url, (resp) => {
        let data = "";

        resp.on("data", (chunk) => {
          data += chunk;
        });

        resp.on("end", () => {
          try {
            const parsed = JSON.parse(data);
            if (!parsed.results) {
              return res
                .status(500)
                .json({ error: "Invalid Polygon data", details: parsed });
            }

            // Filter for normal U.S.-style tickers
            const filtered = parsed.results.filter((t) =>
              /^[A-Z]{1,5}$/.test(t.ticker)
            );

            res.status(200).json({
              status: "OK",
              count: filtered.length,
              results: filtered,
            });
          } catch (e) {
            console.error("❌ JSON parse error:", e);
            res
              .status(500)
              .json({ error: "Failed to parse Polygon response", details: e.message });
          }
        });
      })
      .on("error", (err) => {
        console.error("❌ HTTPS request failed:", err);
        res
          .status(500)
          .json({ error: "Polygon HTTPS request failed", message: err.message });
      });
  } catch (error) {
    console.error("💥 /api/tickers crashed:", error);
    res.status(500).json({
      error: "Serverless function crashed",
      message: error.message,
    });
  }
};