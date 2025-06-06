import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { storeById, productsByStore, Store, Product } from '@/services/stores';
import { SideBar } from '@/components/SideBar';
import { Header } from '@/components/Header';

export default function StoreProducts() {
  const { storeId } = useParams();
  const [store, setStore] = useState<Store | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      if (!storeId) return;

      try {
        const storeData = await storeById(Number(storeId));
        const productData = await productsByStore(Number(storeId));

        setStore(storeData);
        setProducts(productData);
      } catch (error) {
        console.error("Error al obtener datos de tienda/productos:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [storeId]);

  if (loading || !store) {
    return (
      <div className="flex min-h-screen bg-gray-800">
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

  return (
    <div className="flex min-h-screen bg-gray-800">
      <SideBar />
      <div className='flex flex-1 flex-col'>
        <Header />
        <main className='flex-1 p-4 text-white'>
          <h1 className="text-2xl font-bold mb-2">{store.name}</h1>
          <p className="mb-4 text-gray-300">{store.address}</p>

          <h2 className="text-xl font-semibold mb-4">Productos</h2>
          <div className="grid grid-cols-4 gap-4">
            {products.length === 0 ? (
              <p className="text-gray-400">No hay productos en esta tienda.</p>
            ) : (
              products.map(product => (
                <div key={product.productId} className="bg-gray-700 p-4 rounded-lg shadow hover:bg-gray-600">
                  <h3 className="text-lg font-bold">{product.name}</h3>
                  <p className="text-sm text-gray-300 mb-1">{product.description}</p>
                  <p className="text-sm">$ <span className="font-semibold">{product.price}</span></p>
                  <p className="text-sm">Cantidad: {product.quantity}</p>
                  <p className="text-sm text-gray-400 mt-2">Categoría: {product.category?.name}</p>
                </div>
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
