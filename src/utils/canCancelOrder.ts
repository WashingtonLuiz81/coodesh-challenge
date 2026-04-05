import type { OrderStatus } from "@/types/order";

export function canCancelOrder(status: OrderStatus) {
  return status === "ABERTA" || status === "PARCIAL";
}