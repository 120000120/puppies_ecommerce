import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCurrency } from '../context/CurrencyContext';
import DeliveryConditions from '../components/DeliveryConditions';
import { supabase } from '../lib/supabase';

// Inicializar Stripe con la clave pública
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

function PaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [stripeError, setStripeError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { selectedCurrency, getPriceByCurrency } = useCurrency();
  const [dog, setDog] = useState(location.state?.dog);
  const [cat, setCat] = useState(location.state?.cat);
  
  const { dog: initialDog, cat: initialCat } = location.state || {};

  const isEnglish = selectedCurrency === 'usd' || selectedCurrency === 'cad';

  const getDisplayName = (pet) => {
    if (!pet) return '';
    if (isEnglish) {
      return pet.name_en || pet.name;
    }
    return pet.name;
  };

  const getDisplayCharacteristics = (pet) => {
    if (!pet) return '';
    if (isEnglish) {
      if (!pet.characteristics_en) {
        console.warn('PaymentPage - characteristics_en not found for:', pet.name);
      }
      return pet.characteristics_en || pet.characteristics;
    }
    return pet.characteristics;
  };

  const getDisplayText = (text) => {
    const translations = {
      'Precio total': isEnglish ? 'Total Price' : 'Precio total',
      'Imágenes de los Padres': isEnglish ? 'Parent Images' : 'Imágenes de los Padres',
      'Padre 1': isEnglish ? 'Parent 1' : 'Padre 1',
      'Padre 2': isEnglish ? 'Parent 2' : 'Padre 2',
      'Detalles del Producto': isEnglish ? 'Product Details' : 'Detalles del Producto',
      'Tamaño': isEnglish ? 'Size' : 'Tamaño',
      'Peso': isEnglish ? 'Weight' : 'Peso',
      'Altura': isEnglish ? 'Height' : 'Altura',
      'Camadas': isEnglish ? 'Litters' : 'Camadas',
      'Adoptar ahora': isEnglish ? 'Adopt now' : 'Adoptar ahora',
      'Procesando...': isEnglish ? 'Processing...' : 'Procesando...'
    };
    return translations[text] || text;
  };

  useEffect(() => {
    if (!dog && !cat) {
      navigate('/catalogo');
      return;
    }

    // Log para debugging
    console.log('Pet data:', dog || cat);
    console.log('Testimonials:', {
      english: (dog || cat)?.testimonies_english,
      spanish: (dog || cat)?.testimonies_spanish,
      date: (dog || cat)?.fecha_testimonio,
      family: (dog || cat)?.nombre_familia,
      location: (dog || cat)?.ubicacion,
      country: (dog || cat)?.pais,
      type: (dog || cat)?.tipo_mascota,
      breed: (dog || cat)?.raza
    });

    // Actualizar los datos del perro/gato con los testimonios
    const fetchPetWithTestimonials = async () => {
      try {
        const table = dog ? 'dogs_new' : 'cats';
        const { data, error } = await supabase
          .from(table)
          .select(`
            *,
            testimonies_english,
            testimonies_spanish,
            fecha_testimonio,
            nombre_familia,
            ubicacion,
            pais,
            tipo_mascota,
            raza
          `)
          .eq('id', (dog || cat).id)
          .single();

        if (error) throw error;
        
        if (data) {
          // Preservar los precios originales del estado inicial
          const updatedData = {
            ...data,
            price_usd: dog?.price_usd || cat?.price_usd,
            price_canada: dog?.price_canada || cat?.price_canada,
            price_costa_rica: dog?.price_costa_rica || cat?.price_costa_rica,
            price_salvador: dog?.price_salvador || cat?.price_salvador,
            price_panama: dog?.price_panama || cat?.price_panama
          };

          if (dog) {
            setDog(updatedData);
          } else {
            setCat(updatedData);
          }
        }
      } catch (error) {
        console.error('Error fetching pet with testimonials:', error);
      }
    };

    fetchPetWithTestimonials();
  }, [dog, cat, navigate]);

  const handlePayment = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStripeError(null);

    try {
      const stripe = await stripePromise;
      if (!stripe) {
        throw new Error('Stripe failed to initialize');
      }

      const pet = dog || cat;
      const price = getPriceForCurrency(pet, selectedCurrency);
      
      // Determine the currency for Stripe based on price for Costa Rica and El Salvador
      let stripeCurrency = selectedCurrency;
      if (selectedCurrency === 'crc') {
        stripeCurrency = price > 9999 ? 'crc' : 'usd';
      } else if (selectedCurrency === 'pr_usd' || selectedCurrency === 'nio') {
        stripeCurrency = 'usd';
      }
      
      const res = await fetch("/api/crear/pagar/sesion", {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    productName: pet?.name || 'Best Family Puppy',
    productPrice: price,
    currency: 'usd',
  }),
});

