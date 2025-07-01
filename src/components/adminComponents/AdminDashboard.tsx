import { Users, Store, ShoppingCart, DollarSign, TrendingUp, Activity } from 'lucide-react';
import { useDashboard } from '@/hooks/useDashboard';
import { SalesChart } from '@/components/ui/sales-chart';
import { OrdersStatusChart } from '@/components/ui/orders-status-chart';
import SideBar from '@/components/SideBar';
import Header from '@/components/Header';

export default function AdminDashboard() {
  // Obtener datos del dashboard usando el hook personalizado
  const { stats, charts: chartData, isLoading, error } = useDashboard();

  if (isLoading) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <SideBar />
        <div className="flex-1 flex flex-col">
          <Header />
          <div className="flex-1 flex items-center justify-center">
            <div className="text-gray-600 text-lg">Cargando dashboard...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <SideBar />
        <div className="flex-1 flex flex-col">
          <Header />
          <div className="flex-1 flex items-center justify-center">
            <div className="text-red-500 text-lg">Error al cargar el dashboard</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SideBar />
      <div className="flex-1 flex flex-col">
        <Header />
        <div className="flex-1 p-8">
          <div className="max-w-6xl mx-auto">
            {/* Header Minimalista */}
            <div className="mb-8">
              <h1 className="text-2xl font-semibold text-gray-900 mb-2">Dashboard</h1>
              <p className="text-gray-600">Resumen general del sistema</p>
            </div>
            
            {/* KPIs Principales - Solo 4 métricas clave */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {/* Usuarios */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <Users className="h-5 w-5 text-blue-600" />
                  </div>
                  <TrendingUp className="h-4 w-4 text-green-500" />
                </div>
                <p className="text-gray-600 text-sm font-medium">Usuarios</p>
                <p className="text-2xl font-bold text-gray-900">{stats?.users.total || 0}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {stats?.users.byRole.find(r => r.role === 'comprador')?.count || 0} activos
                </p>
              </div>
              
              {/* Ventas */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-green-50 rounded-lg">
                    <DollarSign className="h-5 w-5 text-green-600" />
                  </div>
                  <TrendingUp className="h-4 w-4 text-green-500" />
                </div>
                <p className="text-gray-600 text-sm font-medium">Ventas</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${stats?.sales.total ? (stats.sales.total / 1000).toFixed(0) + 'k' : '0'}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  ${stats?.sales.averageTicket ? stats.sales.averageTicket.toFixed(0) : '0'} promedio
                </p>
              </div>
              
              {/* Pedidos */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-purple-50 rounded-lg">
                    <ShoppingCart className="h-5 w-5 text-purple-600" />
                  </div>
                  <Activity className="h-4 w-4 text-blue-500" />
                </div>
                <p className="text-gray-600 text-sm font-medium">Pedidos</p>
                <p className="text-2xl font-bold text-gray-900">{stats?.orders.total || 0}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {stats?.orders.byState.find(s => s.state === 'nuevo')?.count || 0} nuevos
                </p>
              </div>
              
              {/* Tiendas */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-orange-50 rounded-lg">
                    <Store className="h-5 w-5 text-orange-600" />
                  </div>
                  <TrendingUp className="h-4 w-4 text-green-500" />
                </div>
                <p className="text-gray-600 text-sm font-medium">Tiendas</p>
                <p className="text-2xl font-bold text-gray-900">{stats?.stores.total || 0}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {stats?.products.total || 0} productos
                </p>
              </div>
            </div>

            {/* Gráficos - Layout más limpio */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
              {/* Ventas por mes */}
              <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center gap-2 mb-6">
                  <div className="p-1.5 bg-blue-50 rounded-lg">
                    <TrendingUp className="h-4 w-4 text-blue-600" />
                  </div>
                  <h2 className="text-lg font-semibold text-gray-900">Ventas mensuales</h2>
                </div>
                <SalesChart data={chartData?.salesByMonth || []} />
              </div>
              
              {/* Pedidos por estado */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center gap-2 mb-6">
                  <div className="p-1.5 bg-purple-50 rounded-lg">
                    <Activity className="h-4 w-4 text-purple-600" />
                  </div>
                  <h2 className="text-lg font-semibold text-gray-900">Estado de pedidos</h2>
                </div>
                <OrdersStatusChart data={chartData?.ordersByState || []} />
              </div>
            </div>

            {/* Métricas adicionales - Solo información esencial */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-gray-50 rounded-lg">
                    <Users className="h-4 w-4 text-gray-600" />
                  </div>
                  <h3 className="text-sm font-medium text-gray-900">Repartidores</h3>
                </div>
                <p className="text-2xl font-bold text-gray-900">{stats?.couriers.total || 0}</p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-gray-50 rounded-lg">
                    <Store className="h-4 w-4 text-gray-600" />
                  </div>
                  <h3 className="text-sm font-medium text-gray-900">Productos</h3>
                </div>
                <p className="text-2xl font-bold text-gray-900">{stats?.products.total || 0}</p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-gray-50 rounded-lg">
                    <DollarSign className="h-4 w-4 text-gray-600" />
                  </div>
                  <h3 className="text-sm font-medium text-gray-900">Ticket promedio</h3>
                </div>
                <p className="text-2xl font-bold text-gray-900">
                  ${stats?.sales.averageTicket ? stats.sales.averageTicket.toFixed(0) : '0'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 