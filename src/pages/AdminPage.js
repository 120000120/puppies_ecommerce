import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const AdminPage = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [activeTab, setActiveTab] = useState('dogs');
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingPet, setEditingPet] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
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
    // Verificar si ya está autenticado
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setIsAuthenticated(true);
        fetchPets();
      }
    };
    checkAuth();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchPets();
    }
  }, [activeTab, isAuthenticated]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // Intentar iniciar sesión con Supabase
      const { data, error } = await supabase.auth.signInWithPassword({
        email: username,
        password: password
      });

      if (error) {
        setError('Error al iniciar sesión. Por favor, verifica tus credenciales.');
        return;
      }

      setIsAuthenticated(true);
      fetchPets();
    } catch (error) {
      console.error('Login error:', error);
      setError('Error al iniciar sesión. Por favor, intenta de nuevo.');
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      setIsAuthenticated(false);
      setUsername('');
      setPassword('');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const fetchPets = async () => {
    try {
      setLoading(true);
      const table = activeTab === 'dogs' ? 'dogs' : 'cats';
      console.log('Fetching pets from table:', table);
      
      const { data, error } = await supabase
        .from(table)
        .select('*')
        .order('name');
      
      if (error) {
        console.error('Error fetching pets:', error);
        throw error;
      }
      
      console.log('Fetched pets:', data);
      setPets(data || []);
    } catch (error) {
      console.error('Error in fetchPets:', error);
      alert(`Error al cargar los ${activeTab === 'dogs' ? 'perros' : 'gatos'}. Por favor, intenta de nuevo.`);
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSearchTerm('');
    setEditingPet(null);
    setShowAddForm(false);
  };

  const handleImageUpload = async (e, isEditing = false) => {
    try {
      setUploadingImage(true);
      const file = e.target.files[0];
      if (!file) return;

      // Validar el tipo de archivo
      if (!file.type.startsWith('image/')) {
        alert('Por favor, selecciona un archivo de imagen válido.');
        return;
      }

      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const bucket = activeTab === 'dogs' ? 'perrosimagenes' : 'gatosimagenes';
      const filePath = `${fileName}`;

      // Verificar si el bucket existe y tiene los permisos correctos
      const { data: bucketData, error: bucketError } = await supabase.storage
        .from(bucket)
        .list();

      if (bucketError) {
        console.error('Error accessing bucket:', bucketError);
        alert('Error al acceder al almacenamiento. Por favor, verifica los permisos del bucket.');
        return;
      }

      // Primero intentamos eliminar la imagen anterior si existe
      if (isEditing && editingPet.image) {
        const oldImagePath = editingPet.image.split('/').pop();
        try {
          await supabase.storage
            .from(bucket)
            .remove([oldImagePath]);
        } catch (error) {
          console.error('Error deleting old image:', error);
        }
      }

      // Subir la nueva imagen
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

      if (isEditing) {
        setEditingPet({ ...editingPet, image: publicUrl });
      } else {
        setNewPet({ ...newPet, image: publicUrl });
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error al subir la imagen. Por favor, verifica que:\n1. El bucket existe\n2. Tienes los permisos correctos\n3. El archivo es una imagen válida');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredPets = pets.filter(pet => 
    pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pet.characteristics.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (pet) => {
    setEditingPet(pet);
  };

  const handleUpdatePet = async (e) => {
    e.preventDefault();
    try {
      const table = activeTab === 'dogs' ? 'dogs' : 'cats';
      const { error } = await supabase
        .from(table)
        .update(editingPet)
        .eq('id', editingPet.id);
      
      if (error) throw error;
      setEditingPet(null);
      fetchPets();
    } catch (error) {
      console.error('Error updating pet:', error);
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
    if (!window.confirm(`¿Estás seguro de que deseas eliminar este ${activeTab === 'dogs' ? 'perro' : 'gato'}?`)) {
      return;
    }

    try {
      setLoading(true);
      const table = activeTab === 'dogs' ? 'dogs' : 'cats';
      const bucket = activeTab === 'dogs' ? 'perrosimagenes' : 'gatosimagenes';

      console.log('Deleting pet with ID:', id);
      console.log('Using table:', table);
      console.log('Using bucket:', bucket);

      // Primero obtenemos la información del pet para eliminar su imagen
      const { data: petData, error: fetchError } = await supabase
        .from(table)
        .select('*')
        .eq('id', id)
        .single();

      if (fetchError) {
        console.error('Error fetching pet data:', fetchError);
        throw fetchError;
      }

      console.log('Pet data to delete:', petData);

      // Si el pet tiene una imagen, la eliminamos del storage
      if (petData?.image) {
        try {
          const imagePath = petData.image.split('/').pop();
          console.log('Deleting image:', imagePath);
          
          const { error: deleteImageError } = await supabase.storage
            .from(bucket)
            .remove([imagePath]);

          if (deleteImageError) {
            console.error('Error deleting image:', deleteImageError);
          } else {
            console.log('Image deleted successfully');
          }
        } catch (imageError) {
          console.error('Error handling image deletion:', imageError);
        }
      }

      // Intentamos eliminar el registro
      const { error: deleteError } = await supabase
        .from(table)
        .delete()
        .eq('id', id);

      if (deleteError) {
        console.error('Error deleting pet record:', deleteError);
        throw deleteError;
      }

      // Actualizamos la lista de pets
      console.log('Refreshing pets list...');
      await fetchPets();
      
      // Verificamos que el pet fue eliminado
      const { data: verifyData, error: verifyError } = await supabase
        .from(table)
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (verifyError) {
        console.error('Error verifying deletion:', verifyError);
      } else if (verifyData) {
        console.error('Pet still exists after deletion:', verifyData);
        throw new Error('El registro aún existe después de la eliminación');
      } else {
        console.log('Deletion verified successfully');
        alert(`${activeTab === 'dogs' ? 'Perro' : 'Gato'} eliminado correctamente.`);
      }
    } catch (error) {
      console.error('Error in delete process:', error);
      alert(`Error al eliminar el ${activeTab === 'dogs' ? 'perro' : 'gato'}. Por favor, intenta de nuevo.`);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="bg-gray-800 p-8 rounded-lg shadow-xl max-w-md w-full">
          <h2 className="text-2xl font-bold text-yellow-400 mb-6 text-center">Panel de Administración</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
              <input
                type="email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                required
                placeholder="admin@bestfamilypuppies.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                required
                placeholder="Puppies2025"
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Iniciar Sesión
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-yellow-400">Panel de Administración</h1>
          <div className="flex space-x-4">
            <button
              onClick={() => navigate('/')}
              className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Volver al Inicio
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>

        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => handleTabChange('dogs')}
            className={`px-6 py-3 rounded-lg transition-colors ${
              activeTab === 'dogs' ? 'bg-yellow-500 text-black font-bold' : 'bg-gray-700 text-white'
            }`}
          >
            Perros
          </button>
          <button
            onClick={() => handleTabChange('cats')}
            className={`px-6 py-3 rounded-lg transition-colors ${
              activeTab === 'cats' ? 'bg-yellow-500 text-black font-bold' : 'bg-gray-700 text-white'
            }`}
          >
            Gatos
          </button>
        </div>

        <div className="mb-8">
          <input
            type="text"
            placeholder={`Buscar ${activeTab === 'dogs' ? 'perros' : 'gatos'}...`}
            value={searchTerm}
            onChange={handleSearch}
            className="w-full max-w-md px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
          />
        </div>

        <button
          onClick={() => setShowAddForm(true)}
          className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors mb-6"
        >
          Agregar Nuevo {activeTab === 'dogs' ? 'Perro' : 'Gato'}
        </button>

        {showAddForm && (
          <div className="bg-gray-800 p-6 rounded-lg mb-6">
            <h3 className="text-xl font-bold text-white mb-4">Agregar Nuevo {activeTab === 'dogs' ? 'Perro' : 'Gato'}</h3>
            <form onSubmit={handleAddPet} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Nombre</label>
                <input
                  type="text"
                  value={newPet.name}
                  onChange={(e) => setNewPet({ ...newPet, name: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Tamaño</label>
                <input
                  type="text"
                  value={newPet.size}
                  onChange={(e) => setNewPet({ ...newPet, size: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Características</label>
                <input
                  type="text"
                  value={newPet.characteristics}
                  onChange={(e) => setNewPet({ ...newPet, characteristics: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Peso</label>
                <input
                  type="text"
                  value={newPet.weight}
                  onChange={(e) => setNewPet({ ...newPet, weight: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Altura</label>
                <input
                  type="text"
                  value={newPet.height}
                  onChange={(e) => setNewPet({ ...newPet, height: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Camadas</label>
                <input
                  type="text"
                  value={newPet.litters}
                  onChange={(e) => setNewPet({ ...newPet, litters: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Precio (USD)</label>
                <input
                  type="number"
                  value={newPet.price}
                  onChange={(e) => setNewPet({ ...newPet, price: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                  required
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-1">Imagen</label>
                <div className="flex items-center space-x-4">
                  {newPet.image && (
                    <img src={newPet.image} alt="Preview" className="w-20 h-20 object-cover rounded-lg" />
                  )}
                  <div className="flex-1">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e)}
                      className="hidden"
                      ref={fileInputRef}
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                      disabled={uploadingImage}
                    >
                      {uploadingImage ? 'Subiendo...' : 'Seleccionar Imagen'}
                    </button>
                  </div>
                </div>
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
            {filteredPets.map((pet) => (
              <div key={pet.id} className="bg-gray-800 p-4 rounded-lg">
                {editingPet?.id === pet.id ? (
                  <form onSubmit={handleUpdatePet} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Nombre</label>
                      <input
                        type="text"
                        value={editingPet.name}
                        onChange={(e) => setEditingPet({ ...editingPet, name: e.target.value })}
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Tamaño</label>
                      <input
                        type="text"
                        value={editingPet.size}
                        onChange={(e) => setEditingPet({ ...editingPet, size: e.target.value })}
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Características</label>
                      <input
                        type="text"
                        value={editingPet.characteristics}
                        onChange={(e) => setEditingPet({ ...editingPet, characteristics: e.target.value })}
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Peso</label>
                      <input
                        type="text"
                        value={editingPet.weight}
                        onChange={(e) => setEditingPet({ ...editingPet, weight: e.target.value })}
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Altura</label>
                      <input
                        type="text"
                        value={editingPet.height}
                        onChange={(e) => setEditingPet({ ...editingPet, height: e.target.value })}
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Camadas</label>
                      <input
                        type="text"
                        value={editingPet.litters}
                        onChange={(e) => setEditingPet({ ...editingPet, litters: e.target.value })}
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Precio (USD)</label>
                      <input
                        type="number"
                        value={editingPet.price}
                        onChange={(e) => setEditingPet({ ...editingPet, price: e.target.value })}
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Imagen</label>
                      <div className="flex items-center space-x-4">
                        {editingPet.image && (
                          <img src={editingPet.image} alt="Preview" className="w-20 h-20 object-cover rounded-lg" />
                        )}
                        <div className="flex-1">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageUpload(e, true)}
                            className="hidden"
                            ref={fileInputRef}
                          />
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="w-full bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                            disabled={uploadingImage}
                          >
                            {uploadingImage ? 'Subiendo...' : 'Cambiar Imagen'}
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end space-x-4">
                      <button
                        type="button"
                        onClick={() => setEditingPet(null)}
                        className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium py-2 px-4 rounded-lg transition-colors"
                      >
                        Guardar
                      </button>
                    </div>
                  </form>
                ) : (
                  <>
                    <div className="aspect-w-16 aspect-h-9 mb-4">
                      <img src={pet.image} alt={pet.name} className="w-full h-full object-cover rounded-lg" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">{pet.name}</h3>
                    <p className="text-gray-300 text-sm mb-2">{pet.characteristics}</p>
                    <div className="grid grid-cols-2 gap-2 text-sm text-gray-400 mb-4">
                      <div>Peso: {pet.weight}</div>
                      <div>Altura: {pet.height}</div>
                      <div>Camadas: {pet.litters}</div>
                      <div>Precio: ${pet.price} USD</div>
                    </div>
                    <div className="flex space-x-4">
                      <button
                        onClick={() => handleEdit(pet)}
                        className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-black font-medium py-2 px-4 rounded-lg transition-colors"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDeletePet(pet.id)}
                        disabled={loading}
                        className={`flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors ${
                          loading ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                      >
                        {loading ? 'Eliminando...' : 'Eliminar'}
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage; 