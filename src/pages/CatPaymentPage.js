import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCurrency } from '../context/CurrencyContext';
import DeliveryConditions from '../components/DeliveryConditions';
import { supabase } from '../lib/supabase';

// Inicializar Stripe con la clave pública
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

function CatPaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [stripeError, setStripeError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { selectedCurrency, getPriceByCurrency } = useCurrency();
  const [cat, setCat] = useState(location.state?.cat);
  
  const { cat: initialCat } = location.state || {};

  const isEnglish = selectedCurrency === 'usd' || selectedCurrency === 'cad';

  const getDisplayName = (cat) => {
    if (!cat) return '';
    return cat.name;
  };

  const getDisplayCharacteristics = (cat) => {
    if (!cat) return '';
    if (isEnglish) {
      if (!cat.characteristics_english) {
        console.warn('CatPaymentPage - characteristics_english not found for:', cat.name);
      }
      return cat.characteristics_english || cat.characteristics;
    }
    return cat.characteristics;
  };

  const getDisplayHealth = (cat) => {
    if (!cat) return '';
    if (isEnglish) {
      if (!cat.salud_english) {
        console.warn('CatPaymentPage - salud_english not found for:', cat.name);
      }
      return cat.salud_english || cat.salud_general;
    }
    return cat.salud_general;
  };

  const getDisplayText = (text) => {
    const translations = {
      'Precio total': isEnglish ? 'Total Price' : 'Precio total',
      'Imágenes de los Padres': isEnglish ? 'Parent Images' : 'Imágenes de los Padres',
      'Padre 1': isEnglish ? 'Parent 1' : 'Padre 1',
      'Padre 2': isEnglish ? 'Parent 2' : 'Padre 2',
      'Detalles del Producto': isEnglish ? 'Product Details' : 'Detalles del Producto',
      'Tamaño': isEnglish ? 'Size' : 'Tamaño',
      'Estado de Salud': isEnglish ? 'Health Status' : 'Estado de Salud',
      'Adoptar ahora': isEnglish ? 'Adopt now' : 'Adoptar ahora',
      'Procesando...': isEnglish ? 'Processing...' : 'Procesando...'
    };
    return translations[text] || text;
  };

  useEffect(() => {
    if (!cat) {
      navigate('/catalogo');
      return;
    }

    // Log para debugging
    console.log('Cat data:', cat);
    console.log('Health info:', {
      english: cat.salud_english,
      general: cat.salud_general
    });

    // Actualizar los datos del gato
    const fetchCatWithDetails = async () => {
      try {
        const { data, error } = await supabase
          .from('cats_new')
          .select('*')
          .eq('id', cat.id)
          .single();

        if (error) throw error;
        
        if (data) {
          setCat(data);
        }
      } catch (error) {
        console.error('Error fetching cat details:', error);
      }
    };

    fetchCatWithDetails();
  }, [cat, navigate]);

  const handlePayment = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStripeError(null);

    try {
      const stripe = await stripePromise;
      const price = getPriceForCurrency(cat, selectedCurrency);
      
      const response = await fetch('https://api.stripe.com/v1/checkout/sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Bearer ${process.env.REACT_APP_STRIPE_SECRET_KEY}`
        },
        body: new URLSearchParams({
          'payment_method_types[]': 'card',
          'line_items[0][price_data][currency]': selectedCurrency,
          'line_items[0][price_data][product_data][name]': getDisplayName(cat),
          'line_items[0][price_data][product_data][description]': getDisplayCharacteristics(cat),
          'line_items[0][price_data][product_data][images][]': cat.image_1,
          'line_items[0][price_data][unit_amount]': Math.round(price * 100),
          'line_items[0][quantity]': '1',
          'mode': 'payment',
          'success_url': `${window.location.origin}/success?success=true`,
          'cancel_url': `${window.location.origin}/cancel`,
          'customer_email': 'test@example.com'
        })
      });

      const session = await response.json();
      
      if (session.error) {
        throw new Error(session.error.message);
      }

      const result = await stripe.redirectToCheckout({
        sessionId: session.id
      });

      if (result.error) {
        throw new Error(result.error.message);
      }
    } catch (error) {
      console.error('Error:', error);
      setStripeError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 5 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? 5 : prevIndex - 1
    );
  };

  if (!cat) {
    return null;
  }

  const images = [
    cat.image_1,
    cat.image_2,
    cat.image_3,
    cat.image_4,
    cat.image_5,
    cat.image_6
  ].filter(Boolean);

  const price = getPriceByCurrency(cat);

  const getPriceForCurrency = (cat, code) => {
    if (!cat) return 0;
    switch (code) {
      case 'usd':
        return cat.price;
      case 'cad':
        return cat.price_canada;
      case 'crc':
        return cat.price_costa_rica;
      case 'nio':
        return cat.price_salvador;
      case 'pab':
        return cat.price_panama;
      default:
        return cat.price;
    }
  };

  const getCountryAndCurrency = (currency) => {
    switch (currency) {
      case 'usd':
        return { country: 'United States', symbol: 'USD' };
      case 'cad':
        return { country: 'Canada', symbol: 'CAD' };
      case 'crc':
        return { country: 'Costa Rica', symbol: 'CRC' };
      case 'nio':
        return { country: 'El Salvador', symbol: 'SVC' };
      case 'pab':
        return { country: 'Panama', symbol: 'PAB' };
      default:
        return { country: 'United States', symbol: 'USD' };
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Left Column - Main Image and Thumbnails */}
          <div className="space-y-4">
            <div className="bg-gray-800 rounded-lg overflow-hidden">
              <img
                src={images[currentImageIndex]}
                alt={getDisplayName(cat)}
                className="w-full aspect-h-10 object-cover"
              />
            </div>
            
            <div className="grid grid-cols-4 gap-1">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`relative aspect-square rounded-lg overflow-hidden ${
                    currentImageIndex === index ? 'ring-2 ring-yellow-400' : ''
                  }`}
                >
                  <img
                    src={image}
                    alt={`${getDisplayName(cat)} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

            <DeliveryConditions isCat={true} />
          </div>

          {/* Right Column - Product Details */}
          <div className="space-y-4">
            {/* Imágenes de los padres */}
            <div className="bg-gray-800 p-3 rounded-lg border border-yellow-500/20">
              <h2 className="text-lg font-bold mb-2 text-yellow-400">{getDisplayText('Imágenes de los Padres')}</h2>
              <div className="grid grid-cols-2 gap-2">
                {cat.image_father_1 && (
                  <div className="aspect-w-16 aspect-h-10">
                    <img 
                      src={cat.image_father_1} 
                      alt={getDisplayText('Padre 1')} 
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                )}
                {cat.image_father_2 && (
                  <div className="aspect-w-16 aspect-h-10">
                    <img 
                      src={cat.image_father_2} 
                      alt={getDisplayText('Padre 2')} 
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Información del producto */}
            <div className="bg-gray-800 p-4 rounded-lg border border-yellow-500/20">
              <h2 className="text-lg font-bold mb-2 text-yellow-400">{getDisplayText('Detalles del Producto')}</h2>
              <h3 className="text-base font-bold mb-1 text-white">{getDisplayName(cat)}</h3>
              <p className="text-sm text-gray-300 mb-3">{getDisplayCharacteristics(cat)}</p>
              
              <div className="grid grid-cols-2 gap-2 mb-3">
                <div className="bg-gray-700/50 p-2 rounded-lg">
                  <span className="text-xs text-gray-400 block mb-0.5">{getDisplayText('Tamaño')}</span>
                  <span className="text-sm text-white font-medium">{cat.size}</span>
                </div>
                {(cat.salud_general || cat.salud_english) && (
                  <div className="bg-gray-700/50 p-2 rounded-lg">
                    <span className="text-xs text-gray-400 block mb-0.5">{getDisplayText('Estado de Salud')}</span>
                    <span className="text-sm text-white font-medium">{getDisplayHealth(cat)}</span>
                  </div>
                )}
              </div>

              <div className="border-t border-gray-700 pt-3 mt-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">{getDisplayText('Precio total')}</span>
                  <div className="flex flex-col items-end">
                    <span className="text-sm text-gray-400">
                      {getCountryAndCurrency(selectedCurrency).country} - {getCountryAndCurrency(selectedCurrency).symbol}
                    </span>
                    <span className="text-xl font-bold text-yellow-400">
                      {new Intl.NumberFormat(selectedCurrency === 'usd' ? 'en-US' : 
                        selectedCurrency === 'cad' ? 'en-CA' : 
                        selectedCurrency === 'crc' ? 'es-CR' :
                        selectedCurrency === 'nio' ? 'es-NI' :
                        'es-PA', {
                        style: 'currency',
                        currency: selectedCurrency.toUpperCase(),
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0
                      }).format(price)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Botón de pago */}
            <div className="bg-gray-800 p-4 rounded-lg border border-yellow-500/20">
              <button
                onClick={handlePayment}
                disabled={isLoading}
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-6 rounded-lg shadow-lg transition-all transform hover:scale-105 disabled:opacity-50"
              >
                {isLoading ? getDisplayText('Procesando...') : getDisplayText('Adoptar ahora')}
              </button>
            </div>

            {/* Testimonios adaptados a cats_new */}
            {cat.testimonio && cat.testimonio.trim() !== '' && (
              <div className="bg-gray-800 p-4 rounded-lg border border-yellow-500/20 mt-4">
                <h2 className="text-lg font-bold mb-4 text-yellow-400">
                  Testimonio de familia
                </h2>
                <div className="space-y-4">
                  <div className="bg-gray-700/50 p-4 rounded-lg">
                    <div className="flex items-start space-x-4">
                      <div className="flex-1">
                        <p className="text-gray-300 italic mb-2">"{cat.testimonio}"</p>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-white font-medium">{cat.nombre_de_la_familia || 'Anónimo'}</p>
                            <p className="text-gray-400 text-sm">
                              {cat.ubicacion && cat.pais ? `${cat.ubicacion}, ${cat.pais}` : 'Ubicación no especificada'}
                            </p>
                          </div>
                          {cat.fecha && (
                            <div className="text-yellow-400 text-sm">
                              {new Date(cat.fecha).toLocaleDateString(
                                'es-ES',
                                { year: 'numeric', month: 'long', day: 'numeric' }
                              )}
                            </div>
                          )}
                        </div>
                        {(cat.tipo_de_mascota || cat.raza) && (
                          <p className="text-yellow-400 text-sm mt-2">
                            {[cat.tipo_de_mascota, cat.raza].filter(Boolean).join(' - ')}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CatPaymentPage; 