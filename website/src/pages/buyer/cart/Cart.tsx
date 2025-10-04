import { NavBar } from "@/components/common/Navbar"
import { CartContents } from "@/components/common/CardContent"

export default function CartPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <NavBar />

      <main className="flex-1 py-10">
        <div className="container">
          <h1 className="mb-8 text-3xl font-bold">Your Shopping Cart</h1>
          <CartContents />
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
