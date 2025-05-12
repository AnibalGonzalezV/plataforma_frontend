// Tipos que reflejan la estructura de la base de datos
export interface User {
  user_id: number
  email: string
  names: string
  last_names: string
  address: string
  phone_number: number
  is_active: boolean
  registration_date: string
}

export interface Courier {
  courier_id: number
  user_id: number
  vehicle_type: string
  available: boolean
  user?: User // Relación con User
}

export interface Store {
  store_id: number
  user_id: number
  name: string
  address: string
  score: number
}

export interface Product {
  product_id: number
  category_id: number
  name: string
  description: string
  quantity: number
  price: number
}

export interface OrderItem {
  order_id: number
  product_id: number
  quantity: number
  product?: Product // Relación con Product
}

export interface Order {
  order_id: number;
  client_name: string;
  client_address: string;
  store_name: string;
  items: string[];
  total_amount: number;
  order_date: string;
  delivery_state: string;
}