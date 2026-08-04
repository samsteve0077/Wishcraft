import {
  Play,
  Pause,
  RotateCcw,
  Trash2,
  Music2,
  Sparkles,
} from "lucide-react";

function UploadedMusicCard({
  song,
  playing,
  selected,
  onPlay,
  onReplace,
  onRemove,
}) {
  return (
    <div
      className={`
        relative
        overflow-hidden
        rounded-3xl

        border

        ${
          selected
            ? "border-fuchsia-500 shadow-[0_0_40px_rgba(168,85,247,.35)]"
            : "border-white/10"
        }

        bg-white/[0.04]
        backdrop-blur-xl

        transition-all
        duration-300
      `}
    >
      {/* Cover */}

      <div
        className="
          h-72

          flex
          items-center
          justify-center

          bg-gradient-to-br
          from-fuchsia-600
          via-violet-600
          to-indigo-700

          relative
        "
      >
        <Music2
          size={90}
          className="text-white/90"
        />

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

              bg-black/30
              backdrop-blur-xl

              text-sm
            "
          >
            <Sparkles size={16} />
            Selected
          </div>
        )}

        <button
          onClick={onPlay}
          className="
            absolute

            bottom-6
            right-6

            w-16
            h-16

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
            <Pause size={28} />
          ) : (
            <Play
              size={28}
              className="ml-1"
            />
          )}
        </button>
      </div>

      {/* Details */}

      <div className="p-7">

        <h2 className="heading-font text-3xl font-bold">
          {song.title}
        </h2>

        <p className="body-font text-slate-400 mt-2">
          Custom Track
        </p>

        <p className="body-font text-slate-500 mt-8">
          {song.duration}
        </p>

        <div className="flex gap-4 mt-8">

          <button
            onClick={onReplace}
            className="
              flex-1

              rounded-xl

              border
              border-white/10

              py-3

              flex
              items-center
              justify-center
              gap-2

              hover:bg-white/5

              transition-all
            "
          >
            <RotateCcw size={18} />
            Replace
          </button>

          <button
            onClick={onRemove}
            className="
              flex-1

              rounded-xl

              border
              border-red-500/20

              py-3

              flex
              items-center
              justify-center
              gap-2

              text-red-300

              hover:bg-red-500/10

              transition-all
            "
          >
            <Trash2 size={18} />
            Remove
          </button>

        </div>

        {/* Future Features */}

        <button
          className="
            w-full

            mt-5

            rounded-xl

            py-3

            bg-gradient-to-r
            from-fuchsia-600
            via-purple-600
            to-violet-600

            hover:scale-[1.02]

            transition-all
          "
        >
          🎼 Open WishCraft Studio
        </button>

      </div>
    </div>
  );
}

export default UploadedMusicCard;