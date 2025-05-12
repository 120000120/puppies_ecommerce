import { Link } from 'react-router-dom';
import { useCurrency } from '../context/CurrencyContext';

const CatCard = ({ cat }) => {
  const { getPriceByCurrency, getDisplayCurrency } = useCurrency();
  const price = getPriceByCurrency(cat);
  const displayCurrency = getDisplayCurrency(cat);

  const getCurrencyInfo = (currency) => {
    switch (currency) {
      case 'usd':
        return { country: 'Estados Unidos', symbol: 'USD' };
      case 'cad':
        return { country: 'Canadá', symbol: 'CAD' };
      case 'crc':
        return { country: 'Costa Rica', symbol: 'CRC' };
      case 'nio':
        return { country: 'Nicaragua', symbol: 'NIO' };
      case 'pab':
        return { country: 'Panamá', symbol: 'PAB' };
      default:
        return { country: 'Estados Unidos', symbol: 'USD' };
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat(
      displayCurrency === 'usd' ? 'en-US' : 
      displayCurrency === 'cad' ? 'en-CA' : 
      displayCurrency === 'crc' ? 'es-CR' :
      displayCurrency === 'nio' ? 'es-NI' :
      'es-PA', {
        style: 'currency',
        currency: displayCurrency.toUpperCase(),
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }
    ).format(price);
  };

  const currencyInfo = getCurrencyInfo(displayCurrency);

  const handleClick = () => {
    console.log('Datos del gato antes de la navegación:', {
      ...cat,
      price: parseFloat(cat.price),
      image_1: cat.image_1 || '',
      name: cat.name || '',
      characteristics: cat.characteristics || '',
      size: cat.size || ''
    });
  };

  return (
    <div className="group bg-gray-800 text-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]">
      <div className="relative h-64 overflow-hidden">
        <img 
          src={cat.image_1} 
          alt={cat.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-white truncate">{cat.name}</h3>
          <span className="bg-yellow-500/10 text-yellow-400 text-xs font-semibold px-3 py-1 rounded-full border border-yellow-500/20">
            {cat.size}
          </span>
        </div>
        
        <p className="text-gray-300 text-sm mb-6 line-clamp-2 min-h-[2.5rem]">{cat.characteristics}</p>
        
        <div className="mt-4 flex justify-between items-center">
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-yellow-500">{formatPrice(price)}</span>
            <span className="text-xs text-gray-400 mt-1">{currencyInfo.country} - {currencyInfo.symbol}</span>
          </div>
          <div className="flex flex-col items-end space-y-2">
            <Link
              to="/payment"
              state={{ 
                cat: {
                  ...cat,
                  price: parseFloat(cat.price),
                  image_1: cat.image_1 || '',
                  name: cat.name || '',
                  characteristics: cat.characteristics || '',
                  size: cat.size || ''
                }
              }}
              onClick={handleClick}
              className="inline-flex items-center bg-yellow-500 hover:bg-yellow-600 text-black font-medium py-2.5 px-5 rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-105"
            >
              Adoptar
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </Link>
            <a
              href={`https://wa.me/50661537799?text=${encodeURIComponent(`Hola, estoy interesado en este hermoso gatito ${cat.name} 🐱\n\n${cat.image_1}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-gray-400 hover:text-green-400 transition-colors duration-300 flex items-center"
            >
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
              </svg>
              Contactar por WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CatCard; 