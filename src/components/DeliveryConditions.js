import { useState } from 'react';
import { useCurrency } from '../context/CurrencyContext';
import { deliveryConditions } from '../data/deliveryConditions';

const DeliveryConditions = ({ isCat = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { selectedCurrency } = useCurrency();

  const conditions = isCat 
    ? deliveryConditions.cats[selectedCurrency]
    : deliveryConditions.dogs[selectedCurrency];

  return (
    <div className="mt-6 bg-gray-800 rounded-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 text-left bg-gray-700 hover:bg-gray-600 transition-colors duration-200 flex justify-between items-center"
      >
        <span className="text-lg font-semibold text-white">Condiciones de entrega</span>
        <svg
          className={`w-6 h-6 text-yellow-400 transform transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      
      {isOpen && (
        <div className="p-6 bg-gray-800">
          <h3 className="text-xl font-bold text-yellow-400 mb-4">{conditions.title}</h3>
          <div className="space-y-4">
            {conditions.conditions.map((text, index) => (
              <p
                key={index}
                className={`text-gray-300 ${
                  text.startsWith('1.') || text.startsWith('2.') || text.startsWith('3.') ||
                  text.startsWith('4.') || text.startsWith('5.') || text.startsWith('6.') ||
                  text.startsWith('7.') || text.startsWith('8.') || text.startsWith('9.') ||
                  text.startsWith('10.') || text.startsWith('11.') || text.startsWith('12.')
                    ? 'font-semibold text-white'
                    : ''
                }`}
              >
                {text}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DeliveryConditions; 