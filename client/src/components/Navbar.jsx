function Navbar() {
  return (
    <nav className="border-b border-gray-800 bg-gray-950">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        {/* Logo */}
        <a href="/" className="text-2xl font-bold">
          WOFU<span className="text-green-400">.</span>
        </a>

        {/* Navigation Links */}
        <div className="hidden items-center gap-8 md:flex">
          <a
            href="#how-it-works"
            className="text-sm text-gray-300 transition hover:text-green-400"
          >
            How It Works
          </a>

          <a
            href="#about"
            className="text-sm text-gray-300 transition hover:text-green-400"
          >
            About
          </a>

          <a
            href="#track"
            className="text-sm text-gray-300 transition hover:text-green-400"
          >
            Track Order
          </a>
        </div>

        {/* CTA */}
       <a
  href="#get-started"
  className="rounded-lg bg-green-500 px-5 py-2.5 font-semibold text-gray-950 transition hover:bg-green-400"
>
  Get Started
</a>
      </div>
    </nav>
  )
}

export default Navbar