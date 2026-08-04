import { Heart } from "lucide-react";

function LetterStep({
  creatorData,
  setCreatorData,
}) {
  const maxWords = 5000;

  const handleChange = (e) => {
  const text = e.target.value;

  const words = text
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (words.length > maxWords) return;

  setCreatorData((prev) => ({
    ...prev,
    letter: text,
  }));
};
  return (
    <div className="max-w-5xl mx-auto">

      {/* Header */}

      <div className="text-center mb-12">

        <div
          className="
            w-20
            h-20
            rounded-full
            mx-auto

            flex
            items-center
            justify-center

            bg-gradient-to-r
            from-pink-500
            via-fuchsia-500
            to-purple-600

            shadow-[0_0_40px_rgba(217,70,239,.45)]
          "
        >
          <Heart size={34} />
        </div>

        <h2 className="heading-font text-5xl font-bold mt-8">
          Write From The Heart
        </h2>

        <p className="body-font text-slate-400 mt-4 text-lg max-w-2xl mx-auto leading-8">
          Your words are the most valuable gift. Write something they'll
          remember forever.
        </p>

      </div>

      {/* Editor */}

      <div
        className="
          rounded-3xl

          border border-white/10

          bg-white/[0.04]

          backdrop-blur-2xl

          shadow-[0_0_60px_rgba(168,85,247,.08)]

          p-8
        "
      >

        <textarea
          value={creatorData.letter}
          onChange={handleChange}
          placeholder={`Dear ${creatorData.recipientName || "My Favourite Person"},\n\nHappy Birthday... ❤️`}
          className="
            w-full
            min-h-[420px]

            resize-none

            bg-transparent

            outline-none

            text-lg

            leading-9

            body-font

            text-slate-200

            placeholder:text-slate-500
          "
        />

        <div className="flex justify-between items-center mt-6">

          <p className="text-slate-500 body-font">
            Express your feelings honestly.
          </p>

          <div
            className={`
              px-4
              py-2
              rounded-full

              border

              ${
                creatorData.letter
  .trim()
  .split(/\s+/)
  .filter(Boolean).length > 4500
                  ? "border-orange-500/40 text-orange-300 bg-orange-500/10"
                  : "border-fuchsia-500/30 text-fuchsia-300 bg-fuchsia-500/10"
              }
            `}
          >
            {
  creatorData.letter
    .trim()
    .split(/\s+/)
    .filter(Boolean).length
} / {maxWords} Words
          </div>

        </div>

      </div>

    </div>
  );
}

export default LetterStep;