import { useEffect, useState } from "react";
import api from "../../api/axios";
import OrdersTable from "../../components/admin/OrdersTable";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadOrders = () => {
    api
      .get("/orders")
      .then(({ data }) => setOrders(data))
      .catch(() => setError("Couldn't load orders."))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleStatusChange = async (order, status) => {
    const previous = orders;
    setOrders((prev) => prev.map((o) => (o._id === order._id ? { ...o, status } : o)));
    try {
      await api.put(`/orders/${order._id}`, { status });
    } catch {
      setOrders(previous);
      setError("Failed to update order status.");
    }
  };

  const handleDelete = async (order) => {
    if (!window.confirm(`Delete order from ${order.customer?.fullName || order.user?.name || "this customer"}? This can't be undone.`)) return;
    try {
      await api.delete(`/orders/${order._id}`);
      setOrders((prev) => prev.filter((o) => o._id !== order._id));
    } catch {
      setError("Failed to delete order.");
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <h2 className="font-display text-2xl font-bold text-neutral-900">Artwork Orders</h2>

      <div className="bg-white rounded-3xl p-6 shadow-card">
        {loading && <p className="text-center text-neutral-500 font-body py-10">Loading orders...</p>}
        {!loading && error && <p className="text-center text-berry font-body py-10">{error}</p>}
        {!loading && !error && (
          <OrdersTable orders={orders} onStatusChange={handleStatusChange} onDelete={handleDelete} />
        )}
      </div>
    </div>
  );
}
