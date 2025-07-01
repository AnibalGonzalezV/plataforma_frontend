interface SalesData {
  month: string;
  sales: number;
}

interface SalesChartProps {
  data: SalesData[];
  maxValue?: number;
}

export function SalesChart({ data, maxValue }: SalesChartProps) {
  const maxSales = maxValue || Math.max(...data.map(d => d.sales), 1);

  return (
    <div className="h-64 flex items-end justify-between gap-2">
      {data.map((item, index) => (
        <div key={index} className="flex flex-col items-center flex-1">
          <div 
            className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg transition-all duration-300 hover:from-blue-500 hover:to-blue-300 cursor-pointer"
            style={{ height: `${(item.sales / maxSales) * 200}px` }}
            title={`${item.month}: $${(item.sales / 1000).toFixed(0)}k`}
          ></div>
          <span className="text-gray-400 text-sm mt-2">{item.month}</span>
          <span className="text-white text-xs font-medium">${(item.sales / 1000).toFixed(0)}k</span>
        </div>
      ))}
    </div>
  );
} 