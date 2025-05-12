import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PendingOrdersScreen } from "@/components/couriersComponents/pending-orders-screen"
import { ActiveOrdersScreen } from "@/components/couriersComponents/active-orders-screen"
import { DeliveredOrdersScreen } from "@/components/couriersComponents/delivered-orders-screen"
import { CourierNav } from "@/components/couriersComponents/courier-nav"

import { Menu, ShoppingCart, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

export function CourierMenu() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isCourierMode, setIsCourierMode] = useState(true)
  const { toast } = useToast()

  const handleSwitchRole = () => {
    setIsCourierMode(!isCourierMode)
    toast({
      title: isCourierMode ? "Modo usuario activado" : "Modo repartidor activado",
      description: isCourierMode
        ? "Ahora puedes realizar compras como usuario"
        : "Ahora puedes gestionar entregas como repartidor",
    })
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-border">
        <div className="container flex h-16 items-center px-4">
          
          <h1 className="text-lg font-semibold text-white">{isCourierMode ? "App de Repartidor" : "App de Usuario"}</h1>
          {!isCourierMode && (
            <Button variant="ghost" size="icon" className="ml-auto mr-2 text-white">
              <ShoppingCart className="h-5 w-5" />
            </Button>
          )}
          <div className={!isCourierMode ? "ml-2" : "ml-auto"}>
            <CourierNav onSwitchRole={handleSwitchRole} />
          </div>
        </div>
      </header>

      
      {/* Overlay para cerrar el sidebar al hacer clic fuera */}
      {sidebarOpen && <div className="fixed inset-0 z-40 bg-black/50" onClick={() => setSidebarOpen(false)} />}

      <main className="flex-1">
        {isCourierMode ? (
          <div className="container px-4 py-6">
            <Tabs defaultValue="pending" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-secondary ">
                <TabsTrigger value="pending" className="text-white data-[state=active]:bg-primary">
                  Nuevos Pedidos
                </TabsTrigger>
                <TabsTrigger value="active" className="text-white data-[state=active]:bg-primary">
                  Pedidos Activos
                </TabsTrigger>
                <TabsTrigger value="delivered" className="text-white data-[state=active]:bg-primary">
                  Entregados
                </TabsTrigger>
              </TabsList>
              <TabsContent value="pending" className="mt-4">
                <PendingOrdersScreen />
              </TabsContent>
              <TabsContent value="active" className="mt-4">
                <ActiveOrdersScreen />
              </TabsContent>
              <TabsContent value="delivered" className="mt-4">
                <DeliveredOrdersScreen />
              </TabsContent>
            </Tabs>
          </div>
        ) : (
          <div className="container flex items-center justify-center px-4 py-20">
            <div className="text-center">
              <h2 className="mb-4 text-2xl font-bold text-white">Modo Usuario</h2>
              <p className="mb-6 text-muted-foreground">
                Ahora estás en modo usuario. Aquí podrías ver tiendas, productos y realizar compras.
              </p>
              <Button className="bg-primary hover:bg-primary/90" onClick={handleSwitchRole}>
                <Truck className="mr-2 h-4 w-4" />
                Volver al modo repartidor
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
