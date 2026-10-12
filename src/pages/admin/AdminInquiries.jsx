import { useEffect, useState } from "react";
import api from "../../api/axios";
import InquiriesTable from "../../components/admin/InquiriesTable";

const filters = [
  { value: "", label: "All" },
  { value: "new", label: "New" },
  { value: "replied", label: "Replied" },
  { value: "closed", label: "Closed" },
];

export default function AdminInquiries() {
  const [inquiries, setInquiries] = useState([]);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api
      .get("/inquiries")
      .then(({ data }) => setInquiries(data))
      .catch(() => setError("Couldn't load messages."))
      .finally(() => setLoading(false));
  }, []);

  const handleStatusChange = async (inquiry, status) => {
    const previous = inquiries;
    setInquiries((prev) => prev.map((i) => (i._id === inquiry._id ? { ...i, status } : i)));
    try {
      await api.put(`/inquiries/${inquiry._id}`, { status });
    } catch {
      setInquiries(previous);
      setError("Failed to update message status.");
    }
  };

  const handleDelete = async (inquiry) => {
    if (!window.confirm(`Delete the message from ${inquiry.name}? This can't be undone.`)) return;
    try {
      await api.delete(`/inquiries/${inquiry._id}`);
      setInquiries((prev) => prev.filter((i) => i._id !== inquiry._id));
    } catch {
      setError("Failed to delete message.");
    }
  };

  const visible = filter ? inquiries.filter((i) => i.status === filter) : inquiries;
  const countFor = (value) => (value ? inquiries.filter((i) => i.status === value).length : inquiries.length);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="font-display text-2xl font-bold text-neutral-900">Messages</h2>
        <div className="flex gap-2 overflow-x-auto">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`px-4 py-2 rounded-full font-body text-sm font-medium whitespace-nowrap transition-colors ${
                filter === f.value ? "bg-teal text-white" : "bg-white text-neutral-600 hover:bg-teal/10 hover:text-teal"
              }`}
            >
              {f.label} <span className="opacity-70">({countFor(f.value)})</span>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 shadow-card">
        {loading && <p className="text-center text-neutral-500 font-body py-10">Loading messages...</p>}
        {!loading && error && <p className="text-center text-berry font-body py-10">{error}</p>}
        {!loading && !error && (
          <InquiriesTable inquiries={visible} onStatusChange={handleStatusChange} onDelete={handleDelete} />
        )}
      </div>
    </div>
  );
}
