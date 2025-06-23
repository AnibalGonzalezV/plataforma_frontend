/**
 * @typedef {Object} Order
 * @property {number} order_id - ID del pedido
 * @property {string} client_name - Nombre del cliente
 * @property {string} client_address - Dirección del cliente
 * @property {string} store_name - Nombre de la tienda
 * @property {string[]} items - Lista de items del pedido
 * @property {number} total_amount - Monto total del pedido
 * @property {string} order_date - Fecha del pedido
 * @property {"pendiente"|"en_proceso"|"entregado"} delivery_state - Estado del pedido
 */

// Definición de tipos directamente en el archivo de servicios
export interface Order {
  order_id: number
  client_name: string
  client_address: string
  store_name: string
  items: string[]
  total_amount: number
  order_date: string
  delivery_state: "pendiente" | "en_proceso" | "entregado"
}

/**
 * Obtiene el ID del repartidor actual
 * @returns {Promise<number>} ID del repartidor
 */
export async function getCurrentCourierId(): Promise<number> {
  return 1 // ID del repartidor actual
}

/**
 * Obtiene los pedidos pendientes
 * @returns {Promise<Order[]>} Lista de pedidos pendientes
 */
export async function fetchPendingOrders(): Promise<Order[]> {
  const res = await fetch("http://localhost:3003/orders/new-orders", {
    method: "GET",
  })

  if (!res.ok) {
    const error = await res.json()
    throw new Error(error.message || "Failed to fetch pending orders")
  }

  return await res.json()
}

export async function fetchActiveOrders(courierId: number): Promise<Order[]> {
  const res = await fetch("http://localhost:3003/orders/all", {
    method: "GET",
  })

  if (!res.ok) {
    const error = await res.json()
    throw new Error(error.message || "Failed to fetch active orders")
  }

  const allOrders: Order[] = await res.json()

  // Filtrar pedidos activos del repartidor específico
  return allOrders.filter((order) => order.delivery_state === "en_proceso" && (order as any).courier_id === courierId)
}

export async function fetchDeliveredOrders(courierId: number): Promise<Order[]> {
  const res = await fetch("http://localhost:3003/orders/all", {
    method: "GET",
  })

  if (!res.ok) {
    const error = await res.json()
    throw new Error(error.message || "Failed to fetch delivered orders")
  }

  const allOrders: Order[] = await res.json()

  // Filtrar pedidos entregados del repartidor específico
  return allOrders.filter((order) => order.delivery_state === "entregado" && (order as any).courier_id === courierId)
}

export async function acceptOrder(orderId: number, courierId: number): Promise<boolean> {
  const res = await fetch(`http://localhost:3003/orders/assign/${orderId}/${courierId}`, {
    method: "POST",
  })

  if (!res.ok) {
    const error = await res.json()
    throw new Error(error.message || "Failed to accept order")
  }

  return true
}

export async function completeOrder(orderId: number): Promise<boolean> {
  const res = await fetch(`http://localhost:3003/orders/${orderId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      delivery_state: "entregado",
    }),
  })

  if (!res.ok) {
    const error = await res.json()
    throw new Error(error.message || "Failed to complete order")
  }

  return true
}

