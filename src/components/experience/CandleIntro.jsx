import { useState, useEffect, useRef, useCallback } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

function CandleIntro({
  creatorData = {},
  theme,
  onComplete,
}) {
  const [isLit, setIsLit] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [ignitionFlash, setIgnitionFlash] = useState(false);

  const ageCandlesRef = useRef(null);
  const lighterRef = useRef(null);
  const litRef = useRef(false);
  const completedRef = useRef(false);
  const timersRef = useRef([]);
  const frameRef = useRef(null);

  const reduceMotion = useReducedMotion();

    // Selected world's visual theme
  const worldColors = theme?.colors ?? {
    primary: "#8B5CF6",
    secondary: "#D946EF",
    accent: "#C4B5FD",
    background: "#08070D",
    surface: "#171322",
    text: "#FFFFFF",
  };


  const age = String(creatorData?.age ?? "")
    .trim()
    .replace(/\D/g, "")
    .slice(0, 3);

  const digits = age ? age.split("") : [];

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

  // ------------------------------------------------------------
  // IGNITE THE AGE CANDLES
  // Do not transition away from the cake at this stage.
  // ------------------------------------------------------------

  const ignite = useCallback(() => {
    if (litRef.current || completedRef.current) return;

    litRef.current = true;
    setIsLit(true);
    setIsDragging(false);
    setIgnitionFlash(true);

    schedule(() => setIgnitionFlash(false), 1000);

    // Keep the illuminated cake on screen briefly, then move to WishScreen.
    schedule(() => {
      if (completedRef.current) return;
      completedRef.current = true;
      onComplete?.();
    }, reduceMotion ? 1500 : 3200);
  }, [onComplete, reduceMotion, schedule]);

  // ------------------------------------------------------------
  // CHECK WHETHER THE LIGHTER HAS REACHED THE AGE CANDLES
  // ------------------------------------------------------------

  const checkCollision = useCallback(() => {
    if (litRef.current) return;

    const lighter = lighterRef.current;
    const candles = ageCandlesRef.current;

    if (!lighter || !candles || digits.length === 0) return;

    const lighterRect = lighter.getBoundingClientRect();
    const candleRect = candles.getBoundingClientRect();

    // Position of the lighter flame, not its entire body.
    const flameX = lighterRect.left + lighterRect.width / 2;
    const flameY = lighterRect.top + 5;

    // Forgiving target area around the age candles.
    const paddingX = 28;
    const paddingTop = 35;
    const paddingBottom = 18;

    const reachedCandles =
      flameX >= candleRect.left - paddingX &&
      flameX <= candleRect.right + paddingX &&
      flameY >= candleRect.top - paddingTop &&
      flameY <= candleRect.bottom + paddingBottom;

    if (reachedCandles) ignite();
  }, [digits.length, ignite]);

  const queueCollisionCheck = useCallback(() => {
    if (frameRef.current !== null) {
      cancelAnimationFrame(frameRef.current);
    }

    frameRef.current = requestAnimationFrame(() => {
      frameRef.current = null;
      checkCollision();
    });
  }, [checkCollision]);

  // ------------------------------------------------------------
  // CLEAN UP TIMERS AND ANIMATION FRAMES
  // ------------------------------------------------------------

  useEffect(() => {
    return () => {
      timersRef.current.forEach((timer) => window.clearTimeout(timer));
      timersRef.current = [];

      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
    };
  }, []);

  return (
    <main
  className="relative isolate min-h-[100svh] w-full overflow-hidden text-white"
  style={{
    backgroundColor: worldColors.background,
    color: worldColors.text,
  }}
>

      {/* DARK ROOM */}

      <div
  className="pointer-events-none absolute inset-0 -z-30"
  style={{ backgroundColor: worldColors.background }}
/>

      <div
        className="pointer-events-none absolute inset-0 -z-20"
        style={{
          background: `
  radial-gradient(
    ellipse at 50% 65%,
    ${worldColors.primary}30,
    transparent 48%
  ),
  linear-gradient(
    180deg,
    ${worldColors.background},
    ${worldColors.surface} 65%,
    ${worldColors.background}
  )
`,
        }}
      />

      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 10%, rgba(0,0,0,.45) 65%, rgba(0,0,0,.88) 100%)",
        }}
      />

      {/* WARM LIGHT AFTER IGNITION */}

      <AnimatePresence>
        {isLit && (
          <motion.div
            initial={{ opacity: 0, scale: 0.2 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.3 }}
            transition={{ duration: 1.4, ease: "easeOut" }}
            className="pointer-events-none absolute left-1/2 top-[48%] z-0 h-[550px] w-[550px] -translate-x-1/2 -translate-y-1/2 rounded-full sm:h-[800px] sm:w-[800px]"
            style={{
              background:
                "radial-gradient(circle, rgba(255,179,89,.24), rgba(255,119,55,.08) 36%, transparent 70%)",
              filter: "blur(35px)",
            }}
          />
        )}
      </AnimatePresence>

      {/* AMBIENT EMBERS */}

      <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
        {Array.from({ length: 20 }).map((_, index) => (
          <motion.span
            key={index}
            className="absolute block rounded-full"
            animate={
              reduceMotion
                ? { opacity: isLit ? 0.35 : 0.06 }
                : {
                    opacity:
                      isLit
                        ? [0.1, 0.7, 0.1]
                        : [0, 0.12, 0],
                    y: [0, -75 - (index % 4) * 20],
                    x: [0, Math.sin(index * 2) * 20],
                  }
            }
            transition={{
              duration: 3 + (index % 4),
              delay: index * 0.12,
              repeat: Infinity,
              ease: "easeOut",
            }}
            style={{
  background: `
    radial-gradient(
      circle,
      ${worldColors.primary}45,
      ${worldColors.secondary}20 36%,
      transparent 70%
    )
  `,
  filter: "blur(35px)",
}}
          />
        ))}
      </div>

      {/* HEADER */}

      <motion.header
        animate={{
          opacity: isLit ? 0 : 1,
          y: isLit ? -10 : 0,
        }}
        transition={{ duration: 0.7 }}
        className="absolute left-0 right-0 top-7 z-50 px-4 text-center sm:top-9"
      >
        <p className="text-[10px] font-semibold uppercase tracking-[0.4em] text-amber-100/55 sm:text-xs">
          A moment made just for you
        </p>

        <div className="mx-auto mt-4 flex max-w-xs items-center gap-3">
          <span className="h-px flex-1 bg-gradient-to-r from-transparent to-amber-200/30" />
          <span className="text-xs text-amber-200/75">♡</span>
          <span className="h-px flex-1 bg-gradient-to-l from-transparent to-amber-200/30" />
        </div>

        <p className="body-font mt-4 text-sm text-slate-300/80 sm:text-base">
          A little surprise is waiting for you...
        </p>
      </motion.header>

      {/* ======================================================
          THE CAKE — BOTH TIERS AND AGE CANDLES
      ====================================================== */}

      <motion.div
        animate={{ scale: isLit ? 1.025 : 1, y: isLit ? -3 : 0 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        className="absolute left-1/2 top-[52%] z-20 w-[min(94vw,650px)] -translate-x-1/2 -translate-y-1/2"
      >
        {/* Cake shadow */}

        <div
          className="absolute -bottom-10 left-1/2 h-12 w-[115%] -translate-x-1/2 rounded-full"
          style={{
            background: "rgba(0,0,0,.9)",
            filter: "blur(12px)",
          }}
        />

        {/* AGE-SHAPED CANDLES */}

        <div
          ref={ageCandlesRef}
          className="relative z-40 mx-auto mb-[-4px] flex min-h-[110px] items-end justify-center gap-2 sm:min-h-[138px] sm:gap-4"
        >
          {digits.length > 0 ? (
            digits.map((digit, index) => (
              <AgeCandle
                key={`${digit}-${index}`}
                digit={digit}
                isLit={isLit}
                delay={index * 0.12}
                reduceMotion={reduceMotion}
              />
            ))
          ) : (
            <div className="flex min-h-[94px] items-center justify-center text-xs tracking-wide text-amber-100/50">
              Add an age in Birthday Info to display age candles
            </div>
          )}
        </div>

        {/* UPPER TIER */}

        <div className="relative z-30 mx-auto w-[65%]">
          <div
            className="relative h-[34px] rounded-[50%] border border-rose-100/20"
            style={{
              background:
                "linear-gradient(180deg,#fff0df 0%,#edc6ba 45%,#b97884 100%)",
              boxShadow:
                "inset 0 4px 8px rgba(255,255,255,.55), 0 5px 12px rgba(0,0,0,.4)",
            }}
          />

          <div
            className="relative -mt-[12px] h-[83px] overflow-hidden rounded-b-[19px] border-x border-b border-rose-100/15 sm:h-[100px]"
            style={{
              background:
                "linear-gradient(90deg,#603343 0%,#b87683 10%,#f1cfc2 35%,#e9b9b4 60%,#c17e8b 86%,#563044 100%)",
              boxShadow:
                "inset 0 -14px 19px rgba(65,20,36,.3), inset 0 4px 8px rgba(255,255,255,.25), 0 12px 22px rgba(0,0,0,.35)",
            }}
          >
            {/* Dripping icing */}

            <div
              className="absolute inset-x-0 top-0 h-[25px]"
              style={{
                background:
                  "linear-gradient(180deg,#fff1e5,#f1c5c4 70%,#dba1af)",
                clipPath:
                  "polygon(0 0,100% 0,100% 56%,92% 56%,88% 100%,82% 100%,78% 56%,65% 56%,61% 91%,56% 91%,52% 56%,38% 56%,34% 100%,29% 100%,25% 56%,12% 56%,8% 100%,3% 100%,0 56%)",
              }}
            />

            <div className="absolute left-[5%] right-[5%] top-[7px] flex justify-between">
              {[0, 1, 2, 3, 4].map((item) => (
                <CreamSwirl key={item} size={19} />
              ))}
            </div>

            <div className="absolute inset-x-[12%] top-[47px] flex justify-between">
              {[0, 1, 2, 3].map((item) => (
                <GoldStar key={item} size={12} />
              ))}
            </div>

            <div
              className="absolute bottom-[11px] left-[5%] right-[5%] h-[2px]"
              style={{
                background:
                  "linear-gradient(90deg,transparent,#f7d89c,#fff0c7,#f7d89c,transparent)",
              }}
            />

            <motion.div
              animate={{ opacity: isLit ? 0.3 : 0 }}
              transition={{ duration: 1.4 }}
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg,rgba(255,204,148,.32),rgba(255,145,86,.07) 70%,transparent)",
              }}
            />
          </div>

          <div
            className="relative z-10 -mt-[2px] h-[9px] rounded-[50%]"
            style={{
              background:
                "linear-gradient(180deg,#fff0c5,#d3a15b 65%,#80502e)",
              boxShadow: "0 4px 8px rgba(0,0,0,.35)",
            }}
          />
        </div>

        {/* FLOWERS BETWEEN TIERS */}

        <div className="relative z-40 mx-auto -mt-[2px] flex h-[42px] w-[83%] items-center justify-around">
          <Rose size={23} color="#a51f42" />
          <CreamSwirl size={20} />
          <Rose size={31} color="#c73550" />
          <CreamSwirl size={20} />
          <Rose size={23} color="#8f1938" />
        </div>

        {/* LOWER TIER */}

        <div className="relative z-20 mx-auto -mt-[10px] w-full">
          <div
            className="relative h-[40px] rounded-[50%] border border-rose-100/20"
            style={{
              background:
                "linear-gradient(180deg,#fff0df 0%,#eec8be 48%,#bd8490 100%)",
              boxShadow:
                "inset 0 5px 8px rgba(255,255,255,.4), 0 6px 12px rgba(0,0,0,.35)",
            }}
          />

          <div
            className="relative -mt-[15px] h-[105px] overflow-hidden rounded-b-[23px] border-x border-b border-rose-100/15 sm:h-[135px]"
            style={{
              background:
                "linear-gradient(90deg,#492434 0%,#9f5c70 9%,#e9b9b2 28%,#f7d7c6 48%,#e5b0ae 72%,#a35c71 91%,#412031 100%)",
              boxShadow:
                "inset 0 -17px 23px rgba(60,18,33,.32), inset 0 5px 8px rgba(255,255,255,.22), 0 20px 32px rgba(0,0,0,.48)",
            }}
          >
            <div className="absolute inset-x-0 top-0 h-[19px] bg-gradient-to-b from-white/35 to-transparent" />

            <div
              className="absolute inset-x-0 top-[8px] h-[36px]"
              style={{
                background:
                  "linear-gradient(180deg,#ffe1d7,#e5a5b1 85%,#c77f94)",
                clipPath:
                  "polygon(0 0,100% 0,100% 44%,95% 44%,91% 100%,85% 100%,81% 44%,69% 44%,65% 80%,60% 80%,56% 44%,43% 44%,39% 100%,34% 100%,30% 44%,18% 44%,14% 88%,9% 88%,5% 44%,0 44%)",
              }}
            />

            <div className="absolute left-[5%] right-[5%] top-[42px] flex items-center justify-around">
              {[0, 1, 2, 3, 4, 5, 6].map((item) => (
                <CreamSwirl key={item} size={17} />
              ))}
            </div>

            <div className="absolute inset-x-[12%] top-[67px] flex justify-between sm:top-[85px]">
              {[0, 1, 2, 3, 4].map((item) => (
                <GoldStar key={item} size={15} />
              ))}
            </div>

            <div
              className="absolute bottom-[18px] left-[5%] right-[5%] h-[2px]"
              style={{
                background:
                  "linear-gradient(90deg,transparent,#edc47e,#fff0c4,#edc47e,transparent)",
                boxShadow: "0 0 5px rgba(255,210,132,.3)",
              }}
            />

            <div
              className="absolute inset-0 opacity-[0.1]"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 20% 30%,rgba(255,255,255,.5) 0 1px,transparent 2px),radial-gradient(circle at 75% 60%,rgba(93,40,49,.3) 0 1px,transparent 2px)",
                backgroundSize: "23px 27px,31px 33px",
              }}
            />

            <motion.div
              animate={{
                opacity:
                  isLit && !reduceMotion
                    ? [0.12, 0.38, 0.17]
                    : isLit
                      ? 0.25
                      : 0,
              }}
              transition={{
                duration: 2.1,
                repeat: isLit && !reduceMotion ? Infinity : 0,
                ease: "easeInOut",
              }}
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg,rgba(255,204,148,.32),rgba(255,145,86,.07) 70%,transparent)",
              }}
            />
          </div>

          <div
            className="relative z-10 -mt-[2px] h-[11px] rounded-[50%]"
            style={{
              background:
                "linear-gradient(180deg,#fff0c7,#d3a05b 60%,#80502e 100%)",
              boxShadow: "0 5px 9px rgba(0,0,0,.45)",
            }}
          />
        </div>

        {/* ROSES ON CAKE BOARD */}

        <div className="pointer-events-none absolute -bottom-[2px] left-[3%] z-40">
          <Rose size={42} color="#a51e40" />
        </div>

        <div className="pointer-events-none absolute -bottom-[2px] right-[3%] z-40">
          <Rose size={42} color="#7e1838" />
        </div>

        <div className="pointer-events-none absolute bottom-[106px] left-[8%] z-40 sm:bottom-[135px]">
          <Rose size={29} color="#cf5265" />
        </div>

        <div className="pointer-events-none absolute bottom-[106px] right-[8%] z-40 sm:bottom-[135px]">
          <Rose size={29} color="#9c2747" />
        </div>

        {/* GOLD CAKE BOARD */}

        <div
          className="relative z-10 mx-auto -mt-[2px] h-[20px] w-[108%] rounded-[50%] border border-amber-100/25 sm:h-[25px]"
          style={{
            background:
              "linear-gradient(180deg,#fff0bd 0%,#d9a454 35%,#845326 75%,#392017 100%)",
            boxShadow:
              "inset 0 3px 4px rgba(255,255,255,.45), 0 10px 20px rgba(0,0,0,.7)",
          }}
        />
      </motion.div>

      {/* ======================================================
          DRAGGABLE LIGHTER
      ====================================================== */}

      <AnimatePresence>
        {!isLit && (
          <motion.div
            ref={lighterRef}
            drag
            dragMomentum={false}
            dragElastic={0}
            onDragStart={() => setIsDragging(true)}
            onDrag={queueCollisionCheck}
            onDragEnd={() => {
              setIsDragging(false);
              queueCollisionCheck();
            }}
            whileHover={{ scale: 1.04 }}
            whileDrag={{ scale: 1.07, rotate: -7 }}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.4 }}
            className="absolute bottom-[12%] left-5 z-[80] cursor-grab touch-none select-none active:cursor-grabbing sm:left-10 lg:left-[9%]"
            style={{ touchAction: "none" }}
          >
            <motion.div
              animate={
                reduceMotion
                  ? {}
                  : {
                      scaleX: [1, 0.88, 1.08, 0.94, 1],
                      scaleY: [1, 1.12, 0.94, 1.08, 1],
                      rotate: [-4, 3, -2, 4, -4],
                      y: [0, -2, 1, -1, 0],
                    }
              }
              transition={{
                duration: 0.65,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -top-[43px] left-1/2 z-20 -translate-x-1/2"
            >
              <Flame small />
            </motion.div>

            <div
              className="absolute right-0 top-0 h-[31px] w-[41px] rounded-t-xl border border-white/20"
              style={{
                background:
                  "linear-gradient(135deg,#f0f1f4,#aeb5c0 40%,#555d69)",
              }}
            />

            <div
              className="relative mt-[22px] h-[72px] w-[59px] overflow-hidden rounded-xl border border-white/25"
              style={{
                background:
                  "linear-gradient(110deg,#d7dce4,#8792a2 25%,#414b5a 75%,#202630)",
                boxShadow:
                  "inset 3px 0 5px rgba(255,255,255,.2), 0 12px 25px rgba(0,0,0,.7)",
              }}
            >
              <div className="absolute inset-y-1 left-[5px] w-[4px] rounded-full bg-white/25" />

              <div
                className="absolute left-1/2 top-[15px] h-[12px] w-[36px] -translate-x-1/2 rounded-full border border-slate-400"
                style={{
                  background:
                    "linear-gradient(180deg,#14171c,#444c57,#15181d)",
                }}
              />

              <div className="absolute left-1/2 top-[37px] h-[8px] w-[23px] -translate-x-1/2 rounded-full bg-slate-700" />
            </div>

            <motion.p
              animate={reduceMotion ? { opacity: 0.85 } : { opacity: [0.4, 0.9, 0.4] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="absolute left-1/2 top-[105px] -translate-x-1/2 whitespace-nowrap text-center text-[10px] font-semibold uppercase tracking-[0.12em] text-amber-100/70 sm:text-xs"
            >
              {isDragging ? "Bring the flame to the age candles" : "Drag to light"}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* IGNITION FLASH */}

      <AnimatePresence>
        {ignitionFlash && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.6, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1 }}
            className="pointer-events-none absolute inset-0 z-[60]"
            style={{
  background: `
    radial-gradient(
      circle at 50% 43%,
      ${worldColors.accent}55,
      transparent 65%
    )
  `,
}}
          />
        )}
      </AnimatePresence>

      {/* LIGHTING CONFIRMATION — THE BLOW BUTTON LIVES ON WishScreen */}
      <AnimatePresence>
        {isLit && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.45, duration: 0.65 }}
            className="pointer-events-none absolute bottom-5 left-0 right-0 z-[100] px-4 text-center sm:bottom-7"
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-amber-100/65 sm:text-xs">
              A little magic
            </p>
            <p className="body-font mt-2 text-sm text-amber-50/90 sm:text-lg">
              ✨ The candles are glowing...
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Darkness fades away when the age candles ignite. */}
      <motion.div
        animate={{ opacity: isLit ? 0 : 0.48 }}
        transition={{ duration: 1.1 }}
        className="pointer-events-none absolute inset-0 z-[40] bg-black"
      />
    </main>
  );
}

