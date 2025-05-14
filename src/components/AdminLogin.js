import { useState } from 'react';

const AdminLogin = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === 'bestfamilypuppies' && password === 'Puppies2025') {
      onLogin();
    } else {
      setError('Credenciales incorrectas');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 relative" style={{ backgroundImage: 'url(/golden-retriever.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-gray-800 p-8 rounded-xl shadow-xl">
          <h2 className="text-2xl font-bold text-yellow-400 mb-6 text-center">Panel de Administrador</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-1">
                Usuario
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                required
              />
            </div>
            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}
            <button
              type="submit"
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Iniciar Sesión
            </button>
          </form>
        </div>
      </div>
      <div className="absolute inset-0 bg-black bg-opacity-60 z-0"></div>
    </div>
  );
};

export default AdminLogin; 