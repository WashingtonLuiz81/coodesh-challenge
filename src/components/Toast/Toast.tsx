import styles from "./Toast.module.css";

type ToastProps = {
  message: string;
  type: "success" | "error";
};

export function Toast({ message, type }: ToastProps) {
  return <div className={`${styles.toast} ${styles[type]}`}>{message}</div>;
}