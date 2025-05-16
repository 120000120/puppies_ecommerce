import React from 'react';
import { Link } from 'react-router-dom';
import { useCurrency } from '../context/CurrencyContext';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import DogCard from './DogCard';
import VideoSection from './VideoSection';

const CatalogHero = () => {
  const { selectedCurrency } = useCurrency();
  const isEnglish = selectedCurrency === 'usd' || selectedCurrency === 'cad';

  return (
    <section className="relative h-[60vh] flex items-center justify-center overflow-hidden -mt-4">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/video-4.mp4" type="video/mp4" />
        </video>
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/90"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
          {isEnglish ? 'Find Your Perfect Companion' : 'Encuentra tu Compañero Perfecto'}
        </h1>
        <p className="text-xl md:text-2xl text-gray-200 mb-8 animate-fade-in-delay">
          {isEnglish 
            ? 'Discover our selection of healthy, happy puppies ready to join your family'
            : 'Descubre nuestra selección de cachorros saludables y felices listos para unirse a tu familia'}
        </p>
        <div className="flex flex-wrap justify-center gap-4 animate-fade-in-delay-2">
          <Link 
            to="#catalog" 
            className="px-8 py-4 bg-yellow-500 text-black font-bold rounded-full hover:bg-yellow-400 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-yellow-500/50"
          >
            {isEnglish ? 'View Puppies' : 'Ver Cachorros'}
          </Link>
        </div>
      </div>
    </section>
  );
};

const Catalog = () => {
  const { selectedCurrency } = useCurrency();
  const isEnglish = selectedCurrency === 'usd' || selectedCurrency === 'cad';
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [dogs, setDogs] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetchDogs();
  }, []);

  const fetchDogs = async () => {
    try {
      const { data, error } = await supabase
        .from('dogs')
        .select('*')
        .order('name');
      
      if (error) throw error;
      setDogs(data);
    } catch (error) {
      console.error('Error fetching dogs:', error);
    } finally {
      setLoading(false);
    }
  };
  
  // Filtrar perros
  const filteredDogs = dogs.filter(dog => {
    // Filtro de búsqueda
    const matchesSearch = dog.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          dog.characteristics.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filtro de tamaño
    const matchesSize = selectedSize === '' || dog.size.includes(selectedSize);
    
    // Filtro de precio
    let matchesPrice = true;
    if (priceRange === 'low') {
      matchesPrice = parseFloat(dog.price) <= 3500;
    } else if (priceRange === 'medium') {
      const price = parseFloat(dog.price);
      matchesPrice = price > 3500 && price <= 5000;
    } else if (priceRange === 'high') {
      matchesPrice = parseFloat(dog.price) > 5000;
    }
    
    return matchesSearch && matchesSize && matchesPrice;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-yellow-400"></div>
      </div>
    );
  }

  return (
    <>
      <CatalogHero />
      <section id="catalog" className="py-16 bg-black text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
            <div className="text-center md:text-left flex-1">
              <h2 className="text-3xl font-bold text-yellow-400 mb-4">
                {isEnglish ? 'Our Puppies' : 'Nuestros Cachorros'}
              </h2>
              <p className="text-gray-300">
                {isEnglish 
                  ? 'Explore our wide selection of available puppies to find your perfect companion.'
                  : 'Explora nuestra amplia selección de cachorros disponibles para encontrar tu compañero perfecto.'}
              </p>
            </div>
            
            {/* Banner Image */}
          </div>
          
          <div className="bg-gray-800 rounded-xl shadow-md p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="search" className="block text-sm font-medium text-gray-300 mb-1">Buscar</label>
                <input
                  type="text"
                  id="search"
                  placeholder="Buscar por nombre o características..."
                  className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div>
                <label htmlFor="size" className="block text-sm font-medium text-gray-300 mb-1">Tamaño</label>
                <select
                  id="size"
                  className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                >
                  <option value="">Todos los tamaños</option>
                  <option value="Small breeds">Pequeño</option>
                  <option value="Medium breeds">Mediano</option>
                  <option value="Large breeds">Grande</option>
                  <option value="Exotic breeds">Exótico</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-300 mb-1">Rango de precio</label>
                <select
                  id="price"
                  className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                >
                  <option value="">Todos los precios</option>
                  <option value="low">Hasta $3,500</option>
                  <option value="medium">$3,501 - $5,000</option>
                  <option value="high">Más de $5,000</option>
                </select>
              </div>
            </div>
          </div>
          
          {filteredDogs.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDogs.map(dog => (
                <DogCard key={dog.id} dog={dog} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <svg className="w-16 h-16 mx-auto text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <h3 className="text-xl font-medium text-gray-400 mb-2">No se encontraron resultados</h3>
              <p className="text-gray-500">Intenta con otros criterios de búsqueda</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Catalog;