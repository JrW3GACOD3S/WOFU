import { useState } from "react"

function Hero() {
  const [customerName, setCustomerName] = useState("")
  const [customerPhone, setCustomerPhone] = useState("")
  const [productLink, setProductLink] = useState("")
  const [message, setMessage] = useState("")
  const [isError, setIsError] = useState(false)

  const handleQuoteRequest = async (event) => {
    event.preventDefault()

    if (!customerName.trim()) {
      setIsError(true)
      setMessage("Please enter your name.")
      return
    }

    if (!customerPhone.trim()) {
      setIsError(true)
      setMessage("Please enter your phone number.")
      return
    }

    if (!productLink.trim()) {
      setIsError(true)
      setMessage("Please paste a product link.")
      return
    }

    setIsError(false)
    setMessage("Sending your quote request...")

    try {
      const response = await fetch("http://localhost:5000/api/quotes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerName,
          customerPhone,
          productLink,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong.")
      }

      setMessage(
        `${data.message} Your request ID is ${data.requestId}.`
      )

      setCustomerName("")
      setCustomerPhone("")
      setProductLink("")
    } catch (error) {
      console.error(error)

      setIsError(true)
      setMessage("Unable to send your request. Please try again.")
    }
  }

  return (
    <section
      id="get-started"
      className="mx-auto max-w-7xl px-6 py-24 text-center"
    >
      <div className="mx-auto max-w-4xl">
        <p className="font-semibold uppercase tracking-widest text-green-400">
          Global Shopping Made Simple
        </p>

        <h1 className="mt-4 text-5xl font-extrabold leading-tight md:text-7xl">
          Buy From Anywhere.
          <br />
          <span className="text-green-400">We Bring It To Zambia.</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-400">
          Found something you want from eBay, Alibaba, 1688, or another
          international marketplace? Send us the link and WOFU will handle
          the rest.
        </p>

        <div className="mx-auto mt-10 max-w-xl rounded-2xl border border-gray-800 bg-gray-900 p-6 text-left shadow-2xl">
          <h2 className="text-2xl font-bold text-white">
            Get a Quote
          </h2>

          <p className="mt-2 text-sm text-gray-400">
            Tell us what you want to buy and we will calculate the cost.
          </p>

          <form onSubmit={handleQuoteRequest} className="mt-6 space-y-4">
            {/* Customer Name */}
            <div>
              <label
                htmlFor="customerName"
                className="mb-2 block text-sm font-medium text-gray-300"
              >
                Your Name
              </label>

              <input
                id="customerName"
                type="text"
                value={customerName}
                onChange={(event) => {
                  setCustomerName(event.target.value)
                  setMessage("")
                  setIsError(false)
                }}
                placeholder="Enter your name"
                className="w-full rounded-lg border border-gray-700 bg-gray-950 px-4 py-3 text-white outline-none transition placeholder:text-gray-600 focus:border-green-400"
              />
            </div>

            {/* Customer Phone */}
            <div>
              <label
                htmlFor="customerPhone"
                className="mb-2 block text-sm font-medium text-gray-300"
              >
                Phone Number
              </label>

              <input
                id="customerPhone"
                type="tel"
                value={customerPhone}
                onChange={(event) => {
                  setCustomerPhone(event.target.value)
                  setMessage("")
                  setIsError(false)
                }}
                placeholder="e.g. 0971234567"
                className="w-full rounded-lg border border-gray-700 bg-gray-950 px-4 py-3 text-white outline-none transition placeholder:text-gray-600 focus:border-green-400"
              />
            </div>

            {/* Product Link */}
            <div>
              <label
                htmlFor="productLink"
                className="mb-2 block text-sm font-medium text-gray-300"
              >
                Product Link
              </label>

              <input
                id="productLink"
                type="url"
                value={productLink}
                onChange={(event) => {
                  setProductLink(event.target.value)
                  setMessage("")
                  setIsError(false)
                }}
                placeholder="Paste your eBay, Alibaba, 1688 or other product link"
                className="w-full rounded-lg border border-gray-700 bg-gray-950 px-4 py-3 text-white outline-none transition placeholder:text-gray-600 focus:border-green-400"
              />
            </div>

            {/* Status Message */}
            {message && (
              <p
                className={`text-sm ${
                  isError ? "text-red-400" : "text-green-400"
                }`}
              >
                {message}
              </p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full rounded-lg bg-green-500 px-6 py-3.5 font-bold text-gray-950 transition hover:bg-green-400"
            >
              Get My Quote
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Hero