import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

function WorldCard({
  title,
  subtitle,
  image,
  scenes = [],
  accent = "purple",
  selected = false,
  onClick,
}) {
  const [showDiscover, setShowDiscover] = useState(false);
  const [activeScene, setActiveScene] = useState(0);

  const isPurple = accent === "purple";
  const SLIDE_DURATION = 3500;

  const accentClasses = isPurple
    ? {
        ring: "ring-purple-500",
        shadow: "shadow-[0_0_45px_rgba(168,85,247,.45)]",
        text: "text-purple-300",
        button: "from-purple-600 via-fuchsia-600 to-pink-600",
        border: "border-purple-400/30",
        glow: "shadow-[0_0_40px_rgba(168,85,247,.25)]",
        indicator: "bg-purple-400",
      }
    : {
        ring: "ring-blue-500",
        shadow: "shadow-[0_0_45px_rgba(59,130,246,.45)]",
        text: "text-blue-300",
        button: "from-blue-600 via-cyan-500 to-sky-500",
        border: "border-blue-400/30",
        glow: "shadow-[0_0_40px_rgba(59,130,246,.25)]",
        indicator: "bg-blue-400",
      };

  // Prepare the gallery images and remove missing or duplicate URLs.
  const galleryScenes = [
    ...new Set([image, ...scenes].filter(Boolean)),
  ];

  const currentScene = galleryScenes[activeScene];

  // Open the Discover slideshow.
  const openDiscover = () => {
    setActiveScene(0);
    setShowDiscover(true);
  };

  // Close the slideshow.
  const closeDiscover = () => {
    setShowDiscover(false);
  };

  // Automatically advance through the images.
  useEffect(() => {
    if (!showDiscover || galleryScenes.length <= 1) {
      return undefined;
    }

    const timer = setInterval(() => {
      setActiveScene((current) => {
        return (current + 1) % galleryScenes.length;
      });
    }, SLIDE_DURATION);

    return () => clearInterval(timer);
  }, [showDiscover, galleryScenes.length]);

  // Lock background scrolling and support keyboard navigation.
  useEffect(() => {
    if (!showDiscover) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeDiscover();
      }

      if (event.key === "ArrowRight") {
        setActiveScene((current) => {
          return (current + 1) % galleryScenes.length;
        });
      }

      if (event.key === "ArrowLeft") {
        setActiveScene((current) => {
          return (
            current - 1 + galleryScenes.length
          ) % galleryScenes.length;
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;

      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [showDiscover, galleryScenes.length]);

  // Manual slideshow navigation.
  const goToPrevious = () => {
    setActiveScene((current) => {
      return (
        current - 1 + galleryScenes.length
      ) % galleryScenes.length;
    });
  };

  const goToNext = () => {
    setActiveScene((current) => {
      return (current + 1) % galleryScenes.length;
    });
  };

  const selectWorld = () => {
    onClick?.();
    closeDiscover();
  };

  return (
    <>
      {/* WORLD CARD */}
      <motion.div
        initial={{
          opacity: 0,
          y: 80,
          scale: 0.92,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        viewport={{
          once: true,
          amount: 0.25,
        }}
        transition={{
          duration: 0.7,
          ease: "easeOut",
        }}
        whileHover={{
          y: -12,
        }}
        onClick={openDiscover}
        className={`
          group relative overflow-hidden rounded-3xl
          cursor-pointer h-[420px]
          transition-all duration-500 ease-out
          ${
            selected
              ? `ring-2 ${accentClasses.ring} ${accentClasses.shadow}`
              : ""
          }
        `}
      >
        {/* Card Background */}
        {image ? (
          <img
            src={image}
            alt={title}
            loading="lazy"
            className="
              absolute inset-0
              w-full h-full object-cover
              transition-transform duration-700
              ease-out group-hover:scale-110
            "
          />
        ) : (
          <div
            className="
              absolute inset-0
              bg-gradient-to-br
              from-slate-900 to-black
            "
          />
        )}

        {/* Card Overlay */}
        <div
          className="
            absolute inset-0
            bg-gradient-to-t
            from-black via-black/40 to-black/70
            transition-all duration-500
            group-hover:from-black/70
            group-hover:via-black/25
            group-hover:to-black/20
          "
        />

        {/* Card Information */}
        <div
          className="
            absolute bottom-0 left-0 right-0
            z-10 p-6
            backdrop-blur-md
            bg-gradient-to-t
            from-black/60 to-transparent
          "
        >
          <h2
            className="
              text-3xl font-black
              tracking-wide uppercase
              transition-transform duration-500
              group-hover:-translate-y-1
            "
          >
            {title}
          </h2>

          <p
            className="
              mt-2 text-gray-300
              transition-colors duration-500
              group-hover:text-white
            "
          >
            {subtitle}
          </p>

          {/* Discover Button */}
          <div
            className="
              mt-6
              opacity-100 translate-y-0
              sm:opacity-0 sm:translate-y-2
              sm:group-hover:opacity-100
              sm:group-hover:translate-y-0
              transition-all duration-500
            "
          >
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                openDiscover();
              }}
              className={`
                font-semibold tracking-wider
                ${accentClasses.text}
                hover:brightness-125
                transition-all
              `}
            >
              DISCOVER →
            </button>
          </div>
        </div>

        {/* Selected Badge */}
        {selected && (
          <motion.div
            initial={{
              scale: 0,
              opacity: 0,
            }}
            animate={{
              scale: 1,
              opacity: 1,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
            }}
            className={`
              absolute top-5 right-5
              backdrop-blur-xl rounded-full
              px-4 py-2 text-sm font-semibold
              ${
                isPurple
                  ? "bg-purple-500/20 text-purple-200 border border-purple-400/30"
                  : "bg-blue-500/20 text-blue-200 border border-blue-400/30"
              }
            `}
          >
            ✨ Selected
          </motion.div>
        )}
      </motion.div>

      {/* DISCOVER SLIDESHOW */}
      <AnimatePresence>
        {showDiscover && (
          <motion.div
            className="
              fixed inset-0 z-[9999]
              flex items-center justify-center
              p-3 sm:p-6
              bg-black/90 backdrop-blur-xl
            "
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            onClick={closeDiscover}
            role="dialog"
            aria-modal="true"
            aria-label={`Discover ${title}`}
          >
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.94,
                y: 25,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.96,
                y: 20,
              }}
              transition={{
                duration: 0.3,
              }}
              onClick={(event) => {
                event.stopPropagation();
              }}
              className={`
                relative w-full max-w-5xl
                max-h-[94vh] overflow-y-auto
                rounded-3xl border
                ${accentClasses.border}
                bg-[#0d0c12]
                ${accentClasses.glow}
              `}
            >
              {/* Header */}
              <div
                className="
                  flex items-center justify-between
                  gap-4 p-5 sm:p-7
                "
              >
                <div>
                  <p
                    className={`
                      text-xs sm:text-sm
                      font-semibold uppercase
                      tracking-[0.25em]
                      ${accentClasses.text}
                    `}
                  >
                    Discover the world
                  </p>

                  <h2
                    className="
                      mt-2 text-2xl sm:text-4xl
                      font-black uppercase tracking-wide
                    "
                  >
                    {title}
                  </h2>

                  <p className="mt-2 text-sm sm:text-base text-slate-400">
                    {subtitle}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={closeDiscover}
                  aria-label="Close slideshow"
                  className="
                    shrink-0 w-11 h-11
                    rounded-full bg-white/5
                    border border-white/10
                    text-white text-2xl
                    hover:bg-white/10
                    transition-all
                  "
                >
                  ×
                </button>
              </div>

              {/* Slideshow */}
              <div
                className="
                  relative mx-4 sm:mx-7
                  overflow-hidden rounded-2xl
                  bg-black
                "
              >
                <div className="relative aspect-video w-full">
                  <AnimatePresence mode="wait">
                    {currentScene && (
                      <motion.img
                        key={currentScene}
                        src={currentScene}
                        alt={`${title}, scene ${activeScene + 1}`}
                        initial={{
                          opacity: 0,
                          scale: 1.04,
                        }}
                        animate={{
                          opacity: 1,
                          scale: 1,
                        }}
                        exit={{
                          opacity: 0,
                          scale: 0.98,
                        }}
                        transition={{
                          duration: 0.65,
                          ease: "easeInOut",
                        }}
                        className="
                          absolute inset-0
                          w-full h-full
                          object-contain
                        "
                      />
                    )}
                  </AnimatePresence>

                  {/* Counter */}
                  <div
                    className="
                      absolute bottom-4 right-4 z-10
                      px-4 py-2 rounded-full
                      bg-black/65 backdrop-blur-md
                      border border-white/10
                      text-sm font-semibold text-white
                    "
                  >
                    {galleryScenes.length > 0
                      ? `${activeScene + 1} / ${galleryScenes.length}`
                      : "No images available"}
                  </div>

                  {/* Previous */}
                  {galleryScenes.length > 1 && (
                    <button
                      type="button"
                      onClick={goToPrevious}
                      aria-label="Previous scene"
                      className="
                        absolute left-3 sm:left-5
                        top-1/2 -translate-y-1/2 z-10
                        w-11 h-11 sm:w-12 sm:h-12
                        rounded-full bg-black/60
                        backdrop-blur-md
                        border border-white/15
                        text-white text-3xl
                        hover:bg-black/85
                        transition-all
                      "
                    >
                      ‹
                    </button>
                  )}

                  {/* Next */}
                  {galleryScenes.length > 1 && (
                    <button
                      type="button"
                      onClick={goToNext}
                      aria-label="Next scene"
                      className="
                        absolute right-3 sm:right-5
                        top-1/2 -translate-y-1/2 z-10
                        w-11 h-11 sm:w-12 sm:h-12
                        rounded-full bg-black/60
                        backdrop-blur-md
                        border border-white/15
                        text-white text-3xl
                        hover:bg-black/85
                        transition-all
                      "
                    >
                      ›
                    </button>
                  )}
                </div>
              </div>

              {/* Scene Indicators */}
              {galleryScenes.length > 1 && (
                <div
                  className="
                    flex justify-center
                    gap-2 mt-5 px-4
                  "
                >
                  {galleryScenes.map((scene, index) => (
                    <button
                      key={`${scene}-${index}`}
                      type="button"
                      onClick={() => setActiveScene(index)}
                      aria-label={`Show scene ${index + 1}`}
                      aria-current={
                        activeScene === index ? "true" : undefined
                      }
                      className={`
                        h-2 rounded-full
                        transition-all duration-300
                        ${
                          activeScene === index
                            ? `w-8 ${accentClasses.indicator}`
                            : "w-2 bg-white/25 hover:bg-white/50"
                        }
                      `}
                    />
                  ))}
                </div>
              )}

              {/* Description and Selection */}
              <div className="p-5 sm:p-7">
                <p className="text-slate-400 leading-7">
                  Explore this magical world through its scenes.
                  Your selected world will inspire the atmosphere
                  of the birthday experience.
                </p>

                <div className="mt-7 flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    disabled={galleryScenes.length === 0}
                    onClick={selectWorld}
                    className={`
                      flex-1 px-6 py-3.5 rounded-xl
                      bg-gradient-to-r ${accentClasses.button}
                      font-semibold text-white
                      hover:brightness-110
                      hover:scale-[1.01]
                      transition-all
                      disabled:opacity-40
                      disabled:cursor-not-allowed
                    `}
                  >
                    ✨ Choose This World
                  </button>

                  <button
                    type="button"
                    onClick={closeDiscover}
                    className="
                      px-6 py-3.5 rounded-xl
                      border border-white/10
                      bg-white/[0.04]
                      text-slate-300
                      hover:bg-white/[0.08]
                      transition-all
                    "
                  >
                    Back to Worlds
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default WorldCard;