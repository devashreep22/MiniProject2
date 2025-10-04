import { NavBar } from "@/components/common/Navbar"
import { CheckoutForm } from "@/components/common/CheckoutForm"
import { useNavigate } from "react-router-dom"
import { useAuth } from "@/context/AuthContext"

export default async function CheckoutPage() {
  const {user} = useAuth();
  const navigate = useNavigate()
  // Redirect to login if user is not logged in
  if (!user) {
    navigate("/login?redirect=/checkout")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <NavBar />

      <main className="flex-1 py-10">
        <div className="container">
          <h1 className="mb-8 text-3xl font-bold">Checkout</h1>
          {/* <CheckoutForm user={user} /> */}
          <CheckoutForm />
        </div>
      </main>

      <footer className="border-t bg-muted/40">
        <div className="container py-6 text-center text-sm text-muted-foreground">
          <p>© 2024 Farmwise. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
