import { motion } from "framer-motion";

function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-[#0B0B0F] flex flex-col items-center justify-center text-white"
    >
      <motion.h1
        animate={{
          scale: [1, 1.08, 1],
        }}
        transition={{
          repeat: Infinity,
          duration: 1.2,
        }}
        className="text-6xl font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 bg-clip-text text-transparent"
      >
        WishCraft
      </motion.h1>

      <p className="mt-6 text-gray-400 text-xl">
        Preparing your surprise...
      </p>

      <motion.div
        animate={{
          rotate: 360,
        }}
        transition={{
          repeat: Infinity,
          duration: 1,
          ease: "linear",
        }}
        className="mt-10 w-12 h-12 rounded-full border-4 border-purple-500 border-t-transparent"
      />
    </motion.div>
  );
}

export default LoadingScreen;