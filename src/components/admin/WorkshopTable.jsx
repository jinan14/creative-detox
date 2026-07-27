import { FiEdit2, FiTrash2 } from "react-icons/fi";

const formatDate = (date) => {
  if (!date) return "—";
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return date;
  return parsed.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
};

export default function WorkshopTable({ workshops, onEdit, onDelete }) {
  if (workshops.length === 0) {
    return (
      <p className="text-center text-neutral-500 font-body py-10">
        No workshops yet — add your first one above.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="text-xs font-body font-semibold text-neutral-400 uppercase tracking-wide">
            <th className="pb-3 pr-4">Workshop</th>
            <th className="pb-3 pr-4">Date</th>
            <th className="pb-3 pr-4">Location</th>
            <th className="pb-3 pr-4">Seats</th>
            <th className="pb-3 pr-4">Price</th>
            <th className="pb-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-100">
          {workshops.map((workshop) => (
            <tr key={workshop._id} className="font-body text-sm text-neutral-700">
              <td className="py-3 pr-4">
                <div className="flex items-center gap-3">
                  {workshop.image ? (
                    <img
                      src={workshop.image}
                      alt={workshop.title}
                      className="w-12 h-12 rounded-xl object-cover flex-shrink-0"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-xl bg-neutral-100 flex-shrink-0" />
                  )}
                  <span className="font-medium text-neutral-900 line-clamp-1">{workshop.title}</span>
                </div>
              </td>
              <td className="py-3 pr-4 text-neutral-500 whitespace-nowrap">
                {formatDate(workshop.date)}
                <div className="text-xs text-neutral-400">{workshop.time}</div>
              </td>
              <td className="py-3 pr-4 text-neutral-500">{workshop.location}</td>
              <td className="py-3 pr-4">
                <span
                  className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                    workshop.seatsRemaining <= 5 ? "bg-berry/10 text-berry" : "bg-sage/10 text-sage-dark"
                  }`}
                >
                  {workshop.seatsRemaining}/{workshop.capacity}
                </span>
              </td>
              <td className="py-3 pr-4 font-semibold text-teal">${workshop.price || 0}</td>
              <td className="py-3">
                <div className="flex items-center justify-end gap-1.5">
                  <button
                    onClick={() => onEdit(workshop)}
                    className="p-2 text-neutral-400 hover:text-teal transition-colors"
                    title="Edit"
                  >
                    <FiEdit2 size={16} />
                  </button>
                  <button
                    onClick={() => onDelete(workshop)}
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
