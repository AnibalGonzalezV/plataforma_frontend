import { useState, useEffect } from "react"
import { CourierOrderCard } from "@/components/couriersComponents/courier-order-card"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { fetchDeliveredOrders, getCurrentCourierId } from "@/services/courier"
import type { Order } from "@/types/courier"
import { useToast } from "@/hooks/use-toast"

export function DeliveredOrdersScreen() {
  const [deliveredOrders, setDeliveredOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    async function loadData() {
      try {
        // Obtener el ID del repartidor actual
        const courierId = await getCurrentCourierId()

        if (courierId) {
          // Cargar pedidos entregados por el repartidor
          const orders = await fetchDeliveredOrders(courierId)
          setDeliveredOrders(orders)
        }
      } catch (error) {
        console.error("Error al cargar pedidos entregados:", error)
        toast({
          title: "Error",
          description: "No se pudieron cargar los pedidos entregados",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [toast])

  if (loading) {
    return <div className="flex justify-center p-8 text-white">Cargando pedidos entregados...</div>
  }

  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold text-white">Pedidos Entregados</h2>

      {deliveredOrders.length === 0 ? (
        <Alert className="bg-secondary border-border text-white">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>No hay pedidos entregados</AlertTitle>
          <AlertDescription>
            No has entregado ningún pedido hoy. Los pedidos que entregues aparecerán aquí.
          </AlertDescription>
        </Alert>
      ) : (
        deliveredOrders.map((order) => (
          <div className="text-white">
            <CourierOrderCard key={order.order_id} order={order} />
          </div>
        ))
      )}
    </div>
  )
}
