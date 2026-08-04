import WorldGallery from "../dashboard/WorldGallery";

function WorldStep({
  creatorData,
  setCreatorData,
}) {
  return (
    <div>

      <h2 className="heading-font text-5xl font-bold text-center">
        🌍 Discover Their World
      </h2>

      <p className="body-font text-center text-gray-400 mt-4 max-w-2xl mx-auto leading-8">
        Every unforgettable birthday begins with a world full of memories.
        Choose the one that feels just right.
      </p>

      <div className="mt-12">

        <WorldGallery
          character={creatorData.character}
          creatorData={creatorData}
          setCreatorData={setCreatorData}
        />

      </div>

    </div>
  );
}

export default WorldStep;