import { useMemo, useState } from "react";
import { 
	OrdersTable,
	OrdersFilters,
	OrdersPagination,
	OrderDetailsModal,
	CreateOrderModal,
	CancelOrderModal,
} from "@/components";
import { ordersMock } from "@/data/orders";
import type { OrderSideFilter, OrderStatusFilter, Order } from "@/types/order";
import { canCancelOrder } from "@/utils";

export default function App() {
	const [orders, setOrders] = useState<Order[]>(ordersMock);
  const [search, setSearch] = useState("");
  const [sideFilter, setSideFilter] = useState<OrderSideFilter>('TODOS');
  const [statusFilter, setStatusFilter] = useState<OrderStatusFilter>('TODOS');
	const [currentPage, setCurrentPage] = useState(1);

	const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
	const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

	const [selectedOrderToCancel, setSelectedOrderToCancel] = useState<Order | null>(null);
	const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

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

	const handleOpenCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  const handleCloseCreateModal = () => {
    setIsCreateModalOpen(false);
  };

  const handleCreateOrder = (data: {
    instrument: string;
    side: Order["side"];
    price: number;
    quantity: number;
  }) => {
    const newOrder: Order = {
      id: `O-${Date.now()}`,
      instrument: data.instrument,
      side: data.side,
      price: data.price,
      quantity: data.quantity,
      remainingQuantity: data.quantity,
      status: "ABERTA",
      createdAt: new Date().toISOString(),
    };

    setOrders((prev) => [newOrder, ...prev]);
    setCurrentPage(1);
  };

	const handleOpenCancelModal = (order: Order) => {
		setSelectedOrderToCancel(order);
		setIsCancelModalOpen(true);
	};

	const handleCloseCancelModal = () => {
		setSelectedOrderToCancel(null);
		setIsCancelModalOpen(false);
	};

	const handleConfirmCancelOrder = () => {
		if (!selectedOrderToCancel) {
			return;
		}

		if (!canCancelOrder(selectedOrderToCancel.status)) {
			handleCloseCancelModal();
			return;
		}

		setOrders((prev) =>
			prev.map((order) =>
				order.id === selectedOrderToCancel.id
					? {
							...order,
							status: "CANCELADA",
						}
					: order
			)
		);

		handleCloseCancelModal();
	};

  const filteredOrders = useMemo(() => {
		let result = [...orders];

		const normalizedSearch = search.trim().toLowerCase();

		if(normalizedSearch) {
			result = result.filter((order) => {
				return (
					order.id.toLowerCase().includes(normalizedSearch) || order.instrument.toLowerCase().includes(normalizedSearch)
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
	}, [orders, search, sideFilter, statusFilter]);

	const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  const paginatedOrders = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return filteredOrders.slice(startIndex, endIndex);
  }, [filteredOrders, currentPage]);

  return (
    <div style={{ padding: 20}}>
      <h1>Gerenciamento de Ordens</h1>

			<button type="button" onClick={handleOpenCreateModal}>
        Nova Ordem
      </button>

			<CancelOrderModal
				isOpen={isCancelModalOpen}
				order={selectedOrderToCancel}
				onClose={handleCloseCancelModal}
				onConfirm={handleConfirmCancelOrder}
			/>

			<CreateOrderModal
        isOpen={isCreateModalOpen}
        onClose={handleCloseCreateModal}
        onCreateOrder={handleCreateOrder}
      />

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

      <OrdersTable
				orders={paginatedOrders}
				onViewDetails={handleOpenDetailsModal}
				onCancelOrder={handleOpenCancelModal}
			/>

			<OrdersPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  )
}