const worldThemes = {
  "Royal Kingdom": {
    name: "Royal Kingdom",
    colors: {
      primary: "#D4AF37",
      secondary: "#E8A0BF",
      accent: "#FFD700",
      background: "#100817",
      surface: "#21122D",
      text: "#FFF5E6",
    },
    effects: {
      particles: "golden-sparkles",
      lighting: "royal-glow",
      transition: "gold-rose",
    },
  },

  "Butterfly Haven": {
    name: "Butterfly Haven",
    colors: {
      primary: "#C084FC",
      secondary: "#F9A8D4",
      accent: "#E9D5FF",
      background: "#150B20",
      surface: "#28152F",
      text: "#FFF0FA",
    },
    effects: {
      particles: "butterflies",
      lighting: "lavender-glow",
      transition: "pink-violet",
    },
  },

  "Blossom Garden": {
    name: "Blossom Garden",
    colors: {
      primary: "#F472B6",
      secondary: "#FDBA74",
      accent: "#86EFAC",
      background: "#180D16",
      surface: "#2A1724",
      text: "#FFF1F2",
    },
    effects: {
      particles: "falling-petals",
      lighting: "blossom-glow",
      transition: "blush-peach",
    },
  },

  "Moonlight Dreams": {
    name: "Moonlight Dreams",
    colors: {
      primary: "#A5B4FC",
      secondary: "#C4B5FD",
      accent: "#E0E7FF",
      background: "#080D20",
      surface: "#151B35",
      text: "#F1F5FF",
    },
    effects: {
      particles: "moonlight-stars",
      lighting: "moonlight-glow",
      transition: "silver-blue",
    },
  },

  "Enchanted Forest": {
    name: "Enchanted Forest",
    colors: {
      primary: "#34D399",
      secondary: "#2DD4BF",
      accent: "#A7F3D0",
      background: "#061712",
      surface: "#102A22",
      text: "#ECFDF5",
    },
    effects: {
      particles: "fireflies",
      lighting: "forest-glow",
      transition: "emerald-teal",
    },
  },

  "Pink Paradise": {
    name: "Pink Paradise",
    colors: {
      primary: "#F472B6",
      secondary: "#EC4899",
      accent: "#FDA4AF",
      background: "#1A0714",
      surface: "#301027",
      text: "#FFF1F7",
    },
    effects: {
      particles: "pink-sparkles",
      lighting: "pink-glow",
      transition: "rose-magenta",
    },
  },

  "Neon Arena": {
    name: "Neon Arena",
    colors: {
      primary: "#38BDF8",
      secondary: "#818CF8",
      accent: "#22D3EE",
      background: "#050B18",
      surface: "#101B32",
      text: "#E0F2FE",
    },
    effects: {
      particles: "neon-sparks",
      lighting: "neon-glow",
      transition: "cyan-blue",
    },
  },

  "Cosmic Journey": {
    name: "Cosmic Journey",
    colors: {
      primary: "#818CF8",
      secondary: "#C084FC",
      accent: "#67E8F9",
      background: "#08071D",
      surface: "#171332",
      text: "#F3F0FF",
    },
    effects: {
      particles: "cosmic-stars",
      lighting: "cosmic-glow",
      transition: "indigo-violet",
    },
  },

  "Midnight Velocity": {
    name: "Midnight Velocity",
    colors: {
      primary: "#60A5FA",
      secondary: "#F87171",
      accent: "#CBD5E1",
      background: "#080B12",
      surface: "#171C28",
      text: "#F8FAFC",
    },
    effects: {
      particles: "speed-streaks",
      lighting: "velocity-glow",
      transition: "blue-red",
    },
  },

  "Champion Arena": {
    name: "Champion Arena",
    colors: {
      primary: "#FBBF24",
      secondary: "#F87171",
      accent: "#FDE68A",
      background: "#120A08",
      surface: "#271610",
      text: "#FFFBEB",
    },
    effects: {
      particles: "victory-sparks",
      lighting: "champion-glow",
      transition: "gold-crimson",
    },
  },

  "Hero's Legacy": {
    name: "Hero's Legacy",
    colors: {
      primary: "#60A5FA",
      secondary: "#FBBF24",
      accent: "#BFDBFE",
      background: "#07101F",
      surface: "#14243B",
      text: "#EFF6FF",
    },
    effects: {
      particles: "hero-energy",
      lighting: "heroic-glow",
      transition: "blue-gold",
    },
  },

  "Lost Horizons": {
    name: "Lost Horizons",
    colors: {
      primary: "#FB923C",
      secondary: "#38BDF8",
      accent: "#FDE68A",
      background: "#111019",
      surface: "#25202B",
      text: "#FFF7ED",
    },
    effects: {
      particles: "horizon-dust",
      lighting: "sunset-glow",
      transition: "sunset-ocean",
    },
  },
};

const DEFAULT_WORLD_THEME = {
  name: "Default",
  colors: {
    primary: "#8B5CF6",
    secondary: "#D946EF",
    accent: "#C4B5FD",
    background: "#08070D",
    surface: "#171322",
    text: "#FFFFFF",
  },
  effects: {
    particles: "soft-sparkles",
    lighting: "ambient-glow",
    transition: "violet-purple",
  },
};

export function getWorldTheme(worldName) {
  return worldThemes[worldName] ?? DEFAULT_WORLD_THEME;
}

export { worldThemes, DEFAULT_WORLD_THEME };

export default worldThemes;