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
                href="https://wa.me/5543431170" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg shadow-md transition-all transform hover:scale-105 flex items-center justify-center"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Contáctanos
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