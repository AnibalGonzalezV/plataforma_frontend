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
      <div className='flex min-h-screen bg-gray-800'>
        <SideBar />
        <div className='flex flex-1 flex-col'>
          <Header />
          <main className='flex-1 p-4 text-white flex items-center justify-center'>
            Cargando tienda...
          </main>
        </div>
      </div>
    );
  }

  if (error || !store) {
    return (
      <div className='flex min-h-screen bg-gray-800'>
        <SideBar />
        <div className='flex flex-1 flex-col'>
          <Header />
          <main className='flex-1 p-4 text-white flex items-center justify-center'>
            Error al cargar la tienda o los productos.
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className='flex min-h-screen bg-gray-800'>
      <SideBar />
      <div className='flex flex-1 flex-col'>
        <Header />
        <main className='flex flex-col flex-1 p-4 text-white'>
        <div className='flex-1 flex flex-col'>
          <h1 className='text-2xl font-bold mb-2'>{store.name}</h1>
          <p className='mb-4 text-gray-300'>{store.address}</p>

          <h2 className='text-xl font-semibold mb-4'>Productos</h2>
          <div className='grid grid-cols-4 gap-4'>
            {products.length === 0 ? (
              <p className='text-gray-400'>No hay productos en esta tienda.</p>
            ) : (
              currentItems.map(product => (
                <div
                  key={product.productId}
                  className='bg-gray-700 p-4 rounded-lg shadow hover:bg-gray-600 flex flex-col justify-between'
                >
                  <div>
                    <div className='relative mb-3'>
                      <img
                        src={product.img || '/burger.svg'}
                        alt={product.name}
                        className='w-full h-[140px] object-contain object-center'
                      />
                    </div>
                    <h3 className='text-lg font-bold'>{product.name}</h3>
                    <p className='text-sm text-gray-300 mb-1'>{product.description}</p>
                    <p className='text-sm'>$ <span className='font-semibold'>{product.price}</span></p>
                    <p className='text-sm'>Cantidad: {product.quantity}</p>
                    <p className='text-sm text-gray-400 mt-2'>Categoría: {product.category?.name}</p>
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
        <div className='mt-6'>
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