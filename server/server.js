const express = require("express")
const cors = require("cors")
const { db } = require("./firebase")
const { calculateTotalQuote } = require("./utils/quoteCalculator")

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

  // Quote information
  productName: "",
  marketplace: "",
  quantity: 1,

  productPrice: 0,
  internationalShipping: 0,
  customs: 0,
  localDelivery: 0,
  wofuFee: 0,
  totalQuote: 0,

  adminNotes: "",

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

app.post("/api/quotes/:requestId/calculate", async (req, res) => {
  const {
    productPrice,
    internationalShipping,
    customs,
    localDelivery,
    wofuFee,
  } = req.body

  try {
    const totalQuote = calculateTotalQuote({
      productPrice,
      internationalShipping,
      customs,
      localDelivery,
      wofuFee,
    })

    const quoteRef = db
      .collection("quoteRequests")
      .doc(req.params.requestId)

    await quoteRef.update({
      productPrice: Number(productPrice) || 0,
      internationalShipping: Number(internationalShipping) || 0,
      customs: Number(customs) || 0,
      localDelivery: Number(localDelivery) || 0,
      wofuFee: Number(wofuFee) || 0,
      totalQuote,
      status: "quoted",
      updatedAt: new Date(),
    })

    res.status(200).json({
      message: "Quote calculated successfully!",
      totalQuote,
    })
  } catch (error) {
    console.error("Error calculating quote:", error)

    res.status(500).json({
      message: "Unable to calculate quote.",
    })
  }
})

app.listen(PORT, () => {
  console.log(`WOFU server running on http://localhost:${PORT}`)
})