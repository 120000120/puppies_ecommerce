import React from 'react';
import { Link } from 'react-router-dom';
import { FaTimesCircle, FaHome, FaShoppingBag } from 'react-icons/fa';

const CancelPage = () => {
  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden border border-yellow-500/20">
          <div className="p-8 text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-red-500/10 rounded-full p-4 border-4 border-red-500/20">
                <FaTimesCircle className="h-16 w-16 text-red-400" />
              </div>
            </div>
            
            <h1 className="text-3xl font-bold text-red-400 mb-4">
              Pago Cancelado
            </h1>
            
            <p className="text-gray-300 text-lg mb-8">
              Tu pago ha sido cancelado. No se ha realizado ningún cargo.
            </p>
            
            <div className="bg-gray-700/50 rounded-lg p-6 mb-8 border border-yellow-500/20">
              <h2 className="text-xl font-semibold text-yellow-400 mb-4">
                ¿Qué deseas hacer ahora?
              </h2>
              <div className="space-y-3 text-gray-300">
                <p>Puedes volver al catálogo para seguir explorando nuestras mascotas.</p>
                <p>O si lo prefieres, puedes volver a intentar el pago más tarde.</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/catalogo"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-black bg-yellow-500 hover:bg-yellow-600 transition-all transform hover:scale-105"
              >
                <FaShoppingBag className="mr-2" />
                Volver al catálogo
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

export default CancelPage; 