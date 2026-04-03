import { OrdersTable } from "@/components/OrdersTable/OrdersTable";
import { ordersMock } from "@/data/orders";

export default function App() {
  return (
    <div style={{ padding: 20}}>
      <h1>Gerenciamento de Ordens</h1>

      <OrdersTable orders={ordersMock} />
    </div>
  )
}