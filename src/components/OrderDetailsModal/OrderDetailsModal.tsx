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
          <span className={styles.label}>Status</span>
          <span className={styles.value}>{order.status}</span>
        </div>

        <div className={styles.row}>
          <span className={styles.label}>Data/Hora</span>
          <span className={styles.value}>{formatDateTime(order.createdAt)}</span>
        </div>
      </div>
    </Modal>
  );
}