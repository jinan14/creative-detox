import {
  FiUser,
  FiPhone,
  FiMail,
  FiMapPin,
  FiHome,
  FiMessageSquare,
  FiDollarSign,
  FiSmartphone,
} from "react-icons/fi";
import { paymentMethods } from "../utils/customerInfo";

const paymentIcons = {
  cash_on_delivery: FiDollarSign,
  wish_money: FiSmartphone,
};

const inputClass =
  "w-full min-w-0 max-w-full px-4 py-3 rounded-2xl border border-neutral-200 bg-white font-body text-sm text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal transition-all duration-200";

// Single-line fields center the icon vertically; the textarea pins it to the first line.
function Field({ icon: Icon, error, multiline = false, children }) {
  return (
    <div>
      <div className="relative">
        <Icon
          size={15}
          className={`absolute left-3.5 text-neutral-400 pointer-events-none ${
            multiline ? "top-3.5" : "top-1/2 -translate-y-1/2"
          }`}
        />
        {children}
      </div>
      {error && <p className="mt-1 text-xs text-berry font-body">{error}</p>}
    </div>
  );
}

// Controlled fields for delivery/contact info. The parent owns the state and
// the <form>, so this can sit inside the checkout page or the gypsum form.
export default function CustomerInfoForm({ value, errors, onChange }) {
  const handleChange = (e) => onChange(e.target.name, e.target.value);

  return (
    <div className="flex flex-col gap-4">
      <Field icon={FiUser} error={errors.fullName}>
        <input
          name="fullName"
          value={value.fullName}
          onChange={handleChange}
          placeholder="Full Name"
          autoComplete="name"
          className={`${inputClass} pl-10`}
        />
      </Field>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field icon={FiPhone} error={errors.phone}>
          <input
            name="phone"
            type="tel"
            value={value.phone}
            onChange={handleChange}
            placeholder="Phone Number (e.g. +961 70 123 456)"
            autoComplete="tel"
            className={`${inputClass} pl-10`}
          />
        </Field>

        <Field icon={FiMail} error={errors.email}>
          <input
            name="email"
            type="email"
            value={value.email}
            onChange={handleChange}
            placeholder="Email"
            autoComplete="email"
            className={`${inputClass} pl-10`}
          />
        </Field>
      </div>

      <Field icon={FiMapPin} error={errors.city}>
        <input
          name="city"
          value={value.city}
          onChange={handleChange}
          placeholder="City / Area"
          autoComplete="address-level2"
          className={`${inputClass} pl-10`}
        />
      </Field>

      <Field icon={FiHome} error={errors.address}>
        <input
          name="address"
          value={value.address}
          onChange={handleChange}
          placeholder="Full Address (street, building, floor)"
          autoComplete="street-address"
          className={`${inputClass} pl-10`}
        />
      </Field>

      <Field icon={FiMessageSquare} error={errors.notes} multiline>
        <textarea
          name="notes"
          value={value.notes}
          onChange={handleChange}
          placeholder="Delivery notes (optional)"
          rows={3}
          className={`${inputClass} pl-10 resize-none`}
        />
      </Field>

      <fieldset>
        <legend className="font-body text-sm font-medium text-neutral-700 mb-2">
          Payment Method
        </legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {paymentMethods.map((method) => {
            const selected = value.paymentMethod === method.value;
            const Icon = paymentIcons[method.value];
            return (
              <label
                key={method.value}
                className={`cursor-pointer rounded-2xl border p-4 transition-all duration-200 ${
                  selected
                    ? "border-teal bg-white ring-2 ring-teal/30"
                    : "border-neutral-200 bg-white hover:border-teal/40"
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value={method.value}
                  checked={selected}
                  onChange={handleChange}
                  className="sr-only"
                />
                <span className="flex items-center gap-2.5 font-display font-semibold text-neutral-900">
                  <span
                    className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                      selected ? "bg-teal text-white" : "bg-teal/10 text-teal"
                    }`}
                  >
                    <Icon size={15} />
                  </span>
                  {method.label}
                </span>
                <span className="block font-body text-xs text-neutral-500 mt-1">
                  {method.description}
                </span>
              </label>
            );
          })}
        </div>
        {errors.paymentMethod && (
          <p className="mt-1 text-xs text-berry font-body">{errors.paymentMethod}</p>
        )}
      </fieldset>
    </div>
  );
}
