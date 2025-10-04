import { Check, ChevronRight, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { NavBar } from "@/components/common/Navbar"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "@/context/AuthContext"

interface OrderConfirmationPageProps {
  params: {
    id: string
  }
}

export default async function OrderConfirmationPage({ params }: OrderConfirmationPageProps) {
  const { user } = useAuth();
  const navigate = useNavigate()

  // Redirect to login if user is not logged in
  if (!user) {
    navigate("/login")
  }

  // In a real app, we would fetch the order details from the database
  // For this demo, we'll use mock data
  const order = {
    id: params.id,
    status: "processing",
    createdAt: new Date().toISOString(),
    total: 1250,
    estimatedDelivery: "May 28 - May 30, 2024",
  }

  return (
    <div className="flex min-h-screen flex-col">
      <NavBar />

      <main className="flex-1 py-10">
        <div className="container max-w-3xl">
          <div className="mb-12 text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
              <Check className="h-10 w-10 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold">Order Confirmed!</h1>
            <p className="mt-2 text-muted-foreground">
              Thank you for your purchase. Your order has been received and is being processed.
            </p>
          </div>

          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold">Order Details</h2>
                  <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <p className="text-sm text-muted-foreground">Order Number</p>
                      <p className="font-medium">{order.id}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Order Date</p>
                      <p className="font-medium">
                        {new Date(order.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Order Status</p>
                      <p className="font-medium capitalize">{order.status}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Amount</p>
                      <p className="font-medium">₱{order.total.toFixed(2)}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-semibold">Delivery Information</h2>
                  <div className="mt-4">
                    <p className="text-sm text-muted-foreground">Estimated Delivery</p>
                    <p className="font-medium">{order.estimatedDelivery}</p>
                    <p className="mt-4 text-sm text-muted-foreground">
                      You will receive an email with tracking information once your order ships.
                    </p>
                  </div>
                </div>

                <div className="rounded-md bg-green-50 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <ShoppingBag className="h-5 w-5 text-green-600" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-green-800">Loyalty Points Earned</h3>
                      <div className="mt-2 text-sm text-green-700">
                        <p>
                          You've earned {Math.floor(order.total / 50)} points from this purchase! Points will be added
                          to your account once your order is delivered.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <p className="text-muted-foreground">Have questions about your order? Contact our customer support team.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/dashboard">
                <Button variant="outline">View Your Orders</Button>
              </Link>
              <Link to="/products">
                <Button className="gap-1 bg-green-600 hover:bg-green-700">
                  Continue Shopping <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
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
