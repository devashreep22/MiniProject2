import { useEffect, useState } from "react"
import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ProductCard } from "@/components/common/ProductCard"
import { NavBar } from "@/components/common/Navbar"
import { AddToCartButton } from "@/components/common/AddToCarButton"
import { Link, useNavigate, useParams } from "react-router-dom"
import { type Product, getProductById, getRelatedProducts } from "@/lib/mock/products"

export default function ProductPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const [product, setProduct] = useState<Product | null>(null)
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])

  useEffect(() => {
    if (!id) return

    const prod = getProductById(id)
    if (!prod) {
      navigate("/products")
      return
    }

    setProduct(prod)
    setRelatedProducts(getRelatedProducts(id, 4))
  }, [id, navigate])

  if (!product) {
    return (
      <div className="flex h-screen items-center justify-center text-lg font-medium">
        Loading product details...
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <NavBar />

      <main className="flex-1 py-10">
        <div className="container">
          {/* Back Button */}
          <div className="mb-8">
            <Link to="/products">
              <Button variant="ghost" className="gap-1 pl-0">
                <ChevronLeft className="h-4 w-4" /> Back to Products
              </Button>
            </Link>
          </div>

          {/* Product Details */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Image Section */}
            <div className="aspect-square overflow-hidden rounded-lg bg-muted">
              <div
                className="h-full w-full bg-cover bg-center"
                style={{ backgroundImage: `url(${product.image})` }}
              />
            </div>

            {/* Info Section */}
            <div className="flex flex-col">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-3xl font-bold">{product.name}</h1>
                  <p className="text-lg text-muted-foreground">{product.vendor}</p>
                </div>
                {product.isOrganic && (
                  <Badge
                    variant="outline"
                    className="bg-green-50 text-green-700 hover:bg-green-100"
                  >
                    Organic
                  </Badge>
                )}
              </div>

              {/* Price */}
              <div className="mt-4">
                <p className="text-2xl font-bold text-green-600">₱{product.price}</p>
              </div>

              <Separator className="my-6" />

              {/* Description */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Description</h2>
                <p className="text-muted-foreground">{product.description}</p>
              </div>

              {/* Details */}
              <div className="mt-6 space-y-4">
                <h2 className="text-xl font-semibold">Details</h2>
                <ul className="list-inside list-disc space-y-2 text-muted-foreground">
                  {product.details.map((detail, index) => (
                    <li key={index}>{detail}</li>
                  ))}
                </ul>
              </div>

              {/* Add to Cart */}
              <div className="mt-auto pt-8">
                <AddToCartButton product={product} />
              </div>
            </div>
          </div>

          {/* Related Products */}
          <div className="mt-16">
            <h2 className="mb-6 text-2xl font-bold">You might also like</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {relatedProducts.map((related) => (
                <Link key={related.id} to={`/products/${related.id}`}>
                  <ProductCard
                    name={related.name}
                    image={related.image}
                    price={related.price}
                    vendor={related.vendor}
                    isOrganic={related.isOrganic}
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-muted/40">
        <div className="container py-6 text-center text-sm text-muted-foreground">
          <p>© 2024 Farmwise. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
