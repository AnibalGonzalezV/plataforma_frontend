// Servicios para el dashboard del administrador

// Tipos para las métricas del dashboard
export interface DashboardStats {
  users: {
    total: number;
    byRole: { role: string; count: number }[];
  };
  orders: {
    total: number;
    byState: { state: string; count: number }[];
  };
  stores: {
    total: number;
  };
  products: {
    total: number;
  };
  couriers: {
    total: number;
  };
  sales: {
    total: number;
    averageTicket: number;
  };
}

export interface TopProduct {
  id: number;
  name: string;
  sales: number;
  revenue: number;
}

export interface TopStore {
  id: number;
  name: string;
  sales: number;
  orders: number;
  rating: number;
}

// Función para obtener el token de autenticación
const getAuthHeaders = () => {
  const token = localStorage.getItem('accessToken');
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  };
};

// Obtener estadísticas de usuarios por rol
export async function getUsersCountByRole(): Promise<{ role: string; count: number }[]> {
  try {
    const response = await fetch('http://localhost:3003/metrics/metrics/count-by-role', {
      headers: getAuthHeaders(),
    });
    if (!response.ok) {
      throw new Error('Error al obtener estadísticas de usuarios');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching users count by role:', error);
    return [];
  }
}

// Obtener todos los usuarios
export async function getAllUsers(): Promise<any[]> {
  try {
    const response = await fetch('http://localhost:3003/users/usuarios/all', {
      headers: getAuthHeaders(),
    });
    if (!response.ok) {
      throw new Error('Error al obtener usuarios');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching all users:', error);
    return [];
  }
}

// Obtener estadísticas de pedidos por estado
export async function getOrdersByState(): Promise<{ state: string; count: number }[]> {
  try {
    const response = await fetch('http://localhost:3003/orders/orders/state-count', {
      headers: getAuthHeaders(),
    });
    if (!response.ok) {
      throw new Error('Error al obtener estadísticas de pedidos');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching orders by state:', error);
    return [];
  }
}

// Obtener todos los pedidos
export async function getAllOrders(): Promise<any[]> {
  try {
    const response = await fetch('http://localhost:3003/orders/orders/all', {
      headers: getAuthHeaders(),
    });
    if (!response.ok) {
      throw new Error('Error al obtener pedidos');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching all orders:', error);
    return [];
  }
}

// Obtener todas las tiendas
export async function getAllStores(): Promise<any[]> {
  try {
    const response = await fetch('http://localhost:3003/users/stores/all', {
      headers: getAuthHeaders(),
    });
    if (!response.ok) {
      throw new Error('Error al obtener tiendas');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching all stores:', error);
    return [];
  }
}

// Obtener todos los productos
export async function getAllProducts(): Promise<any[]> {
  try {
    const response = await fetch('http://localhost:3003/products/products/all', {
      headers: getAuthHeaders(),
    });
    if (!response.ok) {
      throw new Error('Error al obtener productos');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching all products:', error);
    return [];
  }
}

// Obtener todos los repartidores
export async function getAllCouriers(): Promise<any[]> {
  try {
    const response = await fetch('http://localhost:3003/users/couriers/all', {
      headers: getAuthHeaders(),
    });
    if (!response.ok) {
      throw new Error('Error al obtener repartidores');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching all couriers:', error);
    return [];
  }
}

// Función principal para obtener todas las estadísticas del dashboard
export async function getDashboardStats(): Promise<DashboardStats> {
  try {
    // Ejecutar todas las consultas en paralelo
    const [
      usersByRole,
      allUsers,
      ordersByState,
      allOrders,
      allStores,
      allProducts,
      allCouriers
    ] = await Promise.all([
      getUsersCountByRole(),
      getAllUsers(),
      getOrdersByState(),
      getAllOrders(),
      getAllStores(),
      getAllProducts(),
      getAllCouriers()
    ]);

    // Calcular ventas totales y ticket promedio
    const totalSales = allOrders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);
    const averageTicket = allOrders.length > 0 ? totalSales / allOrders.length : 0;

    return {
      users: {
        total: allUsers.length,
        byRole: usersByRole,
      },
      orders: {
        total: allOrders.length,
        byState: ordersByState,
      },
      stores: {
        total: allStores.length,
      },
      products: {
        total: allProducts.length,
      },
      couriers: {
        total: allCouriers.length,
      },
      sales: {
        total: totalSales,
        averageTicket: averageTicket,
      },
    };
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    throw error;
  }
}

// Obtener datos para gráficos
export async function getChartData() {
  try {
    const [ordersByState, allOrders] = await Promise.all([
      getOrdersByState(),
      getAllOrders()
    ]);

    return {
      salesByMonth: [], // No datos simulados
      ordersByState,
      recentOrders: allOrders.slice(0, 10), // Últimos 10 pedidos reales
    };
  } catch (error) {
    console.error('Error fetching chart data:', error);
    return {
      salesByMonth: [],
      ordersByState: [],
      recentOrders: [],
    };
  }
} 