import { motion } from "framer-motion";
import {
  Play,
  Pause,
  Sparkles,
  Music2,
  Disc3,
} from "lucide-react";

import {
  formatDuration,
  getSongDurationSeconds,
} from "../../utils/music";

function MusicCard({
  song,
  selected,
  playing,
  accent = "purple",
  onSelect,
  onPlay,
  onReplace,
  onRemove,
}) {
  const durationSeconds = getSongDurationSeconds(song);

  const durationLabel = formatDuration(
    Number.isFinite(durationSeconds)
      ? durationSeconds
      : 0
  );

  const isUploaded = song?.type === "uploaded";

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 40,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
      }}
      whileHover={{
        y: -8,
        scale: 1.015,
      }}
      transition={{
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
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
      {/* ================================================== */}
      {/* ALBUM COVER                                        */}
      {/* ================================================== */}

      <div
        className="
          relative
          h-80
          overflow-hidden
          bg-[#101016]
        "
      >
        {isUploaded ? (
          /* ==================================================
             CSS UPLOADED MUSIC COVER
          ================================================== */

          <div
            className="
              relative
              w-full
              h-full
              overflow-hidden

              bg-gradient-to-br
              from-[#12091f]
              via-[#32105c]
              to-[#12091f]

              flex
              items-center
              justify-center
            "
          >
            {/* Background glow */}

            <div
              className="
                absolute
                -top-20
                -left-20

                w-64
                h-64

                rounded-full

                bg-violet-600/30
                blur-3xl
              "
            />

            <div
              className="
                absolute
                -bottom-24
                -right-20

                w-72
                h-72

                rounded-full

                bg-fuchsia-600/25
                blur-3xl
              "
            />

            {/* Decorative circles */}

            <div
              className="
                absolute
                w-64
                h-64

                rounded-full

                border
                border-white/10

                opacity-60
              "
            />

            <div
              className="
                absolute
                w-48
                h-48

                rounded-full

                border
                border-violet-300/10

                opacity-70
              "
            />

            {/* Center album element */}

            <div
              className="
                relative
                z-10

                flex
                flex-col
                items-center
                justify-center
              "
            >
              <div
                className="
                  w-28
                  h-28

                  rounded-full

                  bg-gradient-to-br
                  from-violet-500
                  via-fuchsia-500
                  to-purple-700

                  shadow-[0_0_50px_rgba(168,85,247,.45)]

                  flex
                  items-center
                  justify-center

                  group-hover:scale-110

                  transition-transform
                  duration-700
                "
              >
                <div
                  className="
                    w-20
                    h-20

                    rounded-full

                    bg-[#171020]

                    flex
                    items-center
                    justify-center

                    border
                    border-white/10
                  "
                >
                  <Music2
                    size={38}
                    className="
                      text-fuchsia-300
                    "
                  />
                </div>
              </div>

              <div
                className="
                  mt-6

                  flex
                  items-center
                  gap-2

                  px-4
                  py-2

                  rounded-full

                  bg-black/30
                  border
                  border-white/10
                  backdrop-blur-xl
                "
              >
                <Disc3
                  size={15}
                  className="text-violet-300"
                />

                <span
                  className="
                    text-xs
                    font-semibold
                    tracking-[0.2em]
                    text-white/80
                  "
                >
                  YOUR MUSIC
                </span>
              </div>
            </div>
          </div>
        ) : song?.cover ? (
          /* ==================================================
             DEFAULT SONG COVER
          ================================================== */

          <img
            src={song.cover}
            alt={
              song.title ||
              "Music cover"
            }
            className="
              block
              w-full
              h-full
              object-cover

              transition-transform
              duration-700

              group-hover:scale-110
            "
          />
        ) : (
          /* ==================================================
             GENERIC FALLBACK
          ================================================== */

          <div
            className="
              w-full
              h-full

              flex
              items-center
              justify-center

              bg-gradient-to-br
              from-violet-700
              via-fuchsia-700
              to-purple-700

              text-7xl
            "
          >
            🎵
          </div>
        )}

        {/* Bottom gradient */}

        <div
          className="
            absolute
            inset-0

            bg-gradient-to-t
            from-black
            via-black/20
            to-transparent

            pointer-events-none
          "
        />

        {/* Selected badge */}

        {selected && (
          <div
            className="
              absolute
              top-5
              right-5
              z-10

              flex
              items-center
              gap-2

              rounded-full

              px-4
              py-2

              bg-black/40
              backdrop-blur-xl

              text-sm
              text-white
            "
          >
            <Sparkles
              size={16}
              className="
                text-fuchsia-300
              "
            />

            Selected
          </div>
        )}

        {/* Play / Pause */}

        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onPlay?.();
          }}
          className="
            absolute
            bottom-5
            right-5
            z-10

            w-14
            h-14

            rounded-full

            bg-white/15
            backdrop-blur-xl

            flex
            items-center
            justify-center

            hover:bg-white/25
            hover:scale-110

            transition-all
          "
          aria-label={
            playing
              ? "Pause song"
              : "Play song"
          }
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

      {/* ================================================== */}
      {/* SONG INFORMATION                                   */}
      {/* ================================================== */}

      <div
        className="
          bg-[#17171F]
          p-6
        "
      >
        <h3
          className="
            heading-font
            text-2xl
            font-bold
            text-white
            truncate
          "
        >
          {song?.title ||
            "Untitled Song"}
        </h3>

        <p
          className="
            body-font
            text-slate-400
            mt-2
          "
        >
          {song?.subtitle ||
            "Music"}
        </p>

        {/* Duration */}

        <div
          className="
            flex
            items-center
            justify-between
            mt-6
          "
        >
          <span
            className="
              body-font
              text-slate-500
            "
          >
            Duration • {durationLabel}
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

        {/* ==================================================
            UPLOADED MUSIC ACTIONS
        ================================================== */}

        {isUploaded && (
          <div
            className="
              grid
              grid-cols-2
              gap-3
              mt-6
            "
          >
            {/* Replace */}

            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                onReplace?.();
              }}
              className="
                py-3
                rounded-xl

                bg-sky-500/10
                border
                border-sky-500/30

                text-white

                hover:bg-sky-500/20
                hover:border-sky-400/50

                transition-all
              "
            >
              🔄 Replace
            </button>

            {/* Delete */}

            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                onRemove?.();
              }}
              className="
                py-3
                rounded-xl

                bg-red-500/10
                border
                border-red-500/30

                text-white

                hover:bg-red-500/20
                hover:border-red-400/50

                transition-all
              "
            >
              🗑 Delete
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default MusicCard;