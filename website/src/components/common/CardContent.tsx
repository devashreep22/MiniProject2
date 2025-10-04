import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/context/CardContext"
import { Link, useNavigate } from "react-router-dom"

export function CartContents() {
  const { items, removeItem, updateQuantity, subtotal, clearCart } = useCart()
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate("/checkout")
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-muted">
          <ShoppingBag className="h-12 w-12 text-muted-foreground" />
        </div>
        <h2 className="mt-6 text-2xl font-semibold">Your cart is empty</h2>
        <p className="mt-2 text-muted-foreground">Looks like you haven't added any products to your cart yet.</p>
        <Link to="/products">
          <Button className="mt-8 bg-green-600 hover:bg-green-700">Browse Products</Button>
        </Link>
      </div>
    )
  }

  // Calculate shipping cost (free for orders over ₱1000)
  const shippingCost = subtotal >= 1000 ? 0 : 100

  // Calculate total
  const total = subtotal + shippingCost

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <div className="rounded-lg border">
          <div className="p-6">
            <h2 className="text-xl font-semibold">Items in Your Cart</h2>
            <p className="text-sm text-muted-foreground">Review and modify your items before checkout</p>
          </div>
          <Separator />
          <ul className="divide-y">
            {items.map((item) => (
              <li key={item.id} className="p-6">
                <div className="flex items-start gap-4">
                  <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border">
                    <div
                      className="h-full w-full bg-cover bg-center"
                      style={{ backgroundImage: `url(${item.image})` }}
                    />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="text-base font-medium">
                          <Link to={`/products/${item.id}`} className="hover:text-green-600">
                            {item.name}
                          </Link>
                        </h3>
                        <p className="mt-1 text-sm text-muted-foreground">{item.vendor}</p>
                        <p className="mt-1 text-sm font-medium text-green-600">₱{item.price}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">
                          ₱{Number.parseInt(item.price.split("/")[0]) * item.quantity}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center">
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 rounded-r-none"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                          <span className="sr-only">Decrease quantity</span>
                        </Button>
                        <div className="flex h-8 w-12 items-center justify-center border-y border-input bg-background text-sm">
                          {item.quantity}
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 rounded-l-none"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                          <span className="sr-only">Increase quantity</span>
                        </Button>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-muted-foreground hover:text-destructive"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Remove item</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <Separator />
          <div className="flex justify-between p-6">
            <Button variant="outline" onClick={clearCart}>
              Clear Cart
            </Button>
            <Link to="/products">
              <Button variant="ghost">Continue Shopping</Button>
            </Link>
          </div>
        </div>
      </div>
      <div>
        <div className="rounded-lg border">
          <div className="p-6">
            <h2 className="text-xl font-semibold">Order Summary</h2>
            <p className="text-sm text-muted-foreground">Review your order details before checkout</p>
          </div>
          <Separator />
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex justify-between">
                <p className="text-muted-foreground">Subtotal</p>
                <p className="font-medium">₱{subtotal.toFixed(2)}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-muted-foreground">Shipping</p>
                <p className="font-medium">{shippingCost === 0 ? "Free" : `₱${shippingCost.toFixed(2)}`}</p>
              </div>
              {shippingCost === 0 && (
                <div className="rounded-md bg-green-50 p-2 text-center text-sm text-green-600">
                  You've qualified for free shipping!
                </div>
              )}
              <Separator />
              <div className="flex justify-between">
                <p className="font-medium">Total</p>
                <p className="text-xl font-bold">₱{total.toFixed(2)}</p>
              </div>
              <Button className="mt-4 w-full bg-green-600 hover:bg-green-700" onClick={handleCheckout}>
                Proceed to Checkout
              </Button>
              <div className="mt-4 text-center text-xs text-muted-foreground">
                By proceeding to checkout, you agree to our{" "}
                <Link to="#" className="text-green-600 hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link to="#" className="text-green-600 hover:underline">
                  Privacy Policy
                </Link>
                .
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
