import { Link } from 'react-router-dom';
import { useState } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-black text-white py-4 px-4 md:px-8">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <img src="/imagen.png" alt="Best Family Puppies Logo" className="h-16 md:h-12 w-auto" />
          <span className="hidden md:block ml-4 text-xl font-bold">Best Family Puppies</span>
        </Link>

        <div className="hidden md:flex space-x-8">
          <Link to="/" className="hover:text-yellow-400 transition-colors">Inicio</Link>
          <Link to="/catalogo" className="hover:text-yellow-400 transition-colors">Perros</Link>
          <Link to="/catalogo-gatos" className="hover:text-yellow-400 transition-colors">Gatos</Link>
          <Link to="/contacto" className="hover:text-yellow-400 transition-colors">Contacto</Link>
        </div>

        <button
          className="md:hidden text-white"
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
        <div className="md:hidden fixed inset-0 bg-black bg-opacity-90 z-50">
          <div className="flex flex-col items-center justify-center h-full space-y-8">
            <button
              className="absolute top-4 right-4 text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              <svg
                className="w-6 h-6"
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
            <Link
              to="/"
              className="text-2xl hover:text-yellow-400 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Inicio
            </Link>
            <Link
              to="/catalogo"
              className="text-2xl hover:text-yellow-400 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Perros
            </Link>
            <Link
              to="/catalogo-gatos"
              className="text-2xl hover:text-yellow-400 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Gatos
            </Link>
            <Link
              to="/contacto"
              className="text-2xl hover:text-yellow-400 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Contacto
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;