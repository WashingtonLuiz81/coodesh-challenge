import { useMemo, useState, useEffect } from "react";
import { createOrder, getOrders, updateOrder } from "@/services/orders";
import { 
	OrdersTable,
	OrdersFilters,
	OrdersPagination,
	OrderDetailsModal,
	CreateOrderModal,
	CancelOrderModal,
} from "@/components";
import type { OrderSideFilter, OrderStatusFilter, Order } from "@/types/order";
import { canCancelOrder, sortBy } from "@/utils";

export default function App() {
	const [orders, setOrders] = useState<Order[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
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

  const handleCreateOrder = async (data: {
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

		try {
			const createdOrder = await createOrder(newOrder);
			setOrders((prev) => [createdOrder, ...prev]);
			setCurrentPage(1);
		} catch {
			console.error("Erro ao criar ordem.");
		}
	};

	const handleOpenCancelModal = (order: Order) => {
		setSelectedOrderToCancel(order);
		setIsCancelModalOpen(true);
	};

	const handleCloseCancelModal = () => {
		setSelectedOrderToCancel(null);
		setIsCancelModalOpen(false);
	};

	const handleConfirmCancelOrder = async () => {
		if (!selectedOrderToCancel) {
			return;
		}

		if (!canCancelOrder(selectedOrderToCancel.status)) {
			handleCloseCancelModal();
			return;
		}

		try {
			const updatedOrder = await updateOrder(selectedOrderToCancel.id, {
				status: "CANCELADA",
			});

			setOrders((prev) =>
				prev.map((order) =>
					order.id === updatedOrder.id ? updatedOrder : order
				)
			);

			handleCloseCancelModal();
		} catch {
			console.error("Erro ao cancelar ordem.");
		}
	};

	useEffect(() => {
		async function loadOrders() {
			try {
				setLoading(true);
				setError("");

				const data = await getOrders();
				setOrders(data);
			} catch {
				setError("Erro ao carregar ordens.");
			} finally {
				setLoading(false);
			}
		}

		loadOrders();
	}, []);

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

    return sortBy(result, "createdAt", "desc");
	}, [orders, search, sideFilter, statusFilter]);

	const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  const paginatedOrders = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return filteredOrders.slice(startIndex, endIndex);
  }, [filteredOrders, currentPage]);

	if (loading) {
		return <div style={{ padding: 20 }}>Carregando ordens...</div>;
	}

	if (error) {
		return <div style={{ padding: 20 }}>{error}</div>;
	}

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