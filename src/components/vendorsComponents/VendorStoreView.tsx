import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { storeById, Store } from '@/services/stores';
import SideBar from '@/components/SideBar';
import Header from '@/components/Header';

export default function VendorStoreView() {
  const { storeId } = useParams();

  const { data: store, isLoading, isError } = useQuery<Store>({
    queryKey: ['store', storeId],
    queryFn: () => storeById(Number(storeId)),
    enabled: !!storeId
  });

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
                </main>
                </div>
            </div>
        </div>
    </>
  );
}