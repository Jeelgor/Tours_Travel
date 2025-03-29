import React, { useState, useEffect } from 'react';

function App() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&auto=format&fit=crop&w=2021&q=80',
      title: 'Discover Paradise',
      subtitle: 'Explore breathtaking beaches and tropical destinations'
    },
    {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      title: 'Mountain Adventures',
      subtitle: 'Experience the thrill of mountain expeditions'
    },
    {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      title: 'City Escapes',
      subtitle: 'Discover vibrant cultures in amazing cities'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Hero Background Slider */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${currentSlide === index ? 'opacity-100' : 'opacity-0'
              }`}
          >
            <img
              src={slide.url}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>
        ))}
      </div>

      {/* Slider Navigation */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${currentSlide === index
                ? 'bg-white w-8'
                : 'bg-white/50 hover:bg-white/75'
              }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
            {slides[currentSlide].title}
          </h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto animate-fade-in">
            {slides[currentSlide].subtitle}
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;