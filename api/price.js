module.exports = (req, res) => {
  try {
    const indices = [
      {
        id: "spx",
        name: "S&P 500",
        symbol: "SPX",
        price: 5120.50,
        change: 18.3,
        changePercent: 0.36
      },
      {
        id: "ndx",
        name: "Nasdaq 100",
        symbol: "NDX",
        price: 17980.20,
        change: -25.4,
        changePercent: -0.14
      },
      {
        id: "dji",
        name: "Dow Jones",
        symbol: "DJI",
        price: 38950.10,
        change: 95.6,
        changePercent: 0.25
      }
    ];

    res.status(200).json(indices);
  } catch (err) {
    console.error("market error:", err);
    res.status(500).json({ error: err.message });
  }
};