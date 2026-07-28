const statusOptions = [
  { value: "pending", label: "Pending" },
  { value: "in_production", label: "In Production" },
  { value: "completed", label: "Completed" },
];

const statusClass = {
  pending: "bg-berry/10 text-berry",
  in_production: "bg-teal/10 text-teal",
  completed: "bg-sage/10 text-sage-dark",
};

const formatDate = (date) => {
  if (!date) return "—";
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return "—";
  return parsed.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
};

export default function GypsumOrdersTable({ orders, onStatusChange }) {
  if (orders.length === 0) {
    return (
      <p className="text-center text-neutral-500 font-body py-10">
        No gypsum orders yet.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="text-xs font-body font-semibold text-neutral-400 uppercase tracking-wide">
            <th className="pb-3 pr-4">Customer</th>
            <th className="pb-3 pr-4">Arabic Text</th>
            <th className="pb-3 pr-4">Notes</th>
            <th className="pb-3 pr-4">Size / Color</th>
            <th className="pb-3 pr-4">Ordered On</th>
            <th className="pb-3 text-right">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-100">
          {orders.map((order) => (
            <tr key={order._id} className="font-body text-sm text-neutral-700 align-top">
              <td className="py-3 pr-4">
                <span className="font-medium text-neutral-900">{order.user?.name || "—"}</span>
                <div className="text-xs text-neutral-400">{order.user?.email}</div>
              </td>
              <td className="py-3 pr-4 max-w-[160px] text-neutral-700">{order.arabicText}</td>
              <td className="py-3 pr-4 max-w-[200px] text-neutral-500">{order.notes || "—"}</td>
              <td className="py-3 pr-4 text-neutral-500 whitespace-nowrap">
                {order.size} / {order.color}
              </td>
              <td className="py-3 pr-4 text-neutral-500 whitespace-nowrap">
                {formatDate(order.createdAt)}
              </td>
              <td className="py-3">
                <div className="flex justify-end">
                  <select
                    value={order.status}
                    onChange={(e) => onStatusChange(order, e.target.value)}
                    className={`text-xs font-medium px-2.5 py-1.5 rounded-full border-none focus:outline-none focus:ring-2 focus:ring-teal/30 ${statusClass[order.status]}`}
                  >
                    {statusOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
