import React from 'react';
import { Link } from 'react-router-dom';
import { featuredDogs } from '../mock/dogs';

const Hero = ({ title, subtitle, buttonText }) => {
  return (
    <div className="relative bg-black text-white min-h-screen flex items-center">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute min-w-full min-h-full object-cover"
        >
          <source src="/video-hero.mp4" type="video/mp4" />
        </video>
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>
      </div>

      <div className="container mx-auto px-4 py-16 md:py-24 w-full relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <img 
              src="/imagen.png" 
              alt="Best Family Puppies Logo" 
              className="h-32 w-32 mx-auto mb-8 animate-float"
            />
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-yellow-400 mb-6 leading-tight animate-fade-in">
            {title}
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-200 mb-12 max-w-3xl mx-auto leading-relaxed animate-fade-in-delay">
            {subtitle}
          </p>
          
          <div className="flex justify-center gap-6 animate-fade-in-delay-2">
            <Link 
              to="/catalogo" 
              className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-4 px-8 rounded-lg shadow-lg transition-all transform hover:scale-105 hover:shadow-yellow-500/25 text-lg"
            >
              {buttonText}
            </Link>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" fill="black">
          <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,100L1360,100C1280,100,1120,100,960,100C800,100,640,100,480,100C320,100,160,100,80,100L0,100Z"></path>
        </svg>
      </div>
    </div>
  );
};

export default Hero;