import { FiTrash2 } from "react-icons/fi";
import CustomerCell from "./CustomerCell";
import { shapeLabel, sizeDimensions } from "../../utils/gypsumOptions";

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

export default function GypsumOrdersTable({ orders, onStatusChange, onDelete }) {
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
            <th className="pb-3 pr-4">Piece</th>
            <th className="pb-3 pr-4">Price</th>
            <th className="pb-3 pr-4">Ordered On</th>
            <th className="pb-3 text-right">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-100">
          {orders.map((order) => (
            <tr key={order._id} className="font-body text-sm text-neutral-700 align-top">
              <td className="py-3 pr-4">
                <CustomerCell customer={order.customer} user={order.user} />
              </td>
              <td className="py-3 pr-4 max-w-[160px] text-neutral-700">{order.arabicText}</td>
              <td className="py-3 pr-4 max-w-[200px] text-neutral-500">{order.notes || "—"}</td>
              <td className="py-3 pr-4 text-neutral-500 whitespace-nowrap">
                {order.color ? (
                  // Legacy orders from before shapes/extras existed.
                  <>
                    {order.size} / {order.color}
                  </>
                ) : (
                  <div className="flex flex-col gap-0.5">
                    <span className="text-neutral-900">
                      {shapeLabel(order.shape)} · {order.size}
                    </span>
                    <span className="text-xs">{sizeDimensions(order.shape, order.size)}</span>
                    {(order.goldPaper || order.design) && (
                      <span className="text-xs text-teal">
                        {[order.goldPaper && "Gold paper", order.design && "Design"]
                          .filter(Boolean)
                          .join(" + ")}
                      </span>
                    )}
                  </div>
                )}
              </td>
              <td className="py-3 pr-4 font-semibold text-teal whitespace-nowrap">
                {order.price != null ? `$${order.price}` : "—"}
              </td>
              <td className="py-3 pr-4 text-neutral-500 whitespace-nowrap">
                {formatDate(order.createdAt)}
              </td>
              <td className="py-3">
                <div className="flex items-center justify-end gap-1.5">
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
                  <button
                    onClick={() => onDelete(order)}
                    className="p-2 text-neutral-400 hover:text-berry transition-colors"
                    title="Delete"
                  >
                    <FiTrash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
