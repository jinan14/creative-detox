import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiPlus, HiMinus } from "react-icons/hi";

const faqData = [
  {
    question: "Who can join the workshops?",
    answer:
      "Our workshops are open to everyone, including beginners, kids, teens, and adults who want to explore creativity and relaxation through art.",
  },
  {
    question: "Are art materials included?",
    answer:
      "Yes, all essential art materials are provided during the workshops unless stated otherwise.",
  },
  {
    question: "Do I need previous art experience?",
    answer:
      "Not at all. Creative Detox workshops are designed for all skill levels, including complete beginners.",
  },
  {
    question: "How do workshop registrations work?",
    answer:
      "You can register through the website by filling out the workshop registration form. We will contact you with confirmation details.",
  },
  {
    question: "Are kids workshops available?",
    answer:
      "Yes, we regularly organize creative sessions and collage workshops specially designed for kids.",
  },
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-cream">
      <div className="max-w-4xl mx-auto px-6">
        {/* Section Heading */}
        <div className="text-center mb-14">
          <p className="text-berry font-medium mb-3">FAQ</p>

          <h2 className="text-4xl md:text-5xl font-display font-bold text-teal mb-4">
            Frequently Asked Questions
          </h2>

          <p className="text-neutral-600 max-w-2xl mx-auto leading-relaxed">
            Everything you need to know about Creative Detox workshops,
            registration, and creative experiences.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-5">
          {faqData.map((faq, index) => {
            const isOpen = activeIndex === index;

            return (
              <motion.div
                key={index}
                layout
                className="bg-white rounded-3xl shadow-soft overflow-hidden"
              >
                {/* Question */}
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between text-left p-6 md:p-7 group"
                  aria-expanded={isOpen}
                >
                  <span className="text-lg md:text-xl font-semibold text-neutral-800 pr-4">
                    {faq.question}
                  </span>

                  <div className="text-teal group-hover:text-berry transition-colors flex-shrink-0">
                    {isOpen ? <HiMinus size={24} /> : <HiPlus size={24} />}
                  </div>
                </button>

                {/* Answer */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 md:px-7 pb-6">
                        <p className="text-neutral-600 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
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