/* =============================================================
   AGE-SHAPED NUMBER CANDLE
============================================================= */

function AgeCandle({ digit, isLit, delay, reduceMotion }) {
  return (
    <div className="relative flex items-end justify-center">
      {/* Wick */}

      <div className="absolute left-1/2 top-[-6px] z-30 h-[10px] w-[3px] -translate-x-1/2 rounded-full bg-[#77513b]" />

      {/* Flame */}

      <AnimatePresence>
        {isLit && (
          <motion.div
            initial={{ opacity: 0, scale: 0.1, y: 4 }}
            animate={
              reduceMotion
                ? { opacity: 1, scale: 1 }
                : {
                    opacity: [0.88, 1, 0.92, 1],
                    scale: [1, 1.1, 0.95, 1.06, 1],
                    y: [0, -2, 1, -1, 0],
                  }
            }
            exit={{ opacity: 0, scale: 0.15, y: 8 }}
            transition={{
              delay,
              duration: 0.8,
              repeat: !reduceMotion ? Infinity : 0,
              ease: "easeInOut",
            }}
            className="absolute -top-[23px] z-40"
          >
            <Flame small />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Age number */}

      <motion.span
        animate={{
          filter: isLit
            ? "brightness(1.3) drop-shadow(0 0 18px rgba(255,180,80,.75))"
            : "brightness(.34)",
        }}
        transition={{ duration: 0.8 }}
        className="relative z-20 flex min-h-[94px] min-w-[57px] items-center justify-center font-serif text-[84px] font-black leading-none text-transparent sm:min-h-[122px] sm:min-w-[82px] sm:text-[112px]"
        style={{
          backgroundImage:
            "linear-gradient(180deg,#fff3c7,#f4bd6d 42%,#a75a31)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          WebkitTextStroke: "1px rgba(255,226,168,.35)",
          textShadow: "0 5px 5px rgba(0,0,0,.75)",
        }}
      >
        {digit}
      </motion.span>
    </div>
  );
}

/* =============================================================
   LAYERED CSS FLAME
============================================================= */

function Flame({ small = false }) {
  const width = small ? 25 : 32;
  const height = small ? 38 : 51;

  return (
    <div
      className="relative"
      style={{
        width,
        height,
        filter: small
          ? "drop-shadow(0 0 7px rgba(255,119,35,.65))"
          : "drop-shadow(0 0 12px rgba(255,139,40,.85)",
      }}
    >
      <div
        className="absolute bottom-0 left-1/2"
        style={{
          width: width * 0.76,
          height: height * 0.92,
          transform: "translateX(-50%) rotate(5deg)",
          transformOrigin: "50% 90%",
          borderRadius: "55% 45% 48% 52% / 68% 68% 32% 32%",
          background:
            "linear-gradient(180deg,#fff0a4 0%,#ffcc58 24%,#ff8b32 58%,#ed4b21 88%,#b92e19 100%)",
        }}
      />

      <div
        className="absolute bottom-[3px] left-1/2"
        style={{
          width: width * 0.47,
          height: height * 0.61,
          transform: "translateX(-50%) rotate(-4deg)",
          transformOrigin: "50% 90%",
          borderRadius: "55% 45% 48% 52% / 68% 68% 32% 32%",
          background:
            "linear-gradient(180deg,#fffde4 0%,#fff2b5 48%,#ffd45f 100%)",
        }}
      />

      <div
        className="absolute bottom-[3px] left-1/2"
        style={{
          width: width * 0.22,
          height: height * 0.36,
          transform: "translateX(-50%)",
          borderRadius: "50% 50% 45% 45%",
          background:
            "linear-gradient(180deg,#ffffff 0%,#fff9db 65%,#ffe5a0 100%)",
          filter: "blur(.4px)",
        }}
      />
    </div>
  );
}

/* =============================================================
   PIPED CREAM SWIRL
============================================================= */

function CreamSwirl({ size = 22 }) {
  return (
    <div
      className="relative shrink-0"
      style={{ width: size, height: size }}
    >
      {Array.from({ length: 7 }).map((_, index) => (
        <span
          key={index}
          className="absolute left-1/2 top-1/2 rounded-full"
          style={{
            width: size * 0.5,
            height: size * 0.5,
            background:
              "linear-gradient(135deg,#fff9ed 0%,#f7e1c6 48%,#d6a98e 100%)",
            boxShadow:
              "inset -1px -2px 2px rgba(138,87,65,.16),0 1px 2px rgba(0,0,0,.15)",
            transform: `translate(-50%,-50%) rotate(${index * 51.4}deg) translateY(-${size * 0.21}px)`,
          }}
        />
      ))}

      <span
        className="absolute left-1/2 top-1/2 h-[5px] w-[5px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background: "linear-gradient(135deg,#fff5df,#d8b08a)",
        }}
      />
    </div>
  );
}

