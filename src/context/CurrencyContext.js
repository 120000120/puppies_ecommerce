import React, { createContext, useContext, useState, useEffect } from 'react';

const CurrencyContext = createContext();

export const useCurrency = () => useContext(CurrencyContext);

export const CurrencyProvider = ({ children }) => {
  const [selectedCurrency, setSelectedCurrency] = useState('usd');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const detectUserCountry = async () => {
      try {
        // Primero obtenemos la IP del usuario
        const ipResponse = await fetch('https://api.ipify.org?format=json');
        const { ip } = await ipResponse.json();

        // Luego obtenemos el país basado en la IP
        const countryResponse = await fetch(`https://ipapi.co/${ip}/country/`);
        const country = await countryResponse.text();

        // Mapeamos el país a la moneda correspondiente
        const countryToCurrency = {
          'US': 'usd',
          'CA': 'cad',
          'PA': 'pab',
          'NI': 'nio',
          'CR': 'crc'
        };

        const detectedCurrency = countryToCurrency[country];
        if (detectedCurrency) {
          setSelectedCurrency(detectedCurrency);
        }
      } catch (error) {
        console.error('Error detecting user country:', error);
        // Si hay error, mantenemos USD como default
        setSelectedCurrency('usd');
      } finally {
        setIsLoading(false);
      }
    };

    detectUserCountry();
  }, []);

  const getPriceByCurrency = (pet) => {
    if (!pet) return 0;

    // Si es Canadá y es un perro, siempre devolvemos el precio en USD
    if (selectedCurrency === 'cad' && pet.hasOwnProperty('weight')) {
      return pet.price;
    }

    const priceMap = {
      usd: pet.price,
      cad: pet.price_canada,
      pab: pet.price_panama,
      nio: pet.price_nicaragua,
      crc: pet.price_costa_rica
    };

    return priceMap[selectedCurrency] || pet.price;
  };

  const getDisplayCurrency = (pet) => {
    if (!pet) return selectedCurrency;

    // Si es Canadá y es un perro, siempre mostramos USD
    if (selectedCurrency === 'cad' && pet.hasOwnProperty('weight')) {
      return 'usd';
    }

    // Lógica especial para Costa Rica
    if (selectedCurrency === 'crc') {
      const price = getPriceByCurrency(pet);
      return price > 9999 ? 'crc' : 'usd';
    }

    return selectedCurrency;
  };

  return (
    <CurrencyContext.Provider value={{
      selectedCurrency,
      setSelectedCurrency,
      getPriceByCurrency,
      getDisplayCurrency,
      isLoading
    }}>
      {children}
    </CurrencyContext.Provider>
  );
}; 