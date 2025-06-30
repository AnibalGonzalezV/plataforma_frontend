import SideBar from '@/components/SideBar';
import Header from '@/components/Header';
import { useState } from 'react';

export default function StoreManagement() {
  // Estado para crear tienda
  const [storeName, setStoreName] = useState('');
  const [storeAddress, setStoreAddress] = useState('');
  const [storeMessage, setStoreMessage] = useState('');

  // Estado para crear categoría
  const [categoryName, setCategoryName] = useState('');
  const [categoryMessage, setCategoryMessage] = useState('');

  // Handler simulado para crear tienda
  const handleCreateStore = async (e: React.FormEvent) => {
    e.preventDefault();
    // === LLAMA AQUÍ A LA FUNCIÓN DEL SERVICIO PARA CREAR TIENDA ===
    // Ejemplo:
    // await createStore({ name: storeName, address: storeAddress });
    setStoreMessage(`Tienda "${storeName}" creada correctamente!`);
    setStoreName('');
    setStoreAddress('');
  };

  // Handler simulado para crear categoría
  const handleCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    // === LLAMA AQUÍ A LA FUNCIÓN DEL SERVICIO PARA CREAR CATEGORÍA ===
    // Ejemplo:
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
                <div className="max-w-xl mx-auto bg-white rounded-lg shadow-md p-6 mb-8">
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
                    <button type="submit" className="w-full py-2 rounded bg-green-600 hover:bg-green-700 text-white font-semibold">Crear tienda</button>
                  </form>
                  {storeMessage && <div className="mt-2 text-green-700 font-medium">{storeMessage}</div>}
                </div>

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