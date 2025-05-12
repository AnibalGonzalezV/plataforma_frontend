// Tipos simplificados enfocados en el repartidor
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
