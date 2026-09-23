const express = require("express");

const app = express();
const PORT = 5000;

app.get("/", (req, res) => {
  res.send("WOFU API is running 🚀");
});

app.listen(PORT, () => {
  console.log(`WOFU server running on http://localhost:${PORT}`);
});