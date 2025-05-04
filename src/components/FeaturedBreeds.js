import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const FeaturedBreeds = () => {
  const [featuredDogs, setFeaturedDogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFeaturedDogs();
  }, []);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  const fetchFeaturedDogs = async () => {
    try {
      const { data, error } = await supabase
        .from('dogs')
        .select('*')
        .limit(6);
      
      if (error) {
        console.error('Supabase error:', error);
        setError(error.message);
        throw error;
      }
      
      if (!data) {
        throw new Error('No data returned from Supabase');
      }
      
      setFeaturedDogs(data);
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
          {featuredDogs.map((dog) => (
            <div key={dog.id} className="bg-gray-800 rounded-2xl shadow-lg overflow-hidden transition-transform hover:scale-105">
              <div className="h-64 overflow-hidden">
                <img 
                  src={dog.image} 
                  alt={dog.name} 
                  className="w-full h-full object-cover transition-transform hover:scale-110"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-white">{dog.name}</h3>
                  <span className="bg-yellow-800 text-yellow-200 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                    {dog.size}
                  </span>
                </div>
                <p className="text-gray-400 text-sm mb-4">{dog.characteristics}</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-yellow-400">{formatPrice(dog.price)}</span>
                  <a 
                    href={`https://wa.me/18099162661?text=${encodeURIComponent(`Hola, estoy interesado en este hermoso cachorrito ${dog.name} 🐕\n\n${dog.image}`)}`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium py-2 px-4 rounded-lg transition-colors"
                  >
                    Contactar
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedBreeds;