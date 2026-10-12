import { paymentLabel } from "../../utils/customerInfo";

// Delivery details captured at checkout. Orders placed before checkout
// collected these only have the account's name/email, so fall back to that.
export default function CustomerCell({ customer, user }) {
  if (!customer) {
    return (
      <>
        <span className="font-medium text-neutral-900">{user?.name || "—"}</span>
        <div className="text-xs text-neutral-400">{user?.email}</div>
      </>
    );
  }

  return (
    <div className="flex flex-col gap-0.5 min-w-[180px]">
      <span className="font-medium text-neutral-900">{customer.fullName}</span>
      <a href={`tel:${customer.phone}`} className="text-xs text-teal hover:text-berry">
        {customer.phone}
      </a>
      <span className="text-xs text-neutral-400">{customer.email}</span>
      <span className="text-xs text-neutral-500">
        {customer.address}, {customer.city}
      </span>
      {customer.notes && (
        <span className="text-xs text-neutral-400 italic">“{customer.notes}”</span>
      )}
      <span className="mt-1 self-start text-[11px] font-medium px-2 py-0.5 rounded-full bg-cream text-neutral-600">
        {paymentLabel(customer.paymentMethod)}
      </span>
    </div>
  );
}
