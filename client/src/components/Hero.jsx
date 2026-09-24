import { useState } from "react"

function Hero() {
  const [productLink, setProductLink] = useState("")
  const [message, setMessage] = useState("")
  const [isError, setIsError] = useState(false)

  const handleQuoteRequest = async (event) => {
  event.preventDefault()

  if (!productLink.trim()) {
    setIsError(true)
    setMessage("Please paste a product link first.")
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
        productLink,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || "Something went wrong.")
    }

    setMessage(`${data.message} Your request ID is ${data.requestId}.`)
  } catch (error) {
    setIsError(true)
    setMessage("Unable to send your request. Please try again.")
  }
}

  return (
    <section
      id="get-started"
      className="mx-auto max-w-7xl px-6 py-24 text-center"
    >
      <p className="mb-4 font-semibold uppercase tracking-widest text-green-400">
        Global Shopping for Zambia
      </p>

      <h2 className="mx-auto max-w-4xl text-5xl font-bold leading-tight md:text-7xl">
        Shop the world.
        <br />
        <span className="text-green-400">We bring it to Zambia.</span>
      </h2>

      <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-400">
        Find products from international marketplaces and let WOFU handle
        the ordering, payment, shipping, and delivery.
      </p>

      <form
        onSubmit={handleQuoteRequest}
        className="mx-auto mt-10 max-w-2xl"
      >
        <div className="flex flex-col gap-3 rounded-2xl border border-gray-800 bg-gray-900 p-3 shadow-2xl sm:flex-row">
          <input
            type="url"
            value={productLink}
            onChange={(event) => {
              setProductLink(event.target.value)
              setMessage("")
              setIsError(false)
            }}
            placeholder="Paste a product link..."
            className="flex-1 rounded-xl bg-gray-800 px-5 py-4 text-white outline-none placeholder:text-gray-500 focus:ring-2 focus:ring-green-400"
          />

          <button
            type="submit"
            className="rounded-xl bg-green-500 px-7 py-4 font-bold text-gray-950 transition hover:bg-green-400"
          >
            Get a Quote
          </button>
        </div>

        <p className="mt-3 text-sm text-gray-500">
          eBay • Alibaba • 1688 • and more
        </p>

        {message && (
          <p
            className={`-mt-1 mb-2 font-medium ${
              isError ? "text-red-500" : "text-green-400"
            }`}
          >
            {message}
          </p>
        )}
      </form>
    </section>
  )
}

export default Hero