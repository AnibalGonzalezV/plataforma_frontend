import { ShoppingCart, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/store/CartStore';

export default function CartIcon() {
  const isOpen = useCartStore(state => state.isOpen);
  const toggleCart = useCartStore(state => state.toggleCart);
  const totalItems = useCartStore(state =>
    state.items.reduce((sum, item) => sum + item.quantity, 0)
  );

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        onClick={toggleCart}
        className="relative h-14 w-14 rounded-full bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-white"
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <ShoppingCart className="h-6 w-6" />
        )}
        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold border-2 border-white">
            {totalItems > 99 ? '99+' : totalItems}
          </span>
        )}
      </Button>
    </div>
  );
}