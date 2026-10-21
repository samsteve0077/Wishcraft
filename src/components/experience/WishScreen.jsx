import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Wind, Sparkles, Heart } from "lucide-react";

function WishScreen({
  creatorData = {},
  theme,
  onComplete,
}) {
  const [isBlowing, setIsBlowing] = useState(false);
  const [isBlownOut, setIsBlownOut] = useState(false);

  const timersRef = useRef([]);
  const completedRef = useRef(false);

  const reduceMotion = useReducedMotion();

  // Selected world's colors with safe fallbacks.
  const worldColors = theme?.colors ?? {
    primary: "#8B5CF6",
    secondary: "#D946EF",
    accent: "#C4B5FD",
    background: "#08070D",
    surface: "#171322",
    text: "#FFFFFF",
  };

  const recipientName = creatorData?.recipientName || "you";

  const age = String(creatorData?.age ?? "")
    .trim()
    .replace(/\D/g, "")
    .slice(0, 3);

  const digits = age ? age.split("") : ["2", "2"];

  const schedule = useCallback((callback, delay) => {
    const timer = window.setTimeout(() => {
      timersRef.current = timersRef.current.filter(
        (item) => item !== timer
      );

      callback();
    }, delay);

    timersRef.current.push(timer);
    return timer;
  }, []);

  useEffect(() => {
    return () => {
      timersRef.current.forEach((timer) => {
        window.clearTimeout(timer);
      });

      timersRef.current = [];
    };
  }, []);

  const handleBlow = () => {
    if (isBlowing || isBlownOut || completedRef.current) return;

    setIsBlowing(true);

    // Extinguish the age candles.
    schedule(() => {
      setIsBlownOut(true);
    }, 850);

    // Allow the smoke and darkness to play before the fire transition.
    schedule(() => {
      if (completedRef.current) return;

      completedRef.current = true;
      onComplete?.();
    }, 3200);
  };

  return (
    <main
      className="relative isolate min-h-[100svh] w-full overflow-hidden text-white"
      style={{
        backgroundColor: worldColors.background,
        color: worldColors.text,
      }}
    >
      {/* =====================================================
          WORLD-THEMED BACKGROUND
      ===================================================== */}

      <div
        className="pointer-events-none absolute inset-0 -z-30"
        style={{
          backgroundColor: worldColors.background,
        }}
      />

      <motion.div
        animate={{
          opacity: isBlownOut ? 0.08 : 1,
          scale: isBlownOut ? 1.5 : 1,
        }}
        transition={{ duration: 1.5 }}
        className="pointer-events-none absolute inset-0 -z-20"
        style={{
          background: `
            radial-gradient(
              ellipse at 50% 42%,
              ${worldColors.primary}4D,
              transparent 43%
            ),
            radial-gradient(
              ellipse at 50% 80%,
              ${worldColors.secondary}26,
              transparent 45%
            )
          `,
        }}
      />

      {/* Darkness increases after the candles go out. */}

      <motion.div
        animate={{
          opacity: isBlownOut ? 0.72 : 0.18,
        }}
        transition={{ duration: 1.4 }}
        className="pointer-events-none absolute inset-0 -z-10 bg-black"
      />

      {/* =====================================================
          WORLD-THEMED FLOATING PARTICLES
      ===================================================== */}

      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {Array.from({ length: 32 }).map((_, index) => (
          <motion.span
            key={index}
            className="absolute block rounded-full"
            initial={{ opacity: 0 }}
            animate={
              reduceMotion
                ? {
                    opacity: isBlownOut ? 0.05 : 0.35,
                  }
                : {
                    opacity: isBlownOut
                      ? [0, 0.2, 0]
                      : [0.08, 0.65, 0.12],
                    y: [0, -35 - (index % 5) * 14],
                    x: [0, Math.sin(index * 2) * 12],
                  }
            }
            transition={{
              duration: 3 + (index % 5),
              delay: index * 0.12,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              left: `${(index * 37 + 7) % 96}%`,
              top: `${(index * 23 + 8) % 95}%`,
              width: index % 4 === 0 ? 4 : 2,
              height: index % 4 === 0 ? 4 : 2,
              background: worldColors.accent,
              boxShadow: `0 0 9px ${worldColors.primary}CC`,
            }}
          />
        ))}
      </div>

      {/* =====================================================
          MAIN CONTENT
          Cake and text remain separate sections.
      ===================================================== */}

      <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-[1500px] flex-col items-center px-4 pb-10 pt-8 sm:px-8 sm:pt-10">
        {/* ===================================================
            CAKE AREA
        =================================================== */}

        <motion.section
          animate={{
            opacity: isBlownOut ? 0.7 : 1,
            scale: isBlownOut ? 0.98 : 1,
          }}
          transition={{ duration: 1 }}
          className="relative flex w-full flex-1 flex-col items-center justify-center"
        >
          {/* World-themed candlelight behind the cake */}

          <AnimatePresence>
            {!isBlownOut && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 0.85, scale: 1 }}
                exit={{ opacity: 0, scale: 1.5 }}
                transition={{ duration: 1.2 }}
                className="pointer-events-none absolute left-1/2 top-[38%] h-[330px] w-[330px] -translate-x-1/2 -translate-y-1/2 rounded-full sm:h-[520px] sm:w-[520px]"
                style={{
                  background: `
                    radial-gradient(
                      circle,
                      ${worldColors.primary}30,
                      ${worldColors.secondary}0F 45%,
                      transparent 70%
                    )
                  `,
                  filter: "blur(30px)",
                }}
              />
            )}
          </AnimatePresence>

          {/* Entire cake illustration */}

          <div className="relative w-full max-w-[650px]">
            {/* AGE CANDLES */}

            <div className="relative z-30 mb-1 flex min-h-[100px] items-end justify-center gap-1 sm:min-h-[125px] sm:gap-3">
              {digits.map((digit, index) => (
                <AgeCandle
                  key={`${digit}-${index}`}
                  digit={digit}
                  isBlownOut={isBlownOut}
                  isBlowing={isBlowing}
                  delay={index * 0.12}
                  reduceMotion={reduceMotion}
                />
              ))}
            </div>

            {/* ================= UPPER TIER ================= */}

            <div className="relative z-20 mx-auto w-[65%]">
              {/* Top cream surface */}

              <div
                className="relative h-[27px] rounded-[50%] border border-white/30 sm:h-[35px]"
                style={{
                  background:
                    "linear-gradient(180deg,#fff4e9 0%,#f5d7d1 45%,#c78d9b 100%)",
                  boxShadow:
                    "inset 0 4px 8px rgba(255,255,255,.65), 0 4px 12px rgba(0,0,0,.3)",
                }}
              />

              {/* Upper tier body */}

              <div
                className="relative -mt-[9px] h-[78px] overflow-hidden rounded-b-[19px] border-x border-b border-rose-100/20 sm:h-[100px]"
                style={{
                  background:
                    "linear-gradient(90deg,#704154 0%,#c08394 13%,#f1c6c0 38%,#e9b6b8 61%,#bf8093 87%,#65384e 100%)",
                  boxShadow:
                    "inset 0 -13px 18px rgba(62,19,39,.35), inset 0 5px 9px rgba(255,255,255,.2), 0 10px 18px rgba(0,0,0,.3)",
                }}
              >
                {/* Cream dripping down the cake */}

                <div
                  className="absolute inset-x-0 top-0 h-[23px]"
                  style={{
                    background:
                      "linear-gradient(180deg,#fff1e7,#f5cbd0 70%,#e3a7b7)",
                    clipPath:
                      "polygon(0 0,100% 0,100% 55%,91% 55%,87% 100%,81% 100%,77% 55%,65% 55%,61% 88%,56% 88%,52% 55%,39% 55%,35% 100%,29% 100%,25% 55%,12% 55%,8% 100%,3% 100%,0 55%)",
                  }}
                />

                {/* Cream rosettes */}

                <div className="absolute left-[5%] right-[5%] top-[8px] flex justify-between">
                  {[0, 1, 2, 3, 4].map((item) => (
                    <CreamRose key={item} size={17} />
                  ))}
                </div>

                {/* Gold floral details */}

                <div className="absolute inset-x-[13%] top-[45px] flex justify-between sm:top-[57px]">
                  {[0, 1, 2, 3].map((item) => (
                    <GoldFlower key={item} size={12} />
                  ))}
                </div>

                {/* Fine gold piping */}

                <div
                  className="absolute bottom-[10px] left-[5%] right-[5%] h-[2px]"
                  style={{
                    background:
                      "linear-gradient(90deg,transparent,#f8d99b,#fff0c7,#f8d99b,transparent)",
                  }}
                />

                {/* Warm reflection while candles are lit */}

                <motion.div
                  animate={{
                    opacity: isBlownOut ? 0 : [0.08, 0.28, 0.12],
                  }}
                  transition={{
                    duration: 2,
                    repeat: isBlownOut || reduceMotion ? 0 : Infinity,
                  }}
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg,rgba(255,222,174,.28),transparent 75%)",
                  }}
                />
              </div>

              {/* Gold trim beneath upper tier */}

              <div
                className="relative z-10 -mt-[2px] h-[8px] rounded-[50%]"
                style={{
                  background:
                    "linear-gradient(180deg,#fff0c5,#d4a25e 65%,#84502c)",
                  boxShadow: "0 4px 8px rgba(0,0,0,.4)",
                }}
              />
            </div>

            {/* ================= FLOWER BRIDGE ================= */}

            <div className="relative z-30 mx-auto -mt-[1px] flex h-[36px] w-[82%] items-center justify-around sm:h-[44px]">
              <Rose size={24} color="#a82044" />
              <CreamRose size={19} />
              <Rose size={31} color="#d13b60" />
              <CreamRose size={19} />
              <Rose size={24} color="#942143" />
            </div>

            {/* ================= LOWER TIER ================= */}

            <div className="relative z-20 mx-auto -mt-[7px] w-full">
              {/* Large top frosting */}

              <div
                className="relative h-[34px] rounded-[50%] border border-white/30 sm:h-[42px]"
                style={{
                  background:
                    "linear-gradient(180deg,#fff5eb 0%,#f4d4cb 48%,#c28b98 100%)",
                  boxShadow:
                    "inset 0 5px 9px rgba(255,255,255,.55), 0 5px 12px rgba(0,0,0,.3)",
                }}
              />

              {/* Main lower cake body */}

              <div
                className="relative -mt-[12px] h-[105px] overflow-hidden rounded-b-[22px] border-x border-b border-rose-100/20 sm:h-[135px]"
                style={{
                  background:
                    "linear-gradient(90deg,#583047 0%,#ac6a80 10%,#e8b9b9 29%,#f7d8c9 49%,#e6b2b4 71%,#a55f76 91%,#4d293f 100%)",
                  boxShadow:
                    "inset 0 -17px 23px rgba(60,18,33,.32), inset 0 5px 8px rgba(255,255,255,.25), 0 16px 27px rgba(0,0,0,.45)",
                }}
              >
                {/* Glossy cream highlight */}

                <div className="absolute inset-x-0 top-0 h-[18px] bg-gradient-to-b from-white/35 to-transparent" />

                {/* Decorative frosting drips */}

                <div
                  className="absolute inset-x-0 top-[7px] h-[32px] sm:h-[39px]"
                  style={{
                    background:
                      "linear-gradient(180deg,#ffe9df,#eab4bd 85%,#cd8a9e)",
                    clipPath:
                      "polygon(0 0,100% 0,100% 45%,95% 45%,91% 100%,85% 100%,81% 45%,69% 45%,65% 80%,60% 80%,56% 45%,43% 45%,39% 100%,34% 100%,30% 45%,18% 45%,14% 88%,9% 88%,5% 45%,0 45%)",
                  }}
                />

                {/* Upper line of cream flowers */}

                <div className="absolute left-[5%] right-[5%] top-[43px] flex justify-around sm:top-[48px]">
                  {[0, 1, 2, 3, 4, 5, 6].map((item) => (
                    <CreamRose key={item} size={15} />
                  ))}
                </div>

                {/* Gold flower pattern */}

                <div className="absolute inset-x-[12%] top-[70px] flex justify-between sm:top-[85px]">
                  {[0, 1, 2, 3, 4].map((item) => (
                    <GoldFlower key={item} size={14} />
                  ))}
                </div>

                {/* Fine gold piping */}

                <div
                  className="absolute bottom-[15px] left-[5%] right-[5%] h-[2px]"
                  style={{
                    background:
                      "linear-gradient(90deg,transparent,#edc47e,#fff0c4,#edc47e,transparent)",
                    boxShadow: "0 0 5px rgba(255,210,132,.3)",
                  }}
                />

                {/* Fine cake texture */}

                <div
                  className="pointer-events-none absolute inset-0 opacity-[0.07]"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 20% 30%,rgba(255,255,255,.7) 0 1px,transparent 2px),radial-gradient(circle at 75% 60%,rgba(93,40,49,.4) 0 1px,transparent 2px)",
                    backgroundSize: "19px 23px,27px 31px",
                  }}
                />

                {/* Flickering warm light */}

                <motion.div
                  animate={{
                    opacity: isBlownOut
                      ? 0
                      : reduceMotion
                        ? 0.18
                        : [0.08, 0.25, 0.12],
                  }}
                  transition={{
                    duration: 1.8,
                    repeat:
                      isBlownOut || reduceMotion ? 0 : Infinity,
                    ease: "easeInOut",
                  }}
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg,rgba(255,219,174,.28),rgba(255,151,94,.06) 70%,transparent)",
                  }}
                />
              </div>

              {/* Gold lower rim */}

              <div
                className="relative z-10 -mt-[2px] h-[9px] rounded-[50%] sm:h-[11px]"
                style={{
                  background:
                    "linear-gradient(180deg,#fff0c7,#d4a05b 60%,#80502e 100%)",
                  boxShadow: "0 5px 9px rgba(0,0,0,.45)",
                }}
              />
            </div>

            {/* Decorative roses */}

            <div className="pointer-events-none absolute bottom-[-2px] left-[3%] z-40">
              <Rose size={39} color="#a51e40" />
            </div>

            <div className="pointer-events-none absolute bottom-[-2px] right-[3%] z-40">
              <Rose size={39} color="#7e1838" />
            </div>

            <div className="pointer-events-none absolute bottom-[99px] left-[8%] z-40 sm:bottom-[126px]">
              <Rose size={27} color="#cf5265" />
            </div>

            <div className="pointer-events-none absolute bottom-[99px] right-[8%] z-40 sm:bottom-[126px]">
              <Rose size={27} color="#9c2747" />
            </div>

            {/* Gold cake board */}

            <div
              className="relative z-10 mx-auto -mt-[1px] h-[15px] w-[108%] rounded-[50%] border border-amber-100/25 sm:h-[22px]"
              style={{
                background:
                  "linear-gradient(180deg,#fff0bd 0%,#d9a454 35%,#845326 75%,#392017 100%)",
                boxShadow:
                  "inset 0 3px 4px rgba(255,255,255,.45), 0 10px 20px rgba(0,0,0,.7)",
              }}
            />

            {/* Ground shadow */}

            <div
              className="pointer-events-none absolute -bottom-5 left-1/2 h-8 w-[95%] -translate-x-1/2 rounded-full"
              style={{
                background: "rgba(0,0,0,.75)",
                filter: "blur(12px)",
              }}
            />
          </div>

          {/* Smoke rises from the actual cake candles */}

          <AnimatePresence>
            {isBlownOut && (
              <div className="pointer-events-none absolute left-1/2 top-[6%] z-50 -translate-x-1/2">
                {digits.map((_, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 0, scale: 0.5 }}
                    animate={{
                      opacity: [0, 0.42, 0],
                      y: -55,
                      x: (index - (digits.length - 1) / 2) * 13,
                      scale: [0.5, 1.2, 1.7],
                    }}
                    transition={{
                      duration: 2,
                      delay: index * 0.12,
                      ease: "easeOut",
                    }}
                    className="absolute h-8 w-5 rounded-full bg-gradient-to-t from-slate-300/5 via-slate-200/25 to-transparent blur-[5px]"
                    style={{
                      left: `${(index - (digits.length - 1) / 2) * 35}px`,
                    }}
                  />
                ))}
              </div>
            )}
          </AnimatePresence>
        </motion.section>

        {/* ===================================================
            TEXT AREA — ALWAYS BELOW THE CAKE
        =================================================== */}

        <motion.section
          layout
          className="relative z-50 flex w-full max-w-3xl shrink-0 flex-col items-center px-2 pb-1 pt-8 text-center sm:pt-10"
        >
          {/* Decorative divider */}

          <div className="mb-4 flex w-full max-w-[460px] items-center gap-4">
            <span
              className="h-px flex-1"
              style={{
                background: `linear-gradient(to right, transparent, ${worldColors.accent}99, ${worldColors.accent}4D)`,
              }}
            />

            <span
              className="whitespace-nowrap text-[9px] font-semibold uppercase tracking-[0.34em] sm:text-[11px]"
              style={{ color: `${worldColors.accent}CC` }}
            >
              A little magic
            </span>

            <span
              className="h-px flex-1"
              style={{
                background: `linear-gradient(to left, transparent, ${worldColors.accent}99, ${worldColors.accent}4D)`,
              }}
            />
          </div>

          <div
            className="mb-3 flex items-center gap-3"
            style={{ color: worldColors.accent }}
          >
            <span
              className="h-px w-10"
              style={{ backgroundColor: `${worldColors.accent}4D` }}
            />

            <Heart size={15} />

            <span
              className="h-px w-10"
              style={{ backgroundColor: `${worldColors.accent}4D` }}
            />
          </div>

          <AnimatePresence mode="wait">
            {!isBlownOut ? (
              <motion.div
                key="wish-message"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.5 }}
                className="flex w-full flex-col items-center"
              >
                <h1
                  className="heading-font text-4xl font-bold leading-tight sm:text-5xl md:text-6xl"
                  style={{
                    backgroundImage: `linear-gradient(
                      180deg,
                      ${worldColors.text} 0%,
                      ${worldColors.accent} 55%,
                      ${worldColors.primary} 100%
                    )`,
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                    filter: `drop-shadow(0 4px 18px ${worldColors.primary}33)`,
                  }}
                >
                  Make a Wish...
                </h1>

                <p className="body-font mt-4 max-w-xl text-sm leading-7 text-stone-300 sm:text-base md:text-lg">
                  Close your eyes, {recipientName}, make a wish,
                  <br className="hidden sm:block" />
                  and gently blow out your age candles.
                </p>

                <motion.button
                  type="button"
                  onClick={handleBlow}
                  disabled={isBlowing}
                  whileHover={
                    reduceMotion ? {} : { scale: 1.045, y: -2 }
                  }
                  whileTap={{ scale: 0.97 }}
                  className="mt-7 inline-flex min-h-[56px] items-center justify-center gap-3 rounded-2xl px-8 py-4 text-base font-bold text-white transition-shadow disabled:cursor-wait disabled:opacity-80 sm:min-w-[280px] sm:text-lg"
                  style={{
                    background: `linear-gradient(
                      100deg,
                      ${worldColors.primary} 0%,
                      ${worldColors.secondary} 100%
                    )`,
                    boxShadow: `0 0 35px ${worldColors.primary}33`,
                  }}
                >
                  <Wind size={23} />

                  {isBlowing ? "Make a wish..." : "Blow the Candles"}
                </motion.button>

                <p className="mt-4 text-xs text-stone-400">
                  Take a breath, make your wish, and let the magic begin. ✨
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="blown-message"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="flex flex-col items-center"
              >
                <Sparkles
                  className="mb-3"
                  style={{ color: worldColors.accent }}
                  size={27}
                />

                <h2
                  className="heading-font text-3xl font-bold sm:text-4xl"
                  style={{ color: worldColors.text }}
                >
                  Your wish is in the stars...
                </h2>

                <p className="body-font mt-3 max-w-lg text-sm leading-7 text-stone-300 sm:text-base">
                  Hold that wish close. Something magical is about to happen.
                </p>

                <motion.div
                  initial={{ opacity: 0, scaleX: 0 }}
                  animate={{ opacity: 1, scaleX: 1 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="mt-6 h-px w-32"
                  style={{
                    background: `linear-gradient(to right, transparent, ${worldColors.accent}B3, transparent)`,
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.section>
      </div>
    </main>
  );
}

/* =============================================================
   AGE CANDLES — THE FLAMES BELONG TO THE AGE DIGITS
============================================================= */

function AgeCandle({
  digit,
  isBlownOut,
  isBlowing,
  delay,
  reduceMotion,
}) {
  const flameVisible = !isBlownOut;

  return (
    <div className="relative flex min-w-[48px] items-end justify-center sm:min-w-[66px]">
      {/* Wick directly above the number */}

      <div
        className="absolute left-1/2 top-[1px] z-30 h-[8px] w-[3px] -translate-x-1/2 rounded-full"
        style={{
          background: "linear-gradient(90deg,#573623,#9b6c45,#40261b)",
        }}
      />

      {/* Flame */}

      <AnimatePresence>
        {flameVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.2, y: 5 }}
            animate={
              reduceMotion
                ? { opacity: 1, scale: 1 }
                : {
                    opacity: [0.92, 1, 0.94, 1],
                    scale: [1, 1.08, 0.96, 1.04, 1],
                    rotate: [-2, 2, -3, 1, -2],
                    y: [0, -2, 1, 0],
                  }
            }
            exit={{
              opacity: 0,
              scale: 0.3,
              y: -8,
              transition: { duration: 0.25 },
            }}
            transition={{
              delay,
              duration: 0.8,
              repeat: reduceMotion ? 0 : Infinity,
              ease: "easeInOut",
            }}
            className="absolute -top-[37px] z-40"
          >
            <Flame />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Number-shaped candle */}

      <motion.span
        animate={{
          filter: isBlownOut
            ? "brightness(.36) saturate(.7)"
            : isBlowing
              ? "brightness(1.05)"
              : "brightness(1.2) drop-shadow(0 0 13px rgba(255,174,71,.8))",
        }}
        transition={{ duration: 0.7 }}
        className="relative z-20 flex min-h-[79px] items-end justify-center font-serif text-[68px] font-bold leading-[0.95] text-transparent sm:min-h-[100px] sm:text-[91px]"
        style={{
          backgroundImage:
            "linear-gradient(180deg,#fff8d5 0%,#ffd982 35%,#e9a04d 68%,#a35a2d 100%)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          WebkitTextStroke: "1px rgba(255,231,177,.5)",
          textShadow: "0 4px 3px rgba(0,0,0,.8)",
        }}
      >
        {digit}
      </motion.span>
    </div>
  );
}