/* =============================================================
   LAYERED ROSE
============================================================= */

function Rose({ size = 30, color = "#ad2445" }) {
  const petals = [
    { x: 0, y: -0.21, s: 0.5 },
    { x: 0.19, y: -0.08, s: 0.48 },
    { x: 0.17, y: 0.14, s: 0.47 },
    { x: 0, y: 0.21, s: 0.5 },
    { x: -0.18, y: 0.12, s: 0.48 },
    { x: -0.2, y: -0.08, s: 0.48 },
    { x: 0, y: 0, s: 0.43 },
  ];

  return (
    <div
      className="relative shrink-0"
      style={{
        width: size,
        height: size,
        filter: "drop-shadow(0 2px 3px rgba(0,0,0,.35))",
      }}
    >
      {petals.map((petal, index) => (
        <span
          key={index}
          className="absolute left-1/2 top-1/2 rounded-[55%_45%_60%_40%]"
          style={{
            width: size * petal.s,
            height: size * petal.s,
            marginLeft: size * petal.x - (size * petal.s) / 2,
            marginTop: size * petal.y - (size * petal.s) / 2,
            background:
              index === 6
                ? `radial-gradient(circle at 35% 30%, #f8a2a7, ${color} 72%)`
                : `linear-gradient(${index * 45}deg, #f4a0a6 0%, ${color} 55%, #59152d 100%)`,
            border: "1px solid rgba(255,210,205,.12)",
            transform: `rotate(${index * 48}deg)`,
          }}
        />
      ))}

      <span
        className="absolute left-1/2 top-1/2 h-[25%] w-[25%] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle at 35% 30%,#ffd1bc,#d66a76 70%,#782039)",
          boxShadow: "0 0 3px rgba(255,200,190,.35)",
        }}
      />
    </div>
  );
}

/* =============================================================
   GOLD FLOWER ORNAMENT
============================================================= */

function GoldStar({ size = 14 }) {
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
            width: size * 0.25,
            height: size * 0.45,
            background:
              "linear-gradient(90deg,#a86b28,#fff0ad,#bd843a)",
            transform: `translate(-50%,-50%) rotate(${index * 45}deg) translateY(-${size * 0.16}px)`,
            boxShadow: "0 0 2px rgba(255,222,145,.4)",
          }}
        />
      ))}

      <span className="absolute left-1/2 top-1/2 h-[24%] w-[24%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ffe4a1]" />
    </div>
  );
}

export default CandleIntro;