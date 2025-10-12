// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { LogoutButton } from "@/components/common/LogoutButton"
// import { NavBar } from "@/components/common/Navbar"
// import { Star, Gift, ShoppingBag, Clock } from "lucide-react"
// import { Link, useNavigate } from "react-router-dom"
// import { useAuth } from "@/context/AuthContext"

import Profile from "../Profile/Profile"

// export default async function DashboardPage() {
//   const {user} = useAuth();
//   const navigate = useNavigate();
//   if (!user) {
//     navigate("/login")
//   }

//   // Mock loyalty data - in a real app, this would come from a database
//   const loyaltyInfo = {
//     points: 350,
//     tier: "Silver",
//     nextTier: "Gold",
//     pointsToNextTier: 150,
//   }

//   // Mock recent orders - in a real app, this would come from a database
//   const recentOrders = [
//     {
//       id: "ORD-1234",
//       date: "May 18, 2024",
//       total: "₱1,250",
//       status: "Delivered",
//     },
//     {
//       id: "ORD-1233",
//       date: "May 10, 2024",
//       total: "₱850",
//       status: "Delivered",
//     },
//   ]

//   return (
//     <div className="flex min-h-screen flex-col">
//       <NavBar />

//       <main className="flex-1 py-10">
//         <div className="container">
//           <div className="mb-8 flex items-center justify-between">
//             <h1 className="text-3xl font-bold">Welcome, {user?.name}</h1>
//             <LogoutButton />
//           </div>

//           <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
//             <Card>
//               <CardHeader>
//                 <CardTitle>Your Profile</CardTitle>
//                 <CardDescription>Manage your account information</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div className="space-y-2">
//                   <div>
//                     <span className="font-medium">Name:</span> {user?.name}
//                   </div>
//                   <div>
//                     <span className="font-medium">Email:</span> {user?.email}
//                   </div>
//                   <div>
//                     <span className="font-medium">Role:</span> {user?.role}
//                   </div>
//                   <Button className="mt-4 bg-green-600 hover:bg-green-700">Edit Profile</Button>
//                 </div>
//               </CardContent>
//             </Card>

//             <Card className="bg-gradient-to-br from-green-50 to-white">
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2">
//                   <Star className="h-5 w-5 text-green-600" /> Loyalty Rewards
//                 </CardTitle>
//                 <CardDescription>Your current rewards status</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div className="space-y-3">
//                   <div>
//                     <div className="flex items-center justify-between">
//                       <span className="font-medium">Current Points:</span>
//                       <span className="font-bold text-green-600">{loyaltyInfo.points}</span>
//                     </div>
//                     <div className="flex items-center justify-between">
//                       <span className="font-medium">Current Tier:</span>
//                       <span className="font-medium">{loyaltyInfo.tier}</span>
//                     </div>
//                   </div>
//                   <div>
//                     <p className="text-sm text-muted-foreground">
//                       {loyaltyInfo.pointsToNextTier} more points needed to reach {loyaltyInfo.nextTier}
//                     </p>
//                     <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-muted">
//                       <div
//                         className="h-full bg-green-600"
//                         style={{
//                           width: `${
//                             loyaltyInfo.tier === "Bronze"
//                               ? (loyaltyInfo.points / 500) * 100
//                               : ((loyaltyInfo.points - 500) / 500) * 100
//                           }%`,
//                         }}
//                       ></div>
//                     </div>
//                   </div>
//                   <Link to="/loyalty">
//                     <Button className="mt-2 w-full bg-green-600 hover:bg-green-700">View Rewards</Button>
//                   </Link>
//                 </div>
//               </CardContent>
//             </Card>

