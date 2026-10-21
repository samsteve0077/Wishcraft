import WorldCard from "./WorldCard";
import { worldData } from "../../utils/worldData";

function WorldGallery({
  character,
  creatorData,
  setCreatorData,
}) {
  const worlds =
    character === "girl"
      ? [
          {
            title: "Royal Kingdom",
            subtitle: "Elegant • Royal • Magical",
          },
          {
            title: "Butterfly Haven",
            subtitle: "Soft • Graceful • Beautiful",
          },
          {
            title: "Blossom Garden",
            subtitle: "Blooming • Peaceful • Lovely",
          },
          {
            title: "Moonlight Dreams",
            subtitle: "Dreamy • Calm • Elegant",
          },
          {
            title: "Enchanted Forest",
            subtitle: "Magic • Fantasy • Wonder",
          },
          {
            title: "Pink Paradise",
            subtitle: "Cute • Sweet • Charming",
          },
        ]
      : [
          {
            title: "Neon Arena",
            subtitle: "Gaming • Energy • Victory",
          },
          {
            title: "Cosmic Journey",
            subtitle: "Stars • Universe • Beyond",
          },
          {
            title: "Midnight Velocity",
            subtitle: "Speed • Luxury • Power",
          },
          {
            title: "Champion Arena",
            subtitle: "Victory • Passion • Glory",
          },
          {
            title: "Hero's Legacy",
            subtitle: "Courage • Strength • Hope",
          },
          {
            title: "Lost Horizons",
            subtitle: "Adventure • Explore • Freedom",
          },
        ];

  const accent = character === "girl" ? "purple" : "blue";

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
      {worlds.map((world) => {
        const data = worldData[world.title];

        return (
          <WorldCard
            key={world.title}
            title={world.title}
            subtitle={world.subtitle}
            image={data?.scenes?.[0]}
            scenes={data?.scenes?.filter(Boolean) ?? []}
            accent={accent}
            selected={creatorData.world === world.title}
            onClick={() =>
              setCreatorData((prev) => ({
                ...prev,
                world: world.title,
              }))
            }
          />
        );
      })}
    </div>
  );
}

export default WorldGallery;