import { Link } from 'react-router-dom';
import { useCurrency } from '../context/CurrencyContext';

const DogCard = ({ dog }) => {
  console.log('DogCard - Received dog data from dogs_new:', JSON.stringify({
    id: dog.id,
    name: dog.name,
    name_en: dog.name_en,
    price_usd: dog.price_usd,
    price_canada: dog.price_canada,
    price_salvador: dog.price_salvador,
    price_panama: dog.price_panama,
    price_costa_rica: dog.price_costa_rica,
    characteristics: dog.characteristics,
    characteristics_en: dog.characteristics_en,
    size: dog.size,
    weight: dog.weight,
    height: dog.height,
    litters: dog.litters,
    image_1: dog.image_1,
    image_2: dog.image_2,
    image_3: dog.image_3,
    image_4: dog.image_4,
    image_5: dog.image_5,
    image_6: dog.image_6,
    image_father_1: dog.image_father_1,
    image_father_2: dog.image_father_2
  }, null, 2));
  
  const { getPriceByCurrency, getDisplayCurrency, selectedCurrency } = useCurrency();
  const displayCurrency = selectedCurrency;
  const isEnglish = selectedCurrency === 'usd' || selectedCurrency === 'cad';

  console.log('DogCard - Initial currency check:', JSON.stringify({
    displayCurrency,
    selectedCurrency,
    isEnglish,
    price_canada: dog.price_canada,
    price_usd: dog.price_usd,
    price_costa_rica: dog.price_costa_rica
  }, null, 2));

  // Get the correct name and characteristics based on language
  const getName = () => {
    if (isEnglish) {
      if (!dog.name_en) {
        console.warn('DogCard - name_en not found in dogs_new for:', dog.name);
      }
      return dog.name_en || dog.name;
    }
    return dog.name;
  };

  const getCharacteristics = () => {
    if (isEnglish) {
      if (!dog.characteristics_en) {
        console.warn('DogCard - characteristics_en not found in dogs_new for:', dog.name);
      }
      return dog.characteristics_en || dog.characteristics;
    }
    return dog.characteristics;
  };

  console.log('DogCard - Name and Characteristics:', JSON.stringify({
    isEnglish,
    name: getName(),
    name_en: dog.name_en,
    characteristics: getCharacteristics(),
    characteristics_en: dog.characteristics_en
  }, null, 2));

  console.log('DogCard - Currency Info:', JSON.stringify({
    displayCurrency,
    selectedCurrency,
    isEnglish,
    usdPrice: dog.price_usd,
    cadPrice: dog.price_canada,
    crcPrice: dog.price_costa_rica,
    allPrices: {
      usd: dog.price_usd,
      cad: dog.price_canada,
      crc: dog.price_costa_rica,
      nio: dog.price_salvador,
      pab: dog.price_panama
    }
  }, null, 2));

  // Get the correct price based on currency
  const getPrice = () => {
    const price = (() => {
      switch (displayCurrency) {
        case 'usd':
        case 'pr_usd':
          console.log('DogCard - Using USD price from dogs_new:', JSON.stringify({
            price: dog.price_usd,
            type: typeof dog.price_usd,
            raw: dog.price_usd
          }, null, 2));
          return parseFloat(dog.price_usd || dog.price);
        case 'cad':
          console.log('DogCard - Using CAD price from dogs_new:', JSON.stringify({
            price: dog.price_canada,
            type: typeof dog.price_canada,
            raw: dog.price_canada
          }, null, 2));
          if (!dog.price_canada) {
            console.warn('DogCard - CAD price not found in dogs_new, falling back to USD price');
          }
          return parseFloat(dog.price_canada || dog.price_usd || dog.price);
        case 'crc':
          // Asegurarnos de usar específicamente price_costa_rica
          const costaRicaPrice = dog.price_costa_rica;
          console.log('DogCard - Using CRC price from dogs_new:', JSON.stringify({
            price: costaRicaPrice,
            type: typeof costaRicaPrice,
            raw: costaRicaPrice,
            displayCurrency,
            selectedCurrency
          }, null, 2));
          if (!costaRicaPrice) {
            console.warn('DogCard - CRC price not found in dogs_new for:', dog.name);
          }
          return parseFloat(costaRicaPrice);
        case 'nio':
          console.log('DogCard - Using NIO price from dogs_new (El Salvador):', JSON.stringify({
            price: dog.price_salvador,
            type: typeof dog.price_salvador,
            raw: dog.price_salvador
          }, null, 2));
          return parseFloat(dog.price_salvador || dog.price_usd || dog.price);
        case 'pab':
          console.log('DogCard - Using PAB price from dogs_new:', JSON.stringify({
            price: dog.price_panama,
            type: typeof dog.price_panama,
            raw: dog.price_panama
          }, null, 2));
          return parseFloat(dog.price_panama);
        default:
          console.log('DogCard - Using default price from dogs_new:', JSON.stringify({
            price: dog.price_usd || dog.price,
            type: typeof (dog.price_usd || dog.price),
            raw: dog.price_usd || dog.price
          }, null, 2));
          return parseFloat(dog.price_usd || dog.price);
      }
    })();
    
    console.log('DogCard - Final calculated price from dogs_new:', JSON.stringify({
      price,
      type: typeof price,
      currency: displayCurrency,
      originalPrice: displayCurrency === 'cad' ? dog.price_canada : 
                     displayCurrency === 'crc' ? dog.price_costa_rica :
                     displayCurrency === 'nio' ? dog.price_salvador :
                     displayCurrency === 'pab' ? dog.price_panama :
                     dog.price_usd || dog.price,
      displayCurrency,
      selectedCurrency
    }, null, 2));
    return price;
  };

  const price = getPrice();
  const displayName = getName();
  const displayCharacteristics = getCharacteristics();

  const getCurrencyInfo = (currency) => {
    const info = (() => {
      switch (selectedCurrency) {
        case 'usd':
          return { country: isEnglish ? 'United States' : 'Estados Unidos', symbol: 'USD' };
        case 'pr_usd':
          return { country: 'Puerto Rico', symbol: 'USD' };
        case 'cad':
          return { country: isEnglish ? 'Canada' : 'Canadá', symbol: 'CAD' };
        case 'crc':
          // Special handling for Costa Rica based on price
          const price = getPrice();
          console.log('DogCard - Costa Rica currency info:', {
            price,
            price_costa_rica: dog.price_costa_rica,
            selectedCurrency: currency
          });
          return {
            country: 'Costa Rica',
            symbol: price > 9999 ? 'CRC' : 'USD'
          };
        case 'nio':
          return { country: 'El Salvador', symbol: 'SVC' };
        case 'pab':
          return { country: 'Panamá', symbol: 'PAB' };
        default:
          return { country: isEnglish ? 'United States' : 'Estados Unidos', symbol: 'USD' };
      }
    })();
    
    console.log('DogCard - Currency info:', JSON.stringify({
      ...info,
      selectedCurrency,
      price: currency === 'cad' ? dog.price_canada : 
             currency === 'crc' ? dog.price_costa_rica :
             currency === 'nio' ? dog.price_salvador :
             currency === 'pab' ? dog.price_panama :
             dog.price_usd || dog.price
    }, null, 2));
    return info;
  };

  const formatPrice = (price) => {
    // Special handling for Costa Rica
    if (displayCurrency === 'crc') {
      const numericPrice = Number(price);
      console.log('DogCard - Formatting CRC price:', {
        price: numericPrice,
        price_costa_rica: dog.price_costa_rica,
        displayCurrency,
        selectedCurrency
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

    // Use USD formatting for Puerto Rico
    const formatCurrency = displayCurrency === 'pr_usd' ? 'usd' : displayCurrency;
    const locale = formatCurrency === 'usd' ? 'en-US' : 
                  formatCurrency === 'cad' ? 'en-CA' : 
                  formatCurrency === 'crc' ? 'es-CR' :
                  formatCurrency === 'nio' ? 'es-NI' :
                  'es-PA';

    const formattedPrice = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: formatCurrency.toUpperCase(),
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
    
    console.log('DogCard - Formatted price:', JSON.stringify({
      originalPrice: price,
      formattedPrice,
      currency: formatCurrency.toUpperCase(),
      locale
    }, null, 2));
    return formattedPrice;
  };

  const currencyInfo = getCurrencyInfo(displayCurrency);

  const handleClick = () => {
    const dogData = {
      id: dog.id,
      name: displayName,
      name_en: dog.name_en || dog.name,
      price: price,
      price_usd: dog.price_usd || dog.price,
      price_canada: dog.price_canada || dog.price_usd || dog.price,
      price_salvador: dog.price_salvador || dog.price_usd || dog.price,
      price_panama: dog.price_panama || dog.price_usd || dog.price,
      price_costa_rica: dog.price_costa_rica,
      characteristics: displayCharacteristics,
      characteristics_en: dog.characteristics_en || dog.characteristics,
      size: dog.size,
      weight: dog.weight,
      height: dog.height,
      litters: dog.litters,
      image_1: dog.image_1,
      image_2: dog.image_2,
      image_3: dog.image_3,
      image_4: dog.image_4,
      image_5: dog.image_5,
      image_6: dog.image_6,
      image_father_1: dog.image_father_1,
      image_father_2: dog.image_father_2,
      selectedCurrency: displayCurrency
    };
    
    console.log('DogCard - Dog data for payment from dogs_new:', JSON.stringify(dogData, null, 2));
  };

  // Ensure we have all required data before rendering
  if (!dog || !dog.name || !dog.image_1) {
    console.error('DogCard - Missing required data from dogs_new:', JSON.stringify(dog, null, 2));
    return null;
  }

  // Log the final data being used for rendering
  console.log('DogCard - Rendering with data from dogs_new:', JSON.stringify({
    name: displayName,
    characteristics: displayCharacteristics,
    price,
    currency: displayCurrency,
    isEnglish,
    allPrices: {
      usd: dog.price_usd || dog.price,
      cad: dog.price_canada || dog.price_usd || dog.price,
      crc: dog.price_costa_rica,
      nio: dog.price_salvador || dog.price_usd || dog.price,
      pab: dog.price_panama
    }
  }, null, 2));

  return (
    <div className="group bg-gray-800 text-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] h-[600px] flex flex-col">
      <div className="relative h-64 overflow-hidden flex-shrink-0">
        <div className="absolute inset-0">
          <img 
            src={dog.image_1} 
            alt={displayName} 
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
      
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-white line-clamp-2 min-h-[3rem] pr-2">
            {displayName}
          </h3>
          <span className="bg-yellow-500/10 text-yellow-400 text-xs font-semibold px-3 py-1 rounded-full border border-yellow-500/20 flex-shrink-0">
            {dog.size}
          </span>
        </div>
        
        <p className="text-gray-300 text-sm mb-4 line-clamp-2 min-h-[2.5rem]">
          {displayCharacteristics}
        </p>
        
        <div className="grid grid-cols-2 gap-3 text-xs text-gray-400 mb-6">
          <div className="flex items-center space-x-2 bg-gray-700/50 p-2 rounded-lg">
            <svg className="w-4 h-4 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"></path>
            </svg>
            <span>{dog.weight}</span>
          </div>
          <div className="flex items-center space-x-2 bg-gray-700/50 p-2 rounded-lg">
            <svg className="w-4 h-4 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"></path>
            </svg>
            <span>{dog.height}</span>
          </div>
          <div className="flex items-center space-x-2 bg-gray-700/50 p-2 rounded-lg">
            <svg className="w-4 h-4 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
            </svg>
            <span>{isEnglish ? 'Litters: ' : 'Camadas: '}{dog.litters}</span>
          </div>
        </div>
        
        <div className="mt-auto">
          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-yellow-500">{formatPrice(price)}</span>
              <span className="text-xs text-gray-400 mt-1">
                {displayCurrency === 'cad' ? (isEnglish ? 'Canada' : 'Canadá') : currencyInfo.country} - {displayCurrency.toUpperCase()}
              </span>
            </div>
            <div className="flex flex-col items-end space-y-2">
              <Link
                to="/payment"
                state={{ 
                  dog: {
                    id: dog.id,
                    name: displayName,
                    name_en: dog.name_en || dog.name,
                    price: price,
                    price_usd: dog.price_usd || dog.price,
                    price_canada: dog.price_canada || dog.price_usd || dog.price,
                    price_salvador: dog.price_salvador || dog.price_usd || dog.price,
                    price_panama: dog.price_panama || dog.price_usd || dog.price,
                    price_costa_rica: dog.price_costa_rica,
                    characteristics: displayCharacteristics,
                    characteristics_en: dog.characteristics_en || dog.characteristics,
                    size: dog.size,
                    weight: dog.weight,
                    height: dog.height,
                    litters: dog.litters,
                    image_1: dog.image_1,
                    image_2: dog.image_2,
                    image_3: dog.image_3,
                    image_4: dog.image_4,
                    image_5: dog.image_5,
                    image_6: dog.image_6,
                    image_father_1: dog.image_father_1,
                    image_father_2: dog.image_father_2,
                    selectedCurrency: displayCurrency
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
                    ? `Hello, I'm interested in this beautiful puppy ${displayName} 🐕\n\n${dog.image_1}`
                    : `Hola, estoy interesado en este hermoso cachorrito ${displayName} 🐕\n\n${dog.image_1}`
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
    </div>
  );
};

export default DogCard;