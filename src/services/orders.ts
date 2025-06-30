// Servicio simulado para enviar pedidos desde el carrito
// Cuando conectes a la API real, reemplaza la función sendOrder por la llamada real

// Tipo temporal para CartItem (ajusta según tu modelo real)
type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

export async function sendOrder(_items: CartItem[], _deliveryType: 'delivery' | 'pickup') {
  // CONECTAR API AQUÍ: Aquí deberías hacer un fetch/post a tu backend para crear el pedido
  // Ejemplo:
  // await fetch('http://localhost:3003/orders', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ items, deliveryType })
  // });

  // Simulación de espera
  return new Promise((resolve) => setTimeout(resolve, 1000));
}

// ejemplo de coneccin 
/* Servicio para enviar pedidos desde el carrito

import type { CartItem } from '@/components/carrito_compras/CartContext';

export async function sendOrder(items: CartItem[], deliveryType: 'delivery' | 'pickup') {
  const token = localStorage.getItem('accessToken');
  if (!token) {
    throw new Error('No hay token de acceso');
  }

  const orderData = {
    items: items.map(item => ({
      productId: item.id,
      quantity: item.quantity
    })),
    deliveryType: deliveryType
  };

  const res = await fetch('http://localhost:3003/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(orderData)
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Error al enviar el pedido');
  }

  return await res.json();
} */