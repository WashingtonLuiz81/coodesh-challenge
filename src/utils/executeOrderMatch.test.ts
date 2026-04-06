import { describe, expect, it } from "vitest";
import { executeOrderMatch } from "./executeOrderMatch";
import type { Order } from "@/types/order";

function createBaseOrder(overrides: Partial<Order>): Order {
  return {
    id: "O-1",
    instrument: "PETR4",
    side: "COMPRA",
    price: 10,
    quantity: 50,
    remainingQuantity: 50,
    status: "ABERTA",
    createdAt: "2026-04-05T10:00:00.000Z",
    statusHistory: [
      {
        status: "ABERTA",
        date: "2026-04-05T10:00:00.000Z",
      },
    ],
    ...overrides,
  };
}

describe("executeOrderMatch", () => {
  it("deve executar ambas as ordens quando as quantidades forem iguais", () => {
    const newOrder = createBaseOrder({
      id: "NEW-1",
      side: "COMPRA",
      quantity: 50,
      remainingQuantity: 50,
      price: 10,
    });

    const existingOrders = [
      createBaseOrder({
        id: "EX-1",
        side: "VENDA",
        quantity: 50,
        remainingQuantity: 50,
        price: 10,
      }),
    ];

    const { updatedNewOrder, matchedOrder } = executeOrderMatch(
      newOrder,
      existingOrders
    );

    expect(updatedNewOrder.status).toBe("EXECUTADA");
    expect(updatedNewOrder.remainingQuantity).toBe(0);

    expect(matchedOrder).not.toBeNull();
    expect(matchedOrder?.status).toBe("EXECUTADA");
    expect(matchedOrder?.remainingQuantity).toBe(0);
  });

  it("deve deixar a nova ordem PARCIAL quando ela for maior que a contraparte", () => {
    const newOrder = createBaseOrder({
      id: "NEW-2",
      side: "COMPRA",
      quantity: 100,
      remainingQuantity: 100,
      price: 20,
      instrument: "VALE3",
    });

    const existingOrders = [
      createBaseOrder({
        id: "EX-2",
        side: "VENDA",
        quantity: 30,
        remainingQuantity: 30,
        price: 20,
        instrument: "VALE3",
      }),
    ];

    const { updatedNewOrder, matchedOrder } = executeOrderMatch(
      newOrder,
      existingOrders
    );

    expect(updatedNewOrder.status).toBe("PARCIAL");
    expect(updatedNewOrder.remainingQuantity).toBe(70);

    expect(matchedOrder).not.toBeNull();
    expect(matchedOrder?.status).toBe("EXECUTADA");
    expect(matchedOrder?.remainingQuantity).toBe(0);
  });

  it("deve deixar a contraparte PARCIAL quando a nova ordem for menor", () => {
    const newOrder = createBaseOrder({
      id: "NEW-3",
      side: "COMPRA",
      quantity: 40,
      remainingQuantity: 40,
      price: 30,
      instrument: "ITUB4",
    });

    const existingOrders = [
      createBaseOrder({
        id: "EX-3",
        side: "VENDA",
        quantity: 100,
        remainingQuantity: 100,
        price: 30,
        instrument: "ITUB4",
      }),
    ];

    const { updatedNewOrder, matchedOrder } = executeOrderMatch(
      newOrder,
      existingOrders
    );

    expect(updatedNewOrder.status).toBe("EXECUTADA");
    expect(updatedNewOrder.remainingQuantity).toBe(0);

    expect(matchedOrder).not.toBeNull();
    expect(matchedOrder?.status).toBe("PARCIAL");
    expect(matchedOrder?.remainingQuantity).toBe(60);
  });

  it("não deve executar quando não houver contraparte compatível", () => {
    const newOrder = createBaseOrder({
      id: "NEW-4",
      side: "COMPRA",
      instrument: "ABEV3",
      price: 5,
      quantity: 10,
      remainingQuantity: 10,
    });

    const existingOrders = [
      createBaseOrder({
        id: "EX-4",
        side: "VENDA",
        instrument: "VALE3",
        price: 20,
        quantity: 30,
        remainingQuantity: 30,
      }),
    ];

    const { updatedNewOrder, matchedOrder } = executeOrderMatch(
      newOrder,
      existingOrders
    );

    expect(updatedNewOrder.status).toBe("ABERTA");
    expect(updatedNewOrder.remainingQuantity).toBe(10);
    expect(matchedOrder).toBeNull();
  });
});