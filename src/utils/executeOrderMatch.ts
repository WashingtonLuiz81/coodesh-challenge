import type { Order } from "@/types/order";

type ExecuteOrderMatchResult = {
  updatedNewOrder: Order;
  matchedOrder: Order | null;
};

function isCompatiblePrice(newOrder: Order, existingOrder: Order) {
  if (newOrder.side === "COMPRA") {
    return existingOrder.price <= newOrder.price;
  }

  return existingOrder.price >= newOrder.price;
}

function appendStatusHistory(
  order: Order,
  status: Order["status"],
  date: string
): Order {
  return {
    ...order,
    status,
    statusHistory: [
      ...order.statusHistory,
      {
        status,
        date,
      },
    ],
  };
}

export function executeOrderMatch(
  newOrder: Order,
  existingOrders: Order[]
): ExecuteOrderMatchResult {
  const compatibleOrder = existingOrders.find((order) => {
    const isSameInstrument = order.instrument === newOrder.instrument;
    const isOppositeSide = order.side !== newOrder.side;
    const isExecutableStatus =
      order.status === "ABERTA" || order.status === "PARCIAL";
    const hasRemainingQuantity = order.remainingQuantity > 0;
    const isCompatible = isCompatiblePrice(newOrder, order);

    return (
      isSameInstrument &&
      isOppositeSide &&
      isExecutableStatus &&
      hasRemainingQuantity &&
      isCompatible
    );
  });

  if (!compatibleOrder) {
    return {
      updatedNewOrder: newOrder,
      matchedOrder: null,
    };
  }

  const now = new Date().toISOString();

  const newOrderRemaining = newOrder.remainingQuantity;
  const matchedOrderRemaining = compatibleOrder.remainingQuantity;

  if (newOrderRemaining === matchedOrderRemaining) {
    return {
      updatedNewOrder: appendStatusHistory(
        {
          ...newOrder,
          remainingQuantity: 0,
        },
        "EXECUTADA",
        now
      ),
      matchedOrder: appendStatusHistory(
        {
          ...compatibleOrder,
          remainingQuantity: 0,
        },
        "EXECUTADA",
        now
      ),
    };
  }

  if (newOrderRemaining > matchedOrderRemaining) {
    return {
      updatedNewOrder: appendStatusHistory(
        {
          ...newOrder,
          remainingQuantity: newOrderRemaining - matchedOrderRemaining,
        },
        "PARCIAL",
        now
      ),
      matchedOrder: appendStatusHistory(
        {
          ...compatibleOrder,
          remainingQuantity: 0,
        },
        "EXECUTADA",
        now
      ),
    };
  }

  return {
    updatedNewOrder: appendStatusHistory(
      {
        ...newOrder,
        remainingQuantity: 0,
      },
      "EXECUTADA",
      now
    ),
    matchedOrder: appendStatusHistory(
      {
        ...compatibleOrder,
        remainingQuantity: matchedOrderRemaining - newOrderRemaining,
      },
      "PARCIAL",
      now
    ),
  };
}