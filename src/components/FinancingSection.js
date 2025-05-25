import React from 'react';
import { Link } from 'react-router-dom';

const FinancingSection = ({ isEnglish }) => {
  return (
    <section className="relative w-full py-20 overflow-hidden bg-gradient-to-b from-gray-900 to-black">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Left Column - Video */}
            <div className="relative aspect-[9/16] max-w-md mx-auto lg:mx-0 order-2 lg:order-1">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover rounded-2xl shadow-2xl"
              >
                <source src="/video-gatos2.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl"></div>
            </div>

            {/* Right Column - Content */}
            <div className="space-y-8 order-1 lg:order-2">
              <div className="text-center lg:text-left">
                <h2 className="text-4xl font-bold text-yellow-400 mb-4">
                  {isEnglish ? 'Buy Now, Pay Later!' : '¡Compra ahora y paga después!'}
                </h2>
                <p className="text-xl text-gray-200">
                  {isEnglish 
                    ? 'Now you can have your dream companion... without paying everything at once!'
                    : '¡Ahora puedes tener al compañero de tus sueños… sin pagar todo de una vez!'}
                </p>
              </div>

              {/* Combined Box */}
              <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 border border-yellow-500/20">
                <h3 className="text-2xl font-bold text-yellow-400 mb-8">
                  {isEnglish ? 'Instant Financing' : 'Financiamiento Inmediato'}
                </h3>
                
                {/* How It Works */}
                <div className="max-w-2xl mx-auto">
                  <div className="flex items-center space-x-4 mb-8">
                    <div className="flex-shrink-0 w-10 h-10 bg-yellow-500/20 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <h4 className="text-yellow-400 font-bold text-xl">
                      {isEnglish ? 'How It Works' : '¿Cómo funciona?'}
                    </h4>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <span className="flex-shrink-0 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-black font-bold mr-4">1</span>
                      <span className="text-gray-300">
                        {isEnglish 
                          ? 'Choose your new best friend in our store'
                          : 'Elige tu nuevo mejor amigo en nuestra tienda'}
                      </span>
                    </div>
                    <div className="flex items-start">
                      <span className="flex-shrink-0 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-black font-bold mr-4">2</span>
                      <span className="text-gray-300">
                        {isEnglish 
                          ? 'Select "Pay with financing" at checkout'
                          : 'Selecciona "Pagar con financiamiento" en el checkout'}
                      </span>
                    </div>
                    <div className="flex items-start">
                      <span className="flex-shrink-0 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-black font-bold mr-4">3</span>
                      <span className="text-gray-300">
                        {isEnglish 
                          ? 'Choose Affirm, Klarna, or Afterpay and get approved in seconds'
                          : 'Elige Affirm, Klarna o Afterpay y obtén aprobación en segundos'}
                      </span>
                    </div>
                    <div className="flex items-start">
                      <span className="flex-shrink-0 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-black font-bold mr-4">4</span>
                      <span className="text-gray-300">
                        {isEnglish 
                          ? 'We ship it directly to you, while you pay comfortably in installments'
                          : 'Te lo enviamos directamente, mientras tú pagas cómodamente en cuotas'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Payment Providers */}
                <div className="flex justify-center space-x-8 pt-8 mt-8 border-t border-yellow-500/20">
                  <img src="/affirm.avif" alt="Affirm" className="h-10" />
                  <img src="/klarna.png" alt="Klarna" className="h-10" />
                  <img src="/afterpay.png" alt="Afterpay" className="h-10" />
                </div>
              </div>

              <div className="text-center lg:text-left">
                <p className="text-xl text-yellow-400 font-bold mb-4">
                  {isEnglish 
                    ? 'Because if love is forever, payment can be in installments.'
                    : 'Porque si el amor es para siempre, el pago puede ser a plazos.'}
                </p>
                <Link 
                  to="/catalogo" 
                  className="inline-flex items-center bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-6 rounded-lg shadow-lg transition-all transform hover:scale-105"
                >
                  {isEnglish ? 'Find Your Companion' : 'Encuentra tu Compañero'}
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinancingSection; 