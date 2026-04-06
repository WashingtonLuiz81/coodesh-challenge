import { describe, it, expect } from "vitest";
import { canCancelOrder } from "./canCancelOrder";

describe("canCancelOrder", () => {
  it("deve permitir cancelamento quando status for ABERTA", () => {
    expect(canCancelOrder("ABERTA")).toBe(true);
  });

  it("deve permitir cancelamento quando status for PARCIAL", () => {
    expect(canCancelOrder("PARCIAL")).toBe(true);
  });

  it("não deve permitir cancelamento quando status for EXECUTADA", () => {
    expect(canCancelOrder("EXECUTADA")).toBe(false);
  });

  it("não deve permitir cancelamento quando status for CANCELADA", () => {
    expect(canCancelOrder("CANCELADA")).toBe(false);
  });
});