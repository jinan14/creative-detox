import { useEffect } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { FiCheck, FiMessageCircle } from "react-icons/fi";
import { WISH_MONEY_NUMBER } from "../utils/customerInfo";

// Landing page after an artwork or gypsum order is saved. It redirects to
// WhatsApp on arrival; the state lives in history, so pressing Back from
// WhatsApp returns here with the "Open WhatsApp again" button still working.
export default function OrderPlaced() {
  const { state } = useLocation();

  useEffect(() => {
    if (!state?.whatsappUrl || state.redirected) return;
    // Mark as redirected so returning via Back doesn't bounce the user to WhatsApp again.
    window.history.replaceState(
      { ...window.history.state, usr: { ...state, redirected: true } },
      ""
    );
    const timer = setTimeout(() => {
      window.location.href = state.whatsappUrl;
    }, 600);
    return () => clearTimeout(timer);
  }, [state]);

  if (!state?.whatsappUrl) return <Navigate to="/" replace />;

  const isGypsum = state.kind === "gypsum";

  return (
    <main className="overflow-hidden">
      <section className="bg-cream pt-36 pb-24 min-h-screen">
        <div className="max-w-xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="bg-white rounded-3xl p-8 md:p-10 shadow-card text-center"
          >
            <div className="mx-auto mb-5 w-16 h-16 rounded-full bg-teal/10 flex items-center justify-center">
              <FiCheck size={28} className="text-teal" />
            </div>
            <p className="text-berry font-medium mb-2">Order {state.reference}</p>
            <h1 className="font-display text-3xl font-bold text-teal mb-3">
              One last step!
            </h1>
            <p className="font-body text-sm text-neutral-600 leading-relaxed mb-6">
              We're opening WhatsApp with your order details ready. Just press{" "}
              <span className="font-semibold">send</span> so we can start preparing your{" "}
              {isGypsum ? "custom gypsum piece" : "artwork"}. Your order is confirmed once
              we receive your message.
            </p>

            {state.paymentMethod === "wish_money" && (
              <div className="bg-cream/60 rounded-2xl p-4 mb-6 text-left">
                <p className="font-display font-semibold text-neutral-900 mb-1">
                  Paying with Wish Money
                </p>
                <p className="font-body text-sm text-neutral-600">
                  Please transfer ${state.total} to {WISH_MONEY_NUMBER} via Wish Money.
                </p>
              </div>
            )}

            <div className="flex flex-col gap-3">
              <a
                href={state.whatsappUrl}
                className="btn-primary justify-center w-full py-4 text-sm"
              >
                <FiMessageCircle size={16} />
                Open WhatsApp Again
              </a>
              <Link
                to={isGypsum ? "/gypsum" : "/gallery"}
                className="btn-secondary justify-center w-full py-3 text-sm"
              >
                {isGypsum ? "Back to Gypsum" : "Continue Browsing"}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
