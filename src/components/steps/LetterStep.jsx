import {
  Heart,
  ToggleLeft,
  ToggleRight,
  Mail,
  ScrollText,
  PenLine,
  Keyboard,
  FileText,
  Check,
  Eye,
} from "lucide-react";

const LETTER_STYLES = [
  {
    id: "royal-scroll",
    title: "Royal Scroll",
    description: "A crinkled parchment unrolls like a king's royal scroll.",
    icon: ScrollText,
    preview: "📜",
    paperClass: "border-amber-300/30 bg-amber-100/10",
    accent: "text-amber-300",
  },
  {
    id: "handwritten",
    title: "Handwritten Letter",
    description:
      "Ruled paper unfolds as an invisible ink pen writes your message.",
    icon: PenLine,
    preview: "✍️",
    paperClass: "border-sky-300/30 bg-sky-100/10",
    accent: "text-sky-300",
  },
  {
    id: "typewriter",
    title: "Typewriter",
    description:
      "Your message appears character by character on typewriter paper.",
    icon: Keyboard,
    preview: "⌨️",
    paperClass: "border-emerald-300/30 bg-emerald-100/10",
    accent: "text-emerald-300",
  },
  {
    id: "simple",
    title: "Simple Letter",
    description:
      "A clean, elegant paper displays your message without elaborate effects.",
    icon: FileText,
    preview: "💌",
    paperClass: "border-fuchsia-300/30 bg-fuchsia-100/10",
    accent: "text-fuchsia-300",
  },
];

function LetterStep({ creatorData, setCreatorData }) {
  const maxWords = 5000;

  const letter = creatorData.letter || "";
  const letterEnabled = creatorData.letterEnabled !== false;
  const selectedStyle = creatorData.letterStyle || "royal-scroll";

  const wordCount = letter.trim().split(/\s+/).filter(Boolean).length;

  const handleChange = (event) => {
    const text = event.target.value;
    const updatedWordCount = text.trim().split(/\s+/).filter(Boolean).length;

    if (updatedWordCount > maxWords) return;

    setCreatorData((previous) => ({
      ...previous,
      letter: text,
    }));
  };

  const toggleLetter = () => {
    setCreatorData((previous) => ({
      ...previous,
      letterEnabled: previous.letterEnabled === false,
    }));
  };

  const selectStyle = (styleId) => {
    setCreatorData((previous) => ({
      ...previous,
      letterStyle: styleId,
    }));
  };

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      {/* LETTER ENABLE/DISABLE */}
      <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl sm:p-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex min-w-0 items-start gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-fuchsia-500/10 text-fuchsia-300">
              <Mail size={23} />
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white">
                Personal Birthday Letter
              </h3>

              <p className="mt-1 text-sm leading-6 text-slate-400">
                Choose how your heartfelt message will appear.
              </p>
            </div>
          </div>

          <button
            type="button"
            role="switch"
            aria-checked={letterEnabled}
            aria-label="Enable or disable the birthday letter"
            onClick={toggleLetter}
            className="shrink-0 rounded-xl transition-transform hover:scale-105 active:scale-95"
          >
            {letterEnabled ? (
              <ToggleRight size={38} className="text-fuchsia-400" />
            ) : (
              <ToggleLeft size={38} className="text-white/40" />
            )}
          </button>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              letterEnabled
                ? "bg-emerald-400/10 text-emerald-300"
                : "bg-white/10 text-white/50"
            }`}
          >
            {letterEnabled ? "Enabled" : "Disabled"}
          </span>

          <span className="text-xs leading-5 text-slate-400">
            {letterEnabled
              ? "Your selected letter style will be included in the experience."
              : "Your message and style remain saved when the section is disabled."}
          </span>
        </div>
      </section>

      <div className={letterEnabled ? "" : "opacity-60"}>
        {/* HEADER */}
        <div className="mb-10 text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-600 shadow-[0_0_40px_rgba(217,70,239,.45)]">
            <Heart size={34} className="text-white" />
          </div>

          <h2 className="heading-font mt-8 text-4xl font-bold text-white sm:text-5xl">
            Write From The Heart
          </h2>

          <p className="body-font mx-auto mt-4 max-w-2xl text-lg leading-8 text-slate-400">
            First choose how your letter will look. Then write the message you
            want your special person to read.
          </p>
        </div>

        {/* LETTER STYLE SELECTOR */}
        <section className="mb-8">
          <div className="mb-4 flex items-center gap-2">
            <Eye size={20} className="text-fuchsia-300" />

            <h3 className="text-xl font-semibold text-white">
              Choose Your Letter Style
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {LETTER_STYLES.map((style) => {
              const Icon = style.icon;
              const selected = selectedStyle === style.id;

              return (
                <button
                  key={style.id}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => selectStyle(style.id)}
                  className={`relative rounded-2xl border p-5 text-left transition-all duration-200 hover:-translate-y-1 ${
                    selected
                      ? `${style.paperClass} ring-2 ring-fuchsia-400/70`
                      : "border-white/10 bg-white/[0.03] hover:border-white/25"
                  }`}
                >
                  {selected && (
                    <span className="absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full bg-fuchsia-500 text-white">
                      <Check size={15} />
                    </span>
                  )}

                  <div className="flex items-start gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-black/20 text-3xl">
                      {style.preview}
                    </div>

                    <div className="pr-5">
                      <div
                        className={`flex items-center gap-2 font-semibold ${style.accent}`}
                      >
                        <Icon size={18} />
                        <span>{style.title}</span>
                      </div>

                      <p className="mt-2 text-sm leading-6 text-slate-300">
                        {style.description}
                      </p>

                      <p className="mt-3 text-xs font-medium text-white/50">
                        {selected ? "Currently selected" : "Select this style"}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* MESSAGE EDITOR */}
        <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 shadow-[0_0_60px_rgba(168,85,247,.08)] backdrop-blur-2xl sm:p-8">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="text-xl font-semibold text-white">
                Your Personal Message
              </h3>

              <p className="mt-1 text-sm text-slate-400">
                Your message stays the same when you change styles.
              </p>
            </div>

            <span className="rounded-full border border-fuchsia-500/30 bg-fuchsia-500/10 px-3 py-1.5 text-xs font-semibold text-fuchsia-300">
              {LETTER_STYLES.find((style) => style.id === selectedStyle)
                ?.title || "Royal Scroll"}
            </span>
          </div>

          <textarea
            value={letter}
            onChange={handleChange}
            placeholder={`Dear ${
              creatorData.recipientName || "My Favourite Person"
            },\n\nHappy Birthday... ❤️`}
            className="body-font min-h-[350px] w-full resize-y rounded-xl border border-white/10 bg-black/10 p-4 text-lg leading-9 text-slate-200 outline-none placeholder:text-slate-500 focus:border-fuchsia-400/50 sm:p-6"
          />

          <div className="mt-5 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <p className="body-font text-sm text-slate-500">
              Express your feelings honestly. Up to{" "}
              {maxWords.toLocaleString()} words.
            </p>

            <div
              className={`rounded-full border px-4 py-2 text-sm ${
                wordCount > 4500
                  ? "border-orange-500/40 bg-orange-500/10 text-orange-300"
                  : "border-fuchsia-500/30 bg-fuchsia-500/10 text-fuchsia-300"
              }`}
            >
              {wordCount} / {maxWords} Words
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default LetterStep;