import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { storeById, Store } from '@/services/stores';
import SideBar from '@/components/SideBar';
import Header from '@/components/Header';
import { useState } from 'react';
import { Store as StoreIcon, Plus, Tag, Package, X, CheckCircle, Edit, Trash2, TrendingUp, DollarSign, Users, Star, MapPin, Calendar, Eye } from 'lucide-react';

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

  // Estado para crear tag (modal)
  const [showCreateTag, setShowCreateTag] = useState(false);
  const [tagName, setTagName] = useState('');
  const [tagMessage, setTagMessage] = useState('');

  // Estado para productos (modales)
  const [showCreateProduct, setShowCreateProduct] = useState(false);
  const [showEditProduct, setShowEditProduct] = useState(false);
  const [editProductData, setEditProductData] = useState<any>(null);
  const [productDescription, setProductDescription] = useState('');
  
  // Simulación de productos (reemplazar por fetch real)
  const productos: any[] = [];
  // const { data: productos = [], isLoading: loadingProductos } = useQuery(['products', storeId], () => getProductsByStore(storeId));

  // Estadísticas simuladas de la tienda (conectar con API real)
  const storeStats = {
    totalProducts: productos.length,
    totalSales: 450000,
    totalOrders: 23,
    averageRating: parseFloat(store?.score || '0'),
    views: 156
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    // Llama aquí a la API para agregar producto
    // await addProductToStore(storeId, { name: productName, price: productPrice });
    setProductMessage(`Producto "${productName}" agregado a la tienda #${storeId}!`);
    setProductName('');
    setProductPrice('');
  };

  const handleAddTag = async (e: React.FormEvent) => {
    e.preventDefault();
    // Llama aquí a la API para agregar tag
    // await addTagToStore(storeId, { name: tagName });
    setTagMessage(`Tag "${tagName}" agregado a la tienda #${storeId}!`);
    setTagName('');
    setShowCreateTag(false);
  };

  const handleOpenEditProduct = (producto: any) => {
    setEditProductData(producto);
    setShowEditProduct(true);
  };

  const handleEditProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Llama aquí a la API para editar producto
    // await updateProduct(editProductData.id, { ...editProductData })
    setShowEditProduct(false);
    setEditProductData(null);
  };

  const handleDeleteProduct = (productId: number) => {
    // Llama aquí a la API para eliminar producto
    // await deleteProduct(productId);
  };

  if (isLoading) {
    return (
    <>
      <div className='flex min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'>
          <SideBar/>
          <div className='flex flex-1 flex-col'>
              <Header/>
              <div className='flex flex-1'>
                <main className='flex-1 p-6'>
                  <div className='flex items-center justify-center min-h-[400px]'>
                    <div className='text-center'>
                      <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4'></div>
                      <p className='text-gray-400'>Cargando tienda...</p>
                    </div>
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
      <div className='flex min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'>
          <SideBar/>
          <div className='flex flex-1 flex-col'>
              <Header/>
              <div className='flex flex-1'>
                <main className='flex-1 p-6'>
                  <div className='flex items-center justify-center min-h-[400px]'>
                    <div className='text-center'>
                      <div className='p-3 bg-red-600/20 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center'>
                        <X className='h-8 w-8 text-red-400' />
                      </div>
                      <h3 className='text-xl font-semibold text-white mb-2'>Error al cargar la tienda</h3>
                      <p className='text-gray-400'>No se pudo cargar la información de la tienda</p>
                    </div>
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
        <div className='flex min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'>
            <SideBar/>
            <div className='flex flex-1 flex-col'>
                <Header/>
                <div className='flex flex-1'>
                <main className='flex-1 p-6 text-white'>
                    {/* Header de la tienda */}
                    <div className='mb-8'>
                      <div className='flex items-center gap-4 mb-6'>
                        <div className='p-4 bg-gradient-to-br from-green-600/20 to-green-800/20 rounded-2xl border border-green-600/30'>
                          <StoreIcon className='h-10 w-10 text-green-400' />
                        </div>
                        <div className='flex-1'>
                          <h1 className='text-3xl font-bold mb-2'>{store.name}</h1>
                          <div className='flex items-center gap-4 text-gray-400'>
                            <div className='flex items-center gap-2'>
                              <MapPin className='h-4 w-4' />
                              <span>{store.address}</span>
                            </div>
                            <div className='flex items-center gap-2'>
                              <Star className='h-4 w-4 text-yellow-400' />
                              <span>{store.score} / 5.0</span>
                            </div>
                          </div>
                        </div>
                        <button className='flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/25'>
                          <Eye className='h-4 w-4' />
                          Ver Tienda
                        </button>
                      </div>
                    </div>

                    {/* Estadísticas de la tienda */}
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8'>
                      <div className='bg-gradient-to-br from-blue-600/20 to-blue-800/20 rounded-2xl p-4 border border-blue-600/30'>
                        <div className='flex items-center gap-3'>
                          <div className='p-2 bg-blue-600/30 rounded-lg'>
                            <Package className='h-5 w-5 text-blue-400' />
                          </div>
                          <div>
                            <p className='text-blue-300 text-sm'>Productos</p>
                            <p className='text-xl font-bold text-white'>{storeStats.totalProducts}</p>
                          </div>
                        </div>
                      </div>

                      <div className='bg-gradient-to-br from-green-600/20 to-green-800/20 rounded-2xl p-4 border border-green-600/30'>
                        <div className='flex items-center gap-3'>
                          <div className='p-2 bg-green-600/30 rounded-lg'>
                            <DollarSign className='h-5 w-5 text-green-400' />
                          </div>
                          <div>
                            <p className='text-green-300 text-sm'>Ventas</p>
                            <p className='text-xl font-bold text-white'>${(storeStats.totalSales / 1000).toFixed(0)}k</p>
                          </div>
                        </div>
                      </div>

                      <div className='bg-gradient-to-br from-purple-600/20 to-purple-800/20 rounded-2xl p-4 border border-purple-600/30'>
                        <div className='flex items-center gap-3'>
                          <div className='p-2 bg-purple-600/30 rounded-lg'>
                            <Users className='h-5 w-5 text-purple-400' />
                          </div>
                          <div>
                            <p className='text-purple-300 text-sm'>Pedidos</p>
                            <p className='text-xl font-bold text-white'>{storeStats.totalOrders}</p>
                          </div>
                        </div>
                      </div>

                      <div className='bg-gradient-to-br from-yellow-600/20 to-yellow-800/20 rounded-2xl p-4 border border-yellow-600/30'>
                        <div className='flex items-center gap-3'>
                          <div className='p-2 bg-yellow-600/30 rounded-lg'>
                            <Star className='h-5 w-5 text-yellow-400' />
                          </div>
                          <div>
                            <p className='text-yellow-300 text-sm'>Rating</p>
                            <p className='text-xl font-bold text-white'>{storeStats.averageRating}</p>
                          </div>
                        </div>
                      </div>

                      <div className='bg-gradient-to-br from-orange-600/20 to-orange-800/20 rounded-2xl p-4 border border-orange-600/30'>
                        <div className='flex items-center gap-3'>
                          <div className='p-2 bg-orange-600/30 rounded-lg'>
                            <Eye className='h-5 w-5 text-orange-400' />
                          </div>
                          <div>
                            <p className='text-orange-300 text-sm'>Vistas</p>
                            <p className='text-xl font-bold text-white'>{storeStats.views}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Grid de acciones */}
                    <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8'>
                      {/* Botón para crear producto */}
                      <div className='lg:col-span-2'>
                        <div className='bg-gradient-to-br from-blue-600/20 to-blue-800/20 rounded-2xl p-6 border border-blue-600/30'>
                          <div className='flex items-center gap-3 mb-4'>
                            <div className='p-2 bg-blue-600/30 rounded-lg'>
                              <Package className='h-5 w-5 text-blue-400' />
                            </div>
                            <h2 className='text-xl font-semibold'>Gestión de Productos</h2>
                          </div>
                          <p className='text-gray-400 mb-4'>Agrega nuevos productos a tu catálogo para aumentar tus ventas</p>
                          <button
                            onClick={() => setShowCreateProduct(true)}
                            className='flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/25'
                          >
                            <Plus className='h-4 w-4' />
                            Crear Producto
                          </button>
                          {productMessage && (
                            <div className='mt-3 flex items-center gap-2 text-blue-400 text-sm'>
                              <CheckCircle className='h-4 w-4' />
                              {productMessage}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Tarjeta para crear tag */}
                      <div className='bg-gradient-to-br from-purple-600/20 to-purple-800/20 rounded-2xl p-6 border border-purple-600/30'>
                        <div className='flex items-center gap-3 mb-4'>
                          <div className='p-2 bg-purple-600/30 rounded-lg'>
                            <Tag className='h-5 w-5 text-purple-400' />
                          </div>
                          <h2 className='text-xl font-semibold'>Etiquetas</h2>
                        </div>
                        <p className='text-gray-400 mb-4'>Crea etiquetas para organizar y categorizar tus productos</p>
                        <button
                          onClick={() => setShowCreateTag(true)}
                          className='flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-medium transition-all duration-200 hover:shadow-lg hover:shadow-purple-500/25'
                        >
                          <Plus className='h-4 w-4' />
                          Crear Tag
                        </button>
                        {tagMessage && (
                          <div className='mt-3 flex items-center gap-2 text-purple-400 text-sm'>
                            <CheckCircle className='h-4 w-4' />
                            {tagMessage}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Sección de productos */}
                    <div className='bg-gray-800/50 rounded-2xl p-6 border border-gray-700/50'>
                      <div className='flex items-center justify-between mb-6'>
                        <h3 className='text-xl font-semibold'>Productos de la Tienda</h3>
                        <div className='flex items-center gap-2 text-gray-400 text-sm'>
                          <Package className='h-4 w-4' />
                          <span>{productos.length} productos</span>
                        </div>
                      </div>
                      
                      {productos.length === 0 ? (
                        <div className='text-center py-12'>
                          <div className='p-4 bg-gray-700/30 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center'>
                            <Package className='h-10 w-10 text-gray-500' />
                          </div>
                          <h4 className='text-lg font-semibold text-white mb-2'>No hay productos aún</h4>
                          <p className='text-gray-400 mb-4'>Comienza agregando tu primer producto para vender</p>
                          <button
                            onClick={() => setShowCreateProduct(true)}
                            className='flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-all duration-200 mx-auto'
                          >
                            <Plus className='h-4 w-4' />
                            Agregar Primer Producto
                          </button>
                        </div>
                      ) : (
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                          {productos.map(producto => (
                            <div key={producto.id} className='bg-gradient-to-br from-gray-700/50 to-gray-800/50 rounded-xl p-4 border border-gray-600/50 hover:border-blue-500/50 transition-all duration-200'>
                              <div className='flex items-center justify-between mb-3'>
                                <h4 className='font-semibold text-white'>{producto.name}</h4>
                                <div className='flex gap-1'>
                                  <button onClick={() => handleOpenEditProduct(producto)} className='p-1.5 text-blue-400 hover:text-blue-300 hover:bg-blue-600/20 rounded-lg transition-colors'>
                                    <Edit className='h-4 w-4' />
                                  </button>
                                  <button onClick={() => handleDeleteProduct(producto.id)} className='p-1.5 text-red-400 hover:text-red-300 hover:bg-red-600/20 rounded-lg transition-colors'>
                                    <Trash2 className='h-4 w-4' />
                                  </button>
                                </div>
                              </div>
                              <div className='space-y-2'>
                                <p className='text-green-400 font-semibold'>${producto.price}</p>
                                <p className='text-gray-400 text-sm'>Cantidad: {producto.quantity}</p>
                                <p className='text-gray-500 text-xs'>{producto.description}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Modal para crear tag */}
                    {showCreateTag && (
                      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                        <div className="bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md mx-4 border border-gray-700">
                          <div className='p-6'>
                            <div className='flex items-center justify-between mb-6'>
                              <div className='flex items-center gap-3'>
                                <div className='p-2 bg-purple-600/20 rounded-lg'>
                                  <Tag className='h-5 w-5 text-purple-400' />
                                </div>
                                <h2 className="text-xl font-bold text-white">Nuevo Tag</h2>
                              </div>
                              <button
                                className="text-gray-400 hover:text-white transition-colors"
                                onClick={() => setShowCreateTag(false)}
                              >
                                <X className='h-5 w-5' />
                              </button>
                            </div>
                            <form onSubmit={handleAddTag} className="space-y-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Nombre del tag</label>
                                <input 
                                  type="text" 
                                  value={tagName} 
                                  onChange={e => setTagName(e.target.value)} 
                                  required 
                                  className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200" 
                                  placeholder="Ej: Vegetariano"
                                />
                              </div>
                              <div className="flex gap-3 pt-4">
                                <button 
                                  type="button" 
                                  onClick={() => setShowCreateTag(false)} 
                                  className="flex-1 py-2 px-4 rounded-lg bg-gray-600 hover:bg-gray-500 text-white font-medium transition-all duration-200"
                                >
                                  Cancelar
                                </button>
                                <button 
                                  type="submit" 
                                  className="flex-1 py-2 px-4 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-medium transition-all duration-200 hover:shadow-lg hover:shadow-purple-500/25"
                                >
                                  Crear Tag
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    )}
                    {/* Modal para crear producto */}
                    {showCreateProduct && (
                      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                        <div className="bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md mx-4 border border-gray-700">
                          <div className='p-6'>
                            <div className='flex items-center justify-between mb-6'>
                              <div className='flex items-center gap-3'>
                                <div className='p-2 bg-blue-600/20 rounded-lg'>
                                  <Package className='h-5 w-5 text-blue-400' />
                                </div>
                                <h2 className="text-xl font-bold text-white">Nuevo Producto</h2>
                              </div>
                              <button
                                className="text-gray-400 hover:text-white transition-colors"
                                onClick={() => setShowCreateProduct(false)}
                              >
                                <X className='h-5 w-5' />
                              </button>
                            </div>
                            <form onSubmit={handleAddProduct} className="space-y-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Nombre del producto</label>
                                <input 
                                  type="text" 
                                  value={productName} 
                                  onChange={e => setProductName(e.target.value)} 
                                  required 
                                  className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200" 
                                  placeholder="Ej: Hamburguesa Clásica"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Precio</label>
                                <input 
                                  type="number" 
                                  value={productPrice} 
                                  onChange={e => setProductPrice(e.target.value)} 
                                  required 
                                  className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200" 
                                  placeholder="5000"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Descripción</label>
                                <textarea
                                  value={productDescription}
                                  onChange={e => setProductDescription(e.target.value)}
                                  rows={3}
                                  className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                                  placeholder="Describe el producto..."
                                />
                              </div>
                              <div className="flex gap-3 pt-4">
                                <button 
                                  type="button" 
                                  onClick={() => setShowCreateProduct(false)} 
                                  className="flex-1 py-2 px-4 rounded-lg bg-gray-600 hover:bg-gray-500 text-white font-medium transition-all duration-200"
                                >
                                  Cancelar
                                </button>
                                <button 
                                  type="submit" 
                                  className="flex-1 py-2 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/25"
                                >
                                  Crear Producto
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    )}
                    {/* Modal para editar producto */}
                    {showEditProduct && editProductData && (
                      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                        <div className="bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md mx-4 border border-gray-700">
                          <div className='p-6'>
                            <div className='flex items-center justify-between mb-6'>
                              <div className='flex items-center gap-3'>
                                <div className='p-2 bg-blue-600/20 rounded-lg'>
                                  <Edit className='h-5 w-5 text-blue-400' />
                                </div>
                                <h2 className="text-xl font-bold text-white">Editar Producto</h2>
                              </div>
                              <button
                                className="text-gray-400 hover:text-white transition-colors"
                                onClick={() => setShowEditProduct(false)}
                              >
                                <X className='h-5 w-5' />
                              </button>
                            </div>
                            <form onSubmit={handleEditProductSubmit} className="space-y-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Nombre del producto</label>
                                <input 
                                  type="text" 
                                  value={editProductData.name}
                                  onChange={e => setEditProductData({ ...editProductData, name: e.target.value })}
                                  required 
                                  className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200" 
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Precio</label>
                                <input 
                                  type="number" 
                                  value={editProductData.price}
                                  onChange={e => setEditProductData({ ...editProductData, price: e.target.value })}
                                  required 
                                  className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200" 
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Descripción</label>
                                <textarea
                                  value={editProductData.description || ''}
                                  onChange={e => setEditProductData({ ...editProductData, description: e.target.value })}
                                  rows={3}
                                  className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                                />
                              </div>
                              <div className="flex gap-3 pt-4">
                                <button 
                                  type="button" 
                                  onClick={() => setShowEditProduct(false)} 
                                  className="flex-1 py-2 px-4 rounded-lg bg-gray-600 hover:bg-gray-500 text-white font-medium transition-all duration-200"
                                >
                                  Cancelar
                                </button>
                                <button 
                                  type="submit" 
                                  className="flex-1 py-2 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/25"
                                >
                                  Guardar Cambios
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
  );
}