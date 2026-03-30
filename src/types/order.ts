export type OrderSide = "COMPRA" | "VENDA";
export type OrderStatus = "ABERTA" | "PARCIAL" | "EXECUTADA" | "CANCELADA";

export type Order = {
    id: string;
    instrument: string;
    side: OrderSide;
    price: number;
    quantity: number;
    remainingQuantity: number;
    status: OrderStatus;
    createdAt: string;
}