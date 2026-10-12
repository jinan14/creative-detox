import CustomerCell from "./CustomerCell";
import { orderReference } from "../../utils/whatsapp";

const statusOptions = [
  { value: "pending", label: "Pending" },
  { value: "confirmed", label: "Confirmed" },
  { value: "delivered", label: "Delivered" },
  { value: "cancelled", label: "Cancelled" },
];

const statusClass = {
  pending: "bg-berry/10 text-berry",
  confirmed: "bg-teal/10 text-teal",
  delivered: "bg-sage/10 text-sage",
  cancelled: "bg-neutral-100 text-neutral-500",
};

const formatDate = (date) => {
  if (!date) return "—";
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return "—";
  return parsed.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
};

export default function OrdersTable({ orders, onStatusChange }) {
  if (orders.length === 0) {
    return (
      <p className="text-center text-neutral-500 font-body py-10">
        No artwork orders yet.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="text-xs font-body font-semibold text-neutral-400 uppercase tracking-wide">
            <th className="pb-3 pr-4">Order</th>
            <th className="pb-3 pr-4">Customer</th>
            <th className="pb-3 pr-4">Artworks</th>
            <th className="pb-3 pr-4">Total</th>
            <th className="pb-3 pr-4">Ordered On</th>
            <th className="pb-3 text-right">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-100">
          {orders.map((order) => (
            <tr key={order._id} className="font-body text-sm text-neutral-700 align-top">
              <td className="py-3 pr-4 font-medium text-neutral-900 whitespace-nowrap">
                {orderReference("CD", order._id)}
              </td>
              <td className="py-3 pr-4">
                <CustomerCell customer={order.customer} user={order.user} />
              </td>
              <td className="py-3 pr-4 min-w-[180px]">
                <ul className="flex flex-col gap-1">
                  {order.items.map((item, i) =>
                    item ? (
                      <li key={item._id}>
                        <span className="text-neutral-900">{item.title}</span>
                        <span className="text-xs text-neutral-400"> · ${item.price}</span>
                      </li>
                    ) : (
                      <li key={i} className="text-xs text-neutral-400 italic">
                        Deleted artwork
                      </li>
                    )
                  )}
                </ul>
              </td>
              <td className="py-3 pr-4 font-semibold text-teal whitespace-nowrap">${order.total}</td>
              <td className="py-3 pr-4 text-neutral-500 whitespace-nowrap">
                {formatDate(order.placedAt)}
              </td>
              <td className="py-3">
                <div className="flex justify-end">
                  <select
                    value={order.status || "pending"}
                    onChange={(e) => onStatusChange(order, e.target.value)}
                    className={`text-xs font-medium px-2.5 py-1.5 rounded-full border-none focus:outline-none focus:ring-2 focus:ring-teal/30 ${statusClass[order.status || "pending"]}`}
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
