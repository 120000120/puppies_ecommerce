import React from 'react';
import { Link } from 'react-router-dom';
import { featuredDogs } from '../mock/dogs';

const Hero = () => {
  return (
    <div className="relative bg-[#080705] text-white">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
            
            <h1 className="text-4xl md:text-5xl font-bold text-yellow-400 mb-4">
              Encuentra a tu compañero perfecto
            </h1>
            <p className="text-lg text-gray-300 mb-8">
              En Best Family Puppies ofrecemos una amplia variedad de razas de perros 
              de alta calidad para que encuentres el cachorro ideal para tu familia.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/catalogo" 
                className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium py-3 px-6 rounded-lg shadow-md transition-all transform hover:scale-105 text-center"
              >
                Ver catálogo
              </Link>
              <a 
                href="https://wa.me/18099162661" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium py-2 px-4 rounded-lg transition-colors"
              >
                Contactar por WhatsApp
              </a>
            </div>
          </div>
          <div className="md:w-1/2 relative">
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
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
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" fill="#000000">
          <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,100L1360,100C1280,100,1120,100,960,100C800,100,640,100,480,100C320,100,160,100,80,100L0,100Z"></path>
        </svg>
      </div>
    </div>
  );
};

export default Hero;