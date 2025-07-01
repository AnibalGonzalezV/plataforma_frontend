import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '@/store/AuthStore';
import { createStore, storeList } from '@/services/stores';
import type { Store as StoreType } from '@/services/stores';
import StoreGrid from '@/components/vendorsComponents/StoreComponents/StoreGrid';
import SideBar from '@/components/SideBar';
import Header from '@/components/Header';
import { Store , Plus, Search, Star, X, CheckCircle, Building2, Users, DollarSign } from 'lucide-react';

export default function StoreManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateStore, setShowCreateStore] = useState(false);
  const [storeName, setStoreName] = useState('');
  const [storeAddress, setStoreAddress] = useState('');
  const [storeMessage, setStoreMessage] = useState('');

  const userId = useAuthStore(state => state.id);
  const queryClient = useQueryClient();
  const { data: stores = [], isLoading, isError } = useQuery<StoreType[]>({
    queryKey: ['stores'],
    queryFn: () => storeList()
  });

  const storesFiltred = stores.filter(store => store.owner.id === userId);

  const createMutation = useMutation({
      mutationFn: () => createStore(userId, storeName, storeAddress, 0),
      onSuccess: (newStore) => {
        queryClient.invalidateQueries({ queryKey: ['stores'] });
        setStoreMessage(`Tienda "${newStore.name}" creada exitosamente!`);
        setStoreName('');
        setStoreAddress('');
        setShowCreateStore(false);
      },
      onError: () => {
        setStoreMessage(`Error al crear la Tienda`);
      },
    });

  const handleCreateStore = async (e: React.FormEvent) => {
    e.preventDefault();
    createMutation.mutate();
  };

  const handleEditStore = (storeId: number) => {
    // Llama aquí a la API para editar tienda
    // await updateStore(storeId, { ...storeData });
  };

  const handleDeleteStore = (storeId: number) => {
    // Llama aquí a la API para eliminar tienda
    // await deleteStore(storeId);
  };

  // Estadísticas generales
  const totalStats = {
    stores: storesFiltred.length,
    totalProducts: 0,
    totalSales: 0,
    averageRating: (storesFiltred.reduce((sum, store) => sum + store.score, 0) / stores.length).toFixed(1)
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
                    <Building2 className='h-6 w-6 text-blue-400' />
                  </div>
                  <h1 className='text-3xl font-bold text-white'>Gestión de Tiendas</h1>
                </div>
                <p className='text-gray-400 text-lg'>Administra todas tus tiendas y configuraciones</p>
              </div>

              {/* Estadísticas generales */}
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
                <div className='bg-gradient-to-br from-blue-600/20 to-blue-800/20 rounded-2xl p-6 border border-blue-600/30'>
                  <div className='flex items-center justify-between'>
                    <div>
                      <p className='text-blue-300 text-sm font-medium'>Total Tiendas</p>
                      <p className='text-2xl font-bold text-white'>{totalStats.stores}</p>
                    </div>
                    <div className='p-3 bg-blue-600/30 rounded-xl'>
                      <Building2 className='h-6 w-6 text-blue-400' />
                    </div>
                  </div>
                </div>

                <div className='bg-gradient-to-br from-green-600/20 to-green-800/20 rounded-2xl p-6 border border-green-600/30'>
                  <div className='flex items-center justify-between'>
                    <div>
                      <p className='text-green-300 text-sm font-medium'>Productos Totales</p>
                      <p className='text-2xl font-bold text-white'>{totalStats.totalProducts}</p>
                    </div>
                    <div className='p-3 bg-green-600/30 rounded-xl'>
                      <Store className='h-6 w-6 text-green-400' />
                    </div>
                  </div>
                </div>

                <div className='bg-gradient-to-br from-yellow-600/20 to-yellow-800/20 rounded-2xl p-6 border border-yellow-600/30'>
                  <div className='flex items-center justify-between'>
                    <div>
                      <p className='text-yellow-300 text-sm font-medium'>Ventas Totales</p>
                      <p className='text-2xl font-bold text-white'>${(totalStats.totalSales / 1000).toFixed(0)}k</p>
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
                        <p className='text-2xl font-bold text-white'>{totalStats.averageRating}</p>
                        <Star className='h-4 w-4 text-yellow-400 fill-current' />
                      </div>
                    </div>
                    <div className='p-3 bg-purple-600/30 rounded-xl'>
                      <Users className='h-6 w-6 text-purple-400' />
                    </div>
                  </div>
                </div>
              </div>

              {/* Barra de búsqueda y botón crear */}
              <div className='flex flex-col lg:flex-row gap-4 mb-8'>
                <div className='flex-1 relative'>
                  <Search className='absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400' />
                  <input
                    type='text'
                    placeholder='Buscar tiendas por nombre o dirección...'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className='w-full pl-12 pr-4 py-4 bg-gray-700/50 border border-gray-600 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg transition-all duration-200 shadow-sm'
                  />
                </div>
                <button
                  onClick={() => setShowCreateStore(true)}
                  className='flex items-center gap-2 px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-medium transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/25 whitespace-nowrap'
                >
                  <Plus className='h-5 w-5' />
                  Nueva Tienda
                </button>
              </div>

              {/* Lista de tiendas */}
              <div className='bg-gray-800/50 rounded-2xl p-6 border border-gray-700/50'>
                <div className='flex items-center justify-between mb-6'>
                  <h2 className='text-xl font-semibold text-white'>Mis Tiendas</h2>
                </div>
                <StoreGrid search={searchTerm} filterByOwner/>
              </div>

              {/* Modal para crear tienda */}
              {showCreateStore && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                  <div className="bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md mx-4 border border-gray-700">
                    <div className='p-6'>
                      <div className='flex items-center justify-between mb-6'>
                        <div className='flex items-center gap-3'>
                          <div className='p-2 bg-blue-600/20 rounded-lg'>
                            <Store className='h-5 w-5 text-blue-400' />
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
                            className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200" 
                            placeholder="Ej: Restaurante El Buen Sabor"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Dirección</label>
                          <input 
                            type="text" 
                            value={storeAddress} 
                            onChange={e => setStoreAddress(e.target.value)} 
                            required 
                            className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200" 
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
                            className="flex-1 py-2 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/25"
                          >
                            Crear Tienda
                          </button>
                        </div>
                      </form>
                      {storeMessage && (
                        <div className='mt-4 flex items-center gap-2 text-blue-400 text-sm'>
                          <CheckCircle className='h-4 w-4' />
                          {storeMessage}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </main>
          </div>
        </div>
      </div>
    </>
  );
}