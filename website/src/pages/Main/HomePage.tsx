import { ChevronRight, MapPin, Calendar, Clock, Phone, Mail, Star, Gift, Percent } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ProductCard } from "@/components/common/ProductCard"
import { VendorCard } from "@/components/common/VendorCard"
import { ContactForm } from "@/components/common/ContactForm"
import { Newsletter } from "@/components/common/NewsLetter"
import { NavBar } from "@/components/common/Navbar"
import { products } from "@/lib/mock/products"
import { Link } from "react-router-dom"

export default function Home() {
  // Get the first 4 products for the featured section
  const featuredProducts = products.slice(0, 4)

  return (
    <div className="flex min-h-screen flex-col">
      {/* Navigation */}
      <NavBar />

      <main className="flex-1 px-6">
        {/* Hero Section */}
        <section className="relative">
          <div className="absolute inset-0 bg-black/40 z-10" />
          <div className="h-[600px] bg-cover bg-center" style={{ backgroundImage: "url('/images/hero.jpg')" }} />
          <div className="container absolute inset-0 z-20 flex flex-col items-center justify-center text-center text-white">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Fresh From Our Farms <br /> To Your Table
            </h1>
            <p className="mt-6 max-w-lg text-lg">
              Experience the freshest local produce, artisanal goods, and community spirit at Farmwise.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-green-600 hover:bg-green-700">
                Find Our Location
              </Button>
              <Link to="/register">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Sign Up Now
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section id="products" className="py-20 bg-green-50">
          <div className="container">
            <div className="flex flex-col items-center text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Seasonal Highlights</h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
                Discover what's fresh and in season at our market this week. All produce is locally grown and harvested
                at peak ripeness.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {featuredProducts.map((product) => (
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
            <div className="mt-12 text-center">
              <Link to="/products">
                <Button variant="outline" className="gap-1">
                  View All Products <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20">
          <div className="container">
            <div className="grid grid-cols-1 gap-12 md:grid-cols-2 items-center">
              <div>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Our Story</h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  Our story began when we had the subject entrepreneurial mind and were given a chance to think about a
                  business venture and realized the need for our farmers to have a helping hand pertaining to finding
                  buyers of their product through a new type of middleman that's not expensive.
                </p>
                <p className="mt-4 text-lg text-muted-foreground">
                  What started as a small initiative has grown into a vibrant marketplace connecting over 40 local
                  Bukidnon farmers directly with consumers, eliminating costly intermediaries while ensuring farmers
                  receive fair prices for their hard work.
                </p>
                <div className="mt-8 flex gap-4">
                  <Button className="bg-green-600 hover:bg-green-700">Learn More</Button>
                  <Button variant="outline">Our Values</Button>
                </div>
              </div>
              <div className="relative h-[400px] rounded-lg overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: "url('/images/about.jpg')" }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Loyalty Program Section */}
        <section className="py-20 bg-green-50">
          <div className="container">
            <div className="flex flex-col items-center text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Loyalty Rewards Program</h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
                Join our loyalty program and earn rewards every time you shop at Farmwise.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <Card className="bg-white">
                <CardContent className="flex flex-col items-center p-6 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600">
                    <Star className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 text-xl font-bold">Earn Points</h3>
                  <p className="mt-2 text-muted-foreground">
                    Earn 1 point for every ₱50 spent at our market. Points are automatically added to your account after
                    each purchase.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white">
                <CardContent className="flex flex-col items-center p-6 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600">
                    <Gift className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 text-xl font-bold">Redeem Rewards</h3>
                  <p className="mt-2 text-muted-foreground">
                    Use your points to get discounts, free products, or exclusive offers. Redeem at checkout or through
                    your account.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white">
                <CardContent className="flex flex-col items-center p-6 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600">
                    <Percent className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 text-xl font-bold">Exclusive Benefits</h3>
                  <p className="mt-2 text-muted-foreground">
                    Enjoy member-only promotions, early access to seasonal products, and special event invitations as
                    you move up tiers.
                  </p>
                </CardContent>
              </Card>
            </div>
            <div className="mt-12 text-center">
              <Link to="/register">
                <Button className="bg-green-600 hover:bg-green-700">Join Now</Button>
              </Link>
              <Link to="/loyalty">
                <Button variant="outline" className="ml-4">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Featured Vendors */}
        <section id="vendors" className="py-20 bg-amber-50">
          <div className="container">
            <div className="flex flex-col items-center text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Meet Our Vendors</h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
                Our market is home to passionate local farmers, bakers, and artisans who bring their best products
                directly to you.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <VendorCard
                name="Sunshine Farms"
                image="/images/vendor1.jpg"
                description="Family-owned organic farm specializing in berries and stone fruits."
                products={["Strawberries", "Blueberries", "Peaches"]}
              />
              <VendorCard
                name="Artisan Bakery"
                image="/images/vendor2.jpg"
                description="Traditional sourdough breads and pastries baked fresh daily."
                products={["Sourdough", "Baguettes", "Croissants"]}
              />
              <VendorCard
                name="Green Thumb Gardens"
                image="/images/vendor3.jpg"
                description="Heirloom vegetables grown using sustainable farming practices."
                products={["Tomatoes", "Peppers", "Leafy Greens"]}
              />
            </div>
            <div className="mt-12 text-center">
              <Button variant="outline" className="gap-1">
                View All Vendors <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>

        {/* Schedule & Location */}
        <section id="schedule" className="py-20">
          <div className="container">
            <div className="flex flex-col items-center text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Visit Us</h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
                Join us at the CMU Farmers Market and experience the best local produce our community has to offer.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <Card className="overflow-hidden">
                <div
                  className="h-[200px] bg-cover bg-center"
                  style={{ backgroundImage: "url('/images/cmu-location.png')" }}
                />
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold mb-4">Location</h3>
                  <div className="flex items-start gap-3 mb-3">
                    <MapPin className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-medium">Central Mindanao University</p>
                      <p className="text-muted-foreground">Musuan Town, Maramag, Bukidnon, Philippines</p>
                    </div>
                  </div>
                  <p className="mt-4 text-muted-foreground">
                    Plenty of free parking available. Accessible by jeepneys and buses from Maramag and Valencia City.
                  </p>
                  <Button className="mt-6 bg-green-600 hover:bg-green-700">Get Directions</Button>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold mb-4">Market Hours</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Calendar className="h-5 w-5 text-green-600 mt-0.5" />
                      <div>
                        <p className="font-medium">Days of Operation</p>
                        <p className="text-muted-foreground">Every Saturday & Sunday, Year-round</p>
                        <p className="text-muted-foreground">Wednesday evenings (June - September)</p>
                      </div>
                    </div>
                    <Separator />
                    <div className="flex items-start gap-3">
                      <Clock className="h-5 w-5 text-green-600 mt-0.5" />
                      <div>
                        <p className="font-medium">Hours</p>
                        <p className="text-muted-foreground">Saturday: 8:00 AM - 1:00 PM</p>
                        <p className="text-muted-foreground">Sunday: 9:00 AM - 2:00 PM</p>
                        <p className="text-muted-foreground">Wednesday: 4:00 PM - 8:00 PM (Summer only)</p>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" className="mt-6">
                    View Calendar
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Contact & Newsletter */}
        <section id="contact" className="py-20 bg-green-50">
          <div className="container">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
              <div>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Contact Us</h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  Have questions about the market? Want to become a vendor? We'd love to hear from you!
                </p>
                <div className="mt-8 space-y-4">
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-green-600" />
                    <p>(555) 123-4567</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-green-600" />
                    <p>info@cmufarmersmarket.com</p>
                  </div>
                </div>
                <ContactForm />
              </div>
              <div>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Stay Updated</h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  Subscribe to our newsletter to receive weekly updates on featured vendors, seasonal produce, and
                  special events.
                </p>
                <Newsletter />
                <div className="mt-8 rounded-lg overflow-hidden">
                  <div
                    className="h-[300px] bg-cover bg-center"
                    style={{ backgroundImage: "url('/images/newsletter.jpg')" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-muted/40">
        <div className="container py-10">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
            <div>
              <h3 className="text-lg font-semibold">Farmwise</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Bringing fresh, local produce to the Bukidnon community since 2010.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Quick Links</h3>
              <ul className="mt-2 space-y-2 text-sm">
                <li>
                  <Link to="#products" className="text-muted-foreground hover:text-green-600">
                    Products
                  </Link>
                </li>
                <li>
                  <Link to="#vendors" className="text-muted-foreground hover:text-green-600">
                    Vendors
                  </Link>
                </li>
                <li>
                  <Link to="#schedule" className="text-muted-foreground hover:text-green-600">
                    Schedule
                  </Link>
                </li>
                <li>
                  <Link to="#contact" className="text-muted-foreground hover:text-green-600">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Resources</h3>
              <ul className="mt-2 space-y-2 text-sm">
                <li>
                  <Link to="#" className="text-muted-foreground hover:text-green-600">
                    Vendor Application
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-muted-foreground hover:text-green-600">
                    Market Guidelines
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-muted-foreground hover:text-green-600">
                    Seasonal Calendar
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-muted-foreground hover:text-green-600">
                    Community Programs
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Follow Us</h3>
              <ul className="mt-2 space-y-2 text-sm">
                <li>
                  <Link to="#" className="text-muted-foreground hover:text-green-600">
                    Instagram
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-muted-foreground hover:text-green-600">
                    Facebook
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-muted-foreground hover:text-green-600">
                    Twitter
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-10 border-t pt-6 text-center text-sm text-muted-foreground">
            <p>© 2024 Farmwise. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
