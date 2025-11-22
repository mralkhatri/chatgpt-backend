export default async function handler(req, res) {
  try {
    const apiKey = process.env.POLYGON_API_KEY;
    const limit = Number(req.query.limit) || 50;

    const url = `https://api.polygon.io/v3/reference/tickers?active=true&sort=ticker&order=asc&limit=${limit}&apiKey=${apiKey}`;

    const response = await fetch(url);
    const json = await response.json();

    if (!json.results) return res.status(500).json({ error: "Invalid Polygon response", details: json });

    const clean = json.results.filter(t => /^[A-Z]{1,5}$/.test(t.ticker));
    res.status(200).json({ status: "OK", count: clean.length, results: clean });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
