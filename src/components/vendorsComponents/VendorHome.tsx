import { useState } from 'react';
import SideBar from '@/components/SideBar';
import Header from '@/components/Header';
import StoreGrid from '@/components/vendorsComponents/StoreComponents/StoreGrid';
import { Store, Plus, Search, TrendingUp, Users, DollarSign, Package, Star } from 'lucide-react';

export default function VendorHome() {
  const [searchTerm, setSearchTerm] = useState('');

  // Estadísticas simuladas (conectar con API real)
  const stats = {
    totalStores: 3,
    totalProducts: 24,
    totalSales: 1250000,
    averageRating: 4.2
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
                    <div className='p-2 bg-green-600/20 rounded-lg'>
                      <Store className='h-6 w-6 text-green-400' />
                    </div>
                    <h1 className='text-3xl font-bold text-white'>Panel de Vendedor</h1>
                  </div>
                  <p className='text-gray-400 text-lg'>Gestiona y administra todas tus tiendas desde un solo lugar</p>
                </div>

                {/* Estadísticas */}
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
                  <div className='bg-gradient-to-br from-blue-600/20 to-blue-800/20 rounded-2xl p-6 border border-blue-600/30'>
                    <div className='flex items-center justify-between'>
                      <div>
                        <p className='text-blue-300 text-sm font-medium'>Total Tiendas</p>
                        <p className='text-2xl font-bold text-white'>{stats.totalStores}</p>
                      </div>
                      <div className='p-3 bg-blue-600/30 rounded-xl'>
                        <Store className='h-6 w-6 text-blue-400' />
                      </div>
                    </div>
                  </div>

                  <div className='bg-gradient-to-br from-green-600/20 to-green-800/20 rounded-2xl p-6 border border-green-600/30'>
                    <div className='flex items-center justify-between'>
                      <div>
                        <p className='text-green-300 text-sm font-medium'>Productos</p>
                        <p className='text-2xl font-bold text-white'>{stats.totalProducts}</p>
                      </div>
                      <div className='p-3 bg-green-600/30 rounded-xl'>
                        <Package className='h-6 w-6 text-green-400' />
                      </div>
                    </div>
                  </div>

                  <div className='bg-gradient-to-br from-yellow-600/20 to-yellow-800/20 rounded-2xl p-6 border border-yellow-600/30'>
                    <div className='flex items-center justify-between'>
                      <div>
                        <p className='text-yellow-300 text-sm font-medium'>Ventas Totales</p>
                        <p className='text-2xl font-bold text-white'>${(stats.totalSales / 1000).toFixed(0)}k</p>
                      </div>
                      <div className='p-3 bg-yellow-600/30 rounded-xl'>
                        <DollarSign className='h-6 w-6 text-yellow-400' />
                      </div>
                    </div>
                  </div>

                  <div className='bg-gradient-to-br from-purple-600/20 to-purple-800/20 rounded-2xl p-6 border border-purple-600/30'>
                    <div className='flex items-center justify-between'>
                      <div>
                        <p className='text-purple-300 text-sm font-medium'>Rating Promedio</p>
                        <div className='flex items-center gap-2'>
                          <p className='text-2xl font-bold text-white'>{stats.averageRating}</p>
                          <Star className='h-4 w-4 text-yellow-400 fill-current' />
                        </div>
                      </div>
                      <div className='p-3 bg-purple-600/30 rounded-xl'>
                        <TrendingUp className='h-6 w-6 text-purple-400' />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Barra de búsqueda mejorada */}
                <div className='mb-8 flex justify-center'>
                  <div className='relative w-full max-w-3xl'>
                    <Search className='absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400' />
                    <input
                      type='text'
                      placeholder='Buscar tiendas...'
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className='w-full pl-12 pr-4 py-4 bg-gray-700/50 border border-gray-600 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg transition-all duration-200 shadow-sm'
                    />
                  </div>
                </div>

                {/* Grid de tiendas */}
                <div className='bg-gray-800/50 rounded-2xl p-6 border border-gray-700/50'>
                  <div className='flex items-center justify-between mb-6'>
                    <h2 className='text-xl font-semibold text-white'>Mis Tiendas</h2>
                  </div>
                  <StoreGrid search={searchTerm} filterByOwner/>
                </div>
              </main>
            </div>
          </div>
      </div>
    </>
  )
}
