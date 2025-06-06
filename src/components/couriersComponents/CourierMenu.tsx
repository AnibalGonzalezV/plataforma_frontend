import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PendingOrdersScreen } from "@/components/couriersComponents/pending-orders-screen"
import { ActiveOrdersScreen } from "@/components/couriersComponents/active-orders-screen"
import { DeliveredOrdersScreen } from "@/components/couriersComponents/delivered-orders-screen"

export function CourierMenu() {

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <div className="container px-4 py-6">
            <Tabs defaultValue="pending" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-gray-700">
                <TabsTrigger value="pending" className="text-white hover:bg-gray-500">
                  Nuevos Pedidos
                </TabsTrigger>
                <TabsTrigger value="active" className="text-white hover:bg-gray-500">
                  Pedidos Activos
                </TabsTrigger>
                <TabsTrigger value="delivered" className="text-white hover:bg-gray-500">
                  Entregados
                </TabsTrigger>
              </TabsList>
              <TabsContent value="pending" className="mt-4 rounded-2xl">
                <PendingOrdersScreen />
              </TabsContent>
              <TabsContent value="active" className="mt-4 rounded-2xl">
                <ActiveOrdersScreen />
              </TabsContent>
              <TabsContent value="delivered" className="mt-4 rounded-2xl">
                <DeliveredOrdersScreen />
              </TabsContent>
            </Tabs>
          </div>
      </main>
    </div>
  )
}
