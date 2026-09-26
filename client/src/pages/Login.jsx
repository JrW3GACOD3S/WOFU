import { useState } from "react"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../firebase"
import { useNavigate } from "react-router-dom"

function Login() {
    const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  const [isError, setIsError] = useState(false)

  const handleLogin = async (event) => {
    event.preventDefault()

    if (!email.trim()) {
      setIsError(true)
      setMessage("Please enter your email.")
      return
    }

    if (!password) {
      setIsError(true)
      setMessage("Please enter your password.")
      return
    }

    try {
      setIsError(false)
      setMessage("Signing you in...")

      await signInWithEmailAndPassword(
  auth,
  email.trim(),
  password
)

navigate("/dashboard")
    } catch (error) {
      console.error(error)

      setIsError(true)

      if (
        error.code === "auth/invalid-credential" ||
        error.code === "auth/wrong-password" ||
        error.code === "auth/user-not-found"
      ) {
        setMessage("Invalid email or password.")
      } else if (error.code === "auth/invalid-email") {
        setMessage("Please enter a valid email address.")
      } else {
        setMessage("Unable to log in. Please try again.")
      }
    }
  }

  return (
    <section className="min-h-screen bg-gray-950 px-6 py-20 text-white">
      <div className="mx-auto max-w-md">
        <div className="mb-8 text-center">
          <p className="font-semibold uppercase tracking-widest text-green-400">
            Welcome Back
          </p>

          <h1 className="mt-3 text-3xl font-bold">
            Login to WOFU
          </h1>

          <p className="mt-3 text-gray-400">
            Sign in to manage your WOFU requests.
          </p>
        </div>

        <form
          onSubmit={handleLogin}
          className="space-y-5 rounded-2xl border border-gray-800 bg-gray-900 p-6"
        >
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-gray-300"
            >
              Email
            </label>

            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value)
                setMessage("")
                setIsError(false)
              }}
              placeholder="you@example.com"
              className="w-full rounded-lg border border-gray-700 bg-gray-950 px-4 py-3 text-white outline-none transition placeholder:text-gray-600 focus:border-green-400"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-gray-300"
            >
              Password
            </label>

            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value)
                setMessage("")
                setIsError(false)
              }}
              placeholder="Enter your password"
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

          {/* Login Button */}
          <button
            type="submit"
            className="w-full rounded-lg bg-green-500 px-6 py-3.5 font-bold text-gray-950 transition hover:bg-green-400"
          >
            Login
          </button>
        </form>
      </div>
    </section>
  )
}

export default Login