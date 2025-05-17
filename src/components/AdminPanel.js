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
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    fetchPets();
  }, [activeTab]);

  const fetchPets = async () => {
    try {
      setLoading(true);
      const table = activeTab === 'dogs' ? 'dogs_new' : 'cats_new';
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
      const table = activeTab === 'dogs' ? 'dogs_new' : 'cats_new';
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
        const table = activeTab === 'dogs' ? 'dogs_new' : 'cats_new';
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

  const handleImageUpload = async (e) => {
    try {
      setUploadingImage(true);
      const file = e.target.files[0];
      if (!file) return;

      if (!file.type.startsWith('image/')) {
        alert('Por favor, selecciona un archivo de imagen válido.');
        return;
      }

      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const bucket = activeTab === 'dogs' ? 'perrosimagenes' : 'gatosimagenes';
      const filePath = `${fileName}`;

      const { data: bucketData, error: bucketError } = await supabase.storage
        .from(bucket)
        .list();

      if (bucketError) {
        console.error('Error accessing bucket:', bucketError);
        alert('Error al acceder al almacenamiento. Por favor, verifica los permisos del bucket.');
        return;
      }

      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(filePath, file, { 
          upsert: true,
          cacheControl: '3600',
          contentType: file.type
        });

      if (uploadError) {
        console.error('Upload error details:', uploadError);
        throw uploadError;
      }

      const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath);

      setNewPet({ ...newPet, image: publicUrl });
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error al subir la imagen. Por favor, verifica que:\n1. El bucket existe\n2. Tienes los permisos correctos\n3. El archivo es una imagen válida');
    } finally {
      setUploadingImage(false);
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
                <label className="block text-sm font-medium text-gray-300 mb-1">Imagen</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full px-4 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white"
                  required
                />
                {uploadingImage && (
                  <div className="mt-2 text-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-yellow-500 mx-auto"></div>
                  </div>
                )}
                {newPet.image && (
                  <img src={newPet.image} alt="Preview" className="mt-2 w-24 h-24 object-cover rounded-lg border-2 border-yellow-500" />
                )}
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
                </div>
                {/* Precios en todas las divisas */}
                <div className="flex flex-col gap-1 mb-2">
                  <span className="text-xs text-gray-400">Precios por país:</span>
                  <div className="flex flex-wrap gap-2">
                    {pet.price && <span className="bg-gray-800 text-yellow-400 px-2 py-1 rounded text-xs">USD: ${pet.price}</span>}
                    {pet.price_canada && <span className="bg-gray-800 text-blue-300 px-2 py-1 rounded text-xs">CAD: ${pet.price_canada}</span>}
                    {pet.price_costa_rica && <span className="bg-gray-800 text-green-400 px-2 py-1 rounded text-xs">CRC: ₡{pet.price_costa_rica}</span>}
                    {pet.price_salvador && <span className="bg-gray-800 text-purple-300 px-2 py-1 rounded text-xs">El Salvador: ${pet.price_salvador} SVC</span>}
                    {pet.price_panama && <span className="bg-gray-800 text-pink-300 px-2 py-1 rounded text-xs">PAB: B/.{pet.price_panama}</span>}
                  </div>
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