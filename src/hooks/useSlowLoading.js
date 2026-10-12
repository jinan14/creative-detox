import { useEffect, useState } from "react";

/**
 * True once `loading` has stayed true for longer than `delay` ms. Used to
 * explain Render free-tier cold starts (~30-60s) instead of leaving visitors
 * staring at a spinner that looks broken.
 */
export default function useSlowLoading(loading, delay = 4000) {
  const [slow, setSlow] = useState(false);

  useEffect(() => {
    if (!loading) return;
    const timer = setTimeout(() => setSlow(true), delay);
    return () => clearTimeout(timer);
  }, [loading, delay]);

  return loading && slow;
}
