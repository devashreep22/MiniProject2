// components/OurStory.tsx
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const OurStory: React.FC = () => {
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    amount: '',
    upiId: '',
    bankName: '',
    accountNumber: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Donation submitted:', formData);
  };

  return (
    <section id="our-story" className="w-full py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Story Section */}
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center mb-16">
          <div className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-foreground text-center lg:text-left">
                Our Story
              </h2>
              <div className="space-y-4 text-muted-foreground text-lg">
                <p>
                  In a small village where fields whisper stories of generations, Farm2You began as a dream — 
                  a dream where farmers are respected, not exploited. Our founders walked miles through rural farms, 
                  learning how disconnected modern markets are from the roots that feed them.
                </p>
                <p>
                  Today, Farm2You empowers local farmers with technology and fair trade, ensuring that what reaches 
                  your plate is not only fresh, but also honest. Every tomato, mango, or beetroot carries a farmer's 
                  story — and with your support, those stories grow.
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center lg:justify-end">
            <Card className="overflow-hidden w-full max-w-md">
              <img
                src="/images/our-story.jpg"
                alt="Farmer with produce"
                className="w-full h-64 object-cover"
              />
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-2">Support Local Farmers</h3>
                <p className="text-sm text-muted-foreground">
                  Your support helps maintain traditional farming practices and ensures fair prices for our farmers.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Donation Form */}
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-green-600 dark:text-green-400">
                Support Our Farmers
              </CardTitle>
              <CardDescription>
                Your donation helps us support local farmers and maintain sustainable farming practices.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="fullname">Full Name</Label>
                    <Input
                      id="fullname"
                      name="fullname"
                      placeholder="Enter your full name"
                      value={formData.fullname}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email (Optional)</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="amount">Amount (₹)</Label>
                  <Input
                    id="amount"
                    name="amount"
                    type="number"
                    placeholder="Enter amount"
                    value={formData.amount}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="payment-method">Payment Method</Label>
                  <Select required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="upi">UPI</SelectItem>
                      <SelectItem value="netbanking">Net Banking</SelectItem>
                      <SelectItem value="card">Credit/Debit Card</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Tabs defaultValue="upi" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="upi">UPI</TabsTrigger>
                    <TabsTrigger value="netbanking">Net Banking</TabsTrigger>
                    <TabsTrigger value="card">Card</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="upi" className="space-y-4 pt-4">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground mb-4">Scan QR or enter UPI ID</p>
                      <img
                        src="/images/scanner.jpg"
                        alt="QR Code for Donation"
                        className="mx-auto w-48 h-48 rounded-lg border"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="upiId">UPI ID</Label>
                      <Input
                        id="upiId"
                        name="upiId"
                        placeholder="Enter your UPI ID"
                        value={formData.upiId}
                        onChange={handleInputChange}
                      />
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="netbanking" className="space-y-4 pt-4">
                    <div className="space-y-2">
                      <Label htmlFor="bankName">Bank Name</Label>
                      <Input
                        id="bankName"
                        name="bankName"
                        placeholder="Enter bank name"
                        value={formData.bankName}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="accountNumber">Account Number</Label>
                      <Input
                        id="accountNumber"
                        name="accountNumber"
                        placeholder="Enter account number"
                        value={formData.accountNumber}
                        onChange={handleInputChange}
                      />
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="card" className="space-y-4 pt-4">
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input
                        id="cardNumber"
                        name="cardNumber"
                        placeholder="Enter card number"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input
                          id="expiry"
                          name="expiry"
                          placeholder="MM/YY"
                          value={formData.expiry}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                          id="cvv"
                          name="cvv"
                          placeholder="CVV"
                          value={formData.cvv}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>

                <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 h-12 text-lg">
                  Donate Now
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default OurStory;