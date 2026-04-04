import type { Order } from "@/types/order";
import { formatCurrency, formatDateTime } from "@/utils";

import { Eye } from "lucide-react";

type OrdersTableProps = {
    orders: Order[];
    onViewDetails: (order: Order) => void;
}

export function OrdersTable({orders, onViewDetails }: OrdersTableProps) {
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
          <th>Ações</th>
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
              <td>
                <button
                  type="button"
                  onClick={() => onViewDetails(order)}
                  aria-label={`Ver detalhes da ordem ${order.id}`}
                  title="Ver detalhes"
                  style={{
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    padding: 6,
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Eye size={16} />
                </button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  )
}