import { useState } from 'react';
import { Link } from 'react-router-dom';
import AdminLogin from './AdminLogin';
import AdminPanel from './AdminPanel';

const Footer = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setShowLogin(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <footer className="bg-[#080705] text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h2 className="text-2xl font-bold text-yellow-400">Best Family Puppies</h2>
            <p className="text-gray-400 mt-2">Encuentra a tu compañero perfecto</p>
          </div>
          <div className="flex flex-col items-center md:items-end">
            <div className="flex space-x-4 mb-4">
              <a 
                href="https://wa.me/5543431170" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-300 hover:text-yellow-400 transition-colors"
              >
                WhatsApp
              </a>
              <Link
                to="/admin"
                className="text-gray-300 hover:text-yellow-400 transition-colors"
              >
                Panel de Administrador
              </Link>
            </div>
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Best Family Puppies. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>

      {showLogin && !isLoggedIn && (
        <AdminLogin onLogin={handleLogin} />
      )}

      {isLoggedIn && (
        <AdminPanel onLogout={handleLogout} />
      )}
    </footer>
  );
};

export default Footer;