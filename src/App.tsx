import { useMemo, useState } from "react";
import { OrdersTable, OrdersFilters } from "@/components";
import { ordersMock } from "@/data/orders";
import type { OrderSideFilter, OrderStatusFilter } from "./types/order";

export default function App() {
  const [search, setSearch] = useState("");
  const [sideFilter, setSideFilter] = useState<OrderSideFilter>('TODOS');
  const [statusFilter, setStatusFilter] = useState<OrderStatusFilter>('TODOS');

  const filteredOrders = useMemo(() => {
		let result = [...ordersMock];

		const normalizedSearch = search.trim().toLocaleLowerCase();

		if(normalizedSearch) {
			result = result.filter((order) => {
				return (
					order.id.toLocaleLowerCase().includes(normalizedSearch) || order.instrument.toLocaleLowerCase().includes(normalizedSearch)
				);
			});
		}

		if (sideFilter !== "TODOS") {
      result = result.filter((order) => order.side === sideFilter);
    }

    if (statusFilter !== "TODOS") {
      result = result.filter((order) => order.status === statusFilter);
    }

    return result;
	}, [search, sideFilter, statusFilter]);

  return (
    <div style={{ padding: 20}}>
      <h1>Gerenciamento de Ordens</h1>

			<OrdersFilters
        search={search}
        sideFilter={sideFilter}
        statusFilter={statusFilter}
        onSearchChange={setSearch}
        onSideFilterChange={setSideFilter}
        onStatusFilterChange={setStatusFilter}
      />
      <OrdersTable orders={filteredOrders} />
    </div>
  )
}