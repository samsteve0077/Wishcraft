import WorldCard from "./WorldCard";

// Girl Images
import princess from "../../assets/girl/princess.jpg";
import butterfly from "../../assets/girl/butterfly.jpg";
import floral from "../../assets/girl/floral.jpg";
import pastel from "../../assets/girl/pastel.jpg";
import fairy from "../../assets/girl/fairy.jpg";
import pinkdream from "../../assets/girl/pinkdream.jpg";

// Boy Images
import gaming from "../../assets/boy/gaming.jpg";
import space from "../../assets/boy/space.jpg";
import cars from "../../assets/boy/cars.jpg";
import sports from "../../assets/boy/sports.jpg";
import superhero from "../../assets/boy/superhero.jpg";
import adventure from "../../assets/boy/adventure.jpg";

function WorldGallery({
  character,
  creatorData,
  setCreatorData,
}) {

  const worlds = {
    girl: [
      {
        title: "Royal Kingdom",
        subtitle: "Elegant • Royal • Magical",
        image: princess,
      },
      {
        title: "Butterfly Haven",
        subtitle: "Soft • Graceful • Beautiful",
        image: butterfly,
      },
      {
        title: "Blossom Garden",
        subtitle: "Blooming • Peaceful • Lovely",
        image: floral,
      },
      {
        title: "Moonlight Dreams",
        subtitle: "Dreamy • Calm • Elegant",
        image: pastel,
      },
      {
        title: "Enchanted Forest",
        subtitle: "Magic • Fantasy • Wonder",
        image: fairy,
      },
      {
        title: "Pink Paradise",
        subtitle: "Cute • Sweet • Charming",
        image: pinkdream,
      },
    ],

    boy: [
      {
        title: "Neon Arena",
        subtitle: "Gaming • Energy • Victory",
        image: gaming,
      },
      {
        title: "Cosmic Journey",
        subtitle: "Stars • Universe • Beyond",
        image: space,
      },
      {
        title: "Midnight Velocity",
        subtitle: "Speed • Luxury • Power",
        image: cars,
      },
      {
        title: "Champion Arena",
        subtitle: "Victory • Passion • Glory",
        image: sports,
      },
      {
        title: "Hero's Legacy",
        subtitle: "Courage • Strength • Hope",
        image: superhero,
      },
      {
        title: "Lost Horizons",
        subtitle: "Adventure • Explore • Freedom",
        image: adventure,
      },
    ],
  };

  const accent = character === "girl" ? "purple" : "blue";

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

      {worlds[character]?.map((world) => (
        <WorldCard
          key={world.title}
          title={world.title}
          subtitle={world.subtitle}
          image={world.image}
          accent={accent}
          selected={creatorData.world === world.title}
          onClick={() =>
            setCreatorData((prev) => ({
              ...prev,
              world: world.title,
            }))
          }
        />
      ))}

    </div>
  );
}

export default WorldGallery;