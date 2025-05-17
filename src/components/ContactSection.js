import React from 'react';
import { useCurrency } from '../context/CurrencyContext';

const ContactSection = () => {
  const { selectedCurrency } = useCurrency();
  const isEnglish = selectedCurrency === 'usd' || selectedCurrency === 'cad';

  return (
    <section className="relative min-h-screen">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/video-5.mp4" type="video/mp4" />
        </video>
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/90"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold text-yellow-400 mb-6 animate-fade-in">
                {isEnglish ? 'Contact Us' : 'Contáctanos'}
              </h2>
              <p className="text-2xl text-gray-200 max-w-3xl mx-auto animate-fade-in-delay">
                {isEnglish 
                  ? 'Interested in one of our puppies? We are here to help you find your perfect companion.'
                  : '¿Interesado en alguno de nuestros cachorros? Estamos aquí para ayudarte a encontrar a tu compañero perfecto.'}
              </p>
          </div>

            <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
              <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-yellow-500/20 hover:border-yellow-500/40 transition-all duration-300">
              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-green-600 p-3 rounded-full">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                  </div>
                  <div className="ml-4">
                      <h3 className="text-2xl font-bold text-white mb-2">WhatsApp</h3>
                      <p className="text-gray-300 mb-2 text-lg">
                        {isEnglish 
                          ? 'Contact us directly via WhatsApp for a quick and personalized response.'
                          : 'Contáctanos directamente por WhatsApp para una respuesta rápida y personalizada.'}
                      </p>
                    <a
                      href="https://wa.me/17064097145"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-gray-300 hover:text-green-400 transition-colors duration-300"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                      </svg>
                      <span>+1 (706) 409-7145</span>
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-yellow-500 p-3 rounded-full">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <div className="ml-4">
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {isEnglish ? 'Business Hours' : 'Horario de atención'}
                      </h3>
                      <div className="text-gray-300 space-y-2 text-lg">
                      <p className="flex items-center">
                        <span className="font-medium text-yellow-400">{isEnglish ? '24/7 Service' : 'Servicio 24/7'}</span>
                      </p>
                      <p className="text-gray-400 text-base">
                        {isEnglish 
                          ? 'We are available to assist you at any time, ensuring you find your perfect companion whenever you need us.'
                          : 'Estamos disponibles para ayudarte en cualquier momento, asegurando que encuentres a tu compañero perfecto cuando lo necesites.'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

              {/* Contact Form */}
              <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-yellow-500/20 hover:border-yellow-500/40 transition-all duration-300">
                <div className="flex justify-center mb-8">
                    <div className="bg-white p-4 rounded-full shadow-lg">
                      <img 
                        src="/imagen.png" 
                        alt="Best Family Puppies Logo" 
                      className="h-24 w-24 object-contain"
                      />
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-white mb-6 text-center">
                  {isEnglish ? 'Ready to meet your new best friend?' : '¿Listo para conocer a tu nuevo mejor amigo?'}
                </h3>
                <p className="text-gray-300 text-lg mb-8 text-center">
                  {isEnglish 
                    ? 'Contact us now to schedule an appointment and meet our available puppies.'
                    : 'Contáctanos ahora para programar una cita y conocer a nuestros cachorros disponibles.'}
                </p>
                <a 
                  href="https://wa.me/50661537799" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center justify-center bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-lg shadow-lg transition-all transform hover:scale-105 w-full text-xl"
                >
                  <svg className="w-7 h-7 mr-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  {isEnglish ? 'Contact us on WhatsApp' : 'Contáctanos por WhatsApp'}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;