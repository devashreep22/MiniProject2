// components/Reviews.tsx
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

interface Review {
  id: number;
  message: string;
  name: string;
  location: string;
  rating: number;
}

const Reviews: React.FC = () => {
  const reviews: Review[] = [
    {
      id: 1,
      message: "Amazing service! Highly recommended. The vegetables are always fresh and delivery is super fast.",
      name: "Aarav Mehta",
      location: "Mumbai",
      rating: 5
    },
    {
      id: 2,
      message: "Fresh vegetables delivered on time. Love the quality and variety available.",
      name: "Neha Sharma",
      location: "Delhi",
      rating: 4
    },
    {
      id: 3,
      message: "Very helpful and responsive team. The organic produce is exceptional quality.",
      name: "Rahul Verma",
      location: "Pune",
      rating: 5
    },
    {
      id: 4,
      message: "Reasonable pricing and good variety. My go-to for weekly groceries.",
      name: "Priya Nair",
      location: "Chennai",
      rating: 4
    },
    {
      id: 5,
      message: "Highly professional delivery staff. Packaging is always perfect.",
      name: "Ankit Joshi",
      location: "Bangalore",
      rating: 5
    },
    {
      id: 6,
      message: "Excellent packaging and fresh items. Love supporting local farmers through this platform.",
      name: "Sneha Desai",
      location: "Ahmedabad",
      rating: 5
    },
    {
      id: 7,
      message: "Love the platform! Super easy to use and the quality is consistently great.",
      name: "Rohan Kapoor",
      location: "Hyderabad",
      rating: 4
    }
  ];

  const renderStars = (rating: number) => {
    return '⭐'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  return (
    <section className="w-full py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-foreground">
              What People Say
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
              Hear from our satisfied customers about their Farm2You experience
            </p>
          </div>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-7xl mx-auto"
        >
          <CarouselContent className="-ml-4">
            {reviews.map((review) => (
              <CarouselItem key={review.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                <Card className="h-full bg-background/50 backdrop-blur-sm border-green-200 dark:border-green-800 hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="flex-1 space-y-4">
                      <p className="text-muted-foreground italic text-lg">
                        "{review.message}"
                      </p>
                      
                      <div className="space-y-3">
                        <div>
                          <h4 className="font-semibold text-foreground text-lg">
                            {review.name}
                          </h4>
                          <p className="text-sm text-muted-foreground flex items-center gap-2">
                            <i className="fas fa-map-marker-alt text-xs"></i>
                            {review.location}
                          </p>
                        </div>
                        
                        <div className="text-yellow-400 text-lg">
                          {renderStars(review.rating)}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center gap-4 mt-8">
            <CarouselPrevious className="static translate-y-0" />
            <CarouselNext className="static translate-y-0" />
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default Reviews;