import { ChevronLeft, Gift, Percent, ShoppingBag, Calendar, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { NavBar } from "@/components/common/Navbar"
import { LoyaltyCard } from "@/components/common/LoyaltyCard"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "@/context/AuthContext"

export default async function LoyaltyPage() {
  const { user } = useAuth();
  const navigate = useNavigate()
  // If user is not logged in, redirect to login page
  if (!user) {
    navigate("/login?redirect=/loyalty")
  }

  // In a real app, we would fetch the user's loyalty information from the database
  // For this demo, we'll create mock data
  const loyaltyInfo = {
    memberSince: "May 2024",
    points: 350,
    tier: "Silver",
    nextTier: "Gold",
    pointsToNextTier: 150,
    cardNumber: "FW" + user?.id?.padStart(8, "0"),
  }

  return (
    <div className="flex min-h-screen flex-col">
      <NavBar />

      <main className="flex-1 py-10">
        <div className="container">
          <div className="mb-8">
            <Link to="/dashboard">
              <Button variant="ghost" className="gap-1 pl-0">
                <ChevronLeft className="h-4 w-4" /> Back to Dashboard
              </Button>
            </Link>
            <h1 className="mt-4 text-3xl font-bold">Loyalty Rewards Program</h1>
            <p className="mt-2 text-muted-foreground">
              Earn points with every purchase and enjoy exclusive benefits as a loyal customer.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="mb-8">
                {/* <LoyaltyCard loyaltyInfo={loyaltyInfo} /> */}
              </div>

              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold">How It Works</h2>
                  <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="flex items-center gap-2">
                          <ShoppingBag className="h-5 w-5 text-green-600" /> Earn Points
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          Earn 1 point for every ₱50 spent at Farmwise. Points are automatically added to your account
                          after each purchase.
                        </p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="flex items-center gap-2">
                          <Gift className="h-5 w-5 text-green-600" /> Redeem Rewards
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          Use your points to get discounts, free products, or exclusive offers. Redeem at checkout or
                          through your account.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold">Membership Tiers</h2>
                  <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="flex items-center gap-2">
                          <Star className="h-5 w-5 text-amber-400" /> Bronze
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">0-499 points</p>
                        <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                          <li>• 5% discount on selected items</li>
                          <li>• Birthday special offer</li>
                        </ul>
                      </CardContent>
                    </Card>
                    <Card className="border-green-200 bg-green-50">
                      <CardHeader className="pb-2">
                        <CardTitle className="flex items-center gap-2">
                          <Star className="h-5 w-5 text-slate-400" /> Silver
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">500-999 points</p>
                        <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                          <li>• 10% discount on selected items</li>
                          <li>• Early access to seasonal products</li>
                          <li>• Birthday special offer</li>
                        </ul>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="flex items-center gap-2">
                          <Star className="h-5 w-5 text-yellow-500" /> Gold
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">1000+ points</p>
                        <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                          <li>• 15% discount on selected items</li>
                          <li>• Free delivery on orders over ₱1000</li>
                          <li>• Exclusive event invitations</li>
                          <li>• Birthday special offer</li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold">Current Promotions</h2>
                  <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="flex items-center gap-2">
                          <Calendar className="h-5 w-5 text-green-600" /> Double Points Weekend
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          Earn double points on all purchases this weekend (May 25-26). A great opportunity to boost
                          your loyalty tier!
                        </p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="flex items-center gap-2">
                          <Percent className="h-5 w-5 text-green-600" /> Refer a Friend
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          Refer a friend and both of you get 100 bonus points when they make their first purchase of
                          ₱500 or more.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Your Rewards Summary</CardTitle>
                  <CardDescription>Current status and available rewards</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-medium">Current Points</p>
                    <p className="text-3xl font-bold text-green-600">{loyaltyInfo.points}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Current Tier</p>
                    <div className="flex items-center gap-2">
                      <Star
                        className={`h-5 w-5 ${
                          loyaltyInfo.tier === "Bronze"
                            ? "text-amber-400"
                            : loyaltyInfo.tier === "Silver"
                              ? "text-slate-400"
                              : "text-yellow-500"
                        }`}
                      />
                      <p className="font-medium">{loyaltyInfo.tier}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Next Tier</p>
                    <div className="flex items-center gap-2">
                      <Star
                        className={`h-5 w-5 ${
                          loyaltyInfo.nextTier === "Bronze"
                            ? "text-amber-400"
                            : loyaltyInfo.nextTier === "Silver"
                              ? "text-slate-400"
                              : "text-yellow-500"
                        }`}
                      />
                      <p className="font-medium">{loyaltyInfo.nextTier}</p>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {loyaltyInfo.pointsToNextTier} more points needed to reach {loyaltyInfo.nextTier}
                    </p>
                    <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full bg-green-600"
                        style={{
                          width: `${
                            loyaltyInfo.tier === "Bronze"
                              ? (loyaltyInfo.points / 500) * 100
                              : ((loyaltyInfo.points - 500) / 500) * 100
                          }%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                  <Button className="w-full bg-green-600 hover:bg-green-700">Redeem Points</Button>
                  <Button variant="outline" className="w-full">
                    View Transaction History
                  </Button>
                </CardFooter>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Available Rewards</CardTitle>
                  <CardDescription>Rewards you can redeem now</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="rounded-lg border p-3">
                    <div className="flex justify-between">
                      <p className="font-medium">₱100 Discount</p>
                      <p className="font-medium text-green-600">200 pts</p>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Redeem 200 points for a ₱100 discount on your next purchase
                    </p>
                    <Button variant="outline" size="sm" className="mt-2 w-full">
                      Redeem
                    </Button>
                  </div>
                  <div className="rounded-lg border p-3">
                    <div className="flex justify-between">
                      <p className="font-medium">Free Organic Eggs</p>
                      <p className="font-medium text-green-600">150 pts</p>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Redeem 150 points for a free dozen of organic eggs
                    </p>
                    <Button variant="outline" size="sm" className="mt-2 w-full">
                      Redeem
                    </Button>
                  </div>
                  <div className="rounded-lg border p-3">
                    <div className="flex justify-between">
                      <p className="font-medium">Exclusive Tote Bag</p>
                      <p className="font-medium text-green-600">300 pts</p>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Redeem 300 points for a limited edition CMU Farmers Market tote bag
                    </p>
                    <Button variant="outline" size="sm" className="mt-2 w-full">
                      Redeem
                    </Button>
                  </div>
                </CardContent>
              </Card>
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