//             {user?.role === "buyer" && (
//               <Card>
//                 <CardHeader>
//                   <CardTitle className="flex items-center gap-2">
//                     <ShoppingBag className="h-5 w-5 text-green-600" /> Recent Orders
//                   </CardTitle>
//                   <CardDescription>Your order history</CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   {recentOrders.length > 0 ? (
//                     <div className="space-y-3">
//                       {recentOrders.map((order) => (
//                         <div key={order.id} className="rounded-lg border p-3">
//                           <div className="flex items-center justify-between">
//                             <div>
//                               <p className="font-medium">{order.id}</p>
//                               <p className="text-sm text-muted-foreground">{order.date}</p>
//                             </div>
//                             <div className="text-right">
//                               <p className="font-medium">{order.total}</p>
//                               <p className="text-sm text-green-600">{order.status}</p>
//                             </div>
//                           </div>
//                         </div>
//                       ))}
//                       <Button variant="outline" className="mt-2 w-full">
//                         View All Orders
//                       </Button>
//                     </div>
//                   ) : (
//                     <p className="text-muted-foreground">You haven't placed any orders yet.</p>
//                   )}
//                 </CardContent>
//               </Card>
//             )}

//             {user?.role === "farmer" && (
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Your Products</CardTitle>
//                   <CardDescription>Manage your product listings</CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <p className="text-muted-foreground">You have 5 active product listings.</p>
//                   <Button className="mt-4" variant="outline">
//                     Manage Products
//                   </Button>
//                 </CardContent>
//               </Card>
//             )}

//             {user?.role === "admin" && (
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Admin Panel</CardTitle>
//                   <CardDescription>Manage the marketplace</CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <p className="text-muted-foreground">You have full administrative access.</p>
//                   <Button className="mt-4" variant="outline">
//                     Admin Dashboard
//                   </Button>
//                 </CardContent>
//               </Card>
//             )}

//             <Card>
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2">
//                   <Gift className="h-5 w-5 text-green-600" /> Available Rewards
//                 </CardTitle>
//                 <CardDescription>Rewards you can redeem now</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div className="space-y-3">
//                   <div className="rounded-lg border p-3">
//                     <div className="flex justify-between">
//                       <p className="font-medium">₱100 Discount</p>
//                       <p className="font-medium text-green-600">200 pts</p>
//                     </div>
//                     <Button variant="outline" size="sm" className="mt-2 w-full">
//                       Redeem
//                     </Button>
//                   </div>
//                   <div className="rounded-lg border p-3">
//                     <div className="flex justify-between">
//                       <p className="font-medium">Free Organic Eggs</p>
//                       <p className="font-medium text-green-600">150 pts</p>
//                     </div>
//                     <Button variant="outline" size="sm" className="mt-2 w-full">
//                       Redeem
//                     </Button>
//                   </div>
//                   <Link to="/loyalty">
//                     <Button variant="ghost" size="sm" className="mt-2 w-full">
//                       View All Rewards
//                     </Button>
//                   </Link>
//                 </div>
//               </CardContent>
//             </Card>

//             <Card>
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2">
//                   <Clock className="h-5 w-5 text-green-600" /> Upcoming Markets
//                 </CardTitle>
//                 <CardDescription>View the schedule for upcoming markets</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div className="space-y-2">
//                   <div className="rounded-md bg-muted p-2">
//                     <p className="font-medium">Saturday, May 25, 2024</p>
//                     <p className="text-sm text-muted-foreground">8:00 AM - 1:00 PM</p>
//                     <p className="mt-1 text-xs text-green-600">Special Event: Double Points Weekend!</p>
//                   </div>
//                   <div className="rounded-md bg-muted p-2">
//                     <p className="font-medium">Sunday, May 26, 2024</p>
//                     <p className="text-sm text-muted-foreground">9:00 AM - 2:00 PM</p>
//                     <p className="mt-1 text-xs text-green-600">Special Event: Double Points Weekend!</p>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </main>

//       <footer className="border-t bg-muted/40">
//         <div className="container py-6 text-center text-sm text-muted-foreground">
//           <p>© 2024 Farmwise. All rights reserved.</p>
//         </div>
//       </footer>
//     </div>
//   )
// }




function Buyer() {
  return (
    <Profile />
  )
}

export default Buyer