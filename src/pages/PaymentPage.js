import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCurrency } from '../context/CurrencyContext';
import DeliveryConditions from '../components/DeliveryConditions';

// Inicializar Stripe con la clave pública
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

function PaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [stripeError, setStripeError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { selectedCurrency, getPriceByCurrency } = useCurrency();
  
  const { dog, cat } = location.state || {};

  useEffect(() => {
    if (!dog && !cat) {
      navigate('/catalogo');
      return;
    }
  }, [dog, cat, navigate]);

  const handlePayment = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStripeError(null);

    try {
      const stripe = await stripePromise;
      const pet = dog || cat;
      const price = getPriceByCurrency(pet);
      
      const response = await fetch('https://api.stripe.com/v1/checkout/sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Bearer ${process.env.REACT_APP_STRIPE_SECRET_KEY}`
        },
        body: new URLSearchParams({
          'payment_method_types[]': 'card',
          'line_items[0][price_data][currency]': selectedCurrency,
          'line_items[0][price_data][product_data][name]': pet.name,
          'line_items[0][price_data][product_data][description]': pet.characteristics,
          'line_items[0][price_data][product_data][images][]': pet.image_1,
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
    if (code === 'usd') return pet.price;
    if (code === 'cad') return pet.price_canada;
    if (code === 'crc') return pet.price_costa_rica;
    if (code === 'nio') return pet.price_nicaragua;
    if (code === 'pab') return pet.price_panama;
    return pet.price;
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
                alt={pet.name}
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
                    alt={`${pet.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Add DeliveryConditions component here */}
            <DeliveryConditions isCat={!!cat} />
          </div>

          {/* Right Column - Product Details */}
          <div className="space-y-4">
            {/* Imágenes de los padres */}
            <div className="bg-gray-800 p-3 rounded-lg border border-yellow-500/20">
              <h2 className="text-lg font-bold mb-2 text-yellow-400">Imágenes de los Padres</h2>
              <div className="grid grid-cols-2 gap-2">
                {(dog ? dog.image_father_1 : cat.image_father_1) && (
                  <div className="aspect-w-16 aspect-h-10">
                    <img 
                      src={dog ? dog.image_father_1 : cat.image_father_1} 
                      alt="Padre 1" 
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                )}
                {(dog ? dog.image_father_2 : cat.image_father_2) && (
                  <div className="aspect-w-16 aspect-h-10">
                    <img 
                      src={dog ? dog.image_father_2 : cat.image_father_2} 
                      alt="Padre 2" 
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Información del producto */}
            <div className="bg-gray-800 p-4 rounded-lg border border-yellow-500/20">
              <h2 className="text-lg font-bold mb-2 text-yellow-400">Detalles del Producto</h2>
              <h3 className="text-base font-bold mb-1 text-white">{pet.name}</h3>
              <p className="text-sm text-gray-300 mb-3">{pet.characteristics}</p>
              
              <div className="grid grid-cols-2 gap-2 mb-3">
                <div className="bg-gray-700/50 p-2 rounded-lg">
                  <span className="text-xs text-gray-400 block mb-0.5">Tamaño</span>
                  <span className="text-sm text-white font-medium">{pet.size}</span>
                </div>
                {dog && (
                  <>
                    <div className="bg-gray-700/50 p-2 rounded-lg">
                      <span className="text-xs text-gray-400 block mb-0.5">Peso</span>
                      <span className="text-sm text-white font-medium">{dog.weight}</span>
                    </div>
                    <div className="bg-gray-700/50 p-2 rounded-lg">
                      <span className="text-xs text-gray-400 block mb-0.5">Altura</span>
                      <span className="text-sm text-white font-medium">{dog.height}</span>
                    </div>
                    <div className="bg-gray-700/50 p-2 rounded-lg">
                      <span className="text-xs text-gray-400 block mb-0.5">Camadas</span>
                      <span className="text-sm text-white font-medium">{dog.litters}</span>
                    </div>
                  </>
                )}
              </div>

              <div className="border-t border-gray-700 pt-3 mt-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Precio total</span>
                  <div className="flex items-center space-x-2">
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
                <div className="mt-2 flex flex-wrap gap-2">
                  {allCurrencies.map((cur) => (
                    <span key={cur.code} className="text-xs bg-gray-800 text-yellow-300 px-2 py-1 rounded">
                      {new Intl.NumberFormat(cur.locale, {
                        style: 'currency',
                        currency: cur.label,
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0
                      }).format(getPriceForCurrency(pet, cur.code))} {cur.label}
                    </span>
                  ))}
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
                {isLoading ? 'Procesando...' : 'Adoptar ahora'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentPage; 