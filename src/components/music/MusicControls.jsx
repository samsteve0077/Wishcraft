import {
  Trash2,
  RefreshCw,
  Scissors,
} from "lucide-react";

function MusicControls({
  onEdit,
  onReplace,
  onDelete,
}) {
  return (
    <div
      className="
        mt-8

        rounded-3xl

        border
        border-violet-500/20

        bg-white/[0.04]

        backdrop-blur-xl

        p-8
      "
    >

      <h3 className="heading-font text-2xl font-bold">
        🎵 Uploaded Song Controls
      </h3>

      <p className="body-font text-slate-400 mt-2">
        Manage your uploaded soundtrack.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">

        <button
          onClick={onEdit}
          className="
            flex
            items-center
            justify-center
            gap-3

            py-4

            rounded-2xl

            bg-violet-500/10

            border
            border-violet-500/30

            hover:bg-violet-500/20

            transition-all
          "
        >
          <Scissors size={20} />
          Edit Music
        </button>

        <button
          onClick={onReplace}
          className="
            flex
            items-center
            justify-center
            gap-3

            py-4

            rounded-2xl

            bg-sky-500/10

            border
            border-sky-500/30

            hover:bg-sky-500/20

            transition-all
          "
        >
          <RefreshCw size={20} />
          Replace Song
        </button>

        <button
          onClick={onDelete}
          className="
            flex
            items-center
            justify-center
            gap-3

            py-4

            rounded-2xl

            bg-red-500/10

            border
            border-red-500/30

            hover:bg-red-500/20

            transition-all
          "
        >
          <Trash2 size={20} />
          Delete Song
        </button>

      </div>

    </div>
  );
}

export default MusicControls;