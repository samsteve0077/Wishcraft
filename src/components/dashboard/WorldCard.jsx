function WorldCard({
  title,
  subtitle,
  image,
  accent = "purple",
  selected,
  onClick,
}) {
  return (
    <div
      onClick={onClick}
      className={`group relative overflow-hidden rounded-3xl cursor-pointer
      h-[420px]
      transition-all duration-500 ease-out
      hover:-translate-y-3
      ${
        selected
          ? accent === "purple"
            ? "ring-2 ring-purple-500 shadow-[0_0_45px_rgba(168,85,247,.45)]"
            : "ring-2 ring-blue-500 shadow-[0_0_45px_rgba(59,130,246,.45)]"
          : ""
      }`}
    >
      {/* Background Image */}

      <img
        src={image}
        alt={title}
        className="
          absolute inset-0
          w-full h-full
          object-cover
          transition-transform duration-700 ease-out
          group-hover:scale-105
        "
      />

      {/* Dark Overlay */}

      <div
        className="
          absolute inset-0
          bg-gradient-to-t
          from-black
          via-black/40
          to-black/70
          transition-all duration-500
          group-hover:from-black/70
          group-hover:via-black/25
          group-hover:to-black/20
        "
      />

      {/* Bottom Content */}

      <div className="absolute bottom-0 left-0 right-0 p-6 z-10">

        <h2
          className="
            text-3xl
            font-black
            tracking-wide
            uppercase
            transition-all
            duration-500
            group-hover:-translate-y-1
          "
        >
          {title}
        </h2>

        <p
          className="
            mt-2
            text-gray-300
            transition-all
            duration-500
            group-hover:text-white
          "
        >
          {subtitle}
        </p>

        <div
          className="
            mt-6
            opacity-0
            translate-y-2
            group-hover:opacity-100
            group-hover:translate-y-0
            transition-all
            duration-500
          "
        >
          <span
            className={`font-semibold tracking-wider ${
              accent === "purple"
                ? "text-purple-300"
                : "text-blue-300"
            }`}
          >
            DISCOVER →
          </span>
        </div>

      </div>

      {/* Selected Badge */}

      {selected && (
        <div
          className={`
            absolute top-5 right-5
            backdrop-blur-md
            rounded-full
            px-4 py-2
            text-sm font-semibold
            ${
              accent === "purple"
                ? "bg-purple-500/20 text-purple-200 border border-purple-400/30"
                : "bg-blue-500/20 text-blue-200 border border-blue-400/30"
            }
          `}
        >
          ✓ World Selected
        </div>
      )}
    </div>
  );
}

export default WorldCard;