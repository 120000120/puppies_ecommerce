import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import CatCard from './CatCard';
import { useCurrency } from '../context/CurrencyContext';
import { Link } from 'react-router-dom';

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
          <source src="/video-gato.mp4" type="video/mp4" />
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
            ? 'Discover our selection of healthy, happy kittens ready to join your family'
            : 'Descubre nuestra selección de gatitos saludables y felices listos para unirse a tu familia'}
        </p>
        <div className="flex flex-wrap justify-center gap-4 animate-fade-in-delay-2">
          <Link 
            to="#catalog" 
            className="px-8 py-4 bg-yellow-500 text-black font-bold rounded-full hover:bg-yellow-400 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-yellow-500/50"
          >
            {isEnglish ? 'View Kittens' : 'Ver Gatitos'}
          </Link>
        </div>
      </div>
    </section>
  );
};

const CatCatalog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(true);
  const { selectedCurrency } = useCurrency();
  const isEnglish = selectedCurrency === 'usd' || selectedCurrency === 'cad';
  
  useEffect(() => {
    fetchCats();
  }, []);

  const fetchCats = async () => {
    try {
      const { data, error } = await supabase
        .from('cats_new')
        .select('*')
        .order('name');
      
      if (error) throw error;
      console.log('Fetched cats from cats_new:', data);
      setCats(data);
    } catch (error) {
      console.error('Error fetching cats:', error);
    } finally {
      setLoading(false);
    }
  };
  
  // Filter cats
  const filteredCats = cats.filter(cat => {
    // Search filter
    const searchFields = [
      cat.name,
      cat.characteristics,
      cat.characteristics_english,
      cat.salud_general,
      cat.salud_english
    ].filter(Boolean);
    
    const matchesSearch = searchFields.some(field => 
      field.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    // Size filter
    const matchesSize = selectedSize === '' || cat.size.includes(selectedSize);
    
    // Price filter
    let matchesPrice = true;
    if (priceRange === 'low') {
      matchesPrice = parseFloat(cat.price) <= 3500;
    } else if (priceRange === 'medium') {
      const price = parseFloat(cat.price);
      matchesPrice = price > 3500 && price <= 5000;
    } else if (priceRange === 'high') {
      matchesPrice = parseFloat(cat.price) > 5000;
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
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-yellow-400 mb-4">
              {isEnglish ? 'Our Kittens' : 'Nuestros Gatitos'}
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              {isEnglish 
                ? 'Explore our wide selection of available cats to find your perfect companion.'
                : 'Explora nuestra amplia selección de gatos disponibles para encontrar tu compañero perfecto.'}
            </p>
          </div>
          
          <div className="bg-gray-800 rounded-xl shadow-md p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="search" className="block text-sm font-medium text-gray-300 mb-1">
                  {isEnglish ? 'Search' : 'Buscar'}
                </label>
                <input
                  type="text"
                  id="search"
                  placeholder={isEnglish ? "Search by name or characteristics..." : "Buscar por nombre o características..."}
                  className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div>
                <label htmlFor="size" className="block text-sm font-medium text-gray-300 mb-1">
                  {isEnglish ? 'Size' : 'Tamaño'}
                </label>
                <select
                  id="size"
                  className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                >
                  <option value="">{isEnglish ? 'All sizes' : 'Todos los tamaños'}</option>
                  <option value="Estándar">{isEnglish ? 'Standard' : 'Estándar'}</option>
                  <option value="Pequeño">{isEnglish ? 'Small' : 'Pequeño'}</option>
                  <option value="Mediano">{isEnglish ? 'Medium' : 'Mediano'}</option>
                  <option value="Grande">{isEnglish ? 'Large' : 'Grande'}</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-300 mb-1">
                  {isEnglish ? 'Price Range' : 'Rango de Precio'}
                </label>
                <select
                  id="price"
                  className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                >
                  <option value="">{isEnglish ? 'All prices' : 'Todos los precios'}</option>
                  <option value="low">{isEnglish ? 'Less than $3,500' : 'Menos de $3,500'}</option>
                  <option value="medium">{isEnglish ? '$3,500 - $5,000' : '$3,500 - $5,000'}</option>
                  <option value="high">{isEnglish ? 'More than $5,000' : 'Más de $5,000'}</option>
                </select>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCats.map((cat) => (
              <CatCard key={cat.id} cat={cat} />
            ))}
          </div>
          
          {filteredCats.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">
                {isEnglish 
                  ? 'No cats found matching the search criteria.'
                  : 'No se encontraron gatos que coincidan con los criterios de búsqueda.'}
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default CatCatalog; 