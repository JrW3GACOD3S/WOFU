import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import HowItWorks from "./components/HowItWorks"

function App() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navbar />

      <main>
        <Hero />
        <HowItWorks />
      </main>

      <footer className="border-t border-gray-800 px-6 py-8 text-center text-sm text-gray-500">
        © 2026 WOFU. Global Shopping for Zambia.
      </footer>
    </div>
  )
}

export default App