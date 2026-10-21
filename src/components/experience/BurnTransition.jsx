import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const PARTICLE_COUNT = 110;

const PARTICLE_COLORS = [
  "#FFFFFF",
  "#E9D5FF",
  "#C084FC",
  "#A855F7",
  "#FDE68A",
  "#F59E0B",
  "#FB923C",
];

function createParticles() {
  return Array.from({ length: PARTICLE_COUNT }, (_, index) => {
    const angle = index * 137.508;
    const radians = (angle * Math.PI) / 180;

    const distance = 18 + ((index * 37) % 48);
    const direction = index % 3 === 0 ? -1 : 1;

    return {
      id: index,
      angle: radians,
      distance,
      direction,
      size: 2 + ((index * 7) % 5),
      delay: (index % 22) * 0.018,
      duration: 1.2 + ((index * 13) % 15) / 10,
      color: PARTICLE_COLORS[index % PARTICLE_COLORS.length],
      drift: ((index * 29) % 160) - 80,
      rise: ((index * 41) % 180) - 90,
    };
  });
}

const PARTICLES = createParticles();

function BurnTransition({ onComplete }) {
  const [phase, setPhase] = useState("ignition");
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const timers = [];

    const schedule = (callback, delay) => {
      timers.push(setTimeout(callback, delay));
    };

    if (reduceMotion) {
      schedule(() => setPhase("blackout"), 150);
      schedule(() => onComplete?.(), 850);
    } else {
      schedule(() => setPhase("surge"), 650);
      schedule(() => setPhase("snap"), 1450);
      schedule(() => setPhase("disintegrate"), 1750);
      schedule(() => setPhase("vortex"), 2950);
      schedule(() => setPhase("blackout"), 3650);
      schedule(() => onComplete?.(), 4450);
    }

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [onComplete, reduceMotion]);

  const isSurging = [
    "surge",
    "snap",
    "disintegrate",
    "vortex",
  ].includes(phase);

  const isSnapping = [
    "snap",
    "disintegrate",
    "vortex",
  ].includes(phase);

  const isDisintegrating = [
    "disintegrate",
    "vortex",
    "blackout",
  ].includes(phase);

  const isBlackout = phase === "blackout";

  return (
    <main
      className="fixed inset-0 z-50 flex min-h-screen w-full items-center justify-center overflow-hidden bg-black text-white"
      aria-label="Magical disintegration transition"
      role="status"
    >
      {/* =====================================================
          1. ABSOLUTE DARKNESS
      ===================================================== */}

      <div className="absolute inset-0 bg-black" />

      {/* =====================================================
          2. FIRE AND ENERGY BUILD-UP
      ===================================================== */}

      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[min(90vw,90vh)] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(255,245,200,0.95) 0%, rgba(255,160,40,0.75) 12%, rgba(255,70,10,0.4) 28%, rgba(130,40,255,0.2) 48%, transparent 72%)",
          filter: "blur(24px)",
        }}
        initial={{ opacity: 0, scale: 0.1 }}
        animate={
          isBlackout
            ? { opacity: 0, scale: 2.4 }
            : isDisintegrating
              ? { opacity: [0.9, 0.65, 0], scale: [1.4, 1.8, 2.2] }
              : {
                  opacity: isSurging ? [0.55, 1, 0.75] : 0.65,
                  scale: isSurging ? [0.65, 1.15, 0.9] : 0.55,
                }
        }
        transition={{
          duration: isDisintegrating ? 1.2 : 1.4,
          ease: "easeInOut",
          repeat: isSurging && !isDisintegrating ? Infinity : 0,
        }}
      />

      {/* =====================================================
          3. PURPLE-GOLD SNAP CHARGE
      ===================================================== */}

      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[min(42vw,42vh)] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(253,230,138,0.9) 5%, rgba(192,132,252,0.8) 18%, rgba(126,34,206,0.45) 42%, transparent 70%)",
          filter: "blur(12px)",
          x: "-50%",
          y: "-50%",
        }}
        initial={{ opacity: 0, scale: 0.1 }}
        animate={
          isBlackout
            ? { opacity: 0, scale: 3 }
            : isSnapping
              ? { opacity: [0, 1, 0.7, 0], scale: [0.1, 0.8, 1.9, 2.7] }
              : { opacity: 0.15, scale: 0.15 }
        }
        transition={{
          duration: 1.25,
          ease: "easeOut",
        }}
      />

      {/* =====================================================
          4. SNAP SHOCKWAVE RINGS
      ===================================================== */}

      {[0, 1, 2].map((ring) => (
        <motion.div
          key={ring}
          className="pointer-events-none absolute left-1/2 top-1/2 aspect-square w-8 rounded-full border"
          style={{
            borderColor:
              ring === 0
                ? "rgba(255,255,255,0.95)"
                : ring === 1
                  ? "rgba(192,132,252,0.9)"
                  : "rgba(253,230,138,0.85)",
            boxShadow:
              ring === 0
                ? "0 0 24px rgba(255,255,255,0.8)"
                : "0 0 32px rgba(168,85,247,0.65)",
            x: "-50%",
            y: "-50%",
          }}
          initial={{ opacity: 0, scale: 0.1 }}
          animate={
            isSnapping
              ? {
                  opacity: [0, 1, 0.65, 0],
                  scale: [0.1, 7, 22, 36],
                }
              : { opacity: 0, scale: 0.1 }
          }
          transition={{
            duration: 1.25,
            delay: ring * 0.12,
            ease: "easeOut",
          }}
        />
      ))}

      {/* =====================================================
          5. DISINTEGRATING PARTICLES
      ===================================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {PARTICLES.map((particle) => {
          const startX = Math.cos(particle.angle) * 4;
          const startY = Math.sin(particle.angle) * 4;

          const endX =
            Math.cos(particle.angle) * particle.distance +
            particle.drift / 5;

          const endY =
            Math.sin(particle.angle) * particle.distance +
            particle.rise / 5;

          const vortexX =
            Math.cos(particle.angle + particle.direction) * 4;

          const vortexY =
            Math.sin(particle.angle + particle.direction) * 4;

          return (
            <motion.span
              key={particle.id}
              className="absolute left-1/2 top-1/2 rounded-full"
              style={{
                width: particle.size,
                height: particle.size,
                backgroundColor: particle.color,
                boxShadow: `0 0 ${particle.size * 3}px ${particle.color}`,
                marginLeft: -particle.size / 2,
                marginTop: -particle.size / 2,
              }}
              initial={{
                opacity: 0,
                x: `${startX}vw`,
                y: `${startY}vh`,
                scale: 0,
              }}
              animate={
                phase === "ignition" || phase === "surge"
                  ? {
                      opacity: [0, 0.5, 0.2],
                      x: [`${startX}vw`, `${startX * 2}vw`],
                      y: [`${startY}vh`, `${startY * 2}vh`],
                      scale: [0, 1, 0.5],
                    }
                  : phase === "snap"
                    ? {
                        opacity: [0, 1, 0.9],
                        x: ["0vw", `${endX}vw`],
                        y: ["0vh", `${endY}vh`],
                        scale: [0, 1.5, 1],
                      }
                    : phase === "disintegrate"
                      ? {
                          opacity: [1, 0.9, 0],
                          x: [`${endX}vw`, `${endX * 1.6}vw`],
                          y: [`${endY}vh`, `${endY * 1.6}vh`],
                          scale: [1, 0.8, 0],
                          rotate: [0, particle.direction * 300],
                        }
                      : phase === "vortex"
                        ? {
                            opacity: [0.7, 0],
                            x: [`${endX}vw`, `${vortexX}vw`],
                            y: [`${endY}vh`, `${vortexY}vh`],
                            scale: [0.8, 0],
                          }
                        : {
                            opacity: 0,
                            scale: 0,
                          }
              }
              transition={{
                duration: particle.duration,
                delay: particle.delay,
                ease: phase === "vortex" ? "easeIn" : "easeOut",
              }}
            />
          );
        })}
      </div>

      {/* =====================================================
          6. ENERGY STREAKS
      ===================================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {Array.from({ length: 18 }, (_, index) => (
          <motion.div
            key={index}
            className="absolute left-1/2 top-1/2 h-px origin-left"
            style={{
              width: `${20 + ((index * 17) % 40)}vw`,
              background:
                index % 2 === 0
                  ? "linear-gradient(90deg, rgba(255,255,255,0.95), rgba(192,132,252,0.75), transparent)"
                  : "linear-gradient(90deg, rgba(253,230,138,0.95), rgba(245,158,11,0.7), transparent)",
              boxShadow: "0 0 12px rgba(192,132,252,0.6)",
              x: "-50%",
              y: "-50%",
              rotate: `${index * 20}deg`,
            }}
            initial={{ opacity: 0, scaleX: 0 }}
            animate={
              isSnapping
                ? {
                    opacity: [0, 1, 0],
                    scaleX: [0, 1, 1.5],
                  }
                : { opacity: 0, scaleX: 0 }
            }
            transition={{
              duration: 0.8,
              delay: (index % 6) * 0.025,
              ease: "easeOut",
            }}
          />
        ))}
      </div>

      {/* =====================================================
          7. CENTER MESSAGE
      ===================================================== */}

      <motion.div
        className="relative z-20 max-w-2xl px-6 text-center"
        initial={{ opacity: 0, scale: 0.92 }}
        animate={
          isDisintegrating
            ? { opacity: 0, scale: 1.2, filter: "blur(12px)" }
            : { opacity: 1, scale: 1, filter: "blur(0px)" }
        }
        transition={{ duration: 0.65, ease: "easeInOut" }}
      >
        <motion.div
          className="mb-6 text-6xl sm:text-7xl"
          animate={
            isSnapping
              ? { scale: [1, 1.35, 0], rotate: [0, -12, 15] }
              : { scale: [1, 1.06, 1] }
          }
          transition={{
            duration: isSnapping ? 0.8 : 1.1,
            repeat: isSnapping ? 0 : Infinity,
            ease: "easeInOut",
          }}
        >
          ✨
        </motion.div>

        <h1 className="heading-font text-3xl font-bold sm:text-5xl">
          {phase === "ignition" && (
            <>
              Something magical
              <br />
              is happening...
            </>
          )}

          {phase === "surge" && (
            <>
              Feel the energy
              <br />
              building...
            </>
          )}

          {phase === "snap" && "Reality is changing..."}
          {phase === "disintegrate" && "Everything becomes magic..."}
          {phase === "vortex" && "A new world awaits..."}
        </h1>

        <motion.p
          className="body-font mt-5 text-sm tracking-[0.3em] text-violet-200/80 sm:text-base"
          animate={{ opacity: [0.35, 1, 0.35] }}
          transition={{ duration: 0.9, repeat: Infinity }}
        >
          {isBlackout ? "" : "✦  TRANSFORMING  ✦"}
        </motion.p>
      </motion.div>

      {/* =====================================================
          8. SNAP FLASH
      ===================================================== */}

      <motion.div
        className="pointer-events-none absolute inset-0 z-30 bg-white"
        initial={{ opacity: 0 }}
        animate={
          phase === "snap"
            ? { opacity: [0, 0.9, 0] }
            : { opacity: 0 }
        }
        transition={{ duration: 0.28, ease: "easeOut" }}
      />

      {/* =====================================================
          9. FINAL BLACKOUT
      ===================================================== */}

      <motion.div
        className="pointer-events-none absolute inset-0 z-40 bg-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: isBlackout ? 1 : 0 }}
        transition={{ duration: 0.65, ease: "easeIn" }}
      />
    </main>
  );
}

export default BurnTransition;