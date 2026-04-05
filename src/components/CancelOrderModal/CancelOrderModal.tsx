import { Modal } from "@/components";
import type { Order } from "@/types/order";
import styles from "./CancelOrderModal.module.css";

type CancelOrderModalProps = {
  isOpen: boolean;
  order: Order | null;
  onClose: () => void;
  onConfirm: () => void;
};

export function CancelOrderModal({
  isOpen,
  order,
  onClose,
  onConfirm,
}: CancelOrderModalProps) {
  if (!order) {
    return null;
  }

  return (
    <Modal isOpen={isOpen} title="Confirmar cancelamento" onClose={onClose}>
      <div className={styles.content}>
        <p className={styles.message}>
          Tem certeza que deseja cancelar a ordem{" "}
          <strong>{order.id}</strong> do instrumento{" "}
          <strong>{order.instrument}</strong>?
        </p>

        <div className={styles.actions}>
          <button
            type="button"
            onClick={onClose}
            className={styles.secondaryButton}
          >
            Voltar
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className={styles.dangerButton}
          >
            Confirmar cancelamento
          </button>
        </div>
      </div>
    </Modal>
  );
}