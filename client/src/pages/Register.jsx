import { useState } from "react"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"
import { auth, db } from "../firebase"

function Register() {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  const [isError, setIsError] = useState(false)

  const handleRegister = async (event) => {
    event.preventDefault()

    if (!name.trim()) {
      setIsError(true)
      setMessage("Please enter your name.")
      return
    }

    if (!phone.trim()) {
      setIsError(true)
      setMessage("Please enter your phone number.")
      return
    }

    if (!email.trim()) {
      setIsError(true)
      setMessage("Please enter your email.")
      return
    }

    if (password.length < 6) {
      setIsError(true)
      setMessage("Password must be at least 6 characters.")
      return
    }

    try {
      setIsError(false)
      setMessage("Creating your account...")

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password
      )

      const user = userCredential.user

await setDoc(doc(db, "users", user.uid), {
  name: name.trim(),
  phone: phone.trim(),
  email: email.trim(),
  role: "customer",
  createdAt: new Date()
})

      console.log("User created:", userCredential.user.uid)

      setMessage("Account created successfully!")
    } catch (error) {
      console.error(error)

      setIsError(true)

      if (error.code === "auth/email-already-in-use") {
        setMessage("An account with this email already exists.")
      } else if (error.code === "auth/invalid-email") {
        setMessage("Please enter a valid email address.")
      } else if (error.code === "auth/weak-password") {
        setMessage("Password is too weak.")
      } else {
        setMessage("Unable to create account. Please try again.")
      }
    }
  }

  return (
    <section className="min-h-screen bg-gray-950 px-6 py-20 text-white">
      <div className="mx-auto max-w-md">
        <div className="mb-8 text-center">
          <p className="font-semibold uppercase tracking-widest text-green-400">
            Join WOFU
          </p>

          <h1 className="mt-3 text-3xl font-bold">
            Create your account
          </h1>

          <p className="mt-3 text-gray-400">
            Create an account to manage your WOFU requests.
          </p>
        </div>

        <form
          onSubmit={handleRegister}
          className="space-y-5 rounded-2xl border border-gray-800 bg-gray-900 p-6"
        >
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-gray-300"
            >
              Full Name
            </label>

            <input
              id="name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Enter your name"
              className="w-full rounded-lg border border-gray-700 bg-gray-950 px-4 py-3 text-white outline-none focus:border-green-400"
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="mb-2 block text-sm font-medium text-gray-300"
            >
              Phone Number
            </label>

            <input
              id="phone"
              type="tel"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              placeholder="e.g. 0971234567"
              className="w-full rounded-lg border border-gray-700 bg-gray-950 px-4 py-3 text-white outline-none focus:border-green-400"
            />
          </div>

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
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-lg border border-gray-700 bg-gray-950 px-4 py-3 text-white outline-none focus:border-green-400"
            />
          </div>

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
              onChange={(event) => setPassword(event.target.value)}
              placeholder="At least 6 characters"
              className="w-full rounded-lg border border-gray-700 bg-gray-950 px-4 py-3 text-white outline-none focus:border-green-400"
            />
          </div>

          {message && (
            <p
              className={`text-sm ${
                isError ? "text-red-400" : "text-green-400"
              }`}
            >
              {message}
            </p>
          )}

          <button
            type="submit"
            className="w-full rounded-lg bg-green-500 px-6 py-3.5 font-bold text-gray-950 transition hover:bg-green-400"
          >
            Create Account
          </button>
        </form>
      </div>
    </section>
  )
}

export default Register