import { useState } from 'react';
import SideBar from '@/components/SideBar';
import Header from '@/components/Header';
import StoreGrid from '@/components/vendorsComponents/Store/StoreGrid';
import { Store, Plus, Search } from 'lucide-react';

export default function VendorHome() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <>
      <div className='flex min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'>
          <SideBar/>
          <div className='flex flex-1 flex-col'>
            <Header onSearch={setSearchTerm}/>
            <div className='flex flex-1'>
              <main className='flex-1 p-6'>
                {/* Header de la sección */}
                <div className='mb-8'>
                  <div className='flex items-center gap-3 mb-2'>
                    <div className='p-2 bg-green-600/20 rounded-lg'>
                      <Store className='h-6 w-6 text-green-400' />
                    </div>
                    <h1 className='text-3xl font-bold text-white'>Mis Tiendas</h1>
                  </div>
                  <p className='text-gray-400 text-lg'>Gestiona y administra todas tus tiendas desde un solo lugar</p>
                </div>

                {/* Barra de búsqueda mejorada */}
                <div className='mb-6'>
                  <div className='relative max-w-md'>
                    <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400' />
                    <input
                      type='text'
                      placeholder='Buscar tiendas...'
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className='w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200'
                    />
                  </div>
                </div>

                {/* Grid de tiendas */}
                <div className='bg-gray-800/50 rounded-2xl p-6 border border-gray-700/50'>
                  <StoreGrid search={searchTerm} filterByOwner/>
                </div>
              </main>
            </div>
          </div>
      </div>
    </>
  )
}
