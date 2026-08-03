import WorldGallery from "../dashboard/WorldGallery";

function WorldStep({ creatorData }) {
  return (
    <div>
      <h2 className="text-5xl font-bold text-center">
        🌍 Discover Their World
      </h2>

      <p className="text-center text-gray-400 mt-4 max-w-2xl mx-auto">
        Every unforgettable birthday begins with a world full of memories.
        Choose the one that feels just right.
      </p>

      <div className="mt-12">
        <WorldGallery character={creatorData.character} />
      </div>
    </div>
  );
}

export default WorldStep;