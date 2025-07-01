import { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingCart, Receipt } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCartStore, ItemProduct } from '@/store/CartStore';
import { useMutation } from '@tanstack/react-query';
import { createOrder } from '@/services/orders';

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function CartDrawer({ open, onClose }: CartDrawerProps) {
  const {
    items,
    storeId,
    deliveryType,
    removeItem,
    updateQuantity,
    clearCart,
    totalAmount,
    getOrderPayload,
  } = useCartStore();
  const [showReceipt, setShowReceipt] = useState(false);
  const [orderSent, setOrderSent] = useState(false);
  const [sending, setSending] = useState(false);
  const setDeliveryType = (type: 'retiro_en_tienda' | 'delivery') => useCartStore.setState({ deliveryType: type });
  const getTotalItems = () => items.reduce((acc, i) => acc + i.quantity, 0);
  const [receiptItems, setReceiptItems] = useState<ItemProduct[]>([]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
    }).format(price);
  };

  const receiptTotal = receiptItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const handleBuy = () => {
    setReceiptItems([...items]);
    setShowReceipt(true);
    setOrderSent(false);
  };

  const handleClose = () => {
    setShowReceipt(false);
    setOrderSent(false);
    setSending(false);
    onClose();
  };

  const handleSendOrder = () => {
    try {
      const payload = getOrderPayload();
      setSending(true);
      orderMutation.mutate(payload);
    } catch (err) {
      console.error(err);
    }
  };

  const orderMutation = useMutation({
    mutationFn: createOrder,
    onSuccess: () => {
      setOrderSent(true);
      setSending(false);
      clearCart();
    },
    onError: () => {
      console.error('Error al crear la orden:');
      setSending(false);
    }
  });

  if (!open) return null;

  return (
    <>
      {/* Overlay (cierra el Drawer al hacer click) */}
      <div 
        className="fixed inset-0 bg-black/50 z-40"
        onClick={handleClose}
      />
      {/* Drawer del carrito */}
      <div className="fixed bottom-20 right-6 w-80 bg-white rounded-lg shadow-2xl z-50 border border-gray-200">
        <div className="flex flex-col max-h-96">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b bg-gray-50 rounded-t-lg">
            <div className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5 text-green-600" />
              <h2 className="text-lg font-semibold text-gray-800">Carrito</h2>
              <span className="bg-green-600 text-white text-xs px-2 py-1 rounded-full">
                {getTotalItems()} {getTotalItems() === 1 ? 'producto' : 'productos'}
              </span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClose}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4 max-h-64">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-gray-500">
                <ShoppingCart className="h-12 w-12 mb-2 text-gray-300" />
                <p className="text-center font-medium">Tu carrito está vacío</p>
                <p className="text-sm text-center mt-1">Agrega algunos productos</p>
              </div>
            ) : (
              <div className="space-y-3">
                {items.map((item) => (
                  <div key={item.productId} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg border">
                    {item.img && (
                      <img 
                        src={item.img} 
                        alt={item.name}
                        className="w-10 h-10 object-cover rounded"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-gray-900 truncate">
                        {item.name}
                      </h3>
                      <p className="text-sm text-green-600 font-semibold">
                        {formatPrice(item.price)}
                      </p>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="text-sm font-medium w-6 text-center">
                        {item.quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-red-500 hover:text-red-700"
                        onClick={() => removeItem(item.productId)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t p-4 bg-gray-50 rounded-b-lg">
              <div className="flex justify-between items-center mb-3">
                <span className="text-lg font-semibold">Total:</span>
                <span className="text-lg font-bold text-green-600">
                  {formatPrice(totalAmount())}
                </span>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  onClick={clearCart}
                  className="flex-1 text-red-600 border-red-300 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Vaciar
                </Button>
                <Button
                  onClick={handleBuy}
                  className="flex-1 bg-green-600 hover:bg-green-700"
                >
                  Comprar
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal de boleta centrado */}
      {showReceipt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative animate-fade-in">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2"
              onClick={handleClose}
            >
              <X className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2 mb-4">
              <Receipt className="h-6 w-6 text-green-600" />
              <h3 className="text-xl font-bold text-gray-800">Boleta de compra</h3>
            </div>
            <div className="mb-4">
              <ul className="divide-y divide-gray-200">
                {receiptItems.map(item => (
                  <li key={item.productId} className="flex justify-between py-2 text-gray-700">
                    <span>{item.name} x{item.quantity}</span>
                    <span>{formatPrice(item.price * item.quantity)}</span>
                  </li>
                ))}
              </ul>
              <div className="flex justify-between mt-4 font-bold text-lg">
                <span>Total:</span>
                <span>{formatPrice(receiptTotal)}</span>
              </div>
            </div>
            <div className="mb-4">
              <label className="block font-medium mb-2">Tipo de entrega:</label>
              {orderSent ? (
                <p className="text-gray-700 font-semibold">
                  {deliveryType === 'delivery' ? 'Envío (delivery)' : 'Retiro en tienda'}
                </p>
              ) : (
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="deliveryType"
                      value="delivery"
                      checked={deliveryType === 'delivery'}
                      onChange={() => setDeliveryType('delivery')}
                    />
                    Envío (delivery)
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="deliveryType"
                      value="retiro_en_tienda"
                      checked={deliveryType === 'retiro_en_tienda'}
                      onChange={() => setDeliveryType('retiro_en_tienda')}
                    />
                    Retiro en tienda
                  </label>
                </div>
              )}
            </div>
            <Button
              onClick={handleSendOrder}
              className="w-full bg-green-600 hover:bg-green-700 mb-2"
              disabled={sending || orderSent || orderMutation.isPending}
            >
              {orderMutation.isPending ? 'Enviando pedido...' : orderSent ? 'Pedido enviado' : 'Confirmar pedido'}
            </Button>
            {orderSent && (
              <div className="text-green-700 text-center font-semibold mt-2">
                <span>¡Pedido enviado!</span><br/>
                <span>Tipo de entrega: {deliveryType === 'delivery' ? 'Envío (delivery)' : 'Retiro en tienda'}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
} 