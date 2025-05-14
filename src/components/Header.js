import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useCurrency } from '../context/CurrencyContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { selectedCurrency, setSelectedCurrency, isLoading } = useCurrency();

  const currencies = [
    { code: 'usd', name: 'Estados Unidos', flag: 'https://flagcdn.com/w20/us.png' },
    { code: 'cad', name: 'Canadá', flag: 'https://flagcdn.com/w20/ca.png' },
    { code: 'crc', name: 'Costa Rica', flag: 'https://flagcdn.com/w20/cr.png' },
    { code: 'nio', name: 'Nicaragua', flag: 'https://flagcdn.com/w20/ni.png' },
    { code: 'pab', name: 'Panamá', flag: 'https://flagcdn.com/w20/pa.png' }
  ];

  const selectedCurrencyInfo = currencies.find(c => c.code === selectedCurrency);

  return (
    <header className="bg-yellow-500 text-black py-4 px-4 md:px-8">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <img src="/imagen.png" alt="Best Family Puppies Logo" className="h-16 md:h-12 w-auto" />
          <span className="hidden md:block ml-4 text-xl font-bold text-black">Best Family Puppies</span>
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="hover:text-gray-800 transition-colors font-semibold">Inicio</Link>
          <Link to="/catalogo" className="hover:text-gray-800 transition-colors font-semibold">Perros</Link>
          <Link to="/catalogo-gatos" className="hover:text-gray-800 transition-colors font-semibold">Gatos</Link>
          <Link to="/contacto" className="hover:text-gray-800 transition-colors font-semibold">Contacto</Link>
          
          {/* Dropdown de monedas */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors border border-white text-white"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
              ) : (
                <>
                  <img
                    src={currencies.find(c => c.code === selectedCurrency)?.flag}
                    alt={currencies.find(c => c.code === selectedCurrency)?.name}
                    className="w-6 h-4 object-cover rounded"
                  />
                  <span className="text-sm text-white">{currencies.find(c => c.code === selectedCurrency)?.name}</span>
                </>
              )}
              <svg
                className={`w-4 h-4 transform transition-transform ${isDropdownOpen ? 'rotate-180' : ''} text-yellow-400`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {isDropdownOpen && !isLoading && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-700 rounded-lg shadow-lg py-2 z-50 border border-white">
                {currencies.map((currency) => (
                  <button
                    key={currency.code}
                    onClick={() => {
                      setSelectedCurrency(currency.code);
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full px-4 py-2 text-left hover:bg-gray-600 flex items-center space-x-2 text-white ${
                      selectedCurrency === currency.code ? 'bg-gray-600' : ''
                    }`}
                  >
                    <img
                      src={currency.flag}
                      alt={currency.name}
                      className="w-6 h-4 object-cover rounded"
                    />
                    <span className="text-sm text-white">{currency.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <button
          className="md:hidden text-black"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Menú móvil */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-black/95 backdrop-blur-sm z-50">
          <div className="flex flex-col items-center justify-center h-full space-y-8">
            <button
              className="absolute top-6 right-6 text-yellow-400 hover:text-yellow-300 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div className="flex flex-col items-center space-y-8 w-full px-6">
              <div className="w-24 h-24 mb-8">
                <img src="/imagen.png" alt="Best Family Puppies Logo" className="w-full h-full object-contain" />
              </div>

              <Link
                to="/"
                className="text-2xl font-medium text-white hover:text-yellow-400 transition-colors w-full text-center py-4 border-b border-yellow-500/20 hover:border-yellow-400"
                onClick={() => setIsMenuOpen(false)}
              >
                Inicio
              </Link>
              <Link
                to="/catalogo"
                className="text-2xl font-medium text-white hover:text-yellow-400 transition-colors w-full text-center py-4 border-b border-yellow-500/20 hover:border-yellow-400"
                onClick={() => setIsMenuOpen(false)}
              >
                Perros
              </Link>
              <Link
                to="/catalogo-gatos"
                className="text-2xl font-medium text-white hover:text-yellow-400 transition-colors w-full text-center py-4 border-b border-yellow-500/20 hover:border-yellow-400"
                onClick={() => setIsMenuOpen(false)}
              >
                Gatos
              </Link>
              <Link
                to="/contacto"
                className="text-2xl font-medium text-white hover:text-yellow-400 transition-colors w-full text-center py-4 border-b border-yellow-500/20 hover:border-yellow-400"
                onClick={() => setIsMenuOpen(false)}
              >
                Contacto
              </Link>

              {/* Dropdown de monedas en móvil */}
              <div className="w-full">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-full flex items-center justify-center space-x-3 text-2xl text-white hover:text-yellow-400 transition-colors py-4 border-b border-yellow-500/20 hover:border-yellow-400"
                >
                  <img 
                    src={selectedCurrencyInfo.flag} 
                    alt={selectedCurrencyInfo.name} 
                    className="w-8 h-5 object-cover rounded shadow-lg"
                  />
                  <span>{selectedCurrencyInfo.name}</span>
                  <svg 
                    className={`w-5 h-5 transition-transform ${isDropdownOpen ? 'rotate-180' : ''} text-yellow-400`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {isDropdownOpen && (
                  <div className="mt-4 bg-gray-900/80 backdrop-blur-sm rounded-xl overflow-hidden border border-yellow-500/20">
                    {currencies.map((currency) => (
                      <button
                        key={currency.code}
                        onClick={() => {
                          setSelectedCurrency(currency.code);
                          setIsDropdownOpen(false);
                        }}
                        className={`w-full px-6 py-4 text-left hover:bg-yellow-500/10 flex items-center space-x-3 ${
                          selectedCurrency === currency.code ? 'bg-yellow-500/10' : ''
                        }`}
                      >
                        <img 
                          src={currency.flag} 
                          alt={currency.name} 
                          className="w-8 h-5 object-cover rounded shadow-lg"
                        />
                        <span className="text-white text-lg">{currency.name}</span>
                        {selectedCurrency === currency.code && (
                          <svg className="w-5 h-5 text-yellow-400 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;