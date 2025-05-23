import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import VideoSection from '../components/VideoSection';
import WhyChooseUs from '../components/WhyChooseUs';
import CallToAction from '../components/CallToAction';
import DogCard from '../components/DogCard';
import FinancingSection from '../components/FinancingSection';
import { supabase } from '../lib/supabase';
import { Link } from 'react-router-dom';
import { useCurrency } from '../context/CurrencyContext';

const Home = () => {
  const [randomDogs, setRandomDogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { selectedCurrency } = useCurrency();

  const isEnglish = selectedCurrency === 'usd' || selectedCurrency === 'cad';

  const testimonials = [
    {
      id: 1,
      name: "Hall Family",
      location: "Newfoundland",
      pet: isEnglish ? "Sphynx Kitten" : "Gatito Sphynx",
      text: isEnglish 
        ? "He instantly bonded with our youngest — they're inseparable now."
        : "Se vinculó instantáneamente con nuestro hijo menor — ahora son inseparables.",
      rating: 5,
      date: isEnglish ? "January 15, 2024" : "15 Enero 2024",
      petImage: "/Sphynx.png"
    },
    {
      id: 2,
      name: "Lambert Family",
      location: "Quebec",
      pet: isEnglish ? "Maine Coon Kitten" : "Gatito Maine Coon",
      text: isEnglish 
        ? "Every little purr is like music at home. We adore her."
        : "Cada pequeño ronroneo es como música en casa. La adoramos.",
      rating: 5,
      date: isEnglish ? "May 10, 2024" : "10 Mayo 2024",
      petImage: "/Maine-Coon.png"
    },
    {
      id: 3,
      name: "McNeil Family",
      location: "Houston",
      pet: isEnglish ? "Golden Retriever Puppy" : "Perrito Golden Retriever",
      text: isEnglish 
        ? "Thanks to you, we found not just a pet but a lifelong friend."
        : "Gracias a ustedes, encontramos no solo una mascota sino un amigo para toda la vida.",
      rating: 5,
      date: isEnglish ? "April 1, 2024" : "1 Abril 2024",
      petImage: "/golden.png"
    },
    {
      id: 4,
      name: "Deschamps Family",
      location: "Quebec",
      pet: isEnglish ? "Ragdoll Kitten" : "Gatito Ragdoll",
      text: isEnglish 
        ? "Thanks to you, we found not just a pet but a lifelong friend."
        : "Gracias a ustedes, encontramos no solo una mascota sino un amigo para toda la vida.",
      rating: 5,
      date: isEnglish ? "March 5, 2024" : "5 Marzo 2024",
      petImage: "Ragdoll.png"
    },
    {
      id: 5,
      name: "Palmer Family",
      location: "Houston",
      pet: isEnglish ? "Shih Tzu Puppy" : "Perrito Shih Tzu",
      text: isEnglish 
        ? "We were surprised at how well-trained and loving he was from day one."
        : "Nos sorprendió lo bien entrenado y cariñoso que era desde el primer día.",
      rating: 5,
      date: isEnglish ? "March 20, 2024" : "20 Marzo 2024",
      petImage: "shitzu.png"
    },
    {
      id: 6,
      name: "Ross Family",
      location: "San Antonio",
      pet: isEnglish ? "Pomeranian Puppy" : "Perrito Pomeranian",
      text: isEnglish 
        ? "They have filled our home with joy and light."
        : "Han llenado nuestro hogar de alegría y luz.",
      rating: 5,
      date: isEnglish ? "November 1, 2024" : "1 Noviembre 2024",
      petImage: "Pomeranian.png"
    }
  ];

  useEffect(() => {
    fetchRandomDogs();
  }, []);

  const fetchRandomDogs = async () => {
    try {
      const { data, error } = await supabase
        .from('dogs_new')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(12);
      
      if (error) throw error;
      
      console.log('Home - Fetched dogs from dogs_new:', data);
      
      // Shuffle the array and take the first 6
      const shuffledDogs = [...data]
        .sort(() => Math.random() - 0.5)
        .slice(0, 6);
      
      setRandomDogs(shuffledDogs);
    } catch (error) {
      console.error('Error fetching random dogs from dogs_new:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <Hero
        title={isEnglish ? 'Find Your Perfect Companion' : 'Encuentra a tu compañero perfecto'}
        subtitle={isEnglish
          ? 'At Best Family Puppies, we offer a wide variety of high-quality dog breeds so you can find the ideal puppy for your family.'
          : 'En Best Family Puppies ofrecemos una amplia variedad de razas de perros de alta calidad para que encuentres el cachorro ideal para tu familia.'}
        buttonText={isEnglish ? 'See Puppies' : 'Ver Cachorros'}
      />

      <WhyChooseUs isEnglish={isEnglish} />

      <FinancingSection isEnglish={isEnglish} />
      <VideoSection isEnglish={isEnglish} />
      
      {/* Random Dogs Section */}
      <section className="py-16 bg-gray-black text-white ">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-yellow-400 mb-4">
              {isEnglish ? 'Our Puppies' : 'Nuestros Cachorros'}
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              {isEnglish
                ? 'Explore our wide selection of available puppies to find your perfect companion.'
                : 'Explora nuestra amplia selección de cachorros disponibles para encontrar tu compañero perfecto.'}
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
      
      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80"></div>
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-yellow-400 mb-4">
              {isEnglish ? 'What Our Clients Say' : 'Lo Que Dicen Nuestros Clientes'}
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto text-lg">
              {isEnglish
                ? 'Real experiences from families who have found their perfect companion with us.'
                : 'Experiencias reales de familias que han encontrado a su compañero perfecto con nosotros'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div 
                key={testimonial.id}
                className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-yellow-500/20 hover:border-yellow-500/40 transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white">{testimonial.name}</h3>
                    <p className="text-gray-400 text-sm">{testimonial.location}</p>
                    <p className="text-yellow-400 text-sm mt-1">{testimonial.pet}</p>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-yellow-500">
                      <img 
                        src={testimonial.petImage} 
                        alt={testimonial.pet}
                        className="w-full h-full object-cover"
                      />
                    </div>
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
              {isEnglish ? 'See Puppies' : 'Ver cachorritos'}
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>

      </section>

      
      <CallToAction isEnglish={isEnglish} />
    </main>
  );
};

export default Home; 