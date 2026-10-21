import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Heart, Sparkles, ArrowRight } from "lucide-react";

const MAX_NO_ATTEMPTS = 5;

const floatingHearts = Array.from({ length: 18 }, (_, index) => ({
  id: index,
  x: `${(index * 37 + 11) % 100}%`,
  delay: (index % 6) * 0.12,
  duration: 2.4 + (index % 5) * 0.35,
  size: 14 + (index % 4) * 5,
}));

// NO moves around YES, using positions away from the center.
const noPositions = [
  { x: 0, y: -88 },
  { x: 112, y: -42 },
  { x: 112, y: 42 },
  { x: 0, y: 88 },
  { x: -112, y: 0 },
];

export default function QuestionGame({
  creatorData = {},
  theme = {},
  onComplete = () => {},
}) {
  const [noAttempts, setNoAttempts] = useState(0);
  const [answeredYes, setAnsweredYes] = useState(false);
  const [positionIndex, setPositionIndex] = useState(0);

  const question =
    creatorData.question?.trim() ||
    "Will you make more beautiful memories with me? ❤️";

  const closingMessage =
    creatorData.questionClosingMessage?.trim() ||
    "You've just made my birthday surprise even more special! ❤️";

  const noDisappeared = noAttempts >= MAX_NO_ATTEMPTS;

  const accentColor = theme?.colors?.accent || "#ec4899";
  const textColor = theme?.colors?.text || "#ffffff";

  const handleNoAttempt = () => {
    if (answeredYes || noDisappeared) return;

    setNoAttempts((previous) =>
      Math.min(previous + 1, MAX_NO_ATTEMPTS)
    );

    setPositionIndex((previous) => (previous + 1) % noPositions.length);
  };

  const handleNoPointerEnter = (event) => {
    // Desktop: NO dodges the mouse pointer.
    if (event.pointerType === "mouse") {
      handleNoAttempt();
    }
  };

  const handleNoPointerDown = (event) => {
    // Touchscreen: move NO when someone tries to touch it.
    if (event.pointerType === "touch") {
      event.preventDefault();
      handleNoAttempt();
    }
  };

  const handleYes = () => {
    if (!answeredYes) {
      setAnsweredYes(true);
    }
  };

  return (
    <section
      className="relative flex min-h-[70vh] w-full items-center justify-center overflow-hidden rounded-3xl px-4 py-12"
      style={{ color: textColor }}
    >
      {/* FLOATING HEART CELEBRATION */}
      <AnimatePresence>
        {answeredYes && (
          <motion.div
            key="celebration-background"
            className="pointer-events-none absolute inset-0 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {floatingHearts.map((heart) => (
              <motion.div
                key={heart.id}
                className="absolute bottom-0"
                style={{ left: heart.x }}
                initial={{ y: 0, opacity: 0, scale: 0.4 }}
                animate={{
                  y: "-90vh",
                  opacity: [0, 1, 1, 0],
                  scale: [0.4, 1, 1.2, 0.7],
                  rotate: [0, 15, -15, 0],
                }}
                transition={{
                  duration: heart.duration,
                  delay: heart.delay,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
              >
                <Heart
                  size={heart.size}
                  fill={accentColor}
                  color={accentColor}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {!answeredYes ? (
          /* QUESTION SCREEN */
          <motion.div
            key="question"
            className="relative z-10 mx-auto flex w-full max-w-2xl flex-col items-center text-center"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: -15 }}
            transition={{ duration: 0.45 }}
          >
            {/* HEART ICON */}
            <motion.div
              className="mb-6 flex h-16 w-16 items-center justify-center rounded-full"
              style={{
                backgroundColor: `${accentColor}22`,
                border: `1px solid ${accentColor}66`,
              }}
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Heart
                size={30}
                fill={accentColor}
                color={accentColor}
              />
            </motion.div>

            <p
              className="mb-3 text-xs font-semibold uppercase tracking-[0.35em]"
              style={{ color: accentColor }}
            >
              One little question
            </p>

            {/* QUESTION */}
            <h2 className="mb-5 max-w-xl text-2xl font-bold leading-relaxed sm:text-4xl">
              {question}
            </h2>

            {/* BUTTON PLAY AREA */}
            <div className="relative flex min-h-64 w-full max-w-lg items-center justify-center overflow-visible">
              {/* YES — ALWAYS CENTERED */}
              <motion.button
                type="button"
                onClick={handleYes}
                className="absolute left-1/2 top-1/2 z-20 inline-flex min-h-14 min-w-32 items-center justify-center gap-2 rounded-full px-7 py-4 text-lg font-bold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
                style={{
                  background: `linear-gradient(135deg, ${accentColor}, #fb7185)`,
                  boxShadow: `0 10px 35px ${accentColor}55`,
                }}
                animate={{
                  x: "-50%",
                  y: "-50%",
                  scale: 1 + noAttempts * 0.09,
                }}
                whileHover={{
                  scale: 1 + noAttempts * 0.09 + 0.04,
                }}
                whileTap={{ scale: 0.96 }}
                transition={{
                  type: "spring",
                  stiffness: 280,
                  damping: 18,
                }}
              >
                YES <Heart size={19} fill="white" />
              </motion.button>

              {/* NO — SEPARATE POSITIONS AROUND YES */}
              <AnimatePresence>
                {!noDisappeared && (
                  <motion.button
                    key="no-button"
                    type="button"
                    aria-label="No"
                    onPointerEnter={handleNoPointerEnter}
                    onPointerDown={handleNoPointerDown}
                    onClick={(event) => {
                      // Keyboard activation fallback.
                      if (event.detail === 0) {
                        handleNoAttempt();
                      }
                    }}
                    className="absolute z-30 inline-flex min-h-12 min-w-24 items-center justify-center rounded-full border border-white/30 bg-[#7f315b] px-6 py-3 text-base font-semibold text-white shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
                    style={{
                      left: `calc(50% + ${noPositions[positionIndex].x}px)`,
                      top: `calc(50% + ${noPositions[positionIndex].y}px)`,
                      transform: "translate(-50%, -50%)",
                      transformOrigin: "center",
                    }}
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{
                      opacity: 1,
                      scale: Math.max(0.4, 1 - noAttempts * 0.1),
                      x: "-50%",
                      y: "-50%",
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0,
                      transition: { duration: 0.25 },
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 320,
                      damping: 20,
                    }}
                  >
                    NO 🙈
                  </motion.button>
                )}
              </AnimatePresence>
            </div>

            {/* STATUS MESSAGE */}
            <motion.p
              key={noAttempts}
              className="mt-4 min-h-6 text-sm"
              style={{ color: `${textColor}99` }}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {noAttempts === 0
                ? "Choose your answer… if you can catch NO! 😉"
                : noDisappeared
                  ? "Looks like YES is the only button left! ❤️"
                  : `That was attempt ${noAttempts} of ${MAX_NO_ATTEMPTS}… 👀`}
            </motion.p>
          </motion.div>
        ) : (
          /* YES CELEBRATION SCREEN */
          <motion.div
            key="celebration-message"
            className="relative z-10 mx-auto flex w-full max-w-2xl flex-col items-center text-center"
            initial={{ opacity: 0, y: 25, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.65, type: "spring" }}
          >
            <motion.div
              className="mb-6 flex h-20 w-20 items-center justify-center rounded-full"
              style={{
                backgroundColor: `${accentColor}22`,
                border: `1px solid ${accentColor}88`,
              }}
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                type: "spring",
                stiffness: 180,
                damping: 12,
              }}
            >
              <Heart
                size={38}
                fill={accentColor}
                color={accentColor}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <p
                className="mb-3 text-xs font-semibold uppercase tracking-[0.35em]"
                style={{ color: accentColor }}
              >
                A little moment to remember
              </p>

              <h2 className="mb-5 text-3xl font-bold sm:text-5xl">
                Yay! You said YES! ❤️
              </h2>

              <p
                className="mx-auto mb-9 max-w-lg text-base leading-8 sm:text-lg"
                style={{ color: `${textColor}cc` }}
              >
                {closingMessage}
              </p>
            </motion.div>

            <motion.button
              type="button"
              onClick={onComplete}
              className="inline-flex items-center gap-3 rounded-full px-8 py-4 font-bold text-white shadow-xl"
              style={{
                background: `linear-gradient(135deg, ${accentColor}, #fb7185)`,
              }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.97 }}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
            >
              Continue <ArrowRight size={19} />
              <Sparkles size={17} />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}