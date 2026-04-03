import type { Order } from "@/types/order";

export const ordersMock: Order[] = [
    {
        id: "1",
        instrument: "PETR4",
        side: "COMPRA",
        price: 28.5,
        quantity: 100,
        remainingQuantity: 100,
        status: "ABERTA",
        createdAt: new Date().toISOString(),
    },
    {
        id: "2",
        instrument: "VALE3",
        side: "VENDA",
        price: 90,
        quantity: 50,
        remainingQuantity: 20,
        status: "PARCIAL",
        createdAt: new Date().toISOString(),
    }
]