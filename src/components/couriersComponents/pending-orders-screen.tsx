import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { CourierOrderCard } from '@/components/couriersComponents/courier-order-card'
import { AlertCircle } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { fetchPendingOrders, acceptOrder, getCurrentCourierId } from '@/services/courier'

type Message = {
  title: string
  description: string
  variant?: 'destructive' | 'default'
}

export function PendingOrdersScreen() {
  const [message, setMessage] = useState<Message | null>(null)
  const queryClient = useQueryClient()

  const courierIdQuery = useQuery({
    queryKey: ['courierId'],
    queryFn: getCurrentCourierId,
    retry: false,
  })

  const pendingOrdersQuery = useQuery({
    queryKey: ['pendingOrders'],
    queryFn: fetchPendingOrders,
    enabled: !!courierIdQuery.data,
    staleTime: 1000 * 30,
    select: (orders) => orders.filter(order => order.delivery_type === 'delivery'),
  })

  const acceptOrderMutation = useMutation({
    mutationFn: (orderId: number) => acceptOrder(orderId, courierIdQuery.data!),
    onSuccess: (_, orderId) => {
      setMessage({
        title: 'Pedido aceptado',
        description: `Has aceptado el pedido #${orderId}`,
        variant: 'default',
      })
      queryClient.invalidateQueries({ queryKey: ['pendingOrders'] })
    },
    onError: () => {
      setMessage({
        title: 'Error',
        description: 'No se pudo aceptar el pedido',
        variant: 'destructive',
      })
    },
  })

  const handleAcceptOrder = (orderId: number) => {
    if (courierIdQuery.data) {
      acceptOrderMutation.mutate(orderId)
    }
  }

  if (courierIdQuery.isLoading || pendingOrdersQuery.isLoading) {
    return <div className='flex justify-center p-8 text-white'>Cargando pedidos disponibles...</div>
  }

  const pendingOrders = pendingOrdersQuery.data ?? []

  return (
    <div>
      <h2 className='mb-4 text-xl font-semibold text-white'>Pedidos Disponibles</h2>

      {message && (
        <Alert
          className={`mb-4 ${
            message.variant === 'destructive' ? 'bg-red-600 border-red-700' : 'bg-green-600 border-green-700'
          } border border-solid text-white`}
        >
          <AlertCircle className='h-4 w-4' />
          <AlertTitle>{message.title}</AlertTitle>
          <AlertDescription>{message.description}</AlertDescription>
        </Alert>
      )}

      {pendingOrders.length === 0 ? (
        <Alert className='bg-secondary border-border text-white'>
          <AlertCircle className='h-4 w-4' />
          <AlertTitle>No hay pedidos disponibles</AlertTitle>
          <AlertDescription>Actualmente no hay nuevos pedidos para aceptar. Revisa más tarde.</AlertDescription>
        </Alert>
      ) : (
        pendingOrders.map((order) => (
          <div key={order.order_id} className='text-white'>
            <CourierOrderCard order={order} onAccept={handleAcceptOrder} />
          </div>
        ))
      )}
    </div>
  )
}