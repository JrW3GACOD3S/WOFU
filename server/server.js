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
  const { customerName, customerPhone, productLink } = req.body

  if (!customerName?.trim()) {
    return res.status(400).json({
      message: "Customer name is required.",
    })
  }

  if (!customerPhone?.trim()) {
    return res.status(400).json({
      message: "Customer phone number is required.",
    })
  }

  if (!productLink?.trim()) {
    return res.status(400).json({
      message: "Product link is required.",
    })
  }

  try {
    const quoteRequest = await db.collection("quoteRequests").add({
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      productLink: productLink.trim(),
      status: "pending",
      createdAt: new Date(),
      updatedAt: new Date(),
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