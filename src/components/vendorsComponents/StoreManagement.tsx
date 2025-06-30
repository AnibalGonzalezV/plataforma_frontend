import SideBar from '@/components/SideBar';
import Header from '@/components/Header';
import { useState } from 'react';

export default function StoreManagement() {
  // Estado para crear tienda (modal)
  const [showCreateStore, setShowCreateStore] = useState(false);
  const [storeName, setStoreName] = useState('');
  const [storeAddress, setStoreAddress] = useState('');
  const [storeMessage, setStoreMessage] = useState('');

  // Estado para crear categoría
  const [categoryName, setCategoryName] = useState('');
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
    // await createCategory({ name: categoryName });
    setCategoryMessage(`Categoría "${categoryName}" creada correctamente!`);
    setCategoryName('');
  };

  return (
    <>
      <div className='flex min-h-screen bg-gray-800'>
          <SideBar/>
          <div className='flex flex-1 flex-col'>
            <Header/>
            <div className='flex flex-1'>
              <main className='flex-1 p-4'>
                {/* Botón para abrir el modal de crear tienda */}
                <div className="max-w-xl mx-auto mb-8">
                  <button
                    onClick={() => setShowCreateStore(true)}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded font-semibold shadow"
                  >
                    Crear Tienda
                  </button>
                  {storeMessage && <div className="mt-2 text-green-700 font-medium">{storeMessage}</div>}
                </div>

                {/* Modal para crear tienda */}
                {showCreateStore && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative animate-fade-in">
                      <button
                        className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                        onClick={() => setShowCreateStore(false)}
                      >
                        ×
                      </button>
                      <h2 className="text-xl font-bold mb-4 text-gray-800">Crear nueva tienda</h2>
                      <form onSubmit={handleCreateStore} className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Nombre de la tienda</label>
                          <input type="text" value={storeName} onChange={e => setStoreName(e.target.value)} required className="w-full border border-gray-300 rounded px-3 py-2" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Dirección</label>
                          <input type="text" value={storeAddress} onChange={e => setStoreAddress(e.target.value)} required className="w-full border border-gray-300 rounded px-3 py-2" />
                        </div>
                        <div className="flex gap-2">
                          <button type="button" onClick={() => setShowCreateStore(false)} className="flex-1 py-2 rounded bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold">Cancelar</button>
                          <button type="submit" className="flex-1 py-2 rounded bg-green-600 hover:bg-green-700 text-white font-semibold">Crear</button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}

                {/* Aquí deberías mapear la lista de tiendas obtenida de la API */}
                {/* Ejemplo:
                <ul>
                  {tiendas.map(tienda => (
                    <li key={tienda.id}>...</li>
                  ))}
                </ul>
                */}
                <div className="max-w-xl mx-auto bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-bold mb-4 text-gray-800">Crear nueva categoría</h2>
                  <form onSubmit={handleCreateCategory} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Nombre de la categoría</label>
                      <input type="text" value={categoryName} onChange={e => setCategoryName(e.target.value)} required className="w-full border border-gray-300 rounded px-3 py-2" />
                    </div>
                    <button type="submit" className="w-full py-2 rounded bg-blue-600 hover:bg-blue-700 text-white font-semibold">Crear categoría</button>
                  </form>
                  {categoryMessage && <div className="mt-2 text-blue-700 font-medium">{categoryMessage}</div>}
                </div>
              </main>
            </div>
          </div>
      </div>
    </>
  )
}