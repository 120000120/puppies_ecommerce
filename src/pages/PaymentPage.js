import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useLocation, useNavigate } from 'react-router-dom';

// Inicializar Stripe con la clave pública
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

function PaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [stripeError, setStripeError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
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
      
      const response = await fetch('https://api.stripe.com/v1/checkout/sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Bearer ${process.env.REACT_APP_STRIPE_SECRET_KEY}`
        },
        body: new URLSearchParams({
          'payment_method_types[]': 'card',
          'line_items[0][price_data][currency]': 'usd',
          'line_items[0][price_data][product_data][name]': dog ? dog.name : cat.name,
          'line_items[0][price_data][product_data][description]': dog ? dog.characteristics : cat.characteristics,
          'line_items[0][price_data][product_data][images][]': dog ? dog.image_1 : cat.image_1,
          'line_items[0][price_data][unit_amount]': Math.round((dog ? dog.price : cat.price) * 100),
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

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-yellow-400">Completar Adopción</h1>
      
      {stripeError && (
        <div className="mb-3 p-3 bg-red-500/10 border border-red-400 text-red-400 rounded-lg">
          {stripeError}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Columna izquierda: Imágenes del cachorro */}
        <div className="space-y-4">
          {/* Galería de imágenes */}
          <div className="bg-gray-800 p-3 rounded-lg border border-yellow-500/20">
            <h2 className="text-lg font-bold mb-2 text-yellow-400">Galería de Imágenes</h2>
            <div className="space-y-2">
              <div className="relative aspect-w-16 aspect-h-10">
                <img 
                  src={images[currentImageIndex]} 
                  alt={`${pet.name} - Imagen ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover rounded-lg"
                />
                {images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-1.5 rounded-full hover:bg-black/70"
                    >
                      ←
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-1.5 rounded-full hover:bg-black/70"
                    >
                      →
                    </button>
                  </>
                )}
              </div>
              
              {/* Miniaturas */}
              <div className="grid grid-cols-6 gap-1">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`aspect-w-1 aspect-h-1 rounded-lg overflow-hidden border ${
                      currentImageIndex === index ? 'border-yellow-400' : 'border-transparent'
                    }`}
                  >
                    <img 
                      src={image} 
                      alt={`Miniatura ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Columna derecha: Información y pago */}
        <div className="space-y-4">
          {/* Imágenes de los padres (solo para perros) */}
          {dog && (
            <div className="bg-gray-800 p-3 rounded-lg border border-yellow-500/20">
              <h2 className="text-lg font-bold mb-2 text-yellow-400">Imágenes de los Padres</h2>
              <div className="grid grid-cols-2 gap-2">
                {dog.image_father_1 && (
                  <div className="aspect-w-16 aspect-h-10">
                    <img 
                      src={dog.image_father_1} 
                      alt="Padre 1" 
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                )}
                {dog.image_father_2 && (
                  <div className="aspect-w-16 aspect-h-10">
                    <img 
                      src={dog.image_father_2} 
                      alt="Padre 2" 
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                )}
              </div>
            </div>
          )}

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
                <span className="text-xl font-bold text-yellow-400">
                  {new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0
                  }).format(pet.price)}
                </span>
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
  );
}

export default PaymentPage; 