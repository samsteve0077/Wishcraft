import { memo, useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";

const PARTICLE_COUNT = 26;

const WORLD_BACKGROUNDS = {
  "Royal Kingdom": {
    image: "/src/assets/girl/royal/royal-01.jpg",
    position: "center 54%",
    overlay: "rgba(16, 8, 23, 0.43)",
    glow: "rgba(212, 175, 55, 0.20)",
  },

  "Neon Arena": {
    image: "/src/assets/boy/neon/neon-01.jpg",
    position: "center 48%",
    overlay: "rgba(5, 11, 24, 0.42)",
    glow: "rgba(56, 189, 248, 0.20)",
  },
};

const WORLD_MOTIFS = {
  "Royal Kingdom": {
    symbols: ["✦", "✧", "♛"],
    motif: "royal",
  },

  "Butterfly Haven": {
    symbols: ["✦", "✧", "❋"],
    motif: "butterfly",
  },

  "Blossom Garden": {
    symbols: ["✿", "❀", "✧"],
    motif: "blossom",
  },

  "Moonlight Dreams": {
    symbols: ["✦", "☾", "✧"],
    motif: "moonlight",
  },

  "Enchanted Forest": {
    symbols: ["✧", "❋", "✦"],
    motif: "forest",
  },

  "Pink Paradise": {
    symbols: ["♡", "✦", "✧"],
    motif: "pink",
  },

  "Neon Arena": {
    symbols: ["◇", "△", "✦"],
    motif: "neon",
  },

  "Cosmic Journey": {
    symbols: ["✦", "✧", "⋆"],
    motif: "cosmic",
  },

  "Midnight Velocity": {
    symbols: ["›", "»", "✦"],
    motif: "velocity",
  },

  "Champion Arena": {
    symbols: ["✦", "★", "✧"],
    motif: "champion",
  },

  "Hero's Legacy": {
    symbols: ["✦", "◇", "★"],
    motif: "hero",
  },

  "Lost Horizons": {
    symbols: ["✦", "✧", "⋆"],
    motif: "horizon",
  },
};

function createParticles(worldName, colors) {
  return Array.from({ length: PARTICLE_COUNT }, (_, index) => {
    const seed = index + 1;

    return {
      id: `${worldName}-${index}`,
      left: `${(seed * 47.17) % 100}%`,
      top: `${(seed * 31.73) % 100}%`,
      delay: (seed % 9) * 0.45,
      duration: 8 + ((seed * 13) % 8),
      drift: ((seed * 29) % 80) - 40,
      rise: 20 + ((seed * 17) % 50),
      size: 7 + ((seed * 11) % 9),
      color:
        seed % 3 === 0
          ? colors.secondary
          : seed % 2 === 0
            ? colors.accent
            : colors.primary,
    };
  });
}

function WorldAtmosphere({
  theme,
  backgroundImage,
  intensity = "balanced",
  className = "",
}) {
  const reduceMotion = useReducedMotion();

  const colors = theme?.colors;
  const worldName = theme?.name ?? "Default";

  const background = WORLD_BACKGROUNDS[worldName];

  const motif = WORLD_MOTIFS[worldName] ?? {
    symbols: ["✦", "✧"],
    motif: "default",
  };

  const particles = useMemo(
    () =>
      createParticles(worldName, {
        primary: colors?.primary ?? "#8B5CF6",
        secondary: colors?.secondary ?? "#D946EF",
        accent: colors?.accent ?? "#C4B5FD",
      }),
    [
      worldName,
      colors?.primary,
      colors?.secondary,
      colors?.accent,
    ]
  );

  if (!colors) return null;

  const isReduced = reduceMotion || intensity === "reduced";
  const isCinematic = intensity === "cinematic";

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      data-world-atmosphere={worldName}
      style={{
        zIndex: 0,
        contain: "layout paint",
      }}
    >
      {/* Cinematic artwork appears only when a scene is supplied. */}
{backgroundImage && (
  <motion.div
    key={backgroundImage}
    className="absolute inset-0"
    style={{
      backgroundImage: `url("${backgroundImage}")`,
      backgroundSize: "cover",
      backgroundPosition: "center center",
      backgroundRepeat: "no-repeat",
      transformOrigin: "center center",
      willChange: isReduced ? "auto" : "transform",
    }}
    initial={{ opacity: 0, scale: 1.02 }}
    animate={
      isReduced
        ? { opacity: 1, scale: 1 }
        : { opacity: 1, scale: [1.02, 1.045, 1] }
    }
    transition={
      isReduced
        ? { duration: 0.2 }
        : {
            opacity: { duration: 0.8 },
            scale: {
              duration: 32,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }
    }
  />
)}

      {/* 2. Readability overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: background
            ? `
                linear-gradient(
                  180deg,
                  ${background.overlay},
                  ${colors.background}65
                ),
                radial-gradient(
                  ellipse at center,
                  transparent 5%,
                  ${colors.background}55 100%
                )
              `
            : `
                radial-gradient(
                  ellipse at 50% 40%,
                  ${colors.primary}35,
                  transparent 65%
                ),
                linear-gradient(
                  180deg,
                  ${colors.background}10,
                  ${colors.background}85
                )
              `,
        }}
      />

      {/* 3. World-specific ambient light */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(
              ellipse at 50% 42%,
              ${background?.glow ?? `${colors.primary}25`},
              transparent 65%
            ),
            radial-gradient(
              ellipse at 10% 15%,
              ${colors.secondary}20,
              transparent 48%
            ),
            radial-gradient(
              ellipse at 90% 85%,
              ${colors.accent}15,
              transparent 48%
            )
          `,
        }}
      />

      {/* 4. Royal Kingdom decorative identity */}
      {motif.motif === "royal" && (
        <>
          <div
            className="absolute left-6 top-6 text-5xl md:left-12 md:top-10 md:text-6xl"
            style={{
              color: colors.primary,
              opacity: 0.6,
              filter: `drop-shadow(0 0 14px ${colors.primary})`,
            }}
          >
            ♛
          </div>

          <div
            className="absolute bottom-6 right-6 text-5xl md:bottom-10 md:right-12 md:text-6xl"
            style={{
              color: colors.primary,
              opacity: 0.6,
              filter: `drop-shadow(0 0 14px ${colors.primary})`,
            }}
          >
            ♛
          </div>
        </>
      )}

      {/* 5. Neon Arena futuristic identity */}
      {motif.motif === "neon" && (
        <>
          <div
            className="absolute -left-20 top-1/3 h-40 w-40 rotate-45 border"
            style={{
              borderColor: `${colors.primary}75`,
              boxShadow: `0 0 32px ${colors.primary}25`,
            }}
          />

          <div
            className="absolute -right-20 bottom-1/3 h-44 w-44 rotate-45 border"
            style={{
              borderColor: `${colors.accent}70`,
              boxShadow: `0 0 35px ${colors.accent}25`,
            }}
          />

          <div
            className="absolute inset-x-0 top-0 h-px"
            style={{
              background: `linear-gradient(90deg, transparent, ${colors.primary}, transparent)`,
              boxShadow: `0 0 20px ${colors.primary}90`,
            }}
          />
        </>
      )}

      {/* 6. Floating world-specific particles */}
      {particles.map((particle, index) => (
        <motion.span
          key={particle.id}
          className="absolute select-none"
          style={{
            left: particle.left,
            top: particle.top,
            color: particle.color,
            fontSize: particle.size,
            opacity: 0.72,
            textShadow: `
              0 0 8px ${particle.color},
              0 0 18px ${particle.color}90
            `,
          }}
          initial={false}
          animate={
            isReduced
              ? { opacity: 0.5 }
              : {
                  x: [0, particle.drift, 0],
                  y: [0, -particle.rise, 0],
                  opacity: [0.25, 0.8, 0.25],
                }
          }
          transition={
            isReduced
              ? { duration: 0.2 }
              : {
                  duration: particle.duration,
                  delay: particle.delay,
                  repeat: Infinity,
                  ease: "easeInOut",
                }
          }
        >
          {motif.symbols[index % motif.symbols.length]}
        </motion.span>
      ))}

      {/* 7. Cinematic edge vignette */}
      <div
        className="absolute inset-0"
        style={{
          boxShadow: `
            inset 0 0 120px ${colors.background}90,
            inset 0 0 45px ${colors.primary}18
          `,
        }}
      />
    </div>
  );
}

export default memo(WorldAtmosphere);