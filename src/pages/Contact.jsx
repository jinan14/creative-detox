import { motion } from "framer-motion";
import { FiInstagram, FiMail, FiMapPin } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

import InquiryForm from "../components/InquiryForm";
import FAQ from "../components/FAQ";
import WatercolorBackground from "../components/home/WatercolorBackground";
import BrushUnderline from "../components/home/BrushUnderline";
import { buildWhatsAppUrl } from "../utils/whatsapp";
import { WISH_MONEY_NUMBER } from "../utils/customerInfo";

const INSTAGRAM_URL =
  "https://www.instagram.com/creative.detox.art?igsh=MWp6Nno0ZW9heWFjZg%3D%3D&utm_source=qr";
const EMAIL = "creativedetox@gmail.com";

const quickActions = [
  {
    icon: FaWhatsapp,
    label: "Chat on WhatsApp",
    href: buildWhatsAppUrl("Hello Creative Detox! 👋"),
    className: "bg-teal text-white hover:bg-berry",
  },
  {
    icon: FiInstagram,
    label: "Instagram",
    href: INSTAGRAM_URL,
    className: "bg-white text-berry border border-berry/20 hover:bg-berry hover:text-white",
  },
  {
    icon: FiMail,
    label: "Email Us",
    href: `mailto:${EMAIL}`,
    className: "bg-white text-teal border border-teal/20 hover:bg-teal hover:text-white",
  },
];

const contactMethods = [
  {
    icon: FaWhatsapp,
    label: "WhatsApp",
    value: WISH_MONEY_NUMBER,
    href: buildWhatsAppUrl(),
    color: "var(--color-teal)",
    tilt: -2,
  },
  {
    icon: FiInstagram,
    label: "Instagram",
    value: "@creative.detox.art",
    href: INSTAGRAM_URL,
    color: "var(--color-berry)",
    tilt: 1.5,
  },
  {
    icon: FiMail,
    label: "Email",
    value: EMAIL,
    href: `mailto:${EMAIL}`,
    color: "var(--color-sage)",
    tilt: 1,
  },
  {
    icon: FiMapPin,
    label: "Location",
    value: "Beirut, Lebanon",
    color: "var(--color-rose-muted)",
    tilt: -1.5,
  },
];

const BLOB =
  "M42,-55C54,-45,63,-31,67,-15C71,1,70,18,62,32C54,46,39,57,22,63C5,69,-14,70,-30,63C-46,56,-59,41,-65,24C-71,7,-70,-12,-62,-27C-54,-42,-39,-53,-23,-61C-7,-69,10,-74,24,-70C38,-66,30,-65,42,-55Z";

function ContactSwatch({ method, index }) {
  const Icon = method.icon;
  const external = method.href?.startsWith("http");
  const Tag = method.href ? "a" : "div";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotate: method.tilt * 3 }}
      whileInView={{ opacity: 1, y: 0, rotate: method.tilt }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ rotate: 0, y: -6 }}
    >
      <Tag
        {...(method.href
          ? { href: method.href, target: external ? "_blank" : undefined, rel: external ? "noreferrer" : undefined }
          : {})}
        className="relative block bg-white rounded-3xl p-5 shadow-soft overflow-hidden h-full"
      >
        {/* Paint stripe along the top, like a colour swatch */}
        <span aria-hidden className="absolute inset-x-0 top-0 h-2" style={{ background: method.color }} />
        <span className="relative w-14 h-14 mb-4 flex items-center justify-center">
          <svg viewBox="-80 -80 160 160" className="absolute inset-0 w-full h-full" aria-hidden>
            <path d={BLOB} fill={method.color} opacity="0.2" />
          </svg>
          <Icon size={22} className="relative" style={{ color: method.color }} />
        </span>
        <span className="block font-hand text-xl leading-none mb-1" style={{ color: method.color }}>
          {method.label}
        </span>
        <span className="block text-sm text-neutral-800 font-medium [overflow-wrap:anywhere]">{method.value}</span>
      </Tag>
    </motion.div>
  );
}

export default function Contact() {
  return (
    <main className="overflow-hidden">
      <section className="relative overflow-hidden bg-cream pt-36 pb-24">
        <WatercolorBackground intensity={0.35} />
        <div className="relative max-w-5xl mx-auto px-6 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-berry font-medium mb-4"
          >
            Get In Touch
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-6xl font-display font-bold text-teal mb-6"
          >
            Start Your Creative <BrushUnderline>Detox</BrushUnderline>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-lg text-neutral-600 leading-relaxed max-w-2xl mx-auto mb-10"
          >
            Private sessions, group bookings, kids parties, or just a question —
            we'd love to hear from you.
          </motion.p>

          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            {quickActions.map((action, i) => {
              const Icon = action.icon;
              const external = action.href.startsWith("http");
              return (
                <motion.a
                  key={action.label}
                  href={action.href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noreferrer" : undefined}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                  className={`inline-flex items-center gap-2.5 rounded-full px-6 py-3.5 font-body font-semibold text-sm shadow-soft transition-all duration-300 hover:-translate-y-1 ${action.className}`}
                >
                  <Icon size={18} />
                  {action.label}
                </motion.a>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-5 gap-16 items-start">
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <p className="text-berry font-medium mb-4">Contact Details</p>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-teal mb-6">
                Let's Create <BrushUnderline>Together</BrushUnderline>
              </h2>
              <p className="text-neutral-600 leading-relaxed mb-10">
                Tell us what you have in mind and we'll plan the details with you
                on WhatsApp.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-5">
              {contactMethods.map((method, i) => (
                <ContactSwatch key={method.label} method={method} index={i} />
              ))}
            </div>

            <p className="hidden lg:flex items-center gap-2 font-hand text-2xl text-sage mt-10 -rotate-2">
              we usually reply within a day
              <svg viewBox="0 0 80 30" className="w-16 h-6" aria-hidden>
                <path
                  d="M2 20 C 20 4, 45 4, 72 16 M62 8 L73 16 L61 22"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <InquiryForm />
          </motion.div>
        </div>
      </section>

      <FAQ />
    </main>
  );
}
