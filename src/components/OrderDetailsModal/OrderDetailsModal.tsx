import { Modal } from "@/components";
import type { Order } from "@/types/order";
import { formatCurrency, formatDateTime } from "@/utils";
import styles from "./OrderDetailsModal.module.css";

type OrderDetailsModalProps = {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
};

export function OrderDetailsModal({
  order,
  isOpen,
  onClose,
}: OrderDetailsModalProps) {
  if (!order) {
    return null;
  }

  return (
    <Modal isOpen={isOpen} title="Resumo da Ordem" onClose={onClose}>
      <div className={styles.content}>
        <div className={styles.row}>
          <span className={styles.label}>ID</span>
          <span className={styles.value}>{order.id}</span>
        </div>

        <div className={styles.row}>
          <span className={styles.label}>Instrumento</span>
          <span className={styles.value}>{order.instrument}</span>
        </div>

        <div className={styles.row}>
          <span className={styles.label}>Lado</span>
          <span className={styles.value}>{order.side}</span>
        </div>

        <div className={styles.row}>
          <span className={styles.label}>Preço</span>
          <span className={styles.value}>{formatCurrency(order.price)}</span>
        </div>

        <div className={styles.row}>
          <span className={styles.label}>Quantidade</span>
          <span className={styles.value}>{order.quantity}</span>
        </div>

        <div className={styles.row}>
          <span className={styles.label}>Quantidade Restante</span>
          <span className={styles.value}>{order.remainingQuantity}</span>
        </div>

        <div className={styles.row}>
          <span className={styles.label}>Status Atual</span>
          <span className={styles.value}>{order.status}</span>
        </div>

        <div className={styles.row}>
          <span className={styles.label}>Data/Hora</span>
          <span className={styles.value}>{formatDateTime(order.createdAt)}</span>
        </div>

        <div className={styles.historySection}>
          <h3 className={styles.historyTitle}>Histórico de status</h3>

          {order.statusHistory.length === 0 ? (
            <p className={styles.emptyHistory}>
              Nenhum histórico disponível.
            </p>
          ) : (
            <ul className={styles.historyList}>
              {order.statusHistory.map((item, index) => (
                <li
                  key={`${item.status}-${item.date}-${index}`}
                  className={styles.historyItem}
                >
                  <span className={styles.historyStatus}>{item.status}</span>
                  <span className={styles.historyDate}>
                    {formatDateTime(item.date)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </Modal>
  );
}