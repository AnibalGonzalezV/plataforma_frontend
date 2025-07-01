import { useQuery } from '@tanstack/react-query';
import { getDashboardStats, getChartData, DashboardStats } from '@/services/dashboard';

export function useDashboardStats() {
  return useQuery<DashboardStats>({
    queryKey: ['dashboard-stats'],
    queryFn: getDashboardStats,
    refetchInterval: 30000, // Refrescar cada 30 segundos
    staleTime: 10000, // Los datos se consideran frescos por 10 segundos
    retry: 3, // Reintentar 3 veces en caso de error
  });
}

export function useDashboardCharts() {
  return useQuery({
    queryKey: ['dashboard-charts'],
    queryFn: getChartData,
    refetchInterval: 30000,
    staleTime: 10000,
    retry: 3,
  });
}

// Hook combinado para obtener todos los datos del dashboard
export function useDashboard() {
  const stats = useDashboardStats();
  const charts = useDashboardCharts();

  return {
    stats: stats.data,
    charts: charts.data,
    isLoading: stats.isLoading || charts.isLoading,
    error: stats.error || charts.error,
    refetch: () => {
      stats.refetch();
      charts.refetch();
    },
  };
} 