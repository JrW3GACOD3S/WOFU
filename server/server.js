const express = require("express")
const cors = require("cors")

const app = express()
const PORT = 5000

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
  res.send("WOFU API is running 🚀")
})

app.post("/api/quotes", (req, res) => {
  const { productLink } = req.body

  if (!productLink) {
    return res.status(400).json({
      message: "Product link is required.",
    })
  }

  res.status(201).json({
    message: "Quote request received successfully!",
    productLink,
  })
})

app.listen(PORT, () => {
  console.log(`WOFU server running on http://localhost:${PORT}`)
})