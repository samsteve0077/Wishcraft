import { Camera } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function MemoryCounter({ count, max }) {
  const isComplete = count === max;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={count}
        layout
        initial={{
          opacity: 0,
          y: -12,
          scale: 0.9,
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        exit={{
          opacity: 0,
          y: -12,
          scale: 0.9,
        }}
        transition={{
          duration: 0.25,
        }}
        className={`
          flex
          items-center
          gap-3

          px-5
          py-3

          rounded-full

          backdrop-blur-xl

          border

          transition-all
          duration-500

          ${
            isComplete
              ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-300 shadow-[0_0_25px_rgba(34,197,94,.25)]"
              : "bg-fuchsia-500/10 border-fuchsia-500/30 text-fuchsia-300"
          }
        `}
      >
        <Camera size={18} />

        <span className="body-font font-semibold tracking-wide">
          {count} / {max} Photos
        </span>

        {isComplete && (
          <motion.span
            initial={{
              scale: 0,
              rotate: -40,
            }}
            animate={{
              scale: 1,
              rotate: 0,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
            }}
          >
            🎉
          </motion.span>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

export default MemoryCounter;