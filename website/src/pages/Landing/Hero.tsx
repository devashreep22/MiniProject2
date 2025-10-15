// components/Hero.tsx
import React from 'react';
import { Button } from '@/components/ui/button';

const Hero: React.FC = () => {
  return (
    <section className="w-full py-6 md:py-4 lg:py-8 xl:py-8 bg-gradient-to-br from-green-50 to-background dark:from-green-950/20 dark:to-background">
      <div className="container mx-auto p-4 lg:px-24">
        <div className="grid gap-2 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2 items-center">
          {/* Hero Text */}
          <div className="flex flex-col justify-center space-y-10">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-foreground">
                Fresh vegetables
                <br />
                From{' '}
                <span className="text-green-600 dark:text-green-400">
                  Farm2You
                </span>
              </h1>
              <p className="max-w-[600px] text-xl text-muted-foreground md:text-xl">
                We deliver farm-fresh vegetable and fruits right to your doorstep.
              </p>
            </div>

            {/* Hero Buttons */}
            <div className="flex flex-col gap-4 min-[400px]:flex-row">
              <Button size="lg" className="h-12 px-8 text-lg bg-green-600 hover:bg-green-700">
                Order Now
              </Button>
              <Button size="lg" variant="outline" className="h-12 px-8 text-lg border-green-600 text-green-600 hover:bg-green-600 hover:text-white" asChild>
                <a href="#products">Explore</a>
              </Button>
            </div>

            {/* Features */}
            {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-8">
              <Card className="bg-background/50 backdrop-blur-sm border-green-200 dark:border-green-800">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl mb-3">🚚</div>
                  <h3 className="font-semibold text-foreground mb-2">Fast Delivery</h3>
                  <p className="text-sm text-muted-foreground">Within 30 minutes</p>
                </CardContent>
              </Card>
              <Card className="bg-background/50 backdrop-blur-sm border-green-200 dark:border-green-800">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl mb-3">🌿</div>
                  <h3 className="font-semibold text-foreground mb-2">100% Organic</h3>
                  <p className="text-sm text-muted-foreground">Grown naturally</p>
                </CardContent>
              </Card>
            </div> */}
          </div>

          {/* Hero Image */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <img
                src="/images/farm-basket.jpg"
                alt="Farm Basket"
                className="rounded-2xl shadow-2xl w-full max-w-md lg:max-w-md xl:max-w-md"
              />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-background/10 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;