module.exports = (req, res) => {
  try {
    const now = new Date().toISOString();

    const decisions = [
      {
        id: "AAPL-strong-buy",
        symbol: "AAPL",
        rating: "Strong Buy",
        confidence: 0.92,
        targetPrice: 220.0,
        stopLoss: 175.0,
        rationale: "Strong earnings, solid uptrend, and positive analyst revisions.",
        timeframe: "Medium Term",
        updatedAt: now
      },
      {
        id: "TSLA-buy",
        symbol: "TSLA",
        rating: "Buy",
        confidence: 0.84,
        targetPrice: 290.0,
        stopLoss: 205.0,
        rationale: "Momentum recovering after recent dip; call volume increasing.",
        timeframe: "Short Term",
        updatedAt: now
      },
      {
        id: "NVDA-hold",
        symbol: "NVDA",
        rating: "Hold",
        confidence: 0.76,
        targetPrice: null,
        stopLoss: null,
        rationale: "Extended after a strong run. Consider waiting for a pullback.",
        timeframe: "Intraday",
        updatedAt: now
      }
    ];

    res.status(200).json(decisions);
  } catch (err) {
    console.error("quick-decisions error:", err);
    res.status(500).json({ error: err.message });
  }
};