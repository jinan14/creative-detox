import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiPlus } from "react-icons/hi";
import WatercolorBackground from "./home/WatercolorBackground";
import BrushUnderline from "./home/BrushUnderline";
import { WISH_MONEY_NUMBER } from "../utils/customerInfo";

const faqData = [
  {
    question: "Who can join the workshops?",
    answer:
      "Our workshops are open to everyone, including beginners, kids, teens, and adults who want to explore creativity and relaxation through art.",
  },
  {
    question: "Do I need previous art experience?",
    answer:
      "Not at all. Creative Detox workshops are designed for all skill levels, including complete beginners.",
  },
  {
    question: "Are art materials included?",
    answer:
      "Yes, all essential art materials are provided during the workshops unless stated otherwise.",
  },
  {
    question: "How do workshop registrations work?",
    answer:
      "Open any workshop on the Workshops page and register with your account. We'll reach out with the confirmation details.",
  },
  {
    question: "Can I book a private or group session?",
    answer:
      "Yes! Choose “Private art session”, “Group or corporate booking”, or “Kids session or birthday party” in the form above, add your preferred date, and we'll plan it with you on WhatsApp.",
  },
  {
    question: "How do I pay for artworks and gypsum pieces?",
    answer: `You can pay cash on delivery, or by Wish Money to ${WISH_MONEY_NUMBER}. You choose when you complete your order.`,
  },
  {
    question: "Are kids workshops available?",
    answer:
      "Yes, we regularly organize creative sessions and collage workshops specially designed for kids.",
  },
];

const colors = ["var(--color-teal)", "var(--color-berry)", "var(--color-sage)", "var(--color-rose-muted)"];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <section className="relative py-24 bg-cream overflow-hidden">
      <WatercolorBackground intensity={0.2} />

      <div className="relative max-w-4xl mx-auto px-6">
        <div className="text-center mb-14">
          <p className="text-berry font-medium mb-3">FAQ</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-teal mb-4">
            Questions? We've Got <BrushUnderline>Answers</BrushUnderline>
          </h2>
          <p className="text-neutral-600 max-w-2xl mx-auto leading-relaxed">
            Everything you need to know about workshops, orders, and creative experiences.
          </p>
        </div>

        <div className="space-y-4">
          {faqData.map((faq, index) => {
            const isOpen = activeIndex === index;
            const color = colors[index % colors.length];

            return (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className={`relative bg-white rounded-3xl overflow-hidden transition-shadow duration-300 ${
                  isOpen ? "shadow-card" : "shadow-soft"
                }`}
              >
                {/* Paint bar that grows on the open question */}
                <motion.span
                  aria-hidden
                  className="absolute left-0 top-0 bottom-0 w-1.5 origin-top"
                  style={{ background: color }}
                  animate={{ scaleY: isOpen ? 1 : 0 }}
                  transition={{ duration: 0.4 }}
                />

                <button
                  onClick={() => setActiveIndex(isOpen ? null : index)}
                  className="w-full flex items-center gap-4 text-left p-5 md:p-6 group"
                  aria-expanded={isOpen}
                >
                  <span className="font-hand text-3xl leading-none w-9 shrink-0" style={{ color }}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1 text-lg md:text-xl font-display font-semibold text-neutral-800">
                    {faq.question}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-10 h-10 shrink-0 rounded-full flex items-center justify-center transition-colors"
                    style={{
                      background: isOpen ? color : "var(--color-cream)",
                      color: isOpen ? "white" : color,
                    }}
                  >
                    <HiPlus size={20} />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="px-5 md:px-6 pb-6 pl-[4.25rem] md:pl-[4.75rem] text-neutral-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
