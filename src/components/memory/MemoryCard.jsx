import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";

function MemoryCard({ photo, setPhotos }) {
  const removePhoto = () => {
    URL.revokeObjectURL(photo.preview);

    setPhotos((prev) =>
      prev.filter((item) => item.id !== photo.id)
    );
  };

  return (
    <motion.div
      layout

      initial={{
        opacity: 0,
        scale: 0.5,
        rotate: -12,
        y: 80,
        filter: "blur(12px)",
      }}

      animate={{
        opacity: 1,
        scale: 1,
        rotate: 0,
        y: 0,
        filter: "blur(0px)",
      }}

      exit={{
        opacity: 0,
        scale: 0,
        rotate: 12,
        filter: "blur(15px)",
      }}

      transition={{
        type: "spring",
        stiffness: 240,
        damping: 20,
      }}

      whileHover={{
        y: -6,
        scale: 1.03,
      }}

      className="
        group
        relative
        overflow-hidden
        rounded-3xl
        border
        border-white/10
        bg-white/5
        shadow-lg
      "
    >
      {/* Image */}

      <img
        src={photo.preview}
        alt="Memory"
        className="
          w-full
          h-64
          object-cover
          transition-transform
          duration-500
          group-hover:scale-110
        "
      />

      {/* Overlay */}

      <div
        className="
          absolute
          inset-0
          bg-gradient-to-t
          from-black/60
          via-black/10
          to-transparent

          opacity-0

          group-hover:opacity-100

          transition-all
          duration-300
        "
      />

      {/* Delete Button */}

      <motion.button
        whileHover={{
          scale: 1.1,
        }}

        whileTap={{
          scale: 0.9,
        }}

        onClick={removePhoto}

        className="
          absolute
          top-4
          right-4

          w-11
          h-11

          rounded-full

          bg-red-500/90
          backdrop-blur-md

          flex
          items-center
          justify-center

          opacity-0

          group-hover:opacity-100

          transition-all
          duration-300
        "
      >
        <Trash2 size={18} />
      </motion.button>
    </motion.div>
  );
}

export default MemoryCard;