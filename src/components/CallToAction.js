import React from 'react';
import { Link } from 'react-router-dom';

const CallToAction = ({ isEnglish }) => {
  return (
    <section className="py-16 bg-gradient-to-br from-yellow-500 via-yellow-600 to-black relative overflow-hidden">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8 flex justify-center">
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-full shadow-xl border border-yellow-400/20">
              <img 
                src="/imagen.png" 
                alt="Best Family Puppies Logo" 
                className="h-40 w-40 object-contain"
              />
            </div>
          </div>
          <h2 className="text-4xl font-bold text-white mb-6">
            {isEnglish ? 'Find Your Perfect Companion' : 'Encuentra a tu compañero perfecto'}
          </h2>
          <p className="text-xl text-white/90 mb-8">
            {isEnglish 
              ? 'Discover our selection of purebred puppies, raised with love and care.'
              : 'Descubre nuestra selección de cachorros de raza pura, criados con amor y cuidado.'}
          </p>
          <Link 
            to="/catalogo" 
            className="inline-flex items-center bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-4 px-8 rounded-lg shadow-lg transition-all transform hover:scale-105"
          >
            {isEnglish ? 'See Puppies' : 'Ver Cachorros'}
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CallToAction; 