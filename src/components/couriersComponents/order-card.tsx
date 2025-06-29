import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, MapPin, Package, Store, User } from "lucide-react"
import type { Order, OrderItem } from "@/services/courier"
import { formatCurrency, getOrderItems } from "@/services/courier"

interface OrderCardProps {
  order: Order
  onAccept?: (orderId: number) => void
  onComplete?: (orderId: number) => void
}

export function OrderCard({ order, onAccept, onComplete }: OrderCardProps) {
  // Formatear la fecha del pedido
  const formattedDate = new Date(order.order_date).toLocaleString()
  const [items, setItems] = useState<OrderItem[]>([])
  const [loadingItems, setLoadingItems] = useState(true)

  useEffect(() => {
    async function loadItems() {
      try {
        const res = await getOrderItems(order.order_id)
        setItems(res)
      } catch {
        setItems([])
      } finally {
        setLoadingItems(false)
      }
    }
    loadItems()
  }, [order.order_id])

  // Determinar el estado del pedido para mostrar el badge correcto
  const getStatusBadge = () => {
    switch (order.delivery_state) {
      case "pendiente":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
            Pendiente
          </Badge>
        )
      case "en_proceso":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800">
            En Proceso
          </Badge>
        )
      case "entregado":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800">
            Entregado
          </Badge>
        )
      default:
        return <Badge variant="outline">{order.delivery_state}</Badge>
    }
  }

  return (
    <Card className="mb-4">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Pedido #{order.order_id}</CardTitle>
          {getStatusBadge()}
        </div>
        <CardDescription className="flex items-center gap-1 text-sm">
          <Clock className="h-4 w-4" /> {formattedDate}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-2 flex items-start gap-2">
          <User className="mt-0.5 h-4 w-4 text-muted-foreground" />
          <span>Cliente #{order.client_id}</span>
        </div>

        <div className="mb-2 flex items-start gap-2">
          <MapPin className="mt-0.5 h-4 w-4 text-muted-foreground" />
          <span>Dirección no disponible</span>
        </div>

        <div className="mb-2 flex items-start gap-2">
          <Store className="mt-0.5 h-4 w-4 text-muted-foreground" />
          <span>Tienda #{order.store_id}</span>
        </div>

        <div className="flex items-start gap-2">
          <Package className="mt-0.5 h-4 w-4 text-muted-foreground" />
          <div>
            {loadingItems ? (
              <div className="text-sm">Cargando productos...</div>
            ) : items.length > 0 ? (
              items.map((item, idx) => (
                <div key={idx} className="text-sm">{item.quantity}x Producto #{item.productId}</div>
              ))
            ) : (
              <div className="text-sm">Productos no disponibles</div>
            )}
            <div className="mt-2 font-semibold">Total: {formatCurrency(order.total_amount)}</div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2 pt-2">
        {order.delivery_state === "pendiente" && onAccept && (
          <Button onClick={() => onAccept(order.order_id)}>Aceptar Pedido</Button>
        )}
        {order.delivery_state === "en_proceso" && onComplete && (
          <Button onClick={() => onComplete(order.order_id)}>Marcar Entregado</Button>
        )}
        {order.delivery_state === "entregado" && (
          <Button variant="outline" disabled>
            Entregado
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
