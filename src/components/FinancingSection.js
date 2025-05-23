import React from 'react';
import { Link } from 'react-router-dom';

const FinancingSection = ({ isEnglish }) => {
  return (
    <section className="relative w-full py-20 overflow-hidden bg-gradient-to-b from-gray-900 to-black">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute w-full h-full object-cover opacity-20"
          style={{ objectPosition: 'center' }}
        >
          <source src="/video-financing.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-yellow-400 mb-4">
              {isEnglish ? 'Buy Now, Pay Later!' : '¡Compra ahora y paga después!'}
            </h2>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              {isEnglish 
                ? 'Now you can have your dream companion... without paying everything at once!'
                : '¡Ahora puedes tener al compañero de tus sueños… sin pagar todo de una vez!'}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Left Column - Benefits */}
            <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 border border-yellow-500/20">
              <h3 className="text-2xl font-bold text-yellow-400 mb-6">
                {isEnglish ? 'Instant Financing' : 'Financiamiento Inmediato'}
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-yellow-400 font-bold">
                      {isEnglish ? 'No Hidden Fees' : 'Sin cargos ocultos'}
                    </h4>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-yellow-400 font-bold">
                      {isEnglish ? 'No Fine Print' : 'Sin letras pequeñas'}
                    </h4>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-yellow-400 font-bold">
                      {isEnglish ? 'Flexible Payments' : 'Pagos flexibles'}
                    </h4>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <p className="text-gray-400 text-sm">
                  {isEnglish 
                    ? 'Available for our customers in the United States, Canada, and Puerto Rico.'
                    : 'Disponible para nuestros clientes en Estados Unidos, Canadá y Puerto Rico.'}
                </p>
              </div>
            </div>

            {/* Right Column - How It Works */}
            <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 border border-yellow-500/20">
              <h3 className="text-2xl font-bold text-yellow-400 mb-6">
                {isEnglish ? 'How It Works' : '¿Cómo funciona?'}
              </h3>

              <div className="space-y-6">
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

              <div className="mt-8 flex justify-center space-x-8">
                <img src="/affirm.avif" alt="Affirm" className="h-12" />
                <img src="/klarna.png" alt="Klarna" className="h-12" />
                <img src="/afterpay.png" alt="Afterpay" className="h-12" />
              </div>
            </div>
          </div>

          <div className="text-center">
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
    </section>
  );
};

export default FinancingSection; 