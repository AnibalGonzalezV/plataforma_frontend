import { useState, useEffect } from "react"
import { OrderCard } from "@/components/couriersComponents/order-card"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { fetchPendingOrders, acceptOrder, getCurrentCourierId } from "@/services/courier"
import type { Order } from "@/services/courier"
import { useToast } from "@/hooks/use-toast"

export function NewOrdersScreen() {
  const [pendingOrders, setPendingOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [courierId, setCourierId] = useState<number | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    async function loadData() {
      try {
        // Obtener el ID del repartidor actual
        const id = await getCurrentCourierId()
        setCourierId(id)

        // Cargar pedidos pendientes
        const orders = await fetchPendingOrders()
        setPendingOrders(orders)
      } catch (error) {
        console.error("Error al cargar pedidos pendientes:", error)
        toast({
          title: "Error",
          description: "No se pudieron cargar los pedidos pendientes",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [toast])

  const handleAcceptOrder = async (orderId: number) => {
    if (!courierId) return

    try {
      const success = await acceptOrder(orderId, courierId)

      if (success) {
        // Eliminar el pedido de la lista de pendientes
        setPendingOrders(pendingOrders.filter((order) => order.order_id !== orderId))

        toast({
          title: "Pedido aceptado",
          description: `Has aceptado el pedido #${orderId}`,
        })
      }
    } catch (error) {
      console.error("Error al aceptar pedido:", error)
      toast({
        title: "Error",
        description: "No se pudo aceptar el pedido",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return <div className="flex justify-center p-8">Cargando pedidos disponibles...</div>
  }

  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold">Pedidos Disponibles</h2>

      {pendingOrders.length === 0 ? (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>No hay pedidos disponibles</AlertTitle>
          <AlertDescription>Actualmente no hay nuevos pedidos para aceptar. Revisa más tarde.</AlertDescription>
        </Alert>
      ) : (
        pendingOrders.map((order) => (
          <div className="text-white">
            <OrderCard key={order.order_id} order={order} onAccept={handleAcceptOrder} />
          </div>
        ))
      )}
    </div>
  )
}
