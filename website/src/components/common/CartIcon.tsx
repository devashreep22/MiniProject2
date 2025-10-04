import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/context/CardContext"
import { Link } from "react-router-dom"

export function CartIcon() {
  const { itemCount } = useCart()

  return (
    <Link to="/cart">
      <Button variant="ghost" className="relative">
        <ShoppingCart className="h-5 w-5" />
        {itemCount > 0 && (
          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-green-600 text-xs font-bold text-white">
            {itemCount}
          </span>
        )}
      </Button>
    </Link>
  )
}
