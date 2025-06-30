import { useState } from 'react';
import SideBar from '@/components/SideBar';
import Header from '@/components/Header';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Users, 
  Package, 
  Star, 
  Calendar, 
  ShoppingCart,
  BarChart3,
  PieChart,
  Activity,
  Target
} from 'lucide-react';

export default function VendorDashboard() {
  // Datos simulados para gráficos (conectar con API real)
  const salesData = [
    { month: 'Ene', sales: 45000 },
    { month: 'Feb', sales: 52000 },
    { month: 'Mar', sales: 48000 },
    { month: 'Abr', sales: 61000 },
    { month: 'May', sales: 55000 },
    { month: 'Jun', sales: 67000 }
  ];

  const topProducts = [
    { name: 'Hamburguesa Clásica', sales: 45, revenue: 225000 },
    { name: 'Pizza Margherita', sales: 38, revenue: 190000 },
    { name: 'Café Americano', sales: 32, revenue: 64000 },
    { name: 'Ensalada César', sales: 28, revenue: 84000 },
    { name: 'Pasta Carbonara', sales: 25, revenue: 125000 }
  ];

  const recentOrders = [
    { id: '#1234', customer: 'María González', amount: 25000, status: 'completed', time: '2 min ago' },
    { id: '#1235', customer: 'Juan Pérez', amount: 18000, status: 'pending', time: '15 min ago' },
    { id: '#1236', customer: 'Ana López', amount: 32000, status: 'completed', time: '1 hora ago' },
    { id: '#1237', customer: 'Carlos Ruiz', amount: 15000, status: 'processing', time: '2 horas ago' }
  ];

  const stats = {
    totalRevenue: 1250000,
    monthlyGrowth: 12.5,
    totalOrders: 156,
    averageOrderValue: 8012,
    customerSatisfaction: 4.6,
    activeProducts: 24
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-400 bg-green-600/20';
      case 'pending': return 'text-yellow-400 bg-yellow-600/20';
      case 'processing': return 'text-blue-400 bg-blue-600/20';
      default: return 'text-gray-400 bg-gray-600/20';
    }
  };

  return (
    <>
      <div className='flex min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'>
        <SideBar/>
        <div className='flex flex-1 flex-col'>
          <Header/>
          <div className='flex flex-1'>
            <main className='flex-1 p-6'>
              {/* Header del Dashboard */}
              <div className='mb-8'>
                <div className='flex items-center gap-3 mb-2'>
                  <div className='p-2 bg-purple-600/20 rounded-lg'>
                    <BarChart3 className='h-6 w-6 text-purple-400' />
                  </div>
                  <h1 className='text-3xl font-bold text-white'>Dashboard</h1>
                </div>
                <p className='text-gray-400 text-lg'>Resumen completo de tu negocio</p>
              </div>

              {/* Estadísticas principales */}
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
                <div className='bg-gradient-to-br from-green-600/20 to-green-800/20 rounded-2xl p-6 border border-green-600/30'>
                  <div className='flex items-center justify-between'>
                    <div>
                      <p className='text-green-300 text-sm font-medium'>Ingresos Totales</p>
                      <p className='text-2xl font-bold text-white'>${(stats.totalRevenue / 1000).toFixed(0)}k</p>
                      <div className='flex items-center gap-1 mt-1'>
                        <TrendingUp className='h-4 w-4 text-green-400' />
                        <span className='text-green-400 text-sm'>+{stats.monthlyGrowth}%</span>
                      </div>
                    </div>
                    <div className='p-3 bg-green-600/30 rounded-xl'>
                      <DollarSign className='h-6 w-6 text-green-400' />
                    </div>
                  </div>
                </div>

                <div className='bg-gradient-to-br from-blue-600/20 to-blue-800/20 rounded-2xl p-6 border border-blue-600/30'>
                  <div className='flex items-center justify-between'>
                    <div>
                      <p className='text-blue-300 text-sm font-medium'>Pedidos Totales</p>
                      <p className='text-2xl font-bold text-white'>{stats.totalOrders}</p>
                      <div className='flex items-center gap-1 mt-1'>
                        <TrendingUp className='h-4 w-4 text-blue-400' />
                        <span className='text-blue-400 text-sm'>+8.2%</span>
                      </div>
                    </div>
                    <div className='p-3 bg-blue-600/30 rounded-xl'>
                      <ShoppingCart className='h-6 w-6 text-blue-400' />
                    </div>
                  </div>
                </div>

                <div className='bg-gradient-to-br from-purple-600/20 to-purple-800/20 rounded-2xl p-6 border border-purple-600/30'>
                  <div className='flex items-center justify-between'>
                    <div>
                      <p className='text-purple-300 text-sm font-medium'>Valor Promedio</p>
                      <p className='text-2xl font-bold text-white'>${stats.averageOrderValue.toLocaleString()}</p>
                      <div className='flex items-center gap-1 mt-1'>
                        <TrendingUp className='h-4 w-4 text-purple-400' />
                        <span className='text-purple-400 text-sm'>+5.1%</span>
                      </div>
                    </div>
                    <div className='p-3 bg-purple-600/30 rounded-xl'>
                      <Target className='h-6 w-6 text-purple-400' />
                    </div>
                  </div>
                </div>

                <div className='bg-gradient-to-br from-yellow-600/20 to-yellow-800/20 rounded-2xl p-6 border border-yellow-600/30'>
                  <div className='flex items-center justify-between'>
                    <div>
                      <p className='text-yellow-300 text-sm font-medium'>Satisfacción</p>
                      <div className='flex items-center gap-2'>
                        <p className='text-2xl font-bold text-white'>{stats.customerSatisfaction}</p>
                        <Star className='h-4 w-4 text-yellow-400 fill-current' />
                      </div>
                      <div className='flex items-center gap-1 mt-1'>
                        <TrendingUp className='h-4 w-4 text-yellow-400' />
                        <span className='text-yellow-400 text-sm'>+2.3%</span>
                      </div>
                    </div>
                    <div className='p-3 bg-yellow-600/30 rounded-xl'>
                      <Users className='h-6 w-6 text-yellow-400' />
                    </div>
                  </div>
                </div>
              </div>

              {/* Gráficos y contenido principal */}
              <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8'>
                {/* Gráfico de ventas */}
                <div className='lg:col-span-2 bg-gray-800/50 rounded-2xl p-6 border border-gray-700/50'>
                  <div className='flex items-center justify-between mb-6'>
                    <h3 className='text-xl font-semibold text-white'>Ventas Mensuales</h3>
                    <div className='flex items-center gap-2 text-gray-400 text-sm'>
                      <Activity className='h-4 w-4' />
                      <span>Últimos 6 meses</span>
                    </div>
                  </div>
                  
                  {/* Gráfico simplificado con barras */}
                  <div className='h-64 flex items-end justify-between gap-2'>
                    {salesData.map((data, index) => (
                      <div key={index} className='flex flex-col items-center flex-1'>
                        <div 
                          className='w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg transition-all duration-300 hover:from-blue-500 hover:to-blue-300'
                          style={{ height: `${(data.sales / 67000) * 200}px` }}
                        ></div>
                        <span className='text-gray-400 text-sm mt-2'>{data.month}</span>
                        <span className='text-white text-xs font-medium'>${(data.sales / 1000).toFixed(0)}k</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Productos más vendidos */}
                <div className='bg-gray-800/50 rounded-2xl p-6 border border-gray-700/50'>
                  <div className='flex items-center gap-3 mb-6'>
                    <div className='p-2 bg-orange-600/20 rounded-lg'>
                      <PieChart className='h-5 w-5 text-orange-400' />
                    </div>
                    <h3 className='text-xl font-semibold text-white'>Top Productos</h3>
                  </div>
                  
                  <div className='space-y-4'>
                    {topProducts.map((product, index) => (
                      <div key={index} className='flex items-center justify-between p-3 bg-gray-700/30 rounded-lg'>
                        <div className='flex-1'>
                          <p className='text-white font-medium text-sm'>{product.name}</p>
                          <p className='text-gray-400 text-xs'>{product.sales} ventas</p>
                        </div>
                        <div className='text-right'>
                          <p className='text-green-400 font-semibold text-sm'>${(product.revenue / 1000).toFixed(0)}k</p>
                          <div className='w-16 bg-gray-600 rounded-full h-1 mt-1'>
                            <div 
                              className='bg-orange-400 h-1 rounded-full'
                              style={{ width: `${(product.sales / 45) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Pedidos recientes y actividad */}
              <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                {/* Pedidos recientes */}
                <div className='bg-gray-800/50 rounded-2xl p-6 border border-gray-700/50'>
                  <div className='flex items-center justify-between mb-6'>
                    <h3 className='text-xl font-semibold text-white'>Pedidos Recientes</h3>
                    <button className='text-blue-400 hover:text-blue-300 text-sm font-medium'>
                      Ver todos
                    </button>
                  </div>
                  
                  <div className='space-y-4'>
                    {recentOrders.map((order, index) => (
                      <div key={index} className='flex items-center justify-between p-4 bg-gray-700/30 rounded-lg'>
                        <div className='flex items-center gap-3'>
                          <div className='p-2 bg-blue-600/20 rounded-lg'>
                            <ShoppingCart className='h-4 w-4 text-blue-400' />
                          </div>
                          <div>
                            <p className='text-white font-medium'>{order.id}</p>
                            <p className='text-gray-400 text-sm'>{order.customer}</p>
                          </div>
                        </div>
                        <div className='text-right'>
                          <p className='text-green-400 font-semibold'>${order.amount.toLocaleString()}</p>
                          <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                            {order.status === 'completed' ? 'Completado' : 
                             order.status === 'pending' ? 'Pendiente' : 
                             order.status === 'processing' ? 'Procesando' : order.status}
                          </div>
                          <p className='text-gray-500 text-xs mt-1'>{order.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actividad reciente */}
                <div className='bg-gray-800/50 rounded-2xl p-6 border border-gray-700/50'>
                  <div className='flex items-center gap-3 mb-6'>
                    <div className='p-2 bg-green-600/20 rounded-lg'>
                      <Activity className='h-5 w-5 text-green-400' />
                    </div>
                    <h3 className='text-xl font-semibold text-white'>Actividad Reciente</h3>
                  </div>
                  
                  <div className='space-y-4'>
                    <div className='flex items-center gap-3 p-3 bg-green-600/10 rounded-lg border border-green-600/20'>
                      <div className='p-1.5 bg-green-600/30 rounded-lg'>
                        <Package className='h-4 w-4 text-green-400' />
                      </div>
                      <div>
                        <p className='text-white text-sm font-medium'>Nuevo producto agregado</p>
                        <p className='text-gray-400 text-xs'>Hamburguesa Gourmet - hace 2 horas</p>
                      </div>
                    </div>

                    <div className='flex items-center gap-3 p-3 bg-blue-600/10 rounded-lg border border-blue-600/20'>
                      <div className='p-1.5 bg-blue-600/30 rounded-lg'>
                        <Star className='h-4 w-4 text-blue-400' />
                      </div>
                      <div>
                        <p className='text-white text-sm font-medium'>Nueva reseña recibida</p>
                        <p className='text-gray-400 text-xs'>5 estrellas - hace 3 horas</p>
                      </div>
                    </div>

                    <div className='flex items-center gap-3 p-3 bg-purple-600/10 rounded-lg border border-purple-600/20'>
                      <div className='p-1.5 bg-purple-600/30 rounded-lg'>
                        <DollarSign className='h-4 w-4 text-purple-400' />
                      </div>
                      <div>
                        <p className='text-white text-sm font-medium'>Meta de ventas alcanzada</p>
                        <p className='text-gray-400 text-xs'>$1.2M - hace 1 día</p>
                      </div>
                    </div>

                    <div className='flex items-center gap-3 p-3 bg-yellow-600/10 rounded-lg border border-yellow-600/20'>
                      <div className='p-1.5 bg-yellow-600/30 rounded-lg'>
                        <Users className='h-4 w-4 text-yellow-400' />
                      </div>
                      <div>
                        <p className='text-white text-sm font-medium'>Nuevo cliente registrado</p>
                        <p className='text-gray-400 text-xs'>María González - hace 2 días</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
} 