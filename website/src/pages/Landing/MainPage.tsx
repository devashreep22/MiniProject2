import React, { useState, useEffect } from 'react';
import Header from './Header';
import Hero from './Hero';
import Products from './Products';
import AdoptFarm from './AdoptFarm';
import OurStory from './OurStory';
import Reviews from './Reviews';
import Footer from './Footer';
import CalendarPopup from './CalendarPopup';

function MainPage() {
  const [darkMode, setDarkMode] = useState(() => {
    // Check localStorage first, then system preference
    const saved = localStorage.getItem('darkMode');
    if (saved !== null) {
      return JSON.parse(saved);
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const [showCalendar, setShowCalendar] = useState(false);

  useEffect(() => {
    // Apply dark mode class to document
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    // Save to localStorage
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <Header 
        darkMode={darkMode} 
        setDarkMode={setDarkMode}
        onCalendarToggle={() => setShowCalendar(!showCalendar)}
      />
      
      <main className="relative">
        <Hero />
        <Products />
        <AdoptFarm />
        <OurStory />
        <Reviews />
      </main>

      <Footer />
    </div>
  );
}

export default MainPage;