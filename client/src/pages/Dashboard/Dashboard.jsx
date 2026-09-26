import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore"
import { onAuthStateChanged, signOut } from "firebase/auth"
import { auth, db } from "../../firebase"

function Dashboard() {
  const navigate = useNavigate()

  const [userData, setUserData] = useState(null)
  const [requestCount, setRequestCount] = useState(0)
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log("AUTH CHECK STARTED")
      console.log("CURRENT USER:", user)
      console.log("Logged in Firebase user:", user)

      if (!user) {
      navigate("/login")
      return
     }

      try {
        const userRef = doc(db, "users", user.uid)
        const userSnapshot = await getDoc(userRef)

        console.log(
          "FIRESTORE PROFILE EXISTS:",
          userSnapshot.exists()
        )

        console.log(
          "FIRESTORE PROFILE DATA:",
          userSnapshot.data()
        )

        const requestsQuery = query(
         collection(db, "productRequests"),
         where("userId", "==", user.uid)
)

        const requestsSnapshot = await getDocs(requestsQuery)

        setRequestCount(requestsSnapshot.size)
        setRequests(
         requestsSnapshot.docs.map((requestDoc) => ({
          id: requestDoc.id,
          ...requestDoc.data()
  }))
)

        if (userSnapshot.exists()) {
          setUserData(userSnapshot.data())
        }
      } catch (error) {
        console.error("Error loading user:", error)
      } finally {
        setLoading(false)
      }
    })

    return () => unsubscribe()
  }, [])

  const handleLogout = async () => {
    try {
      await signOut(auth)
      navigate("/login")
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  if (loading) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-gray-950 text-white">
        <p className="text-gray-400">
          Loading your dashboard...
        </p>
      </section>
    )
  }

  return (
    <section className="min-h-screen bg-gray-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-10 flex items-start justify-between">
  <div>
    <p className="font-semibold uppercase tracking-widest text-green-400">
      Customer Dashboard
    </p>

    <h1 className="mt-2 text-3xl font-bold">
      Welcome, {userData?.name || "Customer"} 👋
    </h1>

    <p className="mt-2 text-gray-400">
      Manage your product requests, orders and deliveries.
    </p>
  </div>

  {/* Logout Button */}
  <button
    onClick={handleLogout}
    className="rounded-lg border border-red-500 px-5 py-2.5 font-semibold text-red-400 transition hover:bg-red-500 hover:text-white"
  >
    Logout
  </button>
</div>

        {/* Customer Information */}
        <div className="mb-8 rounded-2xl border border-gray-800 bg-gray-900 p-6">
          <h2 className="text-xl font-bold">
            Your Account
          </h2>

          <div className="mt-4 space-y-2 text-gray-400">
            <p>
              <span className="text-gray-300">Name:</span>{" "}
              {userData?.name}
            </p>

            <p>
              <span className="text-gray-300">Email:</span>{" "}
              {userData?.email}
            </p>

            <p>
              <span className="text-gray-300">Phone:</span>{" "}
              {userData?.phone}
            </p>
          </div>
        </div>

        {/* Dashboard Cards */}
        <div className="grid gap-6 md:grid-cols-3">

          {/* Requests */}
          <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6">
            <p className="text-sm text-gray-400">
              Product Requests
            </p>

            <h2 className="mt-3 text-3xl font-bold">
              {requestCount}
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Products you've asked WOFU to source.
            </p>
          </div>

          {/* Orders */}
          <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6">
            <p className="text-sm text-gray-400">
              Active Orders
            </p>

            <h2 className="mt-3 text-3xl font-bold">
              0
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Orders currently being processed.
            </p>
          </div>

          {/* Deliveries */}
          <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6">
            <p className="text-sm text-gray-400">
              Deliveries
            </p>

            <h2 className="mt-3 text-3xl font-bold">
              0
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Orders on their way to you.
            </p>
          </div>

        </div>

{/* Product Request History */}
<div className="mt-8 rounded-2xl border border-gray-800 bg-gray-900 p-6">
  <h2 className="text-xl font-bold">
    My Product Requests
  </h2>

  {requests.length === 0 ? (
    <p className="mt-4 text-gray-400">
      You haven't submitted any product requests yet.
    </p>
  ) : (
    <div className="mt-5 space-y-4">
      {requests.map((request) => (
        <div
          key={request.id}
          className="rounded-xl border border-gray-800 bg-gray-950 p-5"
        >
          <div className="flex flex-col justify-between gap-3 md:flex-row">
            <div>
              <h3 className="font-bold">
                {request.productName}
              </h3>

              <p className="mt-1 text-sm text-gray-400">
                Quantity: {request.quantity}
              </p>

              <p className="mt-1 text-sm text-gray-400">
                Status: {request.status}
              </p>
            </div>

            <span className="text-sm text-gray-500">
              Request ID: {request.id}
            </span>
          </div>
        </div>
      ))}
    </div>
  )}
</div>

        {/* Getting Started */}
        <div className="mt-8 rounded-2xl border border-gray-800 bg-gray-900 p-6">
          <h2 className="text-xl font-bold">
            Ready to order?
          </h2>

          <p className="mt-2 text-gray-400">
            Paste a product link and let WOFU handle the rest.
          </p>

          <button
             onClick={() => navigate("/product-request")}
             className="mt-5 rounded-lg bg-green-500 px-6 py-3 font-bold text-gray-950 transition hover:bg-green-400">
             Request a Product
          </button>
        </div>

      </div>
    </section>
  )
}

export default Dashboard