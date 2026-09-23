function App() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Navigation */}
      <nav className="border-b border-gray-800">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <h1 className="text-2xl font-bold">
            WOFU<span className="text-green-400">.</span>
          </h1>

          <button className="rounded-lg bg-green-500 px-5 py-2.5 font-semibold text-gray-950 hover:bg-green-400">
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero */}
      <main>
        <section className="mx-auto max-w-7xl px-6 py-24 text-center">
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

          {/* Product Request */}
          <div className="mx-auto mt-10 max-w-2xl">
            <div className="flex flex-col gap-3 rounded-2xl border border-gray-800 bg-gray-900 p-3 shadow-2xl sm:flex-row">
              <input
                type="text"
                placeholder="Paste a product link..."
                className="flex-1 rounded-xl bg-gray-800 px-5 py-4 text-white outline-none placeholder:text-gray-500 focus:ring-2 focus:ring-green-400"
              />

              <button className="rounded-xl bg-green-500 px-7 py-4 font-bold text-gray-950 hover:bg-green-400">
                Get a Quote
              </button>
            </div>

            <p className="mt-3 text-sm text-gray-500">
              eBay • Alibaba • 1688 • and more
            </p>
          </div>
        </section>

        {/* How It Works */}
        <section className="border-t border-gray-800 bg-gray-900/50 px-6 py-20">
          <div className="mx-auto max-w-7xl">
            <div className="text-center">
              <p className="font-semibold uppercase tracking-widest text-green-400">
                Simple Process
              </p>

              <h3 className="mt-3 text-3xl font-bold md:text-4xl">
                How WOFU works
              </h3>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              <div className="rounded-2xl border border-gray-800 bg-gray-950 p-7">
                <span className="text-3xl">🔗</span>
                <h4 className="mt-5 text-xl font-bold">1. Send a product</h4>
                <p className="mt-3 leading-7 text-gray-400">
                  Send us a link to the product you want from an international
                  marketplace.
                </p>
              </div>

              <div className="rounded-2xl border border-gray-800 bg-gray-950 p-7">
                <span className="text-3xl">💰</span>
                <h4 className="mt-5 text-xl font-bold">2. Get your quote</h4>
                <p className="mt-3 leading-7 text-gray-400">
                  We calculate the total cost and provide you with a local
                  price in Zambian Kwacha.
                </p>
              </div>

              <div className="rounded-2xl border border-gray-800 bg-gray-950 p-7">
                <span className="text-3xl">📦</span>
                <h4 className="mt-5 text-xl font-bold">3. We deliver</h4>
                <p className="mt-3 leading-7 text-gray-400">
                  We purchase, ship, and deliver your product to you in
                  Zambia.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 px-6 py-8 text-center text-sm text-gray-500">
        © 2026 WOFU. Global Shopping for Zambia.
      </footer>
    </div>
  )
}

export default App