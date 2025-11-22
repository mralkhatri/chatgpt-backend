export default async function handler(req, res) {
  try {
    const apiKey = process.env.POLYGON_API_KEY;

    const gainersRaw = await fetch(`https://api.polygon.io/v2/snapshot/locale/us/markets/stocks/gainers?apiKey=${apiKey}`).then(r => r.json());
    const losersRaw  = await fetch(`https://api.polygon.io/v2/snapshot/locale/us/markets/stocks/losers?apiKey=${apiKey}`).then(r => r.json());

    const gainers = gainersRaw.results || [];
    const losers = losersRaw.results || [];

    res.status(200).json({ gainers, losers });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}