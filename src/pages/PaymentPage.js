import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

// Configurar Axios
const api = axios.create({
  baseURL: 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Inicializar Stripe
const stripePromise = loadStripe('pk_live_51R9JjG02kJcG0b7cgStRwVRq8Ynsa3g1tojAiIlW1ahYqzL3Afg5LhIfEdlrXqkVV7gYmp4bv25nI0Z2n5IU673I00EZVaZJg4');

function PaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [stripeError, setStripeError] = useState(null);
  
  const { dog } = location.state || {};

  useEffect(() => {
    if (!dog) {
      navigate('/catalogo');
      return;
    }
  }, [dog, navigate]);

  const handlePayment = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStripeError(null);

    try {
      const response = await api.post('/api/stripe', {
        price: dog.price,
        email: 'test@example.com',
        product_data: {
          name: dog.name,
          description: dog.characteristics,
          images: [dog.image]
        }
      });

      if (response.data.sessionUrl) {
        window.location.href = response.data.sessionUrl;
      } else {
        throw new Error('No se pudo obtener la URL de pago');
      }
    } catch (error) {
      console.error('Error:', error);
      setStripeError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (!dog) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-yellow-400">Completar Compra</h1>
      
      {stripeError && (
        <div className="mb-4 p-4 bg-red-500/10 border border-red-400 text-red-400 rounded-lg">
          {stripeError}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Información del producto */}
        <div className="bg-gray-800 p-6 rounded-lg border border-yellow-500/20">
          <h2 className="text-xl font-bold mb-4 text-yellow-400">Detalles del Producto</h2>
          <div className="aspect-w-16 aspect-h-9 mb-4">
            <img 
              src={dog.image} 
              alt={dog.name} 
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <h3 className="text-lg font-bold mb-2 text-white">{dog.name}</h3>
          <p className="text-gray-300 mb-2">{dog.characteristics}</p>
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-yellow-500/10 text-yellow-400 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-yellow-500/20">
              {dog.size}
            </span>
            <span className="text-gray-400 text-sm">Peso: {dog.weight}</span>
            <span className="text-gray-400 text-sm">Altura: {dog.height}</span>
          </div>
          <div className="text-2xl font-bold text-yellow-400">
            {new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0
            }).format(dog.price)}
          </div>
        </div>

        {/* Botón de pago */}
        <div className="bg-gray-800 p-6 rounded-lg border border-yellow-500/20 flex items-center justify-center">
          <button
            onClick={handlePayment}
            disabled={isLoading}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-4 px-8 rounded-lg shadow-lg transition-all transform hover:scale-105 disabled:opacity-50"
          >
            {isLoading ? 'Procesando...' : 'Pagar con Stripe'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default PaymentPage; 