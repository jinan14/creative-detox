import { NavLink } from "react-router-dom";
import { FiGrid, FiImage, FiCalendar } from "react-icons/fi";

const links = [
  { label: "Overview", to: "/admin", end: true, icon: FiGrid },
  { label: "Artworks", to: "/admin/artworks", icon: FiImage },
  { label: "Workshops", to: "/admin/workshops", icon: FiCalendar },
];

export default function AdminSidebar() {
  return (
    <aside className="w-full md:w-60 flex-shrink-0">
      <nav className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-2 md:pb-0">
        {links.map(({ label, to, end, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-2xl font-body text-sm font-medium whitespace-nowrap transition-colors ${
                isActive
                  ? "bg-teal text-white shadow-soft"
                  : "text-neutral-600 hover:bg-teal/10 hover:text-teal"
              }`
            }
          >
            <Icon size={16} />
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