/* =============================================================
   CSS FLAME — NO EMOJI
============================================================= */

function Flame() {
  return (
    <div
      className="relative h-[33px] w-[22px] sm:h-[38px] sm:w-[25px]"
      style={{
        filter: "drop-shadow(0 0 8px rgba(255,128,35,.8))",
      }}
    >
      <div
        className="absolute bottom-0 left-1/2 h-full w-[76%] -translate-x-1/2"
        style={{
          borderRadius: "55% 45% 48% 52% / 68% 68% 32% 32%",
          background:
            "linear-gradient(180deg,#fff6bd 0%,#ffdb67 28%,#ff9636 63%,#e84a20 100%)",
        }}
      />

      <div
        className="absolute bottom-[3px] left-1/2 h-[65%] w-[39%] -translate-x-1/2"
        style={{
          borderRadius: "55% 45% 48% 52% / 68% 68% 32% 32%",
          background:
            "linear-gradient(180deg,#ffffff 0%,#fff8d7 55%,#ffd966 100%)",
        }}
      />
    </div>
  );
}

/* =============================================================
   CREAM ROSETTE
============================================================= */

function CreamRose({ size = 20 }) {
  return (
    <div
      className="relative shrink-0"
      style={{ width: size, height: size }}
    >
      {Array.from({ length: 8 }).map((_, index) => (
        <span
          key={index}
          className="absolute left-1/2 top-1/2 rounded-full"
          style={{
            width: size * 0.43,
            height: size * 0.43,
            background:
              "linear-gradient(140deg,#fffdf3 0%,#f8e6cd 50%,#d4ad96 100%)",
            boxShadow: "inset -1px -2px 2px rgba(130,80,65,.13)",
            transform: `translate(-50%,-50%) rotate(${index * 45}deg) translateY(-${size * 0.2}px)`,
          }}
        />
      ))}

      <span
        className="absolute left-1/2 top-1/2 h-[24%] w-[24%] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background: "linear-gradient(135deg,#fff8e7,#e2bca0)",
        }}
      />
    </div>
  );
}

