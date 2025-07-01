import { useState } from 'react';
import SideBar from '@/components/SideBar';
import Header from '@/components/Header';
import StoreGrid from '@/components/vendorsComponents/StoreComponents/StoreGrid';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <>
      <div className='flex min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'>
        <SideBar/>
        <div className='flex flex-1 flex-col'>
          <Header onSearch={setSearchTerm}/>
          <div className='flex flex-1'>
            <main className='flex-1 p-8 flex flex-col items-center'>
              <h1 className='text-4xl font-bold mb-8 text-white text-center'>Tiendas disponibles</h1>
              <div className='w-full max-w-7xl'>
                <StoreGrid search={searchTerm}/>
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  )
}