const session = await res.json();
          'success_url': `${window.location.origin}/success?success=true`,
          'cancel_url': `${window.location.origin}/cancel`
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Server response:', errorText);
        throw new Error(`Server error: ${response.status} ${response.statusText}`);
      }

      let session;
      try {
        session = await response.json();
      } catch (error) {
        console.error('Error parsing JSON:', error);
        throw new Error('Invalid server response');
      }
      
      if (session.error) {
        throw new Error(session.error.message);
      }

      if (!session.id) {
        throw new Error('No session ID received from server');
      }

      const result = await stripe.redirectToCheckout({
        sessionId: session.id
      });

      if (result.error) {
        throw new Error(result.error.message);
      }
    } catch (error) {
      console.error('Payment error:', error);
      setStripeError(error.message || 'An error occurred during payment processing');
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

  if (!dog && !cat) {
    return null;
  }

  const images = dog ? [
    dog.image_1,
    dog.image_2,
    dog.image_3,
    dog.image_4,
    dog.image_5,
    dog.image_6
  ].filter(Boolean) : [
    cat.image_1,
    cat.image_2,
    cat.image_3,
    cat.image_4,
    cat.image_5,
    cat.image_6
  ].filter(Boolean);

  const pet = dog || cat;
  const price = getPriceByCurrency(pet);

  const allCurrencies = [
    { code: 'usd', label: 'USD', locale: 'en-US' },
    { code: 'cad', label: 'CAD', locale: 'en-CA' },
    { code: 'crc', label: 'CRC', locale: 'es-CR' },
    { code: 'nio', label: 'NIO', locale: 'es-NI' },
    { code: 'pab', label: 'PAB', locale: 'es-PA' }
  ];

  const getPriceForCurrency = (pet, code) => {
    if (!pet) return 0;
    let price;
    switch (code) {
      case 'usd':
      case 'pr_usd': // Puerto Rico uses USD prices
        price = pet.price_usd || pet.price;
        break;
      case 'cad':
        price = pet.price_canada;
        break;
      case 'crc':
        // Asegurarnos de usar específicamente price_costa_rica
        price = pet.price_costa_rica;
        console.log('CRC Price:', {
          price_costa_rica: pet.price_costa_rica,
          selectedCurrency: code,
          finalPrice: price
        });
        break;
      case 'nio':
        price = pet.price_salvador;
        break;
      case 'pab':
        price = pet.price_panama;
        break;
      default:
        price = pet.price_usd || pet.price;
    }
    // Ensure we return a number
    return Number(price);
  };

  const getCountryAndCurrency = (currency) => {
    // Special handling for Costa Rica based on price
    if (currency === 'crc') {
      const price = getPriceForCurrency(dog || cat, currency);
      console.log('Costa Rica Price Check:', {
        price,
        price_costa_rica: (dog || cat)?.price_costa_rica,
        selectedCurrency: currency
      });
      return {
        country: 'Costa Rica',
        symbol: price > 9999 ? 'CRC' : 'USD'
      };
    }

    switch (currency) {
      case 'usd':
        return { country: 'United States', symbol: 'USD' };
      case 'pr_usd':
        return { country: 'Puerto Rico', symbol: 'USD' };
      case 'cad':
        return { country: 'Canada', symbol: 'CAD' };
      case 'nio':
        return { country: 'El Salvador', symbol: 'NIO' };
      case 'pab':
        return { country: 'Panama', symbol: 'PAB' };
      default:
        return { country: 'United States', symbol: 'USD' };
    }
  };

  const formatPrice = (price, currency) => {
    // Ensure price is a number
    const numericPrice = Number(price);
    
    // Special handling for Costa Rica
    if (currency === 'crc') {
      console.log('Formatting CRC Price:', {
        numericPrice,
        price_costa_rica: (dog || cat)?.price_costa_rica,
        selectedCurrency: currency
      });
      // If price is greater than 9999, use CRC
      if (numericPrice > 9999) {
        return new Intl.NumberFormat('es-CR', {
          style: 'currency',
          currency: 'CRC',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0
        }).format(numericPrice);
      } else {
        // If price is 9999 or less, use USD
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0
        }).format(numericPrice);
      }
    }

    // Use USD formatting for Puerto Rico and El Salvador
    const formatCurrency = (currency === 'pr_usd' || currency === 'nio') ? 'usd' : currency;
    const locale = formatCurrency === 'usd' ? 'en-US' : 
                  formatCurrency === 'cad' ? 'en-CA' : 
                  formatCurrency === 'crc' ? 'es-CR' :
                  'es-PA';

    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: formatCurrency.toUpperCase(),
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(numericPrice);
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
                alt={getDisplayName(pet)}
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
                    alt={`${getDisplayName(pet)} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

            <DeliveryConditions isCat={!!cat} />
          </div>

          {/* Right Column - Product Details */}
          <div className="space-y-4">
            {/* Imágenes de los padres */}
            <div className="bg-gray-800 p-3 rounded-lg border border-yellow-500/20">
              <h2 className="text-lg font-bold mb-2 text-yellow-400">{getDisplayText('Imágenes de los Padres')}</h2>
              <div className="grid grid-cols-2 gap-2">
                {(dog ? dog.image_father_1 : cat.image_father_1) && (
                  <div className="aspect-w-16 aspect-h-10">
                    <img 
                      src={dog ? dog.image_father_1 : cat.image_father_1} 
                      alt={getDisplayText('Padre 1')} 
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                )}
                {(dog ? dog.image_father_2 : cat.image_father_2) && (
                  <div className="aspect-w-16 aspect-h-10">
                    <img 
                      src={dog ? dog.image_father_2 : cat.image_father_2} 
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
              <h3 className="text-base font-bold mb-1 text-white">{getDisplayName(pet)}</h3>
              <p className="text-sm text-gray-300 mb-3">{getDisplayCharacteristics(pet)}</p>
              
              <div className="grid grid-cols-2 gap-2 mb-3">
                <div className="bg-gray-700/50 p-2 rounded-lg">
                  <span className="text-xs text-gray-400 block mb-0.5">{getDisplayText('Tamaño')}</span>
                  <span className="text-sm text-white font-medium">{pet.size}</span>
                </div>
                {dog && (
                  <>
                    <div className="bg-gray-700/50 p-2 rounded-lg">
                      <span className="text-xs text-gray-400 block mb-0.5">{getDisplayText('Peso')}</span>
                      <span className="text-sm text-white font-medium">{dog.weight}</span>
                    </div>
                    <div className="bg-gray-700/50 p-2 rounded-lg">
                      <span className="text-xs text-gray-400 block mb-0.5">{getDisplayText('Altura')}</span>
                      <span className="text-sm text-white font-medium">{dog.height}</span>
                    </div>
                    <div className="bg-gray-700/50 p-2 rounded-lg">
                      <span className="text-xs text-gray-400 block mb-0.5">{getDisplayText('Camadas')}</span>
                      <span className="text-sm text-white font-medium">{dog.litters}</span>
                    </div>
                  </>
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
                      {formatPrice(price, selectedCurrency)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Botón de pago */}
            <div className="bg-gray-800 p-4 rounded-lg border border-yellow-500/20">
              {stripeError && (
                <div className="mb-4 text-red-500 text-sm">
                  {stripeError}
                </div>
              )}
              <button
                onClick={handlePayment}
                disabled={isLoading}
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-6 rounded-lg shadow-lg transition-all transform hover:scale-105 disabled:opacity-50"
              >
                {isLoading ? getDisplayText('Procesando...') : getDisplayText('Adoptar ahora')}
              </button>
            </div>

            {/* Testimonios */}
            {((pet.testimonies_english && pet.testimonies_english.trim() !== '') || 
              (pet.testimonies_spanish && pet.testimonies_spanish.trim() !== '')) ? (
              <div className="bg-gray-800 p-4 rounded-lg border border-yellow-500/20 mt-4">
                <h2 className="text-lg font-bold mb-4 text-yellow-400">
                  {isEnglish ? 'What Our Clients Say' : 'Lo Que Dicen Nuestros Clientes'}
                </h2>
                <div className="space-y-4">
                  {isEnglish ? (
                    pet.testimonies_english && pet.testimonies_english.trim() !== '' && (
                      <div className="bg-gray-700/50 p-4 rounded-lg">
                        <div className="flex items-start space-x-4">
                          <div className="flex-1">
                            <p className="text-gray-300 italic mb-2">"{pet.testimonies_english}"</p>
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-white font-medium">{pet.nombre_familia || 'Anonymous'}</p>
                                <p className="text-gray-400 text-sm">
                                  {pet.ubicacion && pet.pais ? `${pet.ubicacion}, ${pet.pais}` : 'Location not specified'}
                                </p>
                              </div>
                              {pet.fecha_testimonio && (
                                <div className="text-yellow-400 text-sm">
                                  {new Date(pet.fecha_testimonio).toLocaleDateString(
                                    'en-US',
                                    { year: 'numeric', month: 'long', day: 'numeric' }
                                  )}
                                </div>
                              )}
                            </div>
                            {(pet.tipo_mascota || pet.raza) && (
                              <p className="text-yellow-400 text-sm mt-2">
                                {[pet.tipo_mascota, pet.raza].filter(Boolean).join(' - ')}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  ) : (
                    pet.testimonies_spanish && pet.testimonies_spanish.trim() !== '' && (
                      <div className="bg-gray-700/50 p-4 rounded-lg">
                        <div className="flex items-start space-x-4">
                          <div className="flex-1">
                            <p className="text-gray-300 italic mb-2">"{pet.testimonies_spanish}"</p>
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-white font-medium">{pet.nombre_familia || 'Anónimo'}</p>
                                <p className="text-gray-400 text-sm">
                                  {pet.ubicacion && pet.pais ? `${pet.ubicacion}, ${pet.pais}` : 'Ubicación no especificada'}
                                </p>
                              </div>
                              {pet.fecha_testimonio && (
                                <div className="text-yellow-400 text-sm">
                                  {new Date(pet.fecha_testimonio).toLocaleDateString(
                                    'es-ES',
                                    { year: 'numeric', month: 'long', day: 'numeric' }
                                  )}
                                </div>
                              )}
                            </div>
                            {(pet.tipo_mascota || pet.raza) && (
                              <p className="text-yellow-400 text-sm mt-2">
                                {[pet.tipo_mascota, pet.raza].filter(Boolean).join(' - ')}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentPage; 
