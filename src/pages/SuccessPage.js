import React from 'react';
import { Link } from 'react-router-dom';
import { FaCheckCircle, FaHome, FaShoppingBag } from 'react-icons/fa';

const SuccessPage = () => {
  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden border border-yellow-500/20">
          <div className="p-8 text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-yellow-500/10 rounded-full p-4 border-4 border-yellow-500/20">
                <FaCheckCircle className="h-16 w-16 text-yellow-400" />
              </div>
            </div>
            
            <h1 className="text-3xl font-bold text-yellow-400 mb-4">
              ¡Pago Exitoso!
            </h1>
            
            <p className="text-gray-300 text-lg mb-8">
              Gracias por tu compra. Hemos recibido tu pago correctamente.
            </p>
            
            <div className="bg-gray-700/50 rounded-lg p-6 mb-8 border border-yellow-500/20">
              <h2 className="text-xl font-semibold text-yellow-400 mb-4">
                Detalles de tu compra
              </h2>
              <div className="space-y-3 text-gray-300">
                <p>Recibirás un correo electrónico con los detalles de tu compra.</p>
                <p>Nuestro equipo se pondrá en contacto contigo pronto para coordinar la entrega.</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/catalogo"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-black bg-yellow-500 hover:bg-yellow-600 transition-all transform hover:scale-105"
              >
                <FaShoppingBag className="mr-2" />
                Ver más mascotas
              </Link>
              
              <Link
                to="/"
                className="inline-flex items-center justify-center px-6 py-3 border border-yellow-500/20 text-base font-medium rounded-lg text-yellow-400 hover:bg-yellow-500/10 transition-all transform hover:scale-105"
              >
                <FaHome className="mr-2" />
                Ir al inicio
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage; 