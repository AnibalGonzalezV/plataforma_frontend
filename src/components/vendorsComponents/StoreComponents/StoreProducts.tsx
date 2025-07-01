import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Store, Product, storeById, productsByStore } from '@/services/stores';
import AddToCartButton from '@/components/usersComponents/CartComponents/AddToCartButton';
import CartIcon from '@/components/usersComponents/CartComponents/CartIcon';
import CartDrawer from '@/components/usersComponents/CartComponents/CartDrawer';
import { useCartStore } from '@/store/CartStore';
import SideBar from '@/components/SideBar';
import Header from '@/components/Header';
import PaginationFooter from '@/components/Pagination';

export default function StoreProducts() {
  const { storeId } = useParams();

  const { data: store, isLoading: loadingStore, isError: errorStore } = useQuery<Store>({
    queryKey: ['store', storeId],
    queryFn: () => storeById(Number(storeId)),
    enabled: !!storeId
  });

  const { data: products = [], isLoading: loadingProducts, isError: errorProducts } = useQuery<Product[]>({
    queryKey: ['productsByStore', storeId],
    queryFn: () => productsByStore(Number(storeId)),
    enabled: !!storeId
  });

  const loading = loadingStore || loadingProducts;
  const error = errorStore || errorProducts;

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 16;

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

  const setActiveStore = useCartStore(state => state.setActiveStore);
  const isOpen = useCartStore(state => state.isOpen);
  const closeCart = useCartStore(state => state.closeCart);

  useEffect(() => {
    if (storeId) {
      setActiveStore(Number(storeId));
    }
  }, [storeId]);

  if (loading) {
    return (
      <div className='flex min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'>
        <SideBar />
        <div className='flex flex-1 flex-col'>
          <Header />
          <main className='flex-1 p-4 text-white flex items-center justify-center'>
            <div className='text-center'>
              <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4'></div>
              <p className='text-gray-400'>Cargando tienda...</p>
            </div>
          </main>
        </div>
      </div>
    );
  }

  if (error || !store) {
    return (
      <div className='flex min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'>
        <SideBar />
        <div className='flex flex-1 flex-col'>
          <Header />
          <main className='flex-1 p-4 text-white flex items-center justify-center'>
            <div className='text-center'>
              <div className='p-3 bg-red-600/20 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center'>
                <span className='text-3xl text-red-400'>!</span>
              </div>
              <h3 className='text-xl font-semibold text-white mb-2'>Error al cargar la tienda o los productos</h3>
              <p className='text-gray-400'>Intenta recargar la página</p>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className='flex min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'>
      <SideBar />
      <div className='flex flex-1 flex-col'>
        <Header />
        <main className='flex flex-col flex-1 p-8 text-white'>
          <div className='flex-1 flex flex-col items-center'>
            <h1 className='text-4xl font-bold mb-2 text-center'>{store.name}</h1>
            <p className='mb-6 text-gray-300 text-lg text-center'>{store.address}</p>
            <h2 className='text-2xl font-semibold mb-8 text-center'>Productos</h2>
            <div className='w-full max-w-7xl mx-auto'>
              <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
                {products.length === 0 ? (
                  <div className='col-span-full text-center text-gray-400 py-16'>No hay productos en esta tienda.</div>
                ) : (
                  currentItems.map(product => (
                    <div
                      key={product.productId}
                      className='bg-gray-800/70 p-6 rounded-2xl shadow-lg hover:shadow-2xl hover:scale-[1.025] transition-all duration-200 flex flex-col justify-between border border-gray-700/40'
                    >
                      <div>
                        <div className='relative mb-4'>
                          <img
                            src={product.img || '/burger.svg'}
                            alt={product.name}
                            className='w-full h-48 object-contain object-center rounded-xl bg-gray-900/40 border border-gray-700/30'
                          />
                        </div>
                        <h3 className='text-xl font-bold mb-1 text-white'>{product.name}</h3>
                        <p className='text-gray-400 text-sm mb-2'>{product.description}</p>
                        <div className='flex items-center justify-between mb-2'>
                          <span className='text-2xl font-bold text-green-400'>${product.price}</span>
                          <span className='text-xs text-gray-400'>Stock: {product.quantity}</span>
                        </div>
                        <p className='text-xs text-gray-500 mb-2'>Categoría: {product.category?.name}</p>
                      </div>
                      <div className="mt-4">
                        <AddToCartButton
                          product={{
                            id: product.productId,
                            name: product.name,
                            price: product.price,
                            image: product.img,
                            storeId: Number(storeId),
                          }}
                          className="w-full"
                        />
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
          <div className='mt-10'>
            <PaginationFooter
              currentPage={currentPage}
              totalPages={totalPages}
              onPrev={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              onNext={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            />
          </div>
        </main>
        <CartIcon />
        <CartDrawer open={isOpen} onClose={closeCart} />
      </div>
    </div>
  );
}