import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useCartStore } from '@/store/CartStore';
import { useAuthStore } from '@/store/AuthStore';

interface AddToCartButtonProps {
  product: {
    id: number;
    name: string;
    price: number;
    image?: string;
    storeId: number;
  };
  quantity?: number;
  className?: string;
}

export function AddToCartButton({ product, quantity = 1, className }: AddToCartButtonProps) {
  const addItem = useCartStore(state => state.addItem);
  const roles = useAuthStore(state => state.roles);
  const isComprador = roles.some(role => role.name === 'comprador');

  const handleAddToCart = () => {
    if (!isComprador) return;
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      img: product.image,
    }, product.storeId);
  };

  return (
    <Button
      onClick={handleAddToCart}
      className={`bg-green-600 hover:bg-green-700 text-white ${className || ''}`}
      disabled={!isComprador}
    >
      <Plus className="h-4 w-4 mr-2" />
      Agregar al Carrito
    </Button>
  );
} 