// components/AdoptFarm.tsx
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Farm {
  id: number;
  name: string;
  location: string;
  description: string;
  farmerImg: string;
  crops: string[];
}

const AdoptFarm: React.FC = () => {
  const farms: Farm[] = [
    {
      id: 1,
      name: "Green Valley Farm",
      location: "Pune, Maharashtra",
      description: "Organic farm specializing in seasonal vegetables and herbs. Family-owned for three generations.",
      farmerImg: "/images/farmer1.jpg",
      crops: ["Tomato", "Spinach", "Carrot", "Cabbage", "Basil"]
    },
    {
      id: 2,
      name: "Sunrise Orchard",
      location: "Nashik, Maharashtra",
      description: "Family-owned orchard with fresh fruits and vegetables. Sustainable farming practices.",
      farmerImg: "/images/farmer2.jpg",
      crops: ["Mango", "Banana", "Orange", "Guava", "Pomegranate"]
    },
    {
      id: 3,
      name: "River Side Farms",
      location: "Kolhapur, Maharashtra",
      description: "Sustainable farming with traditional methods. Committed to organic practices.",
      farmerImg: "/images/farmer3.jpg",
      crops: ["Rice", "Wheat", "Sugarcane", "Turmeric", "Onion"]
    }
  ];

  return (
    <section id="adopt-farm" className="w-full py-16 md:py-24 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-foreground">
              Adopt a Farm
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
              Support local farmers and get fresh produce directly from the source
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {farms.map((farm) => (
            <Card key={farm.id} className="overflow-hidden transition-all duration-300 hover:shadow-lg">
              <div className="aspect-video overflow-hidden">
                <img
                  src={farm.farmerImg}
                  alt={farm.name}
                  className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <CardHeader className="pb-4">
                <CardTitle className="text-xl text-green-600 dark:text-green-400">
                  {farm.name}
                </CardTitle>
                <CardDescription className="flex items-center gap-2">
                  <i className="fas fa-map-marker-alt text-xs"></i>
                  {farm.location}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  {farm.description}
                </p>
                
                {/* Crop Tags */}
                <div className="flex flex-wrap gap-2">
                  {farm.crops.map((crop, index) => (
                    <Badge key={index} variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                      {crop}
                    </Badge>
                  ))}
                </div>
                
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  <i className="fas fa-seedling mr-2"></i>
                  Adopt This Farm
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdoptFarm;