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
export async function getCurrentCourierId() {
  return 1 // ID del repartidor actual
}

/**
 * Obtiene los pedidos pendientes
 * @returns {Promise<Order[]>} Lista de pedidos pendientes
 */
export async function fetchPendingOrders() {
  // Simula una llamada API para obtener pedidos pendientes
  return [
    {
      order_id: 1,
      client_name: "Ana García",
      client_address: "Avenida Central 45, Piso 2B",
      store_name: "Restaurante El Buen Sabor",
      items: ["1x Pizza Margarita", "2x Refresco Cola"],
      total_amount: 25000,
      order_date: new Date().toISOString(),
      delivery_state: "pendiente",
    },
    {
      order_id: 2,
      client_name: "Carlos Rodríguez",
      client_address: "Avenida Central 45, Local 3",
      store_name: "Burger House",
      items: ["1x Hamburguesa Completa", "1x Patatas Fritas", "1x Batido de Chocolate"],
      total_amount: 35000,
      order_date: new Date().toISOString(),
      delivery_state: "pendiente",
    },
  ]
}

export async function fetchActiveOrders(courierId: number): Promise<Order[]> {
  // Simula una llamada API para obtener pedidos activos del repartidor
  return [
    {
      order_id: 3,
      client_name: "Juan Martínez",
      client_address: "Calle Secundaria 78, Casa 12",
      store_name: "Sushi Express",
      items: ["3x Tacos de Pollo", "1x Nachos con Queso", "2x Refresco de Limón"],
      total_amount: 40000,
      order_date: new Date().toISOString(),
      delivery_state: "en_proceso",
    },
    {
      order_id: 4,
      client_name: "Laura Sánchez",
      client_address: "Avenida del Parque 23, Piso 5A",
      store_name: "Sushi Master",
      items: ["1x Sushi Variado (12 piezas)", "1x Ensalada de Algas", "2x Té Verde"],
      total_amount: 50000,
      order_date: new Date().toISOString(),
      delivery_state: "en_proceso",
    },
  ]
}

export async function fetchDeliveredOrders(courierId: number): Promise<Order[]> {
  // Simula una llamada API para obtener pedidos entregados por el repartidor
  return [
    {
      order_id: 5,
      client_name: "Pedro Gómez",
      client_address: "Calle del Sol 34, Bajo C",
      store_name: "Cafetería Central",
      items: ["2x Bocadillo Mixto", "2x Zumo de Naranja"],
      total_amount: 18000,
      order_date: new Date(Date.now() - 3600000).toISOString(), // 1 hora antes
      delivery_state: "entregado",
    },
    {
      order_id: 6,
      client_name: "Sofía Fernández",
      client_address: "Avenida Principal 56, Piso 3D",
      store_name: "Restaurante Mediterráneo",
      items: ["1x Paella Mixta (2 personas)", "1x Botella de Vino Tinto"],
      total_amount: 45000,
      order_date: new Date(Date.now() - 7200000).toISOString(), // 2 horas antes
      delivery_state: "entregado",
    },
  ]
}

export async function acceptOrder(orderId: number, courierId: number): Promise<boolean> {
  // Simula una llamada API para aceptar un pedido
  console.log(`Pedido ${orderId} aceptado por el repartidor ${courierId}`)
  return true
}

export async function completeOrder(orderId: number): Promise<boolean> {
  // Simula una llamada API para marcar un pedido como entregado
  console.log(`Pedido ${orderId} marcado como entregado`)
  return true
}
