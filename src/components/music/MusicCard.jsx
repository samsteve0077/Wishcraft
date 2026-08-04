import { motion } from "framer-motion";
import {
  Play,
  Pause,
  Sparkles,
} from "lucide-react";

function MusicCard({
  song,

  variant = "default",

  selected,

  playing,

  accent = "purple",

  onSelect,

  onPlay,

  onReplace,

  onRemove,

  onStudio,
}) {

  return (

    <motion.div

      initial={{
        opacity: 0,
        y: 50,
      }}

      whileInView={{
        opacity: 1,
        y: 0,
      }}

      viewport={{
        once: true,
      }}

      whileHover={{
        y: -10,
        scale: 1.02,
      }}

      transition={{
        duration: 0.45,
      }}

      onClick={onSelect}

      className={`
        group

        relative

        overflow-hidden

        rounded-3xl

        cursor-pointer

        border

        transition-all
        duration-500

        ${
          selected
            ? accent === "purple"
              ? "border-purple-500 shadow-[0_0_40px_rgba(168,85,247,.35)]"
              : "border-blue-500 shadow-[0_0_40px_rgba(59,130,246,.35)]"
            : "border-white/10 hover:border-white/20"
        }
      `}
    >

      {/* Album Cover */}

      <div className="relative h-72 overflow-hidden">

        <img
          src={song.cover}
          alt={song.title}
          className="
            w-full
            h-full
            object-cover

            transition-transform
            duration-700

            group-hover:scale-110
          "
        />

        {/* Dark Overlay */}

        <div
          className="
            absolute
            inset-0

            bg-gradient-to-t

            from-black
            via-black/20
            to-transparent
          "
        />

        {/* Selected Badge */}

        {selected && (

          <div
            className="
              absolute

              top-5
              right-5

              flex
              items-center
              gap-2

              rounded-full

              px-4
              py-2

              bg-black/35

              backdrop-blur-xl

              text-sm
            "
          >

            <Sparkles
              size={16}
              className="text-fuchsia-300"
            />

            Selected

          </div>

        )}

        {/* Play Button */}

        <button

          onClick={(e) => {

            e.stopPropagation();

            onPlay();

          }}

          className="
            absolute

            bottom-5
            right-5

            w-14
            h-14

            rounded-full

            bg-white/15

            backdrop-blur-xl

            flex
            items-center
            justify-center

            hover:scale-110

            transition-all
          "
        >

          {playing ? (

            <Pause size={26} />

          ) : (

            <Play
              size={26}
              className="ml-1"
            />

          )}

        </button>

      </div>

            {/* Card Content */}

      <div className="bg-[#17171F] p-6">

        {/* Song Title */}

        <h3 className="heading-font text-2xl font-bold">
          {song.title}
        </h3>

        {/* Subtitle */}

        <p className="body-font text-slate-400 mt-2">
          {song.subtitle}
        </p>

        {/* Duration */}

        <div className="flex items-center justify-between mt-6">

          <span className="body-font text-slate-500">
            {song.duration}
          </span>

          {selected && (

            <span
              className="
                px-3
                py-1

                rounded-full

                text-xs

                bg-fuchsia-500/15

                border
                border-fuchsia-500/30

                text-fuchsia-300
              "
            >
              Selected
            </span>

          )}

        </div>

        {/* Uploaded Song Actions */}

        {variant === "uploaded" && (

          <>

            <button
              onClick={(e) => {

                e.stopPropagation();

                onStudio?.();

              }}
              className="
                w-full

                mt-6

                rounded-2xl

                py-3.5

                bg-gradient-to-r
                from-fuchsia-600
                via-purple-600
                to-violet-600

                hover:scale-[1.02]

                transition-all
                duration-300

                font-semibold
              "
            >
              🎼 Open WishCraft Studio
            </button>

            <div className="grid grid-cols-2 gap-4 mt-4">

              <button
                onClick={(e) => {

                  e.stopPropagation();

                  onReplace?.();

                }}
                className="
                  rounded-xl

                  py-3

                  border
                  border-white/10

                  hover:bg-white/5

                  transition-all
                  duration-300
                "
              >
                🔄 Replace
              </button>

              <button
                onClick={(e) => {

                  e.stopPropagation();

                  onRemove?.();

                }}
                className="
                  rounded-xl

                  py-3

                  border
                  border-red-500/20

                  text-red-300

                  hover:bg-red-500/10

                  transition-all
                  duration-300
                "
              >
                🗑 Remove
              </button>

            </div>

          </>

        )}

      </div>

          </motion.div>

  );

}

export default MusicCard;