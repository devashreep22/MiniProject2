import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface ProductCardProps {
  name: string
  image: string
  price: string
  vendor: string
  isOrganic?: boolean
}

export function ProductCard({ name, image, price, vendor, isOrganic = true }: ProductCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="relative aspect-square overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${image})` }} />
      </div>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-medium">{name}</h3>
            <p className="text-sm text-muted-foreground">{vendor}</p>
          </div>
          {isOrganic && (
            <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-100">
              Organic
            </Badge>
          )}
        </div>
        <p className="mt-2 font-medium text-green-600">₱{price}</p>
      </CardContent>
    </Card>
  )
}
