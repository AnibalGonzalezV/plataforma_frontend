import { CartDrawer, ProductCard } from './index';

// Productos de ejemplo
const sampleProducts = [
  {
    id: 1,
    name: "Pizza Margherita",
    price: 12000,
    description: "Pizza clásica con tomate, mozzarella y albahaca",
    image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=400&h=300&fit=crop"
  },
  {
    id: 2,
    name: "Hamburguesa Clásica",
    price: 8500,
    description: "Hamburguesa con carne, lechuga, tomate y queso",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop"
  },
  {
    id: 3,
    name: "Ensalada César",
    price: 6500,
    description: "Ensalada fresca con pollo, crutones y aderezo césar",
    image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=300&fit=crop"
  },
  {
    id: 4,
    name: "Pasta Carbonara",
    price: 9500,
    description: "Pasta con salsa cremosa, panceta y parmesano",
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=400&h=300&fit=crop"
  }
];

export function CartExample() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-semibold text-gray-900">
              Ejemplo de Carrito de Compras
            </h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">
                Haz clic en el icono del carrito para verlo en acción
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Productos Disponibles
          </h2>
          <p className="text-gray-600">
            Haz clic en "Agregar al Carrito" para añadir productos al carrito.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sampleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-12 p-6 bg-blue-50 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">
            Cómo usar el carrito:
          </h3>
          <ul className="text-blue-800 space-y-1">
            <li>• Haz clic en "Agregar al Carrito" en cualquier producto</li>
            <li>• Haz clic en el icono del carrito en la esquina inferior derecha</li>
            <li>• Modifica cantidades con los botones + y -</li>
            <li>• Elimina productos individuales con el botón de papelera</li>
            <li>• Vacía todo el carrito con "Vaciar Carrito"</li>
            <li>• El carrito persiste hasta que lo vacíes manualmente</li>
          </ul>
        </div>
      </main>

      <CartDrawer />
    </div>
  );
}
