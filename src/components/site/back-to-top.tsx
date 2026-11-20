"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp } from "lucide-react";

export function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          key="btt"
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          whileHover={{ y: -4 }}
          whileTap={{ scale: 0.9 }}
          className="fixed bottom-5 right-5 z-50 grid h-12 w-12 place-items-center rounded-full bg-[var(--gv-forest)] text-[var(--gv-lime)] shadow-[0_14px_30px_-8px_rgba(14,42,31,0.6)] sm:bottom-7 sm:right-7"
        >
          <ArrowUp className="h-5 w-5" />
          <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[var(--gv-lime)]/30" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
