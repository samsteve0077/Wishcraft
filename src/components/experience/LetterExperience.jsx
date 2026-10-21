import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Heart, Sparkles } from "lucide-react";

/* =========================================================
   HANDWRITING SCRIPT
   ========================================================= */

function createHandwritingScript(text) {
  const events = [];
  const words = text.match(/\n|[^\s\n]+|\s+/g) || [];

  const corrections = [
    ["happy", "wonderful"],
    ["nice", "beautiful"],
    ["good", "special"],
    ["really", "truly"],
    ["always", "forever"],
    ["amazing", "incredible"],
  ];

  let correctionUsed = false;
  let insertionUsed = false;
  let wordCount = 0;

  for (const token of words) {
    if (token === "\n") {
      events.push({ type: "character", value: "\n" });
      events.push({ type: "pause", duration: 350 });
      continue;
    }

    if (/^\s+$/.test(token)) {
      events.push({ type: "character", value: token });
      continue;
    }

    const cleanWord = token
      .toLowerCase()
      .replace(/[.,!?;:'"()[\]{}]/g, "");

    const candidate = corrections.find(
      ([original]) => original === cleanWord
    );

    const shouldCorrect =
      !correctionUsed &&
      candidate &&
      Math.random() < 0.55;

    if (shouldCorrect) {
      const punctuation = token.match(/[.,!?;:]$/)?.[0] || "";

      events.push({
        type: "correction",
        original: token,
        replacement: `${candidate[1]}${punctuation}`,
      });

      correctionUsed = true;
      wordCount++;
      continue;
    }

    /*
     * A small handwritten insertion above a word.
     * The insertion is visual only.
     */
    const shouldInsert =
      !insertionUsed &&
      wordCount >= 5 &&
      token.length > 4 &&
      !/[.,!?;:]$/.test(token) &&
      Math.random() < 0.10;

    if (shouldInsert) {
      events.push({
        type: "insertion",
        word: token,
      });

      insertionUsed = true;
    }

    for (const character of token) {
      events.push({
        type: "character",
        value: character,
      });
    }

    wordCount++;

    if (/[.!?]$/.test(token)) {
      events.push({
        type: "pause",
        duration: 550 + Math.random() * 550,
      });
    } else if (/[,;:]$/.test(token)) {
      events.push({
        type: "pause",
        duration: 200 + Math.random() * 300,
      });
    }
  }

  return events;
}

/* =========================================================
   HUMAN-LIKE HANDWRITING EXPERIENCE
   ========================================================= */

function HandwrittenMessage({
  letter,
  showLetter,
  instant,
  onComplete,
}) {
  const script = useMemo(
    () => createHandwritingScript(letter),
    [letter]
  );

  const [renderedEvents, setRenderedEvents] = useState([]);
  const [finished, setFinished] = useState(false);

  const timerRef = useRef(null);
  const indexRef = useRef(0);
  const eventsRef = useRef([]);
  const finishedRef = useRef(false);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  /*
   * Calculate a target duration based on the letter length.
   * Short messages take at least 30 seconds.
   * Longer messages are allowed more time, capped at 90 seconds.
   */
  const targetDuration = useMemo(() => {
    const characters = letter.length;

    if (characters <= 0) return 0;

    return Math.min(
      90000,
      Math.max(30000, characters * 95)
    );
  }, [letter]);

  const stopTimer = useCallback(() => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const finishAnimation = useCallback(() => {
    stopTimer();
    finishedRef.current = true;
    setFinished(true);
    onCompleteRef.current?.();
  }, [stopTimer]);

  /*
   * Reset the animation whenever a different letter is loaded.
   */
  useEffect(() => {
    stopTimer();

    indexRef.current = 0;
    eventsRef.current = [];
    finishedRef.current = false;

    setRenderedEvents([]);
    setFinished(false);

    return stopTimer;
  }, [letter, stopTimer]);

  /*
   * Instantly show the original message.
   * All animation timers are stopped first.
   */
  useEffect(() => {
    if (!instant) return;

    stopTimer();

    finishedRef.current = true;
    setRenderedEvents([
      {
        type: "instant",
        value: letter,
        id: "instant-message",
      },
    ]);

    setFinished(true);
    onCompleteRef.current?.();
  }, [instant, letter, stopTimer]);

  /*
   * Run the handwriting animation.
   *
   * A ref-based timer loop prevents React rerenders from
   * cancelling and restarting the animation on every character.
   */
  useEffect(() => {
    if (!showLetter || instant || finishedRef.current) {
      return undefined;
    }

    if (!letter.trim()) {
      finishAnimation();
      return undefined;
    }

    const events = script;
    eventsRef.current = events;

    const startedAt = Date.now();
    const estimatedEvents = Math.max(events.length, 1);

    /*
     * Spread the character-writing time across the target duration.
     * Pauses are added separately for a natural rhythm.
     */
    const averageCharacterDelay =
      targetDuration / estimatedEvents;

    const runNext = () => {
      if (finishedRef.current) return;

      const index = indexRef.current;

      if (index >= events.length) {
        finishAnimation();
        return;
      }

      const event = events[index];
      indexRef.current += 1;

      if (event.type === "pause") {
        timerRef.current = window.setTimeout(
          runNext,
          event.duration
        );
        return;
      }

      const id = `handwriting-${index}`;

      setRenderedEvents((previous) => [
        ...previous,
        { ...event, id },
      ]);

      if (event.type === "correction") {
        timerRef.current = window.setTimeout(
          runNext,
          350 + Math.random() * 250
        );
        return;
      }

      if (event.type === "insertion") {
        timerRef.current = window.setTimeout(
          runNext,
          300 + Math.random() * 200
        );
        return;
      }

      const value = event.value || "";

      let delay;

      if (value === " ") {
        delay = averageCharacterDelay * (
          0.35 + Math.random() * 0.35
        );
      } else if (/[.,!?;:]/.test(value)) {
        delay = averageCharacterDelay * (
          1.5 + Math.random() * 1.2
        );
      } else {
        /*
         * Variable speed:
         * quick bursts, normal writing, and slower strokes.
         */
        const rhythm = Math.random();

        if (rhythm < 0.20) {
          delay = averageCharacterDelay * (
            0.35 + Math.random() * 0.35
          );
        } else if (rhythm > 0.88) {
          delay = averageCharacterDelay * (
            1.5 + Math.random() * 0.9
          );
        } else {
          delay = averageCharacterDelay * (
            0.75 + Math.random() * 0.55
          );
        }
      }

      /*
       * Prevent extreme delays while keeping the overall
       * animation close to its intended duration.
       */
      delay = Math.max(12, Math.min(delay, 350));

      /*
       * Small initial pause to make the writing feel intentional.
       */
      const elapsed = Date.now() - startedAt;

      if (index === 0 && elapsed < 500) {
        delay += 350;
      }

      timerRef.current = window.setTimeout(runNext, delay);
    };

    timerRef.current = window.setTimeout(
      runNext,
      450
    );

    return () => {
      stopTimer();
    };
  }, [
    showLetter,
    instant,
    letter,
    script,
    targetDuration,
    finishAnimation,
    stopTimer,
  ]);

  return (
    <div
      className="relative min-h-64 whitespace-pre-wrap break-words text-lg leading-10 sm:text-2xl"
      style={{
        fontFamily:
          '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive',
      }}
    >
      {renderedEvents.map((event) => {
        if (event.type === "instant") {
          return (
            <span key={event.id}>
              {event.value}
            </span>
          );
        }

        if (event.type === "character") {
          return (
            <span key={event.id}>
              {event.value}
            </span>
          );
        }

        if (event.type === "correction") {
          return (
            <span
              key={event.id}
              className="mx-0.5 inline-flex flex-col items-center align-middle"
            >
              <span className="relative text-rose-700">
                {event.original}
                <span className="absolute left-0 top-1/2 h-[2px] w-full -rotate-6 bg-rose-700" />
              </span>

              <span className="-mt-1 text-base text-blue-800 sm:text-xl">
                {event.replacement}
              </span>
            </span>
          );
        }

        if (event.type === "insertion") {
          return (
            <span
              key={event.id}
              className="relative inline-block align-baseline"
            >
              <span className="absolute -top-5 left-0 whitespace-nowrap text-sm font-semibold italic text-blue-800 sm:text-base">
                ^{event.word}
              </span>
            </span>
          );
        }

        return null;
      })}

      {!finished && showLetter && !instant && (
        <motion.span
          aria-hidden="true"
          animate={{ opacity: [1, 0, 1] }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
          }}
          className="ml-0.5 inline-block h-5 w-0.5 bg-blue-800 align-middle"
        />
      )}
    </div>
  );
}

/* =========================================================
   ROYAL SCROLL
   ========================================================= */

function RoyalScroll({
  letter,
  instant,
  onComplete,
  onSealOpened,
}) {
  const [sealOpened, setSealOpened] = useState(false);
  const [scrollOpened, setScrollOpened] = useState(false);
  const [letterVisible, setLetterVisible] = useState(false);

  const callbacksRef = useRef({});

  useEffect(() => {
    callbacksRef.current = {
      onComplete,
      onSealOpened,
    };
  }, [onComplete, onSealOpened]);

  useEffect(() => {
    if (instant) {
      setSealOpened(true);
      setScrollOpened(true);
      setLetterVisible(true);
      callbacksRef.current.onSealOpened?.();
      callbacksRef.current.onComplete?.();
      return undefined;
    }

    setSealOpened(false);
    setScrollOpened(false);
    setLetterVisible(false);

    const sealTimer = window.setTimeout(() => {
      setSealOpened(true);
      callbacksRef.current.onSealOpened?.();
    }, 1700);

    const scrollTimer = window.setTimeout(() => {
      setScrollOpened(true);
    }, 2850);

    const letterTimer = window.setTimeout(() => {
      setLetterVisible(true);
      callbacksRef.current.onComplete?.();
    }, 5200);

    return () => {
      window.clearTimeout(sealTimer);
      window.clearTimeout(scrollTimer);
      window.clearTimeout(letterTimer);
    };
  }, [letter, instant]);

  return (
    <div className="relative mx-auto w-full max-w-3xl">
      <AnimatePresence>
        {!scrollOpened && (
          <motion.div
            key="sealed-scroll"
            initial={{
              opacity: 0,
              scale: 0.92,
              y: 20,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scaleY: 0.35,
              y: -15,
              transition: { duration: 0.55 },
            }}
            className="relative mx-auto flex min-h-72 max-w-2xl flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-amber-900/60 bg-gradient-to-b from-[#e8ce94] via-[#b99a62] to-[#7a5329] p-8 shadow-2xl"
          >
            <div className="mb-3 text-center font-serif text-sm uppercase tracking-[0.3em] text-amber-950/70">
              A royal message
            </div>

            <div className="relative flex h-32 w-full items-center justify-center overflow-hidden rounded-full border border-amber-950/40 bg-gradient-to-b from-[#f1d9a0] via-[#bd9855] to-[#785024] shadow-inner">
              <div className="h-2 w-2/3 rounded-full bg-amber-950/20" />
            </div>

            <motion.div
              initial={{ scale: 1, rotate: 0 }}
              animate={
                sealOpened
                  ? {
                      scale: [1, 1.12, 0.85, 0],
                      rotate: [-3, 5, -12, 20],
                      y: [0, -8, 4, 30],
                      opacity: [1, 1, 0.8, 0],
                    }
                  : {
                      scale: 1,
                      rotate: 0,
                      opacity: 1,
                    }
              }
              transition={{
                duration: 0.9,
                ease: "easeInOut",
              }}
              className="absolute left-1/2 top-1/2 z-20 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-[5px] border-[#7d1c28] bg-gradient-to-br from-[#c9444d] via-[#8f1729] to-[#5d0b1c] shadow-[0_8px_20px_rgba(0,0,0,0.45)]"
              style={{
                marginLeft: "-3rem",
                marginTop: "-3rem",
              }}
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full border border-rose-200/50">
                <Heart
                  size={27}
                  fill="#f8d8b5"
                  color="#f8d8b5"
                />
              </div>
            </motion.div>

            <p className="mt-7 text-center font-serif text-sm italic text-amber-950/80">
              {sealOpened
                ? "The seal has been opened…"
                : "A sealed letter, made just for you"}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {scrollOpened && (
          <motion.div
            key="opened-scroll"
            initial={{
              opacity: 0,
              scaleY: 0.08,
              height: 80,
              rotateX: -12,
            }}
            animate={{
              opacity: 1,
              scaleY: 1,
              height: "auto",
              rotateX: 0,
            }}
            transition={{
              duration: 1.8,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{
              transformOrigin: "top center",
            }}
            className="relative overflow-hidden rounded-xl border-2 border-amber-900/50 bg-[#b99a62] p-3 shadow-2xl sm:p-5"
          >
            <div className="relative z-10 flex h-7 items-center justify-center rounded-full border border-amber-950/50 bg-gradient-to-b from-[#e8ce94] via-[#a98548] to-[#6d4b24] shadow-lg sm:h-9">
              <div className="h-1 w-1/3 rounded-full bg-amber-950/30" />
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                delay: 1.15,
                duration: 1,
              }}
              className="my-1 border-x-2 border-amber-900/30 bg-[#ead8aa] px-5 py-8 shadow-inner sm:px-12 sm:py-12"
            >
              <h2 className="mb-6 text-center font-serif text-xl font-bold text-[#5d351b] sm:text-3xl">
                A Letter For My Favourite Person
              </h2>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{
                  opacity: letterVisible ? 1 : 0,
                }}
                transition={{
                  duration: 1.1,
                }}
                className="min-h-40 whitespace-pre-wrap break-words font-serif text-base leading-8 text-[#4b301e] sm:text-lg sm:leading-9"
              >
                {letter}
              </motion.div>

              <div className="mt-8 text-right text-2xl text-[#80552e]">
                ❦
              </div>
            </motion.div>

            <div className="relative z-10 flex h-7 items-center justify-center rounded-full border border-amber-950/50 bg-gradient-to-b from-[#e8ce94] via-[#a98548] to-[#6d4b24] shadow-lg sm:h-9">
              <div className="h-1 w-1/3 rounded-full bg-amber-950/30" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* =========================================================
   TYPEWRITER EXPERIENCE
   ========================================================= */

function TypewriterMessage({
  letter,
  showLetter,
  instant,
  onComplete,
}) {
  const [visible, setVisible] = useState("");
  const [finished, setFinished] = useState(false);

  const timerRef = useRef(null);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
    }

    setVisible("");
    setFinished(false);

    if (!showLetter) return undefined;

    if (instant) {
      setVisible(letter);
      setFinished(true);
      onCompleteRef.current?.();
      return undefined;
    }

    if (!letter) {
      setFinished(true);
      onCompleteRef.current?.();
      return undefined;
    }

    let index = 0;
    let cancelled = false;

    const tick = () => {
      if (cancelled) return;

      if (index >= letter.length) {
        setFinished(true);
        onCompleteRef.current?.();
        return;
      }

      const character = letter[index];
      index++;

      setVisible((previous) => previous + character);

      let delay = 35 + Math.random() * 35;

      if (character === " ") {
        delay = 20 + Math.random() * 25;
      } else if (/[.!?]/.test(character)) {
        delay = 350 + Math.random() * 350;
      } else if (/[,;:]/.test(character)) {
        delay = 130 + Math.random() * 180;
      }

      timerRef.current = window.setTimeout(tick, delay);
    };

    timerRef.current = window.setTimeout(tick, 400);

    return () => {
      cancelled = true;

      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, [letter, showLetter, instant]);

  return (
    <div className="min-h-64 whitespace-pre-wrap break-words font-mono text-sm leading-8 sm:text-base sm:leading-9">
      {visible}

      {!finished && showLetter && !instant && letter && (
        <motion.span
          aria-hidden="true"
          animate={{ opacity: [1, 0, 1] }}
          transition={{
            duration: 0.7,
            repeat: Infinity,
          }}
          className="ml-1 inline-block h-4 w-2 bg-stone-700 align-middle"
        />
      )}
    </div>
  );
}

/* =========================================================
   MAIN LETTER EXPERIENCE
   ========================================================= */

function LetterExperience({
  creatorData = {},
  theme,
  onComplete,
}) {
  const letter = creatorData.letter || "";
  const letterStyle =
    creatorData.letterStyle || "royal-scroll";

  const [animationComplete, setAnimationComplete] =
    useState(false);

  const [showLetter, setShowLetter] = useState(false);
  const [instant, setInstant] = useState(false);

  const accent = theme?.colors?.accent || "#f0abfc";
  const textColor = theme?.colors?.text || "#ffffff";

  const isHandwritten = letterStyle === "handwritten";
  const isTypewriter = letterStyle === "typewriter";
  const isRoyal = letterStyle === "royal-scroll";
  const isSimple = letterStyle === "simple";

  const animatedText = isHandwritten || isTypewriter;

  const handleAnimationComplete = useCallback(() => {
    setAnimationComplete(true);
  }, []);

  useEffect(() => {
    setAnimationComplete(false);
    setShowLetter(false);
    setInstant(false);

    if (isRoyal) {
      return undefined;
    }

    const timer = window.setTimeout(() => {
      setShowLetter(true);
    }, 500);

    return () => window.clearTimeout(timer);
  }, [letterStyle, letter, isRoyal]);

  const handleReadInstantly = () => {
    setInstant(true);
    setShowLetter(true);
    setAnimationComplete(true);
  };

  const paperBase =
    "relative mx-auto w-full max-w-3xl overflow-hidden shadow-2xl";

  return (
    <section
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-transparent px-4 py-12 sm:px-8"
      style={{ color: textColor }}
    >
      <div
        className="pointer-events-none absolute left-1/2 top-20 h-64 w-64 -translate-x-1/2 rounded-full blur-[100px]"
        style={{
          backgroundColor: accent,
          opacity: 0.12,
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-5xl"
      >
        <div className="mb-10 text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/20 px-4 py-2 text-sm text-white/80 backdrop-blur-xl"
          >
            <Sparkles size={16} style={{ color: accent }} />
            A message from the heart
            <Heart size={15} style={{ color: accent }} />
          </motion.div>

          <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">
            A Little Letter For You
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-white/70 sm:text-base">
            Some feelings are too special to leave unspoken.
            This little letter was made just for you.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {isRoyal && (
            <motion.div
              key="royal-scroll"
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <RoyalScroll
                letter={letter}
                instant={instant}
                onComplete={handleAnimationComplete}
                onSealOpened={() => setShowLetter(true)}
              />
            </motion.div>
          )}

          {isHandwritten && (
            <motion.div
              key="handwritten"
              initial={{
                opacity: 0,
                height: 100,
                scale: 0.96,
              }}
              animate={{
                opacity: 1,
                height: "auto",
                scale: 1,
              }}
              exit={{
                opacity: 0,
                scale: 0.97,
              }}
              transition={{
                duration: 1,
                ease: "easeOut",
              }}
              className={`${paperBase} rounded-md border border-sky-950/20 bg-[#f8f2df] p-6 sm:p-12`}
              style={{
                backgroundImage:
                  "repeating-linear-gradient(to bottom, transparent 0px, transparent 39px, rgba(85,135,190,0.3) 40px)",
                backgroundPosition: "0 15px",
                color: "#294d70",
              }}
            >
              <div className="mb-6 flex items-center justify-between border-b border-rose-400/50 pb-3">
                <span className="font-serif text-sm italic text-slate-500">
                  A handwritten note
                </span>

                <Heart size={19} className="text-rose-400" />
              </div>

              <HandwrittenMessage
                letter={letter}
                showLetter={showLetter}
                instant={instant}
                onComplete={handleAnimationComplete}
              />

              {animationComplete && (
                <div className="mt-8 text-right font-serif text-2xl italic text-rose-500">
                  With love ♡
                </div>
              )}
            </motion.div>
          )}

          {isTypewriter && (
            <motion.div
              key="typewriter"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.8 }}
              className={`${paperBase} rounded-sm border border-stone-300 bg-[#f5f0e5] p-6 shadow-2xl sm:p-12`}
              style={{ color: "#34312c" }}
            >
              <div className="mb-7 flex items-center justify-between border-b border-stone-300 pb-4 font-mono text-xs uppercase tracking-[0.2em] text-stone-500 sm:text-sm">
                <span>Personal correspondence</span>
                <span>♥</span>
              </div>

              <TypewriterMessage
                letter={letter}
                showLetter={showLetter}
                instant={instant}
                onComplete={handleAnimationComplete}
              />

              <div className="mt-8 border-t border-dashed border-stone-300 pt-4 font-mono text-xs text-stone-500">
                Written especially for you.
              </div>
            </motion.div>
          )}

          {isSimple && (
            <motion.div
              key="simple"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className={`${paperBase} rounded-2xl border border-white/20 bg-white/95 p-7 shadow-2xl sm:p-14`}
              style={{ color: "#292332" }}
            >
              <div className="mb-8 flex items-center justify-between border-b border-purple-200 pb-5">
                <h2 className="text-xl font-semibold sm:text-2xl">
                  A Letter For You
                </h2>

                <Heart size={22} className="text-rose-400" />
              </div>

              <div className="min-h-48 whitespace-pre-wrap break-words text-base leading-8 sm:text-lg sm:leading-9">
                {showLetter || instant ? letter : ""}
              </div>

              <div className="mt-8 text-right text-sm text-slate-500">
                Made with love ♥
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {!letter.trim() && (
          <p className="mt-4 text-center text-sm text-white/70">
            This letter is waiting for its message.
          </p>
        )}

        {!instant &&
          !animationComplete &&
          letter.trim() &&
          (animatedText || isRoyal) && (
            <div className="mt-5 text-center">
              <button
                type="button"
                onClick={handleReadInstantly}
                className="rounded-full border border-white/25 bg-black/25 px-5 py-3 text-sm font-medium text-white/90 shadow-lg backdrop-blur-md transition hover:bg-white/15 active:scale-95"
              >
                Read the full letter now →
              </button>
            </div>
          )}

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-10 flex flex-col items-center"
        >
          <button
            type="button"
            onClick={onComplete}
            className="inline-flex items-center gap-3 rounded-full px-7 py-4 text-sm font-semibold text-white shadow-xl transition hover:brightness-110 active:scale-95"
            style={{
              background: `linear-gradient(135deg, ${accent}, #a855f7)`,
            }}
          >
            Continue our story
            <ArrowRight size={18} />
          </button>

          <p className="mt-4 text-xs text-white/50">
            Every word, chosen with love.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default LetterExperience;