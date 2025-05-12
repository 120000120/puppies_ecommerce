import { createContext, useContext, useState } from 'react';

const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {
  const [selectedCurrency, setSelectedCurrency] = useState('usd');

  const getPriceByCurrency = (item) => {
    if (!item) return null;

    // Si la moneda seleccionada es CRC y el precio es mayor a 4 dígitos
    if (selectedCurrency === 'crc' && parseFloat(item.price_costa_rica) > 9999) {
      return item.price_costa_rica;
    }
    // Si la moneda seleccionada es CRC y el precio es menor o igual a 4 dígitos
    else if (selectedCurrency === 'crc' && parseFloat(item.price_costa_rica) <= 9999) {
      return item.price;
    }
    // Para otras monedas
    else {
      switch (selectedCurrency) {
        case 'usd':
          return item.price;
        case 'cad':
          return item.price_canada;
        case 'nio':
          return item.price_nicaragua;
        case 'pab':
          return item.price_panama;
        default:
          return item.price;
      }
    }
  };

  const getDisplayCurrency = (item) => {
    if (!item) return selectedCurrency;

    // Si la moneda seleccionada es CRC y el precio es mayor a 4 dígitos
    if (selectedCurrency === 'crc' && parseFloat(item.price_costa_rica) > 9999) {
      return 'crc';
    }
    // Si la moneda seleccionada es CRC y el precio es menor o igual a 4 dígitos
    else if (selectedCurrency === 'crc' && parseFloat(item.price_costa_rica) <= 9999) {
      return 'usd';
    }
    // Para otras monedas
    return selectedCurrency;
  };

  return (
    <CurrencyContext.Provider value={{ 
      selectedCurrency, 
      setSelectedCurrency, 
      getPriceByCurrency,
      getDisplayCurrency 
    }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}; 