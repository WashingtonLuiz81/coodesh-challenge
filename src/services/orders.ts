import type { Order } from "@/types/order";

const API_URL = "http://localhost:3001/orders";

export async function getOrders(): Promise<Order[]> {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Erro ao buscar ordens.");
  }

  return response.json();
}

export async function createOrder(order: Order): Promise<Order> {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  });

  if (!response.ok) {
    throw new Error("Erro ao criar ordem.");
  }

  return response.json();
}

export async function updateOrder(
  id: string,
  data: Partial<Order>
): Promise<Order> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Erro ao atualizar ordem.");
  }

  return response.json();
}