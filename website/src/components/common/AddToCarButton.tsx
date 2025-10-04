import { useState } from "react"
import { ShoppingCart, Check, Minus, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/context/CardContext"
import type { Product } from "@/lib/mock/products"
import { Link } from "react-router-dom"

interface AddToCartButtonProps {
  product: Product
  showQuantity?: boolean
}

export function AddToCartButton({ product, showQuantity = true }: AddToCartButtonProps) {
  const { addItem } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

  const handleAddToCart = () => {
    addItem(product, quantity)
    setAdded(true)

    // toast({
    //   title: "Added to cart",
    //   description: `${quantity} × ${product.name} added to your cart.`,
    // })

    // Reset the added state after 2 seconds
    setTimeout(() => {
      setAdded(false)
    }, 2000)
  }

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1)
  }

  const decrementQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1))
  }

  return (
    <div className="space-y-4">
      {showQuantity && (
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium">Quantity:</span>
          <div className="flex items-center">
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-r-none"
              onClick={decrementQuantity}
              disabled={quantity <= 1}
            >
              <Minus className="h-3 w-3" />
              <span className="sr-only">Decrease quantity</span>
            </Button>
            <div className="flex h-8 w-12 items-center justify-center border-y border-input bg-background text-sm">
              {quantity}
            </div>
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-l-none"
              onClick={incrementQuantity}
            >
              <Plus className="h-3 w-3" />
              <span className="sr-only">Increase quantity</span>
            </Button>
          </div>
        </div>
      )}
      <div className="flex space-x-2">
        <Button className="flex-1 gap-2 bg-green-600 hover:bg-green-700" onClick={handleAddToCart} disabled={added}>
          {added ? (
            <>
              <Check className="h-4 w-4" /> Added to Cart
            </>
          ) : (
            <>
              <ShoppingCart className="h-4 w-4" /> Add to Cart
            </>
          )}
        </Button>
        {added && (
          <Link to="/cart">
            <Button variant="outline">View Cart</Button>
          </Link>
        )}
      </div>
    </div>
  )
}
