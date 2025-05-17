import { Link } from 'react-router-dom';
import { useCurrency } from '../context/CurrencyContext';

const CatCard = ({ cat }) => {
  console.log('CatCard - Received cat data from cats_new:', JSON.stringify({
    id: cat.id,
    name: cat.name,
    characteristics: cat.characteristics,
    characteristics_english: cat.characteristics_english,
    size: cat.size,
    image_1: cat.image_1,
    price: cat.price,
    price_costa_rica: cat.price_costa_rica,
    price_salvador: cat.price_salvador,
    price_panama: cat.price_panama,
    price_canada: cat.price_canada,
    salud_general: cat.salud_general,
    salud_english: cat.salud_english
  }, null, 2));

  const { getPriceByCurrency, getDisplayCurrency, selectedCurrency } = useCurrency();
  const price = getPriceByCurrency(cat);
  const displayCurrency = getDisplayCurrency(cat);
  const isEnglish = selectedCurrency === 'usd' || selectedCurrency === 'cad';

  console.log('CatCard - Initial currency check:', JSON.stringify({
    displayCurrency,
    isEnglish,
    price_canada: cat.price_canada,
    price: cat.price
  }, null, 2));

  // Get the correct name and characteristics based on language
  const getName = () => {
    return cat.name; // cats_new doesn't have name_en yet
  };

  const getCharacteristics = () => {
    if (isEnglish) {
      if (!cat.characteristics_english) {
        console.warn('CatCard - characteristics_english not found in cats_new for:', cat.name);
      }
      return cat.characteristics_english || cat.characteristics;
    }
    return cat.characteristics;
  };

  console.log('CatCard - Name and Characteristics:', JSON.stringify({
    isEnglish,
    name: getName(),
    characteristics: getCharacteristics(),
    characteristics_english: cat.characteristics_english
  }, null, 2));

  const getCurrencyInfo = (currency) => {
    const info = (() => {
      switch (currency) {
        case 'usd':
          return { country: isEnglish ? 'United States' : 'Estados Unidos', symbol: 'USD' };
        case 'cad':
          return { country: isEnglish ? 'Canada' : 'Canadá', symbol: 'CAD' };
        case 'crc':
          return { country: 'Costa Rica', symbol: 'CRC' };
        case 'nio':
          return { country: 'El Salvador', symbol: 'SVC' };
        case 'pab':
          return { country: 'Panamá', symbol: 'PAB' };
        default:
          return { country: isEnglish ? 'United States' : 'Estados Unidos', symbol: 'USD' };
      }
    })();
    
    console.log('CatCard - Currency info:', JSON.stringify({
      ...info,
      price: currency === 'cad' ? cat.price_canada : 
             currency === 'crc' ? cat.price_costa_rica :
             currency === 'nio' ? cat.price_salvador :
             currency === 'pab' ? cat.price_panama :
             cat.price
    }, null, 2));
    return info;
  };

  const formatPrice = (price) => {
    const formattedPrice = new Intl.NumberFormat(
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
    
    console.log('CatCard - Formatted price:', JSON.stringify({
      originalPrice: price,
      formattedPrice,
      currency: displayCurrency.toUpperCase(),
      locale: displayCurrency === 'usd' ? 'en-US' : 
              displayCurrency === 'cad' ? 'en-CA' : 
              displayCurrency === 'crc' ? 'es-CR' :
              displayCurrency === 'nio' ? 'es-NI' :
              'es-PA'
    }, null, 2));
    return formattedPrice;
  };

  const currencyInfo = getCurrencyInfo(displayCurrency);

  const handleClick = () => {
    const catData = {
      id: cat.id,
      name: getName(),
      price: price,
      price_usd: cat.price,
      price_canada: cat.price_canada,
      price_salvador: cat.price_salvador,
      price_panama: cat.price_panama,
      price_costa_rica: cat.price_costa_rica,
      characteristics: getCharacteristics(),
      characteristics_en: cat.characteristics_english,
      size: cat.size,
      image_1: cat.image_1,
      image_2: cat.image_2,
      image_3: cat.image_3,
      image_4: cat.image_4,
      image_5: cat.image_5,
      image_6: cat.image_6,
      image_father_1: cat.image_father_1,
      image_father_2: cat.image_father_2,
      salud_general: cat.salud_general,
      salud_english: cat.salud_english
    };
    
    console.log('CatCard - Cat data for payment from cats_new:', JSON.stringify(catData, null, 2));
  };

  // Ensure we have all required data before rendering
  if (!cat || !cat.name || !cat.image_1) {
    console.error('CatCard - Missing required data from cats_new:', JSON.stringify(cat, null, 2));
    return null;
  }

  return (
    <div className="group bg-gray-800 text-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]">
      <div className="relative h-64 overflow-hidden flex-shrink-0">
        <div className="absolute inset-0">
          <img 
            src={cat.image_1} 
            alt={getName()} 
            className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
            style={{ 
              objectPosition: 'center center',
              maxHeight: '100%',
              maxWidth: '100%'
            }}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-white truncate">
            {getName()}
          </h3>
          <span className="bg-yellow-500/10 text-yellow-400 text-xs font-semibold px-3 py-1 rounded-full border border-yellow-500/20">
            {cat.size}
          </span>
        </div>
        
        <p className="text-gray-300 text-sm mb-6 line-clamp-2 min-h-[2.5rem]">
          {getCharacteristics()}
        </p>

        {/* Health Information Section */}
        {(cat.salud_general || cat.salud_english) && (
          <div className="mb-6">
            <div className="flex items-center space-x-2 bg-gray-700/50 p-2 rounded-lg">
              <svg className="w-4 h-4 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
              </svg>
              <span className="text-sm text-gray-300">
                {isEnglish ? (cat.salud_english || cat.salud_general) : cat.salud_general}
              </span>
            </div>
          </div>
        )}
        
        <div className="mt-4 flex justify-between items-center">
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-yellow-500">{formatPrice(price)}</span>
            <span className="text-xs text-gray-400 mt-1">{currencyInfo.country} - {currencyInfo.symbol}</span>
          </div>
          <div className="flex flex-col items-end space-y-2">
            <Link
              to="/cat-payment"
              state={{ 
                cat: {
                  id: cat.id,
                  name: getName(),
                  price: price,
                  price_usd: cat.price,
                  price_canada: cat.price_canada,
                  price_salvador: cat.price_salvador,
                  price_panama: cat.price_panama,
                  price_costa_rica: cat.price_costa_rica,
                  characteristics: getCharacteristics(),
                  characteristics_en: cat.characteristics_english,
                  size: cat.size,
                  image_1: cat.image_1,
                  image_2: cat.image_2,
                  image_3: cat.image_3,
                  image_4: cat.image_4,
                  image_5: cat.image_5,
                  image_6: cat.image_6,
                  image_father_1: cat.image_father_1,
                  image_father_2: cat.image_father_2,
                  salud_general: cat.salud_general,
                  salud_english: cat.salud_english
                }
              }}
              onClick={handleClick}
              className="inline-flex items-center bg-yellow-500 hover:bg-yellow-600 text-black font-medium py-2.5 px-5 rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-105"
            >
              {isEnglish ? 'Adopt' : 'Adoptar'}
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </Link>
            <a
              href={`https://wa.me/17064097145?text=${encodeURIComponent(
                isEnglish 
                  ? `Hello, I'm interested in this beautiful ${getName()} kitten 🐱\n\n${cat.image_1}`
                  : `Hola, estoy interesado en este hermoso gatito ${getName()} 🐱\n\n${cat.image_1}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-gray-400 hover:text-green-400 transition-colors duration-300 flex items-center"
            >
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
              </svg>
              {isEnglish ? 'Contact via WhatsApp' : 'Contactar por WhatsApp'}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CatCard; 