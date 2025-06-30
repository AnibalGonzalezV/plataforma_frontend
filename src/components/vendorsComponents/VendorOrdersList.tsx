import { useEffect, useState } from 'react';
import { User, Package, Store as StoreIcon } from 'lucide-react';

export default function VendorOrdersList() {
  // TODO: Obtener los pedidos de la tienda del vendedor desde la API
  // const { data: orders, isLoading } = useQuery(['vendorOrders'], getVendorOrders);
  const orders: any[] = []; // Reemplazar por datos reales

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pendiente': return 'bg-yellow-700 border-yellow-500';
      case 'En preparación': return 'bg-blue-700 border-blue-500';
      case 'Entregado': return 'bg-green-700 border-green-500';
      default: return 'bg-gray-700 border-gray-500';
    }
  };

  const handleChangeStatus = (orderId: number, newStatus: string) => {
    // TODO: Llamar a la API para cambiar el estado del pedido
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4">
      <div className="bg-gray-800 rounded-2xl shadow-2xl w-full max-w-3xl border border-gray-700 p-8">
        <h2 className="text-2xl font-bold mb-6 text-white text-center flex items-center justify-center gap-2">
          <Package className="h-6 w-6 text-purple-400" /> Pedidos recibidos
        </h2>
        <div className="space-y-4">
          {orders.length === 0 ? (
            <div className="flex flex-col items-center py-12">
              <StoreIcon className="h-12 w-12 text-gray-600 mb-4" />
              <p className="text-gray-400 text-center">No hay pedidos aún.</p>
            </div>
          ) : orders.map(order => (
            <div key={order.id} className="bg-gray-900 border border-gray-700 rounded-lg p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2 shadow-lg">
              <div>
                <div className="text-white font-semibold text-lg flex items-center gap-2">
                  <User className="h-5 w-5 text-purple-400" /> {order.client}
                </div>
                <div className="text-gray-400 text-sm">Fecha: {order.date}</div>
                <div className="text-gray-400 text-sm">{order.products} productos</div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className={`px-3 py-1 rounded-full text-white text-xs font-medium border ${getStatusColor(order.status)}`}>{order.status}</span>
                <span className="text-green-400 font-bold text-lg">${order.total}</span>
                <div className="flex gap-2 mt-2">
                  <button onClick={() => handleChangeStatus(order.id, 'En preparación')} className="px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium transition">Preparar</button>
                  <button onClick={() => handleChangeStatus(order.id, 'Entregado')} className="px-3 py-1 rounded-lg bg-green-600 hover:bg-green-700 text-white text-xs font-medium transition">Entregar</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 