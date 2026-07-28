const formatDate = (date) => {
  if (!date) return "—";
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return "—";
  return parsed.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
};

export default function RegistrationsTable({ registrations }) {
  if (registrations.length === 0) {
    return (
      <p className="text-center text-neutral-500 font-body py-10">
        No registrations found.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="text-xs font-body font-semibold text-neutral-400 uppercase tracking-wide">
            <th className="pb-3 pr-4">Participant</th>
            <th className="pb-3 pr-4">Email</th>
            <th className="pb-3 pr-4">Workshop</th>
            <th className="pb-3">Registered On</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-100">
          {registrations.map((registration) => (
            <tr key={registration._id} className="font-body text-sm text-neutral-700">
              <td className="py-3 pr-4 font-medium text-neutral-900">
                {registration.user?.name || "—"}
              </td>
              <td className="py-3 pr-4 text-neutral-500">{registration.user?.email || "—"}</td>
              <td className="py-3 pr-4 text-neutral-500">{registration.workshop?.title || "—"}</td>
              <td className="py-3 text-neutral-500 whitespace-nowrap">
                {formatDate(registration.registeredAt)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
