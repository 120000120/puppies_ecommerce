import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import WhyChooseUs from '../components/WhyChooseUs';
import CallToAction from '../components/CallToAction';
import DogCard from '../components/DogCard';
import { supabase } from '../lib/supabase';
import { Link } from 'react-router-dom';

const testimonials = [
  {
    id: 1,
    name: "María Rodríguez",
    location: "Costa Rica",
    image: "/test1.png",
    text: "¡Increíble experiencia! Mi cachorro llegó en perfectas condiciones y es exactamente como lo vi en las fotos. El proceso de adopción fue muy profesional.",
    rating: 5,
    date: "15 Enero 2024"
  },
  {
    id: 2,
    name: "John Smith",
    location: "Estados Unidos",
    image: "/test2.png",
    text: "Best Family Puppies hizo que el proceso de adopción fuera muy fácil. Mi nuevo compañero es adorable y está perfectamente entrenado. ¡Altamente recomendado!",
    rating: 5,
    date: "10 Mayo 2024"
  },
  
  {
    id: 3,
    name: "Carlos Méndez",
    location: "Nicaragua",
    image: "/test3.png",
    text: "El servicio de entrega fue impecable. Mi cachorro llegó en perfecto estado y muy bien cuidado. La comunicación durante todo el proceso fue excelente.",
    rating: 5,
    date: "1 Abril 2025"
  }
];

const Home = () => {
  const [randomDogs, setRandomDogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRandomDogs();
  }, []);

  const fetchRandomDogs = async () => {
    try {
      const { data, error } = await supabase
        .from('dogs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(12);
      
      if (error) throw error;
      
      // Shuffle the array and take the first 6
      const shuffledDogs = [...data]
        .sort(() => Math.random() - 0.5)
        .slice(0, 6);
      
      setRandomDogs(shuffledDogs);
    } catch (error) {
      console.error('Error fetching random dogs:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <Hero />

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80"></div>
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-yellow-400 mb-4">Lo Que Dicen Nuestros Clientes</h2>
            <p className="text-gray-300 max-w-2xl mx-auto text-lg">
              Experiencias reales de familias que han encontrado a su compañero perfecto con nosotros
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div 
                key={testimonial.id}
                className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-yellow-500/20 hover:border-yellow-500/40 transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className="flex items-center mb-6">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-yellow-500">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-yellow-500 rounded-full p-1">
                      <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-white">{testimonial.name}</h3>
                    <p className="text-gray-400 text-sm">{testimonial.location}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>

                <p className="text-gray-300 mb-4 italic">"{testimonial.text}"</p>
                
                <div className="text-right">
                  <span className="text-sm text-gray-400">{testimonial.date}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/catalogo"
              className="inline-flex items-center px-6 py-3 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-600 transition-colors duration-300"
            >
              Ver cachorritos
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
        {/* <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" fill="#111827">
          <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,100L1360,100C1280,100,1120,100,960,100C800,100,640,100,480,100C320,100,160,100,80,100L0,100Z"></path>
        </svg>
      </div> */}
      </section>
      
      {/* Random Dogs Section */}
      <section className="py-16 bg-gray-black text-white ">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-yellow-400 mb-4">Nuestros Cachorros</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Explora nuestra amplia selección de cachorros disponibles para encontrar tu compañero perfecto.
            </p>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center py-16">
              <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-yellow-400"></div>
            </div>
          ) : error ? (
            <div className="flex justify-center items-center py-16">
              <div className="text-red-500">
                <p>Error: {error}</p>
                <button 
                  onClick={fetchRandomDogs}
                  className="mt-4 px-4 py-2 bg-yellow-400 text-gray-900 rounded hover:bg-yellow-500"
                >
                  Try Again
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {randomDogs.map((dog) => (
                <DogCard key={dog.id} dog={dog} />
              ))}
            </div>
          )}
        </div>
      </section>

      <WhyChooseUs />
      <CallToAction />
    </main>
  );
};

export default Home; 