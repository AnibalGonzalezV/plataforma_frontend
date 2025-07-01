"use client"

// Tipo que devuelve el backend (exactamente como está en la entidad)
export interface BackendOrder {
  id: number
  storeId: number
  clientId: number
  courierId: number | null
  deliveryType: string
  deliveryState: string
  totalAmount: number
  orderDate: string
}

// Tipo que usa el frontend (simplificado)
export interface Order {
  order_id: number
  store_id: number
  client_id: number
  courier_id: number | null
  delivery_type: string
  delivery_state: "pendiente" | "en_proceso" | "entregado"
  total_amount: number
  order_date: string
}

// Tipo para items del pedido
export interface OrderItem {
  orderId: number
  productId: number
  quantity: number
}

/**
 * Convierte un pedido del backend al formato del frontend
 */
function convertBackendOrderToFrontendOrder(backendOrder: BackendOrder): Order {
  return {
    order_id: backendOrder.id,
    store_id: backendOrder.storeId,
    client_id: backendOrder.clientId,
    courier_id: backendOrder.courierId,
    delivery_type: backendOrder.deliveryType,
    delivery_state: backendOrder.deliveryState as "pendiente" | "en_proceso" | "entregado",
    total_amount: backendOrder.totalAmount,
    order_date: backendOrder.orderDate,
  }
}

/**
 * Obtiene los pedidos pendientes (nuevos pedidos)
 */
export async function fetchPendingOrders(): Promise<Order[]> {
  const res = await fetch("http://localhost:3003/orders/orders/new-orders", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })

  if (!res.ok) {
    const error = await res.json()
    throw new Error(error.message || "Error al obtener los pedidos pendientes")
  }

  const backendOrders: BackendOrder[] = await res.json()
  return backendOrders.map(convertBackendOrderToFrontendOrder)
}

/**
 * Obtiene todos los pedidos
 */
export async function fetchAllOrders(): Promise<Order[]> {
  const res = await fetch("http://localhost:3003/orders/orders/all", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })

  if (!res.ok) {
    const error = await res.json()
    throw new Error(error.message || "Error al obtener todos los pedidos")
  }

  const backendOrders: BackendOrder[] = await res.json()
  return backendOrders.map(convertBackendOrderToFrontendOrder)
}

/**
 * Obtiene los pedidos activos de un repartidor
 */
export async function fetchActiveOrders(courierId: number): Promise<Order[]> {
  const allOrders = await fetchAllOrders()
  return allOrders.filter((order) => order.delivery_state === "en_proceso" && order.courier_id === courierId)
}

/**
 * Obtiene los pedidos entregados de un repartidor
 */
export async function fetchDeliveredOrders(courierId: number): Promise<Order[]> {
  const allOrders = await fetchAllOrders()
  return allOrders.filter((order) => order.delivery_state === "entregado" && order.courier_id === courierId)
}

/**
 * Obtiene los items de un pedido
 */
export async function getOrderItems(orderId: number): Promise<OrderItem[]> {
  const res = await fetch(`http://localhost:3003/orders/orders/${orderId}/items`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
  
  if (!res.ok) {
    const error = await res.json()
    throw new Error(error.message || "Error al obtener los items del pedido")
  }
  
  return await res.json()
}

/**
 * Acepta un pedido (asigna al repartidor)
 */
export async function acceptOrder(orderId: number, courierId: number): Promise<boolean> {
  const res = await fetch(`http://localhost:3003/orders/orders/assign/${orderId}/${courierId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  })

  if (!res.ok) {
    const error = await res.json()
    throw new Error(error.message || "Error al aceptar el pedido")
  }

  return true
}

/**
 * Marca un pedido como entregado
 */
export async function completeOrder(orderId: number): Promise<boolean> {
  const res = await fetch(`http://localhost:3003/orders/orders/${orderId}/mark-delivered`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
  })

  if (!res.ok) {
    const error = await res.json()
    throw new Error(error.message || "Error al completar el pedido")
  }

  return true
}

/**
 * Obtiene el ID del repartidor actual (temporal)
 */
export async function getCurrentCourierId(): Promise<number> {
  return 1 // Esto debería venir de la autenticación
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
  }).format(amount)
}

export async function checkApiConnection(): Promise<boolean> {
  try {
    const res = await fetch("http://localhost:3003/orders/orders/new-orders", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    return res.ok
  } catch (error) {
    console.error("error", error)
    return false
  }
}
