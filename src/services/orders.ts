import type { Order } from "@/types/order";

const API_URL = `${import.meta.env.VITE_API_URL}/orders`;

export async function getOrders(): Promise<Order[]> {
  const response = await fetch(API_URL);

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Erro ao buscar ordens: ${response.status} - ${errorText}`);
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
    const errorText = await response.text();
    throw new Error(`Erro ao criar ordem: ${response.status} - ${errorText}`);
  }

  return response.json();
}

export async function updateOrder(
  id: string,
  data: Partial<Order>
): Promise<Order> {
  const response = await fetch(`${API_URL}/${encodeURIComponent(id)}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Erro ao atualizar ordem ${id}: ${response.status} - ${errorText}`
    );
  }

  return response.json();
}