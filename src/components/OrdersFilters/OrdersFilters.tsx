import type { OrderSideFilter, OrderStatusFilter } from "@/types/order";
import styles from "./OrdersFilters.module.css";

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
    <div className={styles.filters}>
      <div className={`${styles.field} ${styles.searchField}`}>
        <label htmlFor="search" className={styles.label}>
          Buscar
        </label>
        <input
          id="search"
          type="text"
          placeholder="Buscar por ID ou instrumento"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className={styles.input}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="sideFilter" className={styles.label}>
          Lado
        </label>
        <select
          id="sideFilter"
          value={sideFilter}
          onChange={(e) => onSideFilterChange(e.target.value as OrderSideFilter)}
          className={styles.input}
        >
          <option value="TODOS">Todos os lados</option>
          <option value="COMPRA">Compra</option>
          <option value="VENDA">Venda</option>
        </select>
      </div>

      <div className={styles.field}>
        <label htmlFor="statusFilter" className={styles.label}>
          Status
        </label>
        <select
          id="statusFilter"
          value={statusFilter}
          onChange={(e) =>
            onStatusFilterChange(e.target.value as OrderStatusFilter)
          }
          className={styles.input}
        >
          <option value="TODOS">Todos os status</option>
          <option value="ABERTA">Aberta</option>
          <option value="PARCIAL">Parcial</option>
          <option value="EXECUTADA">Executada</option>
          <option value="CANCELADA">Cancelada</option>
        </select>
      </div>

      <div className={styles.field}>
        <label htmlFor="dateFilter" className={styles.label}>
          Data
        </label>
        <input
          id="dateFilter"
          type="date"
          value={dateFilter}
          onChange={(e) => onDateFilterChange(e.target.value)}
          className={styles.input}
        />
      </div>
    </div>
  );
}