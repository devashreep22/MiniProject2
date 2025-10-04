import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/common/ProductCard"
import { NavBar } from "@/components/common/Navbar"
import { getAllProducts } from "@/lib/mock/products"
import { Link } from "react-router-dom"

export default function ProductsPage() {
  const products = getAllProducts()

  return (
    <div className="flex min-h-screen flex-col">
      <NavBar />

      <main className="flex-1 py-10">
        <div className="container">
          <div className="mb-8">
            <Link to="/">
              <Button variant="ghost" className="gap-1 pl-0">
                <ChevronLeft className="h-4 w-4" /> Back to Home
              </Button>
            </Link>
            <h1 className="mt-4 text-3xl font-bold">All Products</h1>
            <p className="mt-2 text-muted-foreground">
              Browse our selection of fresh, locally-sourced products from our vendors.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
              <Link key={product.id} to={`/products/${product.id}`}>
                <ProductCard
                  name={product.name}
                  image={product.image}
                  price={product.price}
                  vendor={product.vendor}
                  isOrganic={product.isOrganic}
                />
              </Link>
            ))}
          </div>
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
