import { Plus, ImagePlus } from "lucide-react";
import { motion } from "framer-motion";

function AddPhotoCard({ fileInputRef }) {
  return (
    <motion.button
      type="button"
      layout
      initial={{
        opacity: 0,
        scale: 0.9,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      whileHover={{
        scale: 1.03,
        y: -6,
      }}
      whileTap={{
        scale: 0.97,
      }}
      transition={{
        type: "spring",
        stiffness: 280,
        damping: 18,
      }}
      onClick={() => fileInputRef.current?.click()}
      className="
        group
        relative
        overflow-hidden

        h-64

        rounded-3xl

        border-2
        border-dashed
        border-fuchsia-500/30

        bg-gradient-to-br
        from-white/[0.03]
        via-fuchsia-500/[0.04]
        to-purple-500/[0.06]

        flex
        flex-col
        items-center
        justify-center

        transition-all
        duration-300

        hover:border-fuchsia-400
        hover:shadow-[0_0_35px_rgba(168,85,247,.25)]
      "
    >
      {/* Background Glow */}

      <div
        className="
          absolute
          inset-0

          opacity-0
          group-hover:opacity-100

          transition-all
          duration-500

          bg-gradient-to-br
          from-fuchsia-500/5
          via-purple-500/5
          to-violet-500/10
        "
      />

      {/* Icon */}

      <div
        className="
          relative

          w-16
          h-16

          rounded-full

          flex
          items-center
          justify-center

          bg-fuchsia-500/10

          transition-all
          duration-300

          group-hover:scale-110
          group-hover:bg-fuchsia-500/20
        "
      >
        <Plus
          size={34}
          className="text-fuchsia-400"
        />
      </div>

      {/* Title */}

      <h3
        className="
          relative
          heading-font
          mt-6
          text-xl
          font-bold
        "
      >
        Add More Photos
      </h3>

      {/* Subtitle */}

      <p
        className="
          relative
          body-font
          mt-2
          text-center
          text-slate-400
          px-6
        "
      >
        Click to upload more beautiful memories
      </p>

      {/* Bottom Icon */}

      <ImagePlus
        size={18}
        className="
          relative
          mt-5
          text-fuchsia-300
          opacity-70
        "
      />
    </motion.button>
  );
}

export default AddPhotoCard;