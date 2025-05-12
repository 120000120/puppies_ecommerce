import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Link } from 'react-router-dom';
import { useCurrency } from '../context/CurrencyContext';

const FeaturedBreeds = () => {
  const [featuredDogs, setFeaturedDogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { getPriceByCurrency, getDisplayCurrency } = useCurrency();

  useEffect(() => {
    fetchFeaturedDogs();
  }, []);

  const getCurrencyInfo = (currency) => {
    switch (currency) {
      case 'usd':
        return { country: 'Estados Unidos', symbol: 'USD' };
      case 'cad':
        return { country: 'Canadá', symbol: 'CAD' };
      case 'crc':
        return { country: 'Costa Rica', symbol: 'CRC' };
      case 'nio':
        return { country: 'Nicaragua', symbol: 'NIO' };
      case 'pab':
        return { country: 'Panamá', symbol: 'PAB' };
      default:
        return { country: 'Estados Unidos', symbol: 'USD' };
    }
  };

  const formatPrice = (dog) => {
    const price = getPriceByCurrency(dog);
    const displayCurrency = getDisplayCurrency(dog);
    const currencyInfo = getCurrencyInfo(displayCurrency);

    return {
      formattedPrice: new Intl.NumberFormat(
        displayCurrency === 'usd' ? 'en-US' : 
        displayCurrency === 'cad' ? 'en-CA' : 
        displayCurrency === 'crc' ? 'es-CR' :
        displayCurrency === 'nio' ? 'es-NI' :
        'es-PA', {
          style: 'currency',
          currency: displayCurrency.toUpperCase(),
          minimumFractionDigits: 0,
          maximumFractionDigits: 0
        }
      ).format(price),
      currencyInfo
    };
  };

  const fetchFeaturedDogs = async () => {
    try {
      // Generate a random seed for each request
      const randomSeed = Math.random();
      
      const { data, error } = await supabase
        .from('dogs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(12);
      
      if (error) {
        console.error('Supabase error:', error);
        setError(error.message);
        throw error;
      }
      
      if (!data) {
        throw new Error('No data returned from Supabase');
      }

      // Shuffle the array and take the first 6
      const shuffledDogs = [...data]
        .sort(() => randomSeed - 0.5)
        .slice(0, 6);
      
      setFeaturedDogs(shuffledDogs);
    } catch (error) {
      console.error('Error fetching featured dogs:', error);
      setError(error.message || 'Failed to fetch featured dogs');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-16">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-yellow-400"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center py-16">
        <div className="text-red-500">
          <p>Error: {error}</p>
          <button 
            onClick={fetchFeaturedDogs}
            className="mt-4 px-4 py-2 bg-yellow-400 text-gray-900 rounded hover:bg-yellow-500"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <section className="py-16 bg-gray-black text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-yellow-400 mb-4">Razas Destacadas</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Conoce algunas de nuestras razas más populares, criadas con los más altos estándares de calidad y cuidado.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredDogs.map((dog) => {
            const { formattedPrice, currencyInfo } = formatPrice(dog);
            
            return (
              <div key={dog.id} className="group bg-gray-800 text-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={dog.image_1} 
                    alt={dog.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-white truncate">{dog.name}</h3>
                    <span className="bg-yellow-500/10 text-yellow-400 text-xs font-semibold px-3 py-1 rounded-full border border-yellow-500/20">
                      {dog.size}
                    </span>
                  </div>
                  
                  <p className="text-gray-300 text-sm mb-4 line-clamp-2 min-h-[2.5rem]">{dog.characteristics}</p>
                  
                  <div className="grid grid-cols-2 gap-3 text-xs text-gray-400 mb-6">
                    <div className="flex items-center space-x-2 bg-gray-700/50 p-2 rounded-lg">
                      <svg className="w-4 h-4 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"></path>
                      </svg>
                      <span>{dog.weight}</span>
                    </div>
                    <div className="flex items-center space-x-2 bg-gray-700/50 p-2 rounded-lg">
                      <svg className="w-4 h-4 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"></path>
                      </svg>
                      <span>{dog.height}</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex flex-col">
                      <span className="text-2xl font-bold text-yellow-400">{formattedPrice}</span>
                      <span className="text-xs text-gray-400 mt-1">{currencyInfo.country} - {currencyInfo.symbol}</span>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      <Link
                        to="/payment"
                        state={{ 
                          dog: {
                            ...dog,
                            price: parseFloat(dog.price),
                            image_1: dog.image_1 || '',
                            name: dog.name || '',
                            characteristics: dog.characteristics || '',
                            size: dog.size || '',
                            weight: dog.weight || '',
                            height: dog.height || '',
                            litters: dog.litters || ''
                          }
                        }}
                        className="inline-flex items-center bg-yellow-500 hover:bg-yellow-600 text-black font-medium py-2.5 px-5 rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-105"
                      >
                        Adoptar
                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                        </svg>
                      </Link>
                      <a
                        href={`https://wa.me/50661537799?text=${encodeURIComponent(`Hola, estoy interesado en este hermoso cachorrito ${dog.name} 🐕\n\n${dog.image_1}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-gray-400 hover:text-green-400 transition-colors duration-300 flex items-center"
                      >
                        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                        </svg>
                        Contactar por WhatsApp
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturedBreeds;