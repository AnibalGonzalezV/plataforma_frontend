interface OrderStateData {
  state: string;
  count: number;
}

interface OrdersStatusChartProps {
  data: OrderStateData[];
}

const getStateColor = (state: string) => {
  const key = state?.toLowerCase() ?? 'desconocido';
  switch (key) {
    case 'nuevo':
      return 'bg-blue-600/20 text-blue-400';
    case 'en_proceso':
      return 'bg-yellow-600/20 text-yellow-400';
    case 'en_camino':
      return 'bg-orange-600/20 text-orange-400';
    case 'entregado':
      return 'bg-green-600/20 text-green-400';
    case 'cancelado':
      return 'bg-red-600/20 text-red-400';
    default:
      return 'bg-gray-600/20 text-gray-400';
  }
};

export function OrdersStatusChart({ data }: OrdersStatusChartProps) {
  const totalOrders = data.reduce((sum, item) => sum + item.count, 0);

  return (
    <div className="space-y-3">
      {data.map((item, index) => (
        <div key={index} className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors">
          <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full ${getStateColor(item.state)}`}></div>
            <span className="text-white text-sm capitalize">
              {item.state ? item.state.replace('_', ' ') : 'Sin estado'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-purple-400 font-semibold">{item.count}</span>
            <span className="text-gray-500 text-xs">
              ({totalOrders > 0 ? ((item.count / totalOrders) * 100).toFixed(1) : 0}%)
            </span>
          </div>
        </div>
      ))}
      {data.length === 0 && (
        <div className="text-gray-500 text-center py-8">
          No hay datos de pedidos disponibles
        </div>
      )}
    </div>
  );
} 