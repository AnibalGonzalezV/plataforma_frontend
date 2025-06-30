import { Users, Store, ShoppingCart, Package, Truck, BarChart3, PieChart, DollarSign, Star } from 'lucide-react';

export default function AdminDashboard() {
  // TODO: Obtener los datos reales desde la API o props
  // const stats = useAdminStats();
  // const salesByMonth = ...
  // const ordersByStatus = ...
  // const topProducts = ...
  // const topStores = ...

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
      <div className="flex-1 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
          <BarChart3 className="h-8 w-8 text-blue-400" /> Dashboard administrador
        </h1>
        {/* KPIs principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Reemplaza los valores por datos reales */}
          <div className="bg-gradient-to-br from-blue-600/20 to-blue-800/20 rounded-2xl p-6 border border-blue-600/30 flex items-center gap-4">
            <Users className="h-10 w-10 text-blue-400" />
            <div>
              <p className="text-blue-300 text-sm font-medium">Usuarios</p>
              <p className="text-2xl font-bold text-white">{/* {stats.users} */}</p>
              <p className="text-xs text-gray-400">Activos hoy: {/* {stats.activeUsers} */}</p>
            </div>
          </div>
          <div className="bg-gradient-to-br from-green-600/20 to-green-800/20 rounded-2xl p-6 border border-green-600/30 flex items-center gap-4">
            <DollarSign className="h-10 w-10 text-green-400" />
            <div>
              <p className="text-green-300 text-sm font-medium">Ventas totales</p>
              <p className="text-2xl font-bold text-white">{/* ${stats.sales} */}</p>
              <p className="text-xs text-gray-400">Ticket promedio: {/* ${stats.avgTicket} */}</p>
            </div>
          </div>
          <div className="bg-gradient-to-br from-purple-600/20 to-purple-800/20 rounded-2xl p-6 border border-purple-600/30 flex items-center gap-4">
            <ShoppingCart className="h-10 w-10 text-purple-400" />
            <div>
              <p className="text-purple-300 text-sm font-medium">Pedidos</p>
              <p className="text-2xl font-bold text-white">{/* {stats.orders} */}</p>
            </div>
          </div>
          <div className="bg-gradient-to-br from-yellow-600/20 to-yellow-800/20 rounded-2xl p-6 border border-yellow-600/30 flex items-center gap-4">
            <Store className="h-10 w-10 text-yellow-400" />
            <div>
              <p className="text-yellow-300 text-sm font-medium">Tiendas</p>
              <p className="text-2xl font-bold text-white">{/* {stats.stores} */}</p>
            </div>
          </div>
        </div>
        {/* Gráficos */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Ventas por mes */}
          <div className="lg:col-span-2 bg-gray-800/50 rounded-2xl p-6 border border-gray-700/50">
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 className="h-5 w-5 text-blue-400" />
              <h2 className="text-lg font-semibold text-white">Ventas por mes</h2>
            </div>
            {/* Aquí va el gráfico de barras con los datos reales */}
            {/* Ejemplo: salesByMonth.map(...) */}
            <div className="h-64 flex items-center justify-center text-gray-500">Gráfico de ventas</div>
          </div>
          {/* Pedidos por estado */}
          <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700/50">
            <div className="flex items-center gap-2 mb-4">
              <PieChart className="h-5 w-5 text-purple-400" />
              <h2 className="text-lg font-semibold text-white">Pedidos por estado</h2>
            </div>
            {/* Aquí va el gráfico de pastel o lista de estados */}
            <div className="flex flex-col gap-3 text-gray-500 items-center justify-center h-64">Gráfico de estados</div>
          </div>
        </div>
        {/* Top productos y tiendas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700/50">
            <div className="flex items-center gap-2 mb-4">
              <Package className="h-5 w-5 text-green-400" />
              <h2 className="text-lg font-semibold text-white">Top productos</h2>
            </div>
            {/* Aquí va la lista de top productos */}
            <div className="text-gray-500 text-center">Lista de productos</div>
          </div>
          <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700/50">
            <div className="flex items-center gap-2 mb-4">
              <Store className="h-5 w-5 text-yellow-400" />
              <h2 className="text-lg font-semibold text-white">Top tiendas</h2>
            </div>
            {/* Aquí va la lista de top tiendas */}
            <div className="text-gray-500 text-center">Lista de tiendas</div>
          </div>
        </div>
        {/* Otros KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-pink-600/20 to-pink-800/20 rounded-2xl p-6 border border-pink-600/30 flex items-center gap-4">
            <Package className="h-10 w-10 text-pink-400" />
            <div>
              <p className="text-pink-300 text-sm font-medium">Productos</p>
              <p className="text-2xl font-bold text-white">{/* {stats.products} */}</p>
            </div>
          </div>
          <div className="bg-gradient-to-br from-orange-600/20 to-orange-800/20 rounded-2xl p-6 border border-orange-600/30 flex items-center gap-4">
            <Truck className="h-10 w-10 text-orange-400" />
            <div>
              <p className="text-orange-300 text-sm font-medium">Repartidores</p>
              <p className="text-2xl font-bold text-white">{/* {stats.couriers} */}</p>
            </div>
          </div>
          <div className="bg-gradient-to-br from-yellow-600/20 to-yellow-800/20 rounded-2xl p-6 border border-yellow-600/30 flex items-center gap-4">
            <Star className="h-10 w-10 text-yellow-400" />
            <div>
              <p className="text-yellow-300 text-sm font-medium">Ticket promedio</p>
              <p className="text-2xl font-bold text-white">{/* ${stats.avgTicket} */}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 