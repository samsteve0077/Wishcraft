import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

function MemoryLoading() {
  return (
    <div className="flex flex-col items-center justify-center py-28">

      {/* Animated Circle */}

      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          w-24
          h-24

          rounded-full

          bg-gradient-to-br
          from-fuchsia-500
          via-purple-500
          to-violet-500

          flex
          items-center
          justify-center

          shadow-[0_0_50px_rgba(168,85,247,.45)]
        "
      >
        <Sparkles
          size={42}
          className="text-white"
        />
      </motion.div>

      {/* Title */}

      <motion.h2
        initial={{
          opacity: 0,
          y: 15,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 0.2,
        }}
        className="
          heading-font
          mt-10
          text-4xl
          font-bold
          bg-gradient-to-r
          from-fuchsia-300
          via-white
          to-violet-300
          bg-clip-text
          text-transparent
        "
      >
        Crafting Your Memory Wall...
      </motion.h2>

      {/* Subtitle */}

      <motion.p
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          delay: 0.4,
        }}
        className="
          body-font
          mt-5
          text-lg
          text-slate-400
          text-center
          max-w-xl
        "
      >
        Please wait while we arrange your beautiful memories.
      </motion.p>

      {/* Loading Dots */}

      <div className="flex gap-3 mt-10">

        {[0, 1, 2].map((i) => (

          <motion.div
            key={i}
            animate={{
              y: [0, -12, 0],
              opacity: [0.4, 1, 0.4],
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              delay: i * 0.2,
            }}
            className="
              w-3
              h-3
              rounded-full
              bg-fuchsia-400
            "
          />

        ))}

      </div>

    </div>
  );
}

export default MemoryLoading;