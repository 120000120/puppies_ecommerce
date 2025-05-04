import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: ''
  });

  const [pet, setPet] = useState(null);

  useEffect(() => {
    if (location.state?.pet) {
      setPet(location.state.pet);
    } else {
      navigate('/');
    }
  }, [location, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí podrías implementar la lógica para guardar los datos del cliente
    alert('¡Gracias por tu compra! Te enviaremos un correo con los detalles del pago.');
    navigate('/');
  };

  if (!pet) return null;

  return (
    <div className="min-h-screen bg-gray-900 text-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden">
          <div className="p-8">
            <h1 className="text-3xl font-bold text-yellow-400 mb-8">Proceso de Compra</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Información del producto */}
              <div className="bg-gray-700 p-6 rounded-lg">
                <h2 className="text-xl font-bold text-yellow-400 mb-4">Detalles del Producto</h2>
                <div className="aspect-w-16 aspect-h-9 mb-4">
                  <img src={pet.image} alt={pet.name} className="w-full h-full object-cover rounded-lg" />
                </div>
                <h3 className="text-lg font-bold mb-2">{pet.name}</h3>
                <p className="text-gray-300 mb-2">{pet.characteristics}</p>
                <div className="text-yellow-400 text-xl font-bold">
                  {new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD'
                  }).format(pet.price)}
                </div>
              </div>

              {/* Formulario de pago */}
              <div>
                <h2 className="text-xl font-bold text-yellow-400 mb-4">Información de Contacto</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Nombre completo</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Correo electrónico</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Teléfono</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Dirección</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Ciudad</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Estado</label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Código Postal</label>
                      <input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">País</label>
                      <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                        required
                      />
                    </div>
                  </div>

                  <div className="mt-6">
                    <h3 className="text-lg font-bold text-yellow-400 mb-2">Instrucciones de Pago</h3>
                    <div className="bg-gray-700 p-4 rounded-lg">
                      <p className="text-gray-300 mb-2">
                        Por favor realiza el depósito a la siguiente cuenta:
                      </p>
                      <div className="space-y-2">
                        <p className="text-white"><span className="font-bold">Banco:</span> Bank of America</p>
                        <p className="text-white"><span className="font-bold">Cuenta:</span> 1234567890</p>
                        <p className="text-white"><span className="font-bold">Titular:</span> Best Family Puppies</p>
                        <p className="text-white"><span className="font-bold">Monto:</span> {new Intl.NumberFormat('en-US', {
                          style: 'currency',
                          currency: 'USD'
                        }).format(pet.price)}</p>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-medium py-3 px-4 rounded-lg transition-colors"
                  >
                    Confirmar Compra
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage; 