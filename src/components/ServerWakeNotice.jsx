import { AnimatePresence, motion } from "framer-motion";
import useSlowLoading from "../hooks/useSlowLoading";

// Shown under a loading state that's taking unusually long — almost always
// the Render backend waking from free-tier sleep.
export default function ServerWakeNotice({ loading }) {
  const slow = useSlowLoading(loading);

  return (
    <AnimatePresence>
      {slow && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          role="status"
          className="text-center text-sm text-berry font-body mt-8"
        >
          Waking up our server — this can take up to a minute on first visit.
        </motion.p>
      )}
    </AnimatePresence>
  );
}
