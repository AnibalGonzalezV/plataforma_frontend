"use client"


export interface Order {
  order_id: number
  client_name: string
  client_address: string
  store_name: string
  items: string[]
  total_amount: number
  order_date: string
  delivery_state: "pendiente" | "en_proceso" | "entregado"
  courier_id?: number
}



/**
 * Obtiene los pedidos pendientes (nuevos pedidos)
 */
export async function fetchPendingOrders(): Promise<Order[]> {
  const res = await fetch("http://localhost:3003/orders/new-orders", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })

  if (!res.ok) {
    const error = await res.json()
    throw new Error(error.message || "Error al obtener los pedidos pendientes")
  }

  return res.json()
}

/**
 * Obtiene todos los pedidos (para filtrar activos/entregados)
 */
export async function fetchAllOrders(): Promise<Order[]> {
  const res = await fetch("http://localhost:3003/orders/all", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })

  if (!res.ok) {
    const error = await res.json()
    throw new Error(error.message || "Error al obtener todos los pedidos")
  }

  return res.json()
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
 * Acepta un pedido (asigna al repartidor)
 */
export async function acceptOrder(orderId: number, courierId: number): Promise<boolean> {
  const res = await fetch(`http://localhost:3003/orders/assign/${orderId}/${courierId}`, {
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
    const res = await fetch("http://localhost:3003/orders/new-orders", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    return res.ok
  } catch (error) {
    console.error("❌ API no disponible:", error)
    return false
  }
}
