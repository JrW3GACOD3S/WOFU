import { useEffect, useState } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { addDoc, collection, serverTimestamp } from "firebase/firestore"
import { auth, db } from "../firebase"


function ProductRequest() {
  const [productLink, setProductLink] = useState("")
  const [productName, setProductName] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [notes, setNotes] = useState("")
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    setCurrentUser(user)
  })

  return () => unsubscribe()
}, [])

  const handleSubmit = async (event) => {
  event.preventDefault()

  console.log("SUBMIT BUTTON CLICKED")

  try {
    const user = auth.currentUser

    if (!currentUser) {
    console.error("User is not logged in")
    return
     }

    await addDoc(collection(db, "productRequests"), {
      userId: currentUser.uid,
      productLink: productLink.trim(),
      productName: productName.trim(),
      quantity: quantity,
      notes: notes.trim(),
      status: "pending",
      createdAt: serverTimestamp()
    })

    console.log("Product request saved successfully!")
  } catch (error) {
    console.error("Error saving product request:", error)
  }
}

  return (
    <section className="min-h-screen bg-gray-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-3xl">

        <p className="font-semibold uppercase tracking-widest text-green-400">
          WOFU
        </p>

        <h1 className="mt-2 text-3xl font-bold">
          Request a Product
        </h1>

        <p className="mt-2 text-gray-400">
          Send us the product you want to buy and we'll prepare a quote for you.
        </p>

        <div className="mt-8 rounded-2xl border border-gray-800 bg-gray-900 p-6">

          {/* Product Link */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Product Link
            </label>

            <input
              type="url"
              placeholder="Paste the product link here"
              value={productLink}
              onChange={(event) => setProductLink(event.target.value)}
              className="w-full rounded-lg border border-gray-700 bg-gray-950 px-4 py-3 text-white outline-none transition focus:border-green-400"
            />
          </div>

          {/* Product Name */}
          <div className="mt-5">
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Product Name
            </label>

            <input
              type="text"
              placeholder="e.g. iPhone 15 Pro Max"
              value={productName}
              onChange={(event) => setProductName(event.target.value)}
              className="w-full rounded-lg border border-gray-700 bg-gray-950 px-4 py-3 text-white outline-none transition focus:border-green-400"
            />
          </div>

          {/* Quantity */}
          <div className="mt-5">
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Quantity
            </label>

            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(event) => setQuantity(Number(event.target.value))}
              className="w-full rounded-lg border border-gray-700 bg-gray-950 px-4 py-3 text-white outline-none transition focus:border-green-400"
            />
          </div>

          {/* Notes */}
          <div className="mt-5">
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Additional Notes
            </label>

            <textarea
              rows="4"
              placeholder="Any specific details about the product?"
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              className="w-full resize-none rounded-lg border border-gray-700 bg-gray-950 px-4 py-3 text-white outline-none transition focus:border-green-400"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            onClick={handleSubmit}
            className="mt-6 w-full rounded-lg bg-green-500 px-6 py-3 font-bold text-gray-950 transition hover:bg-green-400"
            >
            Submit Product Request
          </button>

        </div>

      </div>
    </section>
  )
}

export default ProductRequest