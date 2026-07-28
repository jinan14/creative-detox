import { useEffect, useState } from "react";
import api from "../../api/axios";

const actionClass = {
  create: "bg-sage/10 text-sage-dark",
  update: "bg-teal/10 text-teal",
  delete: "bg-berry/10 text-berry",
  status_change: "bg-teal/10 text-teal",
};

const formatTimestamp = (date) => {
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return "—";
  return parsed.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
};

export default function AdminActivityLog() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api
      .get("/admin/logs")
      .then(({ data }) => setLogs(data))
      .catch(() => setError("Couldn't load activity log."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <h2 className="font-display text-2xl font-bold text-neutral-900">Activity Log</h2>

      <div className="bg-white rounded-3xl p-6 shadow-card">
        {loading && <p className="text-center text-neutral-500 font-body py-10">Loading activity...</p>}
        {!loading && error && <p className="text-center text-berry font-body py-10">{error}</p>}
        {!loading && !error && logs.length === 0 && (
          <p className="text-center text-neutral-500 font-body py-10">No admin activity yet.</p>
        )}
        {!loading && !error && logs.length > 0 && (
          <ul className="flex flex-col divide-y divide-neutral-100">
            {logs.map((log) => (
              <li key={log._id} className="py-3.5 flex items-start justify-between gap-4">
                <div>
                  <p className="font-body text-sm text-neutral-800">{log.description}</p>
                  <p className="font-body text-xs text-neutral-400 mt-0.5">
                    {log.admin?.name || "Admin"} · {formatTimestamp(log.timestamp)}
                  </p>
                </div>
                <span
                  className={`flex-shrink-0 text-xs font-medium px-2.5 py-1 rounded-full whitespace-nowrap ${actionClass[log.action]}`}
                >
                  {log.action.replace("_", " ")}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
