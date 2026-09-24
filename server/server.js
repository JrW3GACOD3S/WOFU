const express = require("express")
const cors = require("cors")
const { db } = require("./firebase")

const app = express()
const PORT = 5000

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
  res.send("WOFU API is running 🚀")
})

app.post("/api/quotes", async (req, res) => {
  const { productLink } = req.body

  if (!productLink) {
    return res.status(400).json({
      message: "Product link is required.",
    })
  }

  try {
    const quoteRequest = await db.collection("quoteRequests").add({
      productLink,
      status: "pending",
      createdAt: new Date(),
    })

    res.status(201).json({
      message: "Quote request received successfully!",
      requestId: quoteRequest.id,
    })
  } catch (error) {
    console.error("Error saving quote request:", error)

    res.status(500).json({
      message: "Unable to save quote request.",
    })
  }
})

app.listen(PORT, () => {
  console.log(`WOFU server running on http://localhost:${PORT}`)
})