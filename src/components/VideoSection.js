import React from 'react';
import { Link } from 'react-router-dom';

const VideoSection = ({ isEnglish }) => {
  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute w-full h-full object-cover"
          style={{ objectPosition: 'center' }}
        >
          <source src="/video-home.mp4" type="video/mp4" />
        </video>
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/80"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-yellow-400 mb-6 animate-fade-in">
            {isEnglish ? 'A Unique Experience' : 'Una Experiencia Única'}
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-200 mb-12 max-w-3xl mx-auto leading-relaxed animate-fade-in-delay">
            {isEnglish 
              ? 'Discover the love and joy our puppies can bring to your life. Each pet is raised with love and care, ensuring you find your perfect companion.'
              : 'Descubre el amor y la alegría que nuestros cachorros pueden traer a tu vida. Cada mascota es criada con amor y cuidado, asegurando que encuentres a tu compañero perfecto.'}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 animate-fade-in-delay-2">
            <div className="bg-black/40 backdrop-blur-sm p-6 rounded-xl border border-yellow-500/20 hover:border-yellow-500/40 transition-all duration-300">
              <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                {isEnglish ? 'Unconditional Love' : 'Amor Incondicional'}
              </h3>
              <p className="text-gray-300">
                {isEnglish 
                  ? 'Each puppy is raised with love and dedication, ensuring they are perfect for your family.'
                  : 'Cada cachorro es criado con amor y dedicación, asegurando que sean perfectos para tu familia.'}
              </p>
            </div>

            <div className="bg-black/40 backdrop-blur-sm p-6 rounded-xl border border-yellow-500/20 hover:border-yellow-500/40 transition-all duration-300">
              <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                {isEnglish ? 'Guaranteed Health' : 'Salud Garantizada'}
              </h3>
              <p className="text-gray-300">
                {isEnglish 
                  ? 'All our puppies receive complete veterinary care and are ready for their new home.'
                  : 'Todos nuestros cachorros reciben atención veterinaria completa y están listos para su nuevo hogar.'}
              </p>
            </div>

            <div className="bg-black/40 backdrop-blur-sm p-6 rounded-xl border border-yellow-500/20 hover:border-yellow-500/40 transition-all duration-300">
              <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                {isEnglish ? 'Responsible Breeding' : 'Crianza Responsable'}
              </h3>
              <p className="text-gray-300">
                {isEnglish 
                  ? 'Our puppies are raised in a family environment with the highest quality standards.'
                  : 'Nuestros cachorros son criados en un ambiente familiar con los más altos estándares de calidad.'}
              </p>
            </div>
          </div>

          <div className="flex justify-center gap-6 animate-fade-in-delay-2">
            <Link 
              to="/catalogo" 
              className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-4 px-8 rounded-lg shadow-lg transition-all transform hover:scale-105 hover:shadow-yellow-500/25 text-lg"
            >
              {isEnglish ? 'See Our Puppies' : 'Ver Nuestros Cachorros'}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection; 