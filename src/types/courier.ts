// Tipos simplificados enfocados en el repartidor
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

export interface OrderItem {
  orderId: number
  productId: number
  quantity: number
}
