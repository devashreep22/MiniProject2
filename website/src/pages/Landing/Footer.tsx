// components/Footer.tsx
import React from 'react';
import { Button } from '@/components/ui/button';

const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t bg-green-600 text-white py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* About */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white">Farm2You</h3>
            <p className="text-muted-white leading-relaxed max-w-md">
              Connecting farmers directly to customers with fresh, organic produce delivered to your doorstep.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Quick Links</h4>
            <ul className="space-y-3">
              {['Home', 'Shop', 'Adopt Farm', 'Contact us'].map((item) => (
                <li key={item}>
                  <a
                    href={item === 'Contact us' ? 'contact.html' : '#'}
                    className="text-muted-white hover:text-white transition-colors duration-200"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Follow Us</h4>
            <div className="flex gap-4">
              {['facebook-f', 'instagram', 'twitter', 'whatsapp'].map((platform) => (
                <Button
                  key={platform}
                  variant="outline"
                  size="icon"
                  className="rounded-full w-10 h-10"
                  asChild
                >
                  <a href="#" className="text-muted-white hover:text-white">
                    <i className={`fab fa-${platform}`} />
                  </a>
                </Button>
              ))}
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-white">
                📧 contact@farm2you.com
              </p>
              <p className="text-sm text-muted-white">
                📞 +91 98765 43210
              </p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t mt-8 pt-8 text-center">
          <p className="text-muted-white text-sm">
            &copy; 2025 Farm2You. All rights reserved. | Made with ❤️ for farmers
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;