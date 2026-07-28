import { useEffect, useState } from "react";
import api from "../../api/axios";
import RegistrationsTable from "../../components/admin/RegistrationsTable";

const selectClass =
  "w-full sm:w-64 px-4 py-2.5 rounded-2xl border border-neutral-200 bg-white font-body text-sm text-neutral-800 focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal transition-all duration-200";

export default function AdminRegistrations() {
  const [registrations, setRegistrations] = useState([]);
  const [workshops, setWorkshops] = useState([]);
  const [workshopFilter, setWorkshopFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api
      .get("/workshops")
      .then(({ data }) => setWorkshops(data))
      .catch(() => {});
  }, []);

  useEffect(() => {
    api
      .get("/registrations", { params: workshopFilter ? { workshop: workshopFilter } : {} })
      .then(({ data }) => {
        setRegistrations(data);
        setError(null);
      })
      .catch(() => setError("Couldn't load registrations."))
      .finally(() => setLoading(false));
  }, [workshopFilter]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="font-display text-2xl font-bold text-neutral-900">Registrations</h2>
        <select
          value={workshopFilter}
          onChange={(e) => setWorkshopFilter(e.target.value)}
          className={selectClass}
        >
          <option value="">All workshops</option>
          {workshops.map((workshop) => (
            <option key={workshop._id} value={workshop._id}>
              {workshop.title}
            </option>
          ))}
        </select>
      </div>

      <div className="bg-white rounded-3xl p-6 shadow-card">
        {loading && <p className="text-center text-neutral-500 font-body py-10">Loading registrations...</p>}
        {!loading && error && <p className="text-center text-berry font-body py-10">{error}</p>}
        {!loading && !error && <RegistrationsTable registrations={registrations} />}
      </div>
    </div>
  );
}
