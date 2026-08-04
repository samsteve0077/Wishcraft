import { motion } from "framer-motion";
import {
  Music,
  Clapperboard,
  VolumeX,
} from "lucide-react";

function MusicMode({
  creatorData,
  setCreatorData,
}) {

  const modes = [
    {
      id: "single",
      icon: Music,
      title: "Single Soundtrack",
      description:
        "One song plays throughout the entire birthday experience.",
      accent: "from-fuchsia-500 to-violet-600",
    },
    {
      id: "story",
      icon: Clapperboard,
      title: "Story Soundtrack",
      description:
        "Choose different songs for waiting, memories, letter and ending.",
      accent: "from-sky-500 to-cyan-500",
    },
    {
      id: "silent",
      icon: VolumeX,
      title: "Silent Experience",
      description:
        "No background music will be played during the experience.",
      accent: "from-slate-500 to-slate-700",
    },
  ];

  const selectMode = (mode) => {
    setCreatorData((prev) => ({
      ...prev,
      musicMode: mode,
      music: null,
    }));
  };

  return (
    <div className="space-y-8">

      <div className="text-center">

        <h2 className="heading-font text-5xl font-bold">
          Choose Music Experience
        </h2>

        <p className="body-font text-slate-400 mt-4 max-w-3xl mx-auto leading-8">
          Decide how your birthday story should sound.
          Keep one soundtrack throughout, create different music
          for each chapter, or let the memories speak in silence.
        </p>

      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.15,
            },
          },
        }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
      >

        {modes.map((mode) => {

          const Icon = mode.icon;

          const selected =
            creatorData.musicMode === mode.id;

          return (

            <motion.div
              key={mode.id}
              variants={{
                hidden: {
                  opacity: 0,
                  y: 60,
                },
                visible: {
                  opacity: 1,
                  y: 0,
                },
              }}
              whileHover={{
                y: -10,
                scale: 1.02,
              }}
              transition={{
                duration: 0.4,
              }}
              onClick={() => selectMode(mode.id)}
              className={`
                relative
                cursor-pointer

                rounded-3xl

                border

                ${
                  selected
                    ? "border-fuchsia-500 shadow-[0_0_40px_rgba(168,85,247,.35)]"
                    : "border-white/10 hover:border-white/20"
                }

                bg-white/[0.04]

                backdrop-blur-xl

                overflow-hidden

                p-8

                transition-all
                duration-300
              `}
            >

              {/* Top Glow */}

              <div
                className={`
                  absolute
                  inset-x-0
                  top-0

                  h-1

                  bg-gradient-to-r
                  ${mode.accent}
                `}
              />

              {/* Icon */}

              <div
                className={`
                  w-20
                  h-20

                  rounded-2xl

                  flex
                  items-center
                  justify-center

                  bg-gradient-to-br
                  ${mode.accent}

                  shadow-lg
                `}
              >

                <Icon
                  size={38}
                  className="text-white"
                />

              </div>

              {/* Title */}

              <h3 className="heading-font text-3xl font-bold mt-8">

                {mode.title}

              </h3>

              {/* Description */}

              <p className="body-font text-slate-400 mt-5 leading-8">

                {mode.description}

              </p>

              {/* Selected */}

              {selected && (

                <div
                  className="
                    mt-8

                    inline-flex

                    px-4
                    py-2

                    rounded-full

                    bg-fuchsia-500/15

                    border
                    border-fuchsia-400/30

                    text-fuchsia-300

                    font-semibold
                  "
                >
                  ✓ Selected
                </div>

              )}

            </motion.div>

          );

        })}

      </motion.div>

    </div>
  );

}

export default MusicMode;