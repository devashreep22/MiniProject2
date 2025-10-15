// components/Products.tsx
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Products: React.FC = () => {
  const categories = [
    {
      name: 'Leafy',
      image: '/images/leafy.jpg',
      href: 'leafy.html'
    },
    {
      name: 'Root',
      image: '/images/root.jpg',
      href: 'root.html'
    },
    {
      name: 'Fruits',
      image: '/images/fruit.jpg',
      href: 'fruit.html'
    },
    {
      name: 'All',
      image: '/images/all.jpg',
      href: 'all.html'
    }
  ];

  return (
    <section id="products" className="w-full py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-foreground">
              Our Products
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Discover fresh, organic produce from local farms
            </p>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="mx-auto grid max-w-5xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 py-12">
          {categories.map((category, index) => (
            <Card key={index} className="group overflow-hidden transition-all duration-300 hover:shadow-lg">
              <CardContent className="p-0">
                <Button variant="ghost" className="w-full h-auto p-0" asChild>
                  <a href={category.href}>
                    <div className="flex flex-col items-center text-center">
                      <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-background group-hover:border-green-500 transition-colors duration-300">
                        <img
                          src={category.image}
                          alt={category.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-lg text-foreground group-hover:text-green-600 transition-colors duration-300">
                          {category.name}
                        </h3>
                      </div>
                    </div>
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;