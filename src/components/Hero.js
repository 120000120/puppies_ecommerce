import React from 'react';
import { Link } from 'react-router-dom';
import { featuredDogs } from '../mock/dogs';

const Hero = ({ title, subtitle, buttonText }) => {
  return (
    <div className="relative bg-black text-white min-h-screen flex items-center">
      <div className="container mx-auto px-4 py-16 md:py-24 w-full">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
            
            <h1 className="text-4xl md:text-5xl font-bold text-yellow-400 mb-4">
              {title}
            </h1>
            <p className="text-lg text-gray-300 mb-8">
              {subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/catalogo" 
                className="bg-white hover:bg-yellow-500 text-black font-medium py-3 px-6 rounded-lg shadow-md transition-all transform hover:scale-105 text-center"
              >
                {buttonText}
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 relative">
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-xl transform scale-110">
              <img
                src="/banner.jpg"
                alt="Banner de mascotas"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" fill="#111827">
          <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,100L1360,100C1280,100,1120,100,960,100C800,100,640,100,480,100C320,100,160,100,80,100L0,100Z"></path>
        </svg>
      </div>
    </div>
  );
};

export default Hero;