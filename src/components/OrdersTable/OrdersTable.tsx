import type { Order } from "@/types/order";
import { formatCurrency, formatDateTime } from "@/utils";

type OrdersTableProps = {
    orders: Order[]
}

export function OrdersTable({orders}: OrdersTableProps) {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Instrumento</th>
          <th>Lado</th>
          <th>Preço</th>
          <th>Quantidade</th>
          <th>Quantidade Restante</th>
          <th>Status</th>
          <th>Data/Hora</th>
        </tr>
      </thead>
      <tbody>
        {orders.length === 0 ? (
          <tr>
            <td colSpan={8} style={{ textAlign: "center", padding: 20 }}>
              Nenhuma ordem encontrada para os filtros aplicados.
            </td>
          </tr>
        ) : (
          orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.instrument}</td>
              <td>{order.side}</td>
              <td>{formatCurrency(order.price)}</td>
              <td>{order.quantity}</td>
              <td>{order.remainingQuantity}</td>
              <td>{order.status}</td>
              <td>{formatDateTime(order.createdAt)}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  )
}