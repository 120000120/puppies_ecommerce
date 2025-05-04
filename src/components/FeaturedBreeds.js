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
                    href={`https://wa.me/5543431170?text=Hola, estoy interesado en el ${dog.name}`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="bg-green-600 hover:bg-green-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors flex items-center"
                  >
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    Consultar
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