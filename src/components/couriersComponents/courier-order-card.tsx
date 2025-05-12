import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, MapPin, Package, Store, User } from "lucide-react"
import { formatCurrency } from "@/lib/utils"
import { Order } from "@/services/courier"

type CourierOrderCardProps = {
  order: Order
  onAccept?: (orderId: number) => void
  onComplete?: (orderId: number) => void
}


export function CourierOrderCard({ order, onAccept, onComplete }: CourierOrderCardProps) {
  // Formatear la fecha del pedido
  const formattedDate = new Date(order.order_date).toLocaleString()

  // Determinar el estado del pedido para mostrar el badge correcto
  const getStatusBadge = () => {
    switch (order.delivery_state) {
      case "pendiente":
        return (
          <Badge variant="outline" className="bg-yellow-600 text-white border-yellow-500">
            Pendiente
          </Badge>
        )
      case "en_proceso":
        return (
          <Badge variant="outline" className="bg-primary text-white border-primary">
            En Proceso
          </Badge>
        )
      case "entregado":
        return (
          <Badge variant="outline" className="bg-blue-600 text-white border-blue-500">
            Entregado
          </Badge>
        )
      default:
        return <Badge variant="outline">{order.delivery_state}</Badge>
    }
  }

  return (
    <Card className="mb-4 border-border">
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
          <span>{order.client_name}</span>
        </div>

        <div className="mb-2 flex items-start gap-2">
          <MapPin className="mt-0.5 h-4 w-4 text-muted-foreground" />
          <span>{order.client_address}</span>
        </div>

        <div className="mb-2 flex items-start gap-2">
          <Store className="mt-0.5 h-4 w-4 text-muted-foreground" />
          <span>{order.store_name}</span>
        </div>

        <div className="flex items-start gap-2">
          <Package className="mt-0.5 h-4 w-4 text-muted-foreground" />
          <div>
            {order.items.map((item, index) => (
              <div key={index} className="text-sm">
                {item}
              </div>
            ))}
            <div className="mt-2 font-semibold">Total: {formatCurrency(order.total_amount)}</div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2 pt-2">
        {order.delivery_state === "pendiente" && onAccept && (
          <Button onClick={() => onAccept(order.order_id)} className="bg-primary hover:bg-primary/90">
            Aceptar Pedido
          </Button>
        )}
        {order.delivery_state === "en_proceso" && onComplete && (
          <Button onClick={() => onComplete(order.order_id)} className="bg-primary hover:bg-primary/90">
            Marcar Entregado
          </Button>
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
