function HowItWorks() {
  return (
    <section
  id="how-it-works"
  className="border-t border-gray-800 bg-gray-900/50 px-6 py-20"
>
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
            <h4 className="mt-5 text-xl font-bold">
              1. Send a product
            </h4>
            <p className="mt-3 leading-7 text-gray-400">
              Send us a link to the product you want from an international
              marketplace.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-800 bg-gray-950 p-7">
            <span className="text-3xl">💰</span>
            <h4 className="mt-5 text-xl font-bold">
              2. Get your quote
            </h4>
            <p className="mt-3 leading-7 text-gray-400">
              We calculate the total cost and provide you with a local
              price in Zambian Kwacha.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-800 bg-gray-950 p-7">
            <span className="text-3xl">📦</span>
            <h4 className="mt-5 text-xl font-bold">
              3. We deliver
            </h4>
            <p className="mt-3 leading-7 text-gray-400">
              We purchase, ship, and deliver your product to you in
              Zambia.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HowItWorks