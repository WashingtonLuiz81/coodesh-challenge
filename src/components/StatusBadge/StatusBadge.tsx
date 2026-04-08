import type { Order } from "@/types/order";
import styles from "./StatusBadge.module.css";

type StatusBadgeProps = {
  status: Order["status"];
};

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span className={`${styles.badge} ${styles[status]}`}>
      {status}
    </span>
  );
}