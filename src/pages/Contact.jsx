import { motion } from "framer-motion";
import { FiInstagram, FiMail, FiMapPin, FiPhone } from "react-icons/fi";

import RegistrationForm from "../components/RegistrationForm";

const contactMethods = [
  {
    icon: FiMail,
    label: "Email",
    value: "creativedetox@gmail.com",
    href: "mailto:creativedetox@gmail.com",
  },
  {
    icon: FiInstagram,
    label: "Instagram",
    value: "@creative.detox.art",
    href: "https://www.instagram.com/creative.detox.art?igsh=MWp6Nno0ZW9heWFjZg%3D%3D&utm_source=qr",
  },
  {
    icon: FiPhone,
    label: "Phone",
    value: "+961 70 000 000",
    href: "tel:+96170000000",
  },
  {
    icon: FiMapPin,
    label: "Location",
    value: "Beirut, Lebanon",
  },
];

export default function Contact() {
  return (
    <main className="overflow-hidden">
      <section className="bg-cream pt-36 pb-24">
        <div className="max-w-5xl mx-auto px-6 text-center">
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
            Start Your Creative Detox
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-lg text-neutral-600 leading-relaxed max-w-3xl mx-auto"
          >
            Questions about workshops, private sessions, or collaborations?
            Send us a note and we will help you find the right creative
            experience.
          </motion.p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="text-berry font-medium mb-4">Contact Details</p>

            <h2 className="text-4xl md:text-5xl font-display font-bold text-teal mb-6">
              We Would Love To Hear From You
            </h2>

            <p className="text-neutral-600 leading-relaxed mb-8">
              Reach out to ask about upcoming workshops, group bookings, kids
              sessions, or creative wellness events.
            </p>

            <div className="grid sm:grid-cols-2 gap-5">
              {contactMethods.map((method) => {
                const Icon = method.icon;
                const content = (
                  <>
                    <div className="w-12 h-12 rounded-2xl bg-teal/10 text-teal flex items-center justify-center mb-4">
                      <Icon size={22} />
                    </div>

                    <p className="text-sm text-berry font-medium mb-1">
                      {method.label}
                    </p>

                    <p className="text-neutral-700 font-medium">
                      {method.value}
                    </p>
                  </>
                );

                return method.href ? (
                  <a
                    key={method.label}
                    href={method.href}
                    target={method.href.startsWith("http") ? "_blank" : undefined}
                    rel={method.href.startsWith("http") ? "noreferrer" : undefined}
                    className="bg-cream rounded-3xl p-6 shadow-soft hover:-translate-y-1 transition-all duration-300"
                  >
                    {content}
                  </a>
                ) : (
                  <div
                    key={method.label}
                    className="bg-cream rounded-3xl p-6 shadow-soft"
                  >
                    {content}
                  </div>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-cream rounded-3xl p-6 md:p-8 shadow-soft"
          >
            <p className="text-berry font-medium mb-3">Register Or Ask</p>

            <h2 className="text-3xl md:text-4xl font-display font-bold text-teal mb-6">
              Send Us Your Details
            </h2>

            <RegistrationForm />
          </motion.div>
        </div>
      </section>
    </main>
  );
}
