function calculateTotalQuote({
  productPrice = 0,
  internationalShipping = 0,
  customs = 0,
  localDelivery = 0,
  wofuFee = 0,
}) {
  const totalQuote =
    Number(productPrice) +
    Number(internationalShipping) +
    Number(customs) +
    Number(localDelivery) +
    Number(wofuFee)

  return totalQuote
}

module.exports = { calculateTotalQuote }