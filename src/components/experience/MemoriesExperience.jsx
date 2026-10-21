import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Heart,
  Images,
  Pause,
  Play,
  Sparkles,
} from "lucide-react";

function MemoriesExperience({ creatorData = {}, theme, onComplete }) {
  const photos = Array.isArray(creatorData.photos)
    ? creatorData.photos.filter((photo) => photo?.preview)
    : [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const accent = theme?.colors?.accent || "#f472b6";
  const textColor = theme?.colors?.text || "#ffffff";

  const currentPhoto = photos[currentIndex];

  const nextPhoto = () => {
    setCurrentIndex((previous) => (previous + 1) % photos.length);
  };

  const previousPhoto = () => {
    setCurrentIndex(
      (previous) => (previous - 1 + photos.length) % photos.length
    );
  };

  useEffect(() => {
    if (!isPlaying || photos.length < 2) return undefined;

    const timer = window.setInterval(() => {
      setCurrentIndex((previous) => (previous + 1) % photos.length);
    }, 4000);

    return () => window.clearInterval(timer);
  }, [isPlaying, photos.length]);

  useEffect(() => {
    setCurrentIndex(0);
    setIsPlaying(false);
  }, [photos.length]);

  return (
    <section
  className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-transparent px-4 py-12 sm:px-8"
  style={{
    color: textColor,
    backgroundColor: "transparent",
  }}
>
      {/* Background decoration */}
      <div
        className="pointer-events-none absolute -left-24 top-20 h-64 w-64 rounded-full blur-[100px]"
        style={{ backgroundColor: accent, opacity: 0.12 }}
      />

      <div className="pointer-events-none absolute -bottom-24 -right-20 h-72 w-72 rounded-full bg-purple-500/15 blur-[100px]" />

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center"
      >
        {/* Heading */}
        <div className="mb-8 text-center sm:mb-10">
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/75 backdrop-blur-xl"
          >
            <Sparkles size={15} style={{ color: accent }} />
            <span>A little journey through our memories</span>
            <Heart size={14} style={{ color: accent }} />
          </motion.div>

          <h1 className="text-3xl font-semibold tracking-tight sm:text-5xl">
            Every picture tells a story
          </h1>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-white/60 sm:text-base">
            Some moments become memories. Some memories become treasures.
            Here are a few moments worth keeping forever.
          </p>
        </div>

        {/* Photo viewer */}
        {photos.length > 0 ? (
          <>
            <div className="relative w-full max-w-3xl">
              <div
                className="pointer-events-none absolute -inset-3 rounded-[2rem] blur-2xl"
                style={{ backgroundColor: accent, opacity: 0.12 }}
              />

              <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-white/[0.04] p-2 shadow-2xl backdrop-blur-xl sm:p-3">
                <div className="relative flex min-h-[300px] items-center justify-center overflow-hidden rounded-2xl bg-black/30 sm:min-h-[440px]">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={currentPhoto.id ?? currentIndex}
                      src={currentPhoto.preview}
                      alt={`Memory ${currentIndex + 1} of ${photos.length}`}
                      initial={{
                        opacity: 0,
                        scale: 0.96,
                        filter: "blur(8px)",
                      }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                        filter: "blur(0px)",
                      }}
                      exit={{
                        opacity: 0,
                        scale: 1.02,
                        filter: "blur(5px)",
                      }}
                      transition={{ duration: 0.45, ease: "easeInOut" }}
                      className="absolute inset-0 h-full w-full object-contain"
                    />
                  </AnimatePresence>

                  {/* Photo counter */}
                  <div className="absolute bottom-4 left-4 rounded-full border border-white/10 bg-black/50 px-3 py-1.5 text-xs text-white/90 backdrop-blur-md">
                    Memory {currentIndex + 1} / {photos.length}
                  </div>

                  <div className="absolute right-4 top-4 rounded-full bg-black/40 p-2 backdrop-blur-md">
                    <Heart size={17} style={{ color: accent }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Progress indicators */}
            <div className="mt-6 flex max-w-full flex-wrap items-center justify-center gap-2">
              {photos.map((photo, index) => (
                <button
                  key={photo.id ?? index}
                  type="button"
                  onClick={() => setCurrentIndex(index)}
                  aria-label={`View memory ${index + 1}`}
                  aria-current={index === currentIndex ? "true" : undefined}
                  className="h-2 rounded-full transition-all duration-300"
                  style={{
                    width: index === currentIndex ? 28 : 8,
                    backgroundColor:
                      index === currentIndex ? accent : "rgba(255,255,255,0.25)",
                  }}
                />
              ))}
            </div>

            {/* Navigation controls */}
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={previousPhoto}
                disabled={photos.length < 2}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ArrowLeft size={17} />
                Previous
              </button>

              <button
                type="button"
                onClick={() => setIsPlaying((playing) => !playing)}
                disabled={photos.length < 2}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {isPlaying ? <Pause size={17} /> : <Play size={17} />}
                {isPlaying ? "Pause slideshow" : "Play slideshow"}
              </button>

              <button
                type="button"
                onClick={nextPhoto}
                disabled={photos.length < 2}
                className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
                style={{ backgroundColor: accent }}
              >
                Next
                <ArrowRight size={17} />
              </button>
            </div>
          </>
        ) : (
          /* Empty state */
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex min-h-64 w-full max-w-2xl flex-col items-center justify-center rounded-3xl border border-white/10 bg-white/[0.04] px-6 py-12 text-center backdrop-blur-xl"
          >
            <div
              className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl"
              style={{ backgroundColor: `${accent}20` }}
            >
              <Images size={30} style={{ color: accent }} />
            </div>

            <h2 className="text-xl font-medium">Memories are waiting</h2>

            <p className="mt-2 max-w-md text-sm leading-6 text-white/60">
              This story doesn't have any photos yet. Let's continue to the
              next part of your birthday surprise.
            </p>
          </motion.div>
        )}

        {/* Continue */}
        <motion.button
          type="button"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          onClick={onComplete}
          className="mt-10 inline-flex items-center gap-3 rounded-full px-7 py-4 text-sm font-semibold text-white shadow-lg transition hover:brightness-110"
          style={{
            background: `linear-gradient(135deg, ${accent}, #a855f7)`,
            boxShadow: `0 8px 30px ${accent}30`,
          }}
        >
          Continue our story
          <ArrowRight size={18} />
        </motion.button>

        <p className="mt-5 text-center text-xs text-white/40">
          Made with love, one memory at a time <span>♥</span>
        </p>
      </motion.div>
    </section>
  );
}

export default MemoriesExperience;