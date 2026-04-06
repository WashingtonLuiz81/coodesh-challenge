import { describe, expect, it } from "vitest";
import { sortBy } from "./sortBy";

describe("sortBy", () => {
  const orders = [
    { id: "1", createdAt: "2026-04-01T10:00:00.000Z", price: 30 },
    { id: "2", createdAt: "2026-04-01T12:00:00.000Z", price: 10 },
    { id: "3", createdAt: "2026-04-01T11:00:00.000Z", price: 20 },
  ];

  it("deve ordenar por createdAt asc", () => {
    const result = sortBy(orders, "createdAt", "asc");

    expect(result.map((item) => item.id)).toEqual(["1", "3", "2"]);
  });

  it("deve ordenar por createdAt desc", () => {
    const result = sortBy(orders, "createdAt", "desc");

    expect(result.map((item) => item.id)).toEqual(["2", "3", "1"]);
  });

  it("não deve mutar o array original", () => {
    const original = [...orders];

    sortBy(orders, "price", "asc");

    expect(orders).toEqual(original);
  });
});