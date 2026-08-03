import { motion, AnimatePresence } from "framer-motion";

import MemoryCard from "./MemoryCard";
import AddPhotoCard from "./AddPhotoCard";
import MemoryCounter from "./MemoryCounter";

function MemoryGrid({
  photos,
  setPhotos,
  fileInputRef,
}) {
  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="flex flex-col md:flex-row justify-between items-center gap-4">

        <div>

          <h2 className="heading-font text-3xl font-bold">
            Your Memories
          </h2>

          <p className="body-font text-slate-400 mt-2">
            Every beautiful moment deserves a place in your story.
          </p>

        </div>

        <MemoryCounter
          count={photos.length}
          max={12}
        />

      </div>

      {/* Gallery */}

      <motion.div
        layout
        className="
          grid
          grid-cols-2
          md:grid-cols-3
          xl:grid-cols-4
          gap-6
        "
      >

        <AnimatePresence mode="popLayout">

          {photos.map((photo) => (

            <MemoryCard
              key={photo.id}
              photo={photo}
              setPhotos={setPhotos}
            />

          ))}

        </AnimatePresence>

        {/* Add More */}

        {photos.length > 0 && photos.length < 12 && (
  <AddPhotoCard
    fileInputRef={fileInputRef}
  />
)}

      </motion.div>

    </div>
  );
}

export default MemoryGrid;