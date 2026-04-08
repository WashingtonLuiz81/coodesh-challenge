import type { Order } from "@/types/order";
import { formatCurrency, formatDateTime, canCancelOrder } from "@/utils";
import { Eye, XCircle } from "lucide-react";
import { StatusBadge } from "@/components";
import styles from "./OrdersTable.module.css";

type OrdersTableProps = {
  orders: Order[];
  onViewDetails: (order: Order) => void;
  onCancelOrder: (order: Order) => void;
};

export function OrdersTable({
  orders,
  onViewDetails,
  onCancelOrder,
}: OrdersTableProps) {
  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
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
              <td colSpan={9} className={styles.emptyState}>
                Nenhuma ordem encontrada para os filtros aplicados.
              </td>
            </tr>
          ) : (
            orders.map((order) => (
              <tr key={order.id}>
                <td className={styles.idCell}>{order.id}</td>
                <td>{order.instrument}</td>
                <td>
                  <span
                    className={`${styles.sideBadge} ${
                      order.side === "COMPRA"
                        ? styles.sideBuy
                        : styles.sideSell
                    }`}
                  >
                    {order.side}
                  </span>
                </td>
                <td>{formatCurrency(order.price)}</td>
                <td>{order.quantity}</td>
                <td>{order.remainingQuantity}</td>
                <td>
                  <StatusBadge status={order.status} />
                </td>
                <td>{formatDateTime(order.createdAt)}</td>
                <td>
                  <div className={styles.actions}>
                    <button
                      type="button"
                      onClick={() => onViewDetails(order)}
                      aria-label={`Ver detalhes da ordem ${order.id}`}
                      title="Ver detalhes"
                      className={styles.iconButton}
                    >
                      <Eye size={16} />
                    </button>

                    <button
                      type="button"
                      onClick={() => onCancelOrder(order)}
                      aria-label={`Cancelar ordem ${order.id}`}
                      title="Cancelar ordem"
                      disabled={!canCancelOrder(order.status)}
                      className={styles.iconButton}
                    >
                      <XCircle size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}