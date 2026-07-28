import { useEffect, useState } from "react";
import api from "../../api/axios";
import GypsumOrdersTable from "../../components/admin/GypsumOrdersTable";

export default function AdminGypsum() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadOrders = () => {
    api
      .get("/gypsum")
      .then(({ data }) => setOrders(data))
      .catch(() => setError("Couldn't load gypsum orders."))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleStatusChange = async (order, status) => {
    const previous = orders;
    setOrders((prev) => prev.map((o) => (o._id === order._id ? { ...o, status } : o)));
    try {
      await api.put(`/gypsum/${order._id}`, { status });
    } catch {
      setOrders(previous);
      setError("Failed to update order status.");
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <h2 className="font-display text-2xl font-bold text-neutral-900">Gypsum Orders</h2>

      <div className="bg-white rounded-3xl p-6 shadow-card">
        {loading && <p className="text-center text-neutral-500 font-body py-10">Loading orders...</p>}
        {!loading && error && <p className="text-center text-berry font-body py-10">{error}</p>}
        {!loading && !error && (
          <GypsumOrdersTable orders={orders} onStatusChange={handleStatusChange} />
        )}
      </div>
    </div>
  );
}
