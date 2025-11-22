const { v4: uuidv4 } = require("uuid");

module.exports = (req, res) => {
  try {
    const signals = [
      {
        id: uuidv4(),
        symbol: "AAPL",
        type: "buy",
        confidence: 0.82,
        description: "Strong momentum and positive earnings.",
        timestamp: new Date().toISOString()
      },
      {
        id: uuidv4(),
        symbol: "TSLA",
        type: "sell",
        confidence: 0.41,
        description: "High volatility and weak short-term trend.",
        timestamp: new Date().toISOString()
      },
      {
        id: uuidv4(),
        symbol: "NVDA",
        type: "hold",
        confidence: 0.65,
        description: "Extended run; waiting for pullback.",
        timestamp: new Date().toISOString()
      }
    ];

    res.status(200).json(signals);
  } catch (error) {
    console.error("Signals API error:", error);
    res.status(500).json({ error: "Failed to load signals" });
  }
};