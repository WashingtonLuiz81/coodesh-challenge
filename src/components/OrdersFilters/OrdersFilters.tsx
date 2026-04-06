import type { OrderSideFilter, OrderStatusFilter } from "@/types/order";

type OrdersFilterProps = {
  search: string;
  sideFilter: OrderSideFilter;
  statusFilter: OrderStatusFilter;
  dateFilter: string;
  onSearchChange: (value: string) => void;
  onSideFilterChange: (value: OrderSideFilter) => void;
  onStatusFilterChange: (value: OrderStatusFilter) => void;
  onDateFilterChange: (value: string) => void;
};

export function OrdersFilters({
  search,
  sideFilter,
  statusFilter,
  dateFilter,
  onSearchChange,
  onSideFilterChange,
  onStatusFilterChange,
  onDateFilterChange,
}: OrdersFilterProps) {
  return (
    <div>
      <input
        type="text"
        placeholder="Buscar por ID ou Instrumento"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
      />

      <select
        value={sideFilter}
        onChange={(e) => onSideFilterChange(e.target.value as OrderSideFilter)}
      >
        <option value="TODOS">Todos os lados</option>
        <option value="COMPRA">Compra</option>
        <option value="VENDA">Venda</option>
      </select>

      <select
        value={statusFilter}
        onChange={(e) =>
          onStatusFilterChange(e.target.value as OrderStatusFilter)
        }
      >
        <option value="TODOS">Todos os status</option>
        <option value="ABERTA">Aberta</option>
        <option value="PARCIAL">Parcial</option>
        <option value="EXECUTADA">Executada</option>
        <option value="CANCELADA">Cancelada</option>
      </select>

      <input
        type="date"
        value={dateFilter}
        onChange={(e) => onDateFilterChange(e.target.value)}
      />
    </div>
  );
}