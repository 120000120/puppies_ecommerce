import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const AdminPanel = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('dogs');
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newPet, setNewPet] = useState({
    name: '',
    size: '',
    characteristics: '',
    weight: '',
    height: '',
    litters: '',
    price: '',
    image: ''
  });

  useEffect(() => {
    fetchPets();
  }, [activeTab]);

  const fetchPets = async () => {
    try {
      setLoading(true);
      const table = activeTab === 'dogs' ? 'dogs' : 'cats';
      const { data, error } = await supabase
        .from(table)
        .select('*')
        .order('name');
      
      if (error) throw error;
      setPets(data);
    } catch (error) {
      console.error('Error fetching pets:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddPet = async (e) => {
    e.preventDefault();
    try {
      const table = activeTab === 'dogs' ? 'dogs' : 'cats';
      const { error } = await supabase
        .from(table)
        .insert([newPet]);
      
      if (error) throw error;
      
      setShowAddForm(false);
      setNewPet({
        name: '',
        size: '',
        characteristics: '',
        weight: '',
        height: '',
        litters: '',
        price: '',
        image: ''
      });
      fetchPets();
    } catch (error) {
      console.error('Error adding pet:', error);
    }
  };

  const handleDeletePet = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta mascota?')) {
      try {
        const table = activeTab === 'dogs' ? 'dogs' : 'cats';
        const { error } = await supabase
          .from(table)
          .delete()
          .eq('id', id);
        
        if (error) throw error;
        fetchPets();
      } catch (error) {
        console.error('Error deleting pet:', error);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 bac">
      <div className="bg-gray-800 p-8 rounded-xl shadow-xl w-full max-w-6xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-yellow-400">Panel de Administración</h2>
          <button
            onClick={onLogout}
            className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Cerrar Sesión
          </button>
        </div>

        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setActiveTab('dogs')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'dogs' ? 'bg-yellow-500 text-black' : 'bg-gray-700 text-white'
            }`}
          >
            Perros
          </button>
          <button
            onClick={() => setActiveTab('cats')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'cats' ? 'bg-yellow-500 text-black' : 'bg-gray-700 text-white'
            }`}
          >
            Gatos
          </button>
        </div>

        <button
          onClick={() => setShowAddForm(true)}
          className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors mb-6"
        >
          Agregar {activeTab === 'dogs' ? 'Perro' : 'Gato'}
        </button>

        {showAddForm && (
          <div className="bg-gray-700 p-6 rounded-lg mb-6">
            <h3 className="text-xl font-bold text-white mb-4">Agregar {activeTab === 'dogs' ? 'Perro' : 'Gato'}</h3>
            <form onSubmit={handleAddPet} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Nombre</label>
                <input
                  type="text"
                  value={newPet.name}
                  onChange={(e) => setNewPet({ ...newPet, name: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Tamaño</label>
                <input
                  type="text"
                  value={newPet.size}
                  onChange={(e) => setNewPet({ ...newPet, size: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Características</label>
                <input
                  type="text"
                  value={newPet.characteristics}
                  onChange={(e) => setNewPet({ ...newPet, characteristics: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Peso</label>
                <input
                  type="text"
                  value={newPet.weight}
                  onChange={(e) => setNewPet({ ...newPet, weight: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Altura</label>
                <input
                  type="text"
                  value={newPet.height}
                  onChange={(e) => setNewPet({ ...newPet, height: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Camadas</label>
                <input
                  type="text"
                  value={newPet.litters}
                  onChange={(e) => setNewPet({ ...newPet, litters: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Precio (USD)</label>
                <input
                  type="number"
                  value={newPet.price}
                  onChange={(e) => setNewPet({ ...newPet, price: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">URL de la imagen</label>
                <input
                  type="text"
                  value={newPet.image}
                  onChange={(e) => setNewPet({ ...newPet, image: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white"
                  required
                />
              </div>
              <div className="col-span-2 flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium py-2 px-4 rounded-lg transition-colors"
                >
                  Agregar
                </button>
              </div>
            </form>
          </div>
        )}

        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500 mx-auto"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pets.map((pet) => (
              <div key={pet.id} className="bg-gray-700 p-4 rounded-lg">
                <div className="aspect-w-16 aspect-h-9 mb-4">
                  <img src={pet.image} alt={pet.name} className="w-full h-full object-cover rounded-lg" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{pet.name}</h3>
                <p className="text-gray-300 text-sm mb-2">{pet.characteristics}</p>
                <div className="grid grid-cols-2 gap-2 text-sm text-gray-400 mb-2">
                  <div>Peso: {pet.weight}</div>
                  <div>Altura: {pet.height}</div>
                  <div>Camadas: {pet.litters}</div>
                  <div>Precio: ${pet.price} USD</div>
                </div>
                <button
                  onClick={() => handleDeletePet(pet.id)}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                >
                  Eliminar
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel; 