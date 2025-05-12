"use client"

import { useState, useEffect } from "react"
import { CourierOrderCard } from "@/components/couriersComponents/courier-order-card"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { fetchActiveOrders, completeOrder, getCurrentCourierId } from "@/services/courier"
import type { Order } from "@/types/courier"
import { useToast } from "@/hooks/use-toast"

export function ActiveOrdersScreen() {
  const [activeOrders, setActiveOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [courierId, setCourierId] = useState<number | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    async function loadData() {
      try {
        // Obtener el ID del repartidor actual
        const id = await getCurrentCourierId()
        setCourierId(id)

        if (id) {
          // Cargar pedidos activos del repartidor
          const orders = await fetchActiveOrders(id)
          setActiveOrders(orders)
        }
      } catch (error) {
        console.error("Error al cargar pedidos activos:", error)
        toast({
          title: "Error",
          description: "No se pudieron cargar los pedidos activos",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [toast])

  const handleCompleteOrder = async (orderId: number) => {
    try {
      const success = await completeOrder(orderId)

      if (success) {
        // Eliminar el pedido de la lista de activos
        setActiveOrders(activeOrders.filter((order) => order.order_id !== orderId))

        toast({
          title: "Pedido entregado",
          description: `Has completado el pedido #${orderId}`,
        })
      }
    } catch (error) {
      console.error("Error al completar pedido:", error)
      toast({
        title: "Error",
        description: "No se pudo marcar el pedido como entregado",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return <div className="flex justify-center p-8 text-white">Cargando pedidos activos...</div>
  }

  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold text-white">Pedidos En Proceso</h2>

      {activeOrders.length === 0 ? (
        <Alert className="bg-secondary border-border text-white">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>No hay pedidos activos</AlertTitle>
          <AlertDescription>
            No tienes pedidos en proceso actualmente. Acepta nuevos pedidos para comenzar.
          </AlertDescription>
        </Alert>
      ) : (
        activeOrders.map((order) => (
          <CourierOrderCard key={order.order_id} order={order} onComplete={handleCompleteOrder} />
        ))
      )}
    </div>
  )
}
