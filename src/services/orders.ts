import { OrderDto } from '@/store/CartStore';

export async function createOrder(order: OrderDto) {
  const response = await fetch(`http://localhost:3003/orders/orders/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(order),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error al crear la orden: ${errorText}`);
  }

  return await response.json();
}