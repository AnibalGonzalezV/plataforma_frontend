import SideBar from '@/components/SideBar';
import Header from '@/components/Header';
import { useState } from 'react';
import { Store, Plus, Tag, Settings, X, CheckCircle, AlertCircle, FolderPlus } from 'lucide-react';

export default function StoreManagement() {
  // Estado para crear tienda (modal)
  const [showCreateStore, setShowCreateStore] = useState(false);
  const [storeName, setStoreName] = useState('');
  const [storeAddress, setStoreAddress] = useState('');
  const [storeMessage, setStoreMessage] = useState('');

  // Estado para crear categoría (modal)
  const [showCreateCategory, setShowCreateCategory] = useState(false);
  const [categoryName, setCategoryName] = useState('');
  const [categoryDescription, setCategoryDescription] = useState('');
  const [categoryMessage, setCategoryMessage] = useState('');

  // Aquí deberías obtener la lista de tiendas desde la API
  // Ejemplo:
  // const { data: tiendas, isLoading } = useQuery(['stores'], getStores);
  // const tiendas = ...

  const handleCreateStore = async (e: React.FormEvent) => {
    e.preventDefault();
    // Llama aquí a la API para crear tienda
    // await createStore({ name: storeName, address: storeAddress });
    setStoreMessage(`Tienda "${storeName}" creada correctamente!`);
    setStoreName('');
    setStoreAddress('');
    setShowCreateStore(false);
  };

  const handleEditStore = (store: any) => {
    // Llama aquí a la API para editar tienda
    // await updateStore(store.id, { name: store.name, address: store.address });
  };

  const handleDeleteStore = (storeId: number) => {
    // Llama aquí a la API para eliminar tienda
    // await deleteStore(storeId);
  };

  const handleCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    // Llama aquí a la API para crear categoría
    // await createCategory({ name: categoryName, description: categoryDescription });
    setCategoryMessage(`Categoría "${categoryName}" creada correctamente!`);
    setCategoryName('');
    setCategoryDescription('');
    setShowCreateCategory(false);
  };

  return (
    <>
      <div className='flex min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'>
          <SideBar/>
          <div className='flex flex-1 flex-col'>
            <Header/>
            <div className='flex flex-1'>
              <main className='flex-1 p-6'>
                {/* Header de la sección */}
                <div className='mb-8'>
                  <div className='flex items-center gap-3 mb-2'>
                    <div className='p-2 bg-blue-600/20 rounded-lg'>
                      <Settings className='h-6 w-6 text-blue-400' />
                    </div>
                    <h1 className='text-3xl font-bold text-white'>Gestión de Tiendas</h1>
                  </div>
                  <p className='text-gray-400 text-lg'>Administra tus tiendas y categorías de productos</p>
                </div>

                {/* Grid de acciones principales */}
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8'>
                  {/* Tarjeta para crear tienda */}
                  <div className='bg-gray-800/50 rounded-2xl p-6 border border-gray-700/50 hover:border-green-500/50 transition-all duration-300'>
                    <div className='flex items-center gap-3 mb-4'>
                      <div className='p-2 bg-green-600/20 rounded-lg'>
                        <Store className='h-5 w-5 text-green-400' />
                      </div>
                      <h2 className='text-xl font-semibold text-white'>Nueva Tienda</h2>
                    </div>
                    <p className='text-gray-400 mb-4'>Crea una nueva tienda para vender tus productos</p>
                    <button
                      onClick={() => setShowCreateStore(true)}
                      className='flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl font-medium transition-all duration-200 hover:shadow-lg hover:shadow-green-500/25'
                    >
                      <Plus className='h-4 w-4' />
                      Crear Tienda
                    </button>
                    {storeMessage && (
                      <div className='mt-3 flex items-center gap-2 text-green-400 text-sm'>
                        <CheckCircle className='h-4 w-4' />
                        {storeMessage}
                      </div>
                    )}
                  </div>

                  {/* Tarjeta para crear categoría */}
                  <div className='bg-gray-800/50 rounded-2xl p-6 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300'>
                    <div className='flex items-center gap-3 mb-4'>
                      <div className='p-2 bg-blue-600/20 rounded-lg'>
                        <Tag className='h-5 w-5 text-blue-400' />
                      </div>
                      <h2 className='text-xl font-semibold text-white'>Nueva Categoría</h2>
                    </div>
                    <p className='text-gray-400 mb-4'>Organiza tus productos con categorías personalizadas</p>
                    <button
                      onClick={() => setShowCreateCategory(true)}
                      className='flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/25'
                    >
                      <FolderPlus className='h-4 w-4' />
                      Crear Categoría
                    </button>
                    {categoryMessage && (
                      <div className='mt-3 flex items-center gap-2 text-blue-400 text-sm'>
                        <CheckCircle className='h-4 w-4' />
                        {categoryMessage}
                      </div>
                    )}
                  </div>
                </div>

                {/* Sección de tiendas existentes */}
                <div className='bg-gray-800/50 rounded-2xl p-6 border border-gray-700/50'>
                  <h3 className='text-xl font-semibold text-white mb-4'>Mis Tiendas</h3>
                  <div className='text-gray-400 text-center py-8'>
                    <Store className='h-12 w-12 mx-auto mb-3 text-gray-600' />
                    <p>Aquí aparecerán todas tus tiendas</p>
                    <p className='text-sm text-gray-500'>Conecta con la API para mostrar la lista de tiendas</p>
                  </div>
                  {/* Aquí deberías mapear la lista de tiendas obtenida de la API */}
                  {/* Ejemplo:
                  <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                    {tiendas.map(tienda => (
                      <div key={tienda.id} className='bg-gray-700/50 rounded-xl p-4 border border-gray-600'>
                        <h4 className='font-semibold text-white mb-2'>{tienda.name}</h4>
                        <p className='text-gray-400 text-sm mb-3'>{tienda.address}</p>
                        <div className='flex gap-2'>
                          <button onClick={() => handleEditStore(tienda)} className='px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm'>Editar</button>
                          <button onClick={() => handleDeleteStore(tienda.id)} className='px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm'>Eliminar</button>
                        </div>
                      </div>
                    ))}
                  </div>
                  */}
                </div>

                {/* Modal para crear tienda */}
                {showCreateStore && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                    <div className="bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md mx-4 border border-gray-700">
                      <div className='p-6'>
                        <div className='flex items-center justify-between mb-6'>
                          <div className='flex items-center gap-3'>
                            <div className='p-2 bg-green-600/20 rounded-lg'>
                              <Store className='h-5 w-5 text-green-400' />
                            </div>
                            <h2 className="text-xl font-bold text-white">Nueva Tienda</h2>
                          </div>
                          <button
                            className="text-gray-400 hover:text-white transition-colors"
                            onClick={() => setShowCreateStore(false)}
                          >
                            <X className='h-5 w-5' />
                          </button>
                        </div>
                        <form onSubmit={handleCreateStore} className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Nombre de la tienda</label>
                            <input 
                              type="text" 
                              value={storeName} 
                              onChange={e => setStoreName(e.target.value)} 
                              required 
                              className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200" 
                              placeholder="Ej: Mi Restaurante"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Dirección</label>
                            <input 
                              type="text" 
                              value={storeAddress} 
                              onChange={e => setStoreAddress(e.target.value)} 
                              required 
                              className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200" 
                              placeholder="Ej: Av. Principal 123"
                            />
                          </div>
                          <div className="flex gap-3 pt-4">
                            <button 
                              type="button" 
                              onClick={() => setShowCreateStore(false)} 
                              className="flex-1 py-2 px-4 rounded-lg bg-gray-600 hover:bg-gray-500 text-white font-medium transition-all duration-200"
                            >
                              Cancelar
                            </button>
                            <button 
                              type="submit" 
                              className="flex-1 py-2 px-4 rounded-lg bg-green-600 hover:bg-green-700 text-white font-medium transition-all duration-200 hover:shadow-lg hover:shadow-green-500/25"
                            >
                              Crear Tienda
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                )}

                {/* Modal para crear categoría */}
                {showCreateCategory && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                    <div className="bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md mx-4 border border-gray-700">
                      <div className='p-6'>
                        <div className='flex items-center justify-between mb-6'>
                          <div className='flex items-center gap-3'>
                            <div className='p-2 bg-blue-600/20 rounded-lg'>
                              <Tag className='h-5 w-5 text-blue-400' />
                            </div>
                            <h2 className="text-xl font-bold text-white">Nueva Categoría</h2>
                          </div>
                          <button
                            className="text-gray-400 hover:text-white transition-colors"
                            onClick={() => setShowCreateCategory(false)}
                          >
                            <X className='h-5 w-5' />
                          </button>
                        </div>
                        <form onSubmit={handleCreateCategory} className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Nombre de la categoría</label>
                            <input 
                              type="text" 
                              value={categoryName} 
                              onChange={e => setCategoryName(e.target.value)} 
                              required 
                              className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200" 
                              placeholder="Ej: Bebidas"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Descripción (opcional)</label>
                            <textarea 
                              value={categoryDescription} 
                              onChange={e => setCategoryDescription(e.target.value)} 
                              rows={3}
                              className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none" 
                              placeholder="Describe brevemente esta categoría..."
                            />
                          </div>
                          <div className="flex gap-3 pt-4">
                            <button 
                              type="button" 
                              onClick={() => setShowCreateCategory(false)} 
                              className="flex-1 py-2 px-4 rounded-lg bg-gray-600 hover:bg-gray-500 text-white font-medium transition-all duration-200"
                            >
                              Cancelar
                            </button>
                            <button 
                              type="submit" 
                              className="flex-1 py-2 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/25"
                            >
                              Crear Categoría
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                )}
              </main>
            </div>
          </div>
      </div>
    </>
  )
}