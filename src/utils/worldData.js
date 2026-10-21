const images = import.meta.glob(
  "../assets/{boy,girl}/*/*.jpg",
  {
    eager: true,
    query: "?url",
    import: "default",
  }
);

const getScenes = (character, folder) => {
  return [1, 2, 3, 4, 5].map((number) => {
    const fileName = `${folder}-${String(number).padStart(2, "0")}.jpg`;

    return images[`../assets/${character}/${folder}/${fileName}`];
  });
};

export const worldData = {
  // =========================
  // GIRL WORLDS
  // =========================

  "Royal Kingdom": {
    character: "girl",
    folder: "royal",
    scenes: getScenes("girl", "royal"),
  },

  "Butterfly Haven": {
    character: "girl",
    folder: "butterfly",
    scenes: getScenes("girl", "butterfly"),
  },

  "Blossom Garden": {
    character: "girl",
    folder: "blossom",
    scenes: getScenes("girl", "blossom"),
  },

  "Moonlight Dreams": {
    character: "girl",
    folder: "moonlight",
    scenes: getScenes("girl", "moonlight"),
  },

  "Enchanted Forest": {
    character: "girl",
    folder: "enchanted",
    scenes: getScenes("girl", "enchanted"),
  },

  "Pink Paradise": {
    character: "girl",
    folder: "pink",
    scenes: getScenes("girl", "pink"),
  },

  // =========================
  // BOY WORLDS
  // =========================

  "Neon Arena": {
    character: "boy",
    folder: "neon",
    scenes: getScenes("boy", "neon"),
  },

  "Cosmic Journey": {
    character: "boy",
    folder: "cosmic",
    scenes: getScenes("boy", "cosmic"),
  },

  "Midnight Velocity": {
    character: "boy",
    folder: "midnight",
    scenes: getScenes("boy", "midnight"),
  },

  "Champion Arena": {
    character: "boy",
    folder: "champion",
    scenes: getScenes("boy", "champion"),
  },

  "Hero's Legacy": {
    character: "boy",
    folder: "hero",
    scenes: getScenes("boy", "hero"),
  },

  "Lost Horizons": {
    character: "boy",
    folder: "horizon",
    scenes: getScenes("boy", "horizon"),
  },
};