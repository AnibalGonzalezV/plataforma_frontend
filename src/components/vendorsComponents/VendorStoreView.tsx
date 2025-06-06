import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { storeById, Store } from '@/services/stores';
import { SideBar } from '@/components/SideBar';
import { Header } from '@/components/Header';

export default function VendorStoreView() {
  const { storeId } = useParams();
  const [store, setStore] = useState<Store | null>(null);

  useEffect(() => {
    if (!storeId) return;
    storeById(Number(storeId)).then(setStore).catch(err => {
      console.error('Error cargando tienda del vendedor:', err);
    });
  }, [storeId]);

  if (!store) {
    return (
    <>
        <div className="flex min-h-screen bg-gray-800">
            <SideBar/>
            <div className='flex flex-1 flex-col'>
                <Header/>
                <div className='flex flex-1'>
                <main className='flex-1 p-4'>
                    <div className="min-h-screen bg-gray-800 flex items-center justify-center text-white">
                    Cargando tienda...
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
        <div className="flex min-h-screen bg-gray-800">
            <SideBar/>
            <div className='flex flex-1 flex-col'>
                <Header/>
                <div className='flex flex-1'>
                <main className='flex-1 p-4 text-white'>
                    <h1 className="text-2xl font-bold mb-4">Panel de Tienda: {store.name}</h1>
                    <p><span className="font-semibold">Dirección:</span> {store.address}</p>
                    <p><span className="font-semibold">Puntaje:</span> {store.score}</p>
                </main>
                </div>
            </div>
        </div>
    </>
  );
}

