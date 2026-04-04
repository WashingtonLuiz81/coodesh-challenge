import { useMemo, useState } from "react";
import { OrdersTable, OrdersFilters, OrdersPagination, OrderDetailsModal } from "@/components";
import { ordersMock } from "@/data/orders";
import type { OrderSideFilter, OrderStatusFilter, Order } from "./types/order";

export default function App() {
  const [search, setSearch] = useState("");
  const [sideFilter, setSideFilter] = useState<OrderSideFilter>('TODOS');
  const [statusFilter, setStatusFilter] = useState<OrderStatusFilter>('TODOS');
	const [currentPage, setCurrentPage] = useState(1);

	const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

	const itemsPerPage = 5;

	const handleSearchChange = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleSideFilterChange = (value: OrderSideFilter) => {
    setSideFilter(value);
    setCurrentPage(1);
  };

  const handleStatusFilterChange = (value: OrderStatusFilter) => {
    setStatusFilter(value);
    setCurrentPage(1);
  };

	const handleOpenDetailsModal = (order: Order) => {
    setSelectedOrder(order);
    setIsDetailsModalOpen(true);
  };

  const handleCloseDetailsModal = () => {
    setSelectedOrder(null);
    setIsDetailsModalOpen(false);
  };

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

	const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  const paginatedOrders = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return filteredOrders.slice(startIndex, endIndex);
  }, [filteredOrders, currentPage]);

  return (
    <div style={{ padding: 20}}>
      <h1>Gerenciamento de Ordens</h1>

			<OrderDetailsModal
        order={selectedOrder}
        isOpen={isDetailsModalOpen}
        onClose={handleCloseDetailsModal}
      />

			<OrdersFilters
        search={search}
        sideFilter={sideFilter}
        statusFilter={statusFilter}
        onSearchChange={handleSearchChange}
        onSideFilterChange={handleSideFilterChange}
        onStatusFilterChange={handleStatusFilterChange}
      />

      <OrdersTable orders={paginatedOrders} onViewDetails={handleOpenDetailsModal} />

			<OrdersPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  )
}