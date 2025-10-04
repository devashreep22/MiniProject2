import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface VendorCardProps {
  name: string
  image: string
  description: string
  products: string[]
}

export function VendorCard({ name, image, description, products }: VendorCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="relative h-48 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${image})` }} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 p-4">
          <h3 className="text-xl font-bold text-white">{name}</h3>
        </div>
      </div>
      <CardContent className="p-4">
        <p className="text-sm text-muted-foreground">{description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {products.map((product) => (
            <Badge key={product} variant="secondary" className="bg-amber-50 text-amber-700 hover:bg-amber-100">
              {product}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
