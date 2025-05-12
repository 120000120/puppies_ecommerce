const WhyChooseUs = () => {
  return (
    <section className="py-16 bg-gray-black text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-yellow-400 mb-4">¿Por qué elegirnos?</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            En Best Family Puppies nos dedicamos a criar perros saludables y felices para familias amorosas.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-800 rounded-2xl p-8 text-center transition-transform hover:scale-105">
            <div className="bg-yellow-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-yellow-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Salud Garantizada</h3>
            <p className="text-gray-400">
              Todos nuestros cachorros reciben atención veterinaria completa, vacunas y desparasitación antes de ir a su nuevo hogar.
            </p>
          </div>
          
          <div className="bg-gray-800 rounded-2xl p-8 text-center transition-transform hover:scale-105">
            <div className="bg-yellow-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-yellow-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Crianza Responsable</h3>
            <p className="text-gray-400">
              Nuestros perros son criados en un ambiente familiar con amor, socialización temprana y los mejores cuidados.
            </p>
          </div>
          
          <div className="bg-gray-800 rounded-2xl p-8 text-center transition-transform hover:scale-105">
            <div className="bg-yellow-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-yellow-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Soporte Continuo</h3>
            <p className="text-gray-400">
              Ofrecemos asesoramiento y apoyo después de la adopción para asegurar que tu cachorro se adapte perfectamente a su nuevo hogar.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;