/* =============================================================
   DECORATIVE ROSE
============================================================= */

function Rose({ size = 30, color = "#b12649" }) {
  const petals = [
    [0, -0.2],
    [0.18, -0.12],
    [0.2, 0.1],
    [0.04, 0.21],
    [-0.17, 0.15],
    [-0.2, -0.07],
    [0, 0],
  ];

  return (
    <div
      className="relative shrink-0"
      style={{
        width: size,
        height: size,
        filter: "drop-shadow(0 2px 3px rgba(0,0,0,.4))",
      }}
    >
      {petals.map(([x, y], index) => (
        <span
          key={index}
          className="absolute left-1/2 top-1/2 rounded-[55%_45%_60%_40%]"
          style={{
            width: size * (index === 6 ? 0.43 : 0.5),
            height: size * (index === 6 ? 0.43 : 0.5),
            marginLeft:
              size * x - size * (index === 6 ? 0.215 : 0.25),
            marginTop:
              size * y - size * (index === 6 ? 0.215 : 0.25),
            background:
              index === 6
                ? "radial-gradient(circle at 35% 30%,#ffa6ad,#d34c6a 70%,#7e1738)"
                : `linear-gradient(${index * 48}deg,#f7a4ad 0%,${color} 55%,#59152d 100%)`,
            border: "1px solid rgba(255,210,205,.15)",
            transform: `rotate(${index * 48}deg)`,
          }}
        />
      ))}

      <span
        className="absolute left-1/2 top-1/2 h-[24%] w-[24%] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle at 35% 30%,#ffd6bd,#d66a76 70%,#782039)",
        }}
      />
    </div>
  );
}

/* =============================================================
   GOLD FLOWER
============================================================= */

function GoldFlower({ size = 14 }) {
  return (
    <div
      className="relative shrink-0"
      style={{ width: size, height: size }}
    >
      {Array.from({ length: 8 }).map((_, index) => (
        <span
          key={index}
          className="absolute left-1/2 top-1/2 rounded-full"
          style={{
            width: size * 0.22,
            height: size * 0.44,
            background:
              "linear-gradient(90deg,#b47b31,#fff0ad,#c18b3c)",
            transform: `translate(-50%,-50%) rotate(${index * 45}deg) translateY(-${size * 0.17}px)`,
          }}
        />
      ))}

      <span className="absolute left-1/2 top-1/2 h-[24%] w-[24%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#fff0bd]" />
    </div>
  );
}

export default WishScreen;