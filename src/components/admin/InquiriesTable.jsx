import { FiTrash2 } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { topicInfo, isBookingTopic } from "../../utils/inquiryTopics";

const statusOptions = [
  { value: "new", label: "New" },
  { value: "replied", label: "Replied" },
  { value: "closed", label: "Closed" },
];

const statusClass = {
  new: "bg-berry/10 text-berry",
  replied: "bg-teal/10 text-teal",
  closed: "bg-neutral-100 text-neutral-500",
};

const formatDate = (date) => {
  if (!date) return "—";
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return date;
  return parsed.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
};

// wa.me needs international digits; local Lebanese numbers (e.g. 70 123 456) get 961.
const whatsappLink = (phone) => {
  let digits = phone.replace(/\D/g, "");
  if (digits.startsWith("00")) digits = digits.slice(2);
  else if (digits.startsWith("0")) digits = `961${digits.slice(1)}`;
  else if (digits.length <= 8) digits = `961${digits}`;
  return `https://wa.me/${digits}`;
};

export default function InquiriesTable({ inquiries, onStatusChange, onDelete }) {
  if (inquiries.length === 0) {
    return <p className="text-center text-neutral-500 font-body py-10">No messages here.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="text-xs font-body font-semibold text-neutral-400 uppercase tracking-wide">
            <th className="pb-3 pr-4">From</th>
            <th className="pb-3 pr-4">Topic</th>
            <th className="pb-3 pr-4">Message</th>
            <th className="pb-3 pr-4">Received</th>
            <th className="pb-3 text-right">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-100">
          {inquiries.map((inquiry) => {
            const topic = topicInfo(inquiry.topic);
            return (
              <tr key={inquiry._id} className="font-body text-sm text-neutral-700 align-top">
                <td className="py-3 pr-4 min-w-[170px]">
                  <span className="block font-medium text-neutral-900">{inquiry.name}</span>
                  <a href={`tel:${inquiry.phone}`} className="block text-xs text-teal hover:text-berry">
                    {inquiry.phone}
                  </a>
                  {inquiry.email && <span className="block text-xs text-neutral-400">{inquiry.email}</span>}
                </td>
                <td className="py-3 pr-4 min-w-[170px]">
                  <span className="text-neutral-900">
                    {topic?.emoji} {topic?.label || inquiry.topic}
                  </span>
                  {isBookingTopic(inquiry.topic) && (inquiry.preferredDate || inquiry.groupSize) && (
                    <span className="block text-xs text-neutral-500 mt-0.5">
                      {[inquiry.preferredDate && formatDate(inquiry.preferredDate), inquiry.groupSize && `${inquiry.groupSize} people`]
                        .filter(Boolean)
                        .join(" · ")}
                    </span>
                  )}
                </td>
                <td className="py-3 pr-4 max-w-[280px] text-neutral-500 whitespace-pre-line break-words">
                  {inquiry.message || "—"}
                </td>
                <td className="py-3 pr-4 text-neutral-500 whitespace-nowrap">{formatDate(inquiry.createdAt)}</td>
                <td className="py-3">
                  <div className="flex items-center justify-end gap-1.5">
                    <select
                      value={inquiry.status}
                      onChange={(e) => onStatusChange(inquiry, e.target.value)}
                      className={`text-xs font-medium px-2.5 py-1.5 rounded-full border-none focus:outline-none focus:ring-2 focus:ring-teal/30 ${statusClass[inquiry.status]}`}
                    >
                      {statusOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <a
                      href={whatsappLink(inquiry.phone)}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 text-neutral-400 hover:text-teal transition-colors"
                      title="Reply on WhatsApp"
                    >
                      <FaWhatsapp size={17} />
                    </a>
                    <button
                      onClick={() => onDelete(inquiry)}
                      className="p-2 text-neutral-400 hover:text-berry transition-colors"
                      title="Delete"
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
