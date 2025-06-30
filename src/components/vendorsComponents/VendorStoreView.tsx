import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { storeById, Store } from '@/services/stores';
import SideBar from '@/components/SideBar';
import Header from '@/components/Header';
import { useState } from 'react';

export default function VendorStoreView() {
  const { storeId } = useParams();

  const { data: store, isLoading, isError } = useQuery<Store>({
    queryKey: ['store', storeId],
    queryFn: () => storeById(Number(storeId)),
    enabled: !!storeId
  });

  // Estado para agregar producto
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productMessage, setProductMessage] = useState('');

  // Estado para agregar tag
  const [tagName, setTagName] = useState('');
  const [tagMessage, setTagMessage] = useState('');

  // Handler simulado para agregar producto
  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    // === LLAMA AQUÍ A LA FUNCIÓN DEL SERVICIO PARA AGREGAR PRODUCTO ===
    // Ejemplo:
    // await addProductToStore(storeId, { name: productName, price: productPrice });
    setProductMessage(`Producto "${productName}" agregado a la tienda #${storeId}!`);
    setProductName('');
    setProductPrice('');
  };

  // Handler simulado para agregar tag
  const handleAddTag = async (e: React.FormEvent) => {
    e.preventDefault();
    // === LLAMA AQUÍ A LA FUNCIÓN DEL SERVICIO PARA AGREGAR TAG ===
    // Ejemplo:
    // await addTagToStore(storeId, { name: tagName });
    setTagMessage(`Tag "${tagName}" agregado a la tienda #${storeId}!`);
    setTagName('');
  };

  if (isLoading) {
    return (
    <>
      <div className='flex min-h-screen bg-gray-800'>
          <SideBar/>
          <div className='flex flex-1 flex-col'>
              <Header/>
              <div className='flex flex-1'>
                <main className='flex-1 p-4'>
                  <div className='min-h-screen bg-gray-800 flex items-center justify-center text-white'>
                    Cargando tienda...
                  </div>
                </main>
              </div>
          </div>
      </div>
    </>
    );
  }

  if (isError || !store) {
    return (
    <>
      <div className='flex min-h-screen bg-gray-800'>
          <SideBar/>
          <div className='flex flex-1 flex-col'>
              <Header/>
              <div className='flex flex-1'>
                <main className='flex-1 p-4'>
                  <div className='min-h-screen bg-gray-800 flex items-center justify-center text-white'>
                  Hubo un error al cargar la tienda.
                  </div>
                </main>
              </div>
          </div>
      </div>
    </>
    );
  }

  return (
    <>
        <div className='flex min-h-screen bg-gray-800'>
            <SideBar/>
            <div className='flex flex-1 flex-col'>
                <Header/>
                <div className='flex flex-1'>
                <main className='flex-1 p-4 text-white'>
                    <h1 className='text-2xl font-bold mb-4'>Panel de Tienda: {store.name}</h1>
                    <p><span className='font-semibold'>Dirección:</span> {store.address}</p>
                    <p><span className='font-semibold'>Puntaje:</span> {store.score}</p>

                    <div className="max-w-xl bg-white rounded-lg shadow-md p-6 mt-8 mb-8 text-gray-900">
                      <h2 className="text-xl font-bold mb-4">Agregar producto</h2>
                      <form onSubmit={handleAddProduct} className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Nombre del producto</label>
                          <input type="text" value={productName} onChange={e => setProductName(e.target.value)} required className="w-full border border-gray-300 rounded px-3 py-2" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Precio</label>
                          <input type="number" value={productPrice} onChange={e => setProductPrice(e.target.value)} required className="w-full border border-gray-300 rounded px-3 py-2" />
                        </div>
                        <button type="submit" className="w-full py-2 rounded bg-green-600 hover:bg-green-700 text-white font-semibold">Agregar producto</button>
                      </form>
                      {productMessage && <div className="mt-2 text-green-700 font-medium">{productMessage}</div>}
                    </div>

                    <div className="max-w-xl bg-white rounded-lg shadow-md p-6 text-gray-900">
                      <h2 className="text-xl font-bold mb-4">Agregar tag</h2>
                      <form onSubmit={handleAddTag} className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Nombre del tag</label>
                          <input type="text" value={tagName} onChange={e => setTagName(e.target.value)} required className="w-full border border-gray-300 rounded px-3 py-2" />
                        </div>
                        <button type="submit" className="w-full py-2 rounded bg-blue-600 hover:bg-blue-700 text-white font-semibold">Agregar tag</button>
                      </form>
                      {tagMessage && <div className="mt-2 text-blue-700 font-medium">{tagMessage}</div>}
                    </div>
                </main>
                </div>
            </div>
        </div>
    </>
  );
}