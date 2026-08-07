import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { FiUser, FiShoppingBag } from "react-icons/fi";
import logo from "../assets/logo.png";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const links = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Gallery", to: "/gallery" },
  { label: "Gypsum", to: "/gypsum" },
  { label: "Recommend", to: "/recommend" },
  { label: "Contact", to: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState({
    open: false,
    path: "/",
  });
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { count } = useCart();
  const mobileOpen = mobileMenu.path === location.pathname && mobileMenu.open;

  const handleLogout = () => {
    logout();
    closeMobileMenu();
    navigate("/");
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenu((currentMenu) => ({
      path: location.pathname,
      open:
        currentMenu.path === location.pathname
          ? !currentMenu.open
          : true,
    }));
  };

  const closeMobileMenu = () => {
    setMobileMenu({
      path: location.pathname,
      open: false,
    });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/90 backdrop-blur-md shadow-soft py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <img
              src={logo}
              alt="Creative Detox logo"
              className="h-11 w-11 object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <div className="leading-none">
              <span className="font-display font-bold text-teal text-lg">Creative</span>
              <span className="font-display font-bold text-sage text-lg ml-1">Detox</span>
            </div>
          </Link>

          {/* Desktop Links */}
          <ul className="hidden lg:flex items-center gap-7">
            {links.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className={`nav-link ${
                    location.pathname === link.to ? "text-teal" : ""
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3.5 whitespace-nowrap">
            {user ? (
              <>
                {user.role === "admin" && (
                  <Link
                    to="/admin"
                    className="rounded-full bg-berry px-4 py-1.5 font-body text-xs font-semibold text-white shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:bg-berry/90"
                  >
                    Admin
                  </Link>
                )}
                <Link to="/cart" className="relative nav-link" aria-label="Cart">
                  <FiShoppingBag size={17} />
                  {count > 0 && (
                    <span className="absolute -top-2 -right-2.5 flex items-center justify-center w-4 h-4 rounded-full bg-berry text-white text-[10px] font-body font-semibold">
                      {count}
                    </span>
                  )}
                </Link>
                <span
                  title={user.name}
                  className="flex items-center gap-1.5 text-sm text-neutral-700 font-body max-w-[7rem] truncate"
                >
                  <FiUser size={15} className="text-teal shrink-0" />
                  {user.name?.split(" ")[0]}
                </span>
                <button onClick={handleLogout} className="nav-link">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="nav-link">
                  Login
                </Link>
                <Link to="/register" className="nav-link">
                  Register
                </Link>
              </>
            )}
            <Link to="/workshops" className="btn-primary text-xs px-5 py-2.5">
              Book a Workshop
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden text-teal p-2 rounded-xl hover:bg-berry/10 hover:text-berry transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <HiX size={22} /> : <HiMenuAlt3 size={22} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-white flex flex-col pt-24 pb-10 px-8"
          >
            <ul className="flex flex-col gap-6 flex-1">
              {links.map((link, i) => (
                <motion.li
                  key={link.to}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                >
                  <Link
                    to={link.to}
                    onClick={closeMobileMenu}
                    className={`font-display text-3xl font-semibold block ${
                      location.pathname === link.to ? "text-teal" : "text-neutral-800"
                    } hover:text-teal transition-colors`}
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>

            <div className="flex flex-col gap-4 mb-4">
              {user ? (
                <>
                  <span
                    title={user.name}
                    className="flex items-center gap-2 text-neutral-700 font-body truncate"
                  >
                    <FiUser size={16} className="text-teal shrink-0" />
                    {user.name?.split(" ")[0]}
                  </span>
                  <Link
                    to="/cart"
                    onClick={closeMobileMenu}
                    className="flex items-center gap-2 font-body text-neutral-700 hover:text-teal transition-colors"
                  >
                    <FiShoppingBag size={16} />
                    Cart{count > 0 ? ` (${count})` : ""}
                  </Link>
                  {user.role === "admin" && (
                    <Link
                      to="/admin"
                      onClick={closeMobileMenu}
                      className="inline-flex w-fit items-center rounded-full bg-berry px-4 py-2 font-body text-sm font-semibold text-white transition-colors hover:bg-berry/90"
                    >
                      Admin
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="font-body text-neutral-700 hover:text-teal transition-colors text-left"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={closeMobileMenu}
                    className="font-body text-neutral-700 hover:text-teal transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={closeMobileMenu}
                    className="font-body text-neutral-700 hover:text-teal transition-colors"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>

            <Link
              to="/workshops"
              onClick={closeMobileMenu}
              className="btn-primary justify-center mt-8 text-base py-4"
            >
              Book a Workshop
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
