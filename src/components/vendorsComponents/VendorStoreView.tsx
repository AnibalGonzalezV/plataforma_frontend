import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { storeById, Store } from '@/services/stores';
import SideBar from '@/components/SideBar';
import Header from '@/components/Header';
import { useState } from 'react';
import { Store as StoreIcon, Plus, Tag, Package, X, CheckCircle, Edit, Trash2 } from 'lucide-react';

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
                      <div className='flex items-center gap-3 mb-4'>
                        <div className='p-3 bg-green-600/20 rounded-xl'>
                          <StoreIcon className='h-8 w-8 text-green-400' />
                        </div>
                        <div>
                          <h1 className='text-3xl font-bold'>{store.name}</h1>
                          <p className='text-gray-400 text-lg'>{store.address}</p>
                        </div>
                      </div>
                      <div className='flex items-center gap-4'>
                        <div className='flex items-center gap-2 px-3 py-1 bg-gray-700/50 rounded-lg'>
                          <div className={`w-2 h-2 rounded-full ${
                            parseFloat(store.score) === 0 ? 'bg-gray-500'
                            : parseFloat(store.score) < 4 ? 'bg-red-500'
                            : 'bg-green-500'
                          }`}/>
                          <span className='text-sm font-medium'>Puntaje: {store.score}</span>
                        </div>
                      </div>
                    </div>

                    {/* Grid de acciones */}
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8'>
                      {/* Botón para crear producto */}
                      <div className='flex justify-end mb-4'>
                        <button
                          onClick={() => setShowCreateProduct(true)}
                          className='flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/25'
                        >
                          <Plus className='h-4 w-4' />
                          Crear Producto
                        </button>
                      </div>

                      {/* Tarjeta para crear tag */}
                      <div className='bg-gray-800/50 rounded-2xl p-6 border border-gray-700/50'>
                        <div className='flex items-center gap-3 mb-4'>
                          <div className='p-2 bg-purple-600/20 rounded-lg'>
                            <Tag className='h-5 w-5 text-purple-400' />
                          </div>
                          <h2 className='text-xl font-semibold'>Nuevo Tag</h2>
                        </div>
                        <p className='text-gray-400 mb-4'>Crea etiquetas para organizar tus productos</p>
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
                      <h3 className='text-xl font-semibold mb-4'>Productos de la Tienda</h3>
                      {productos.length === 0 ? (
                        <div className='text-gray-400 text-center py-8'>
                          <Package className='h-12 w-12 mx-auto mb-3 text-gray-600' />
                          <p>Aquí aparecerán todos los productos de tu tienda</p>
                          <p className='text-sm text-gray-500'>Conecta con la API para mostrar la lista de productos</p>
                        </div>
                      ) : (
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                          {productos.map(producto => (
                            <div key={producto.id} className='bg-gray-700/50 rounded-xl p-4 border border-gray-600'>
                              <div className='flex items-center justify-between mb-2'>
                                <h4 className='font-semibold text-white'>{producto.name}</h4>
                                <div className='flex gap-1'>
                                  <button onClick={() => handleOpenEditProduct(producto)} className='p-1 text-blue-400 hover:text-blue-300'>
                                    <Edit className='h-4 w-4' />
                                  </button>
                                  <button onClick={() => handleDeleteProduct(producto.id)} className='p-1 text-red-400 hover:text-red-300'>
                                    <Trash2 className='h-4 w-4' />
                                  </button>
                                </div>
                              </div>
                              <p className='text-gray-400 text-sm mb-2'>${producto.price}</p>
                              <p className='text-gray-500 text-xs'>Cantidad: {producto.quantity}</p>
                              <p className='text-gray-400 text-xs'>{producto.description}</p>
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