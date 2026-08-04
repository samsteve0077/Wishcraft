import { useRef } from "react";

import MemoryUploader from "../memory/MemoryUploader";
import MemoryGrid from "../memory/MemoryGrid";

function MemoryStep({
  creatorData,
  setCreatorData,
}) {
  const fileInputRef = useRef(null);

  const photos = creatorData.photos;

  const setPhotos = (updater) => {
    setCreatorData((prev) => ({
      ...prev,
      photos:
        typeof updater === "function"
          ? updater(prev.photos)
          : updater,
    }));
  };

  const addFiles = (fileList) => {
    const files = Array.from(fileList).filter((file) =>
      file.type.startsWith("image/")
    );

    if (files.length === 0) return;

    setPhotos((prev) => {
      const available = 12 - prev.length;

      const selected = files.slice(0, available);

      const newPhotos = selected.map((file) => ({
        id: crypto.randomUUID(),
        file,
        preview: URL.createObjectURL(file),
      }));

      return [...prev, ...newPhotos];
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-8">

      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*"
        className="hidden"
        onChange={(e) => addFiles(e.target.files)}
      />

      {photos.length === 0 ? (
        <MemoryUploader
          photos={photos}
          setPhotos={setPhotos}
          fileInputRef={fileInputRef}
        />
      ) : (
        <MemoryGrid
          photos={photos}
          setPhotos={setPhotos}
          fileInputRef={fileInputRef}
        />
      )}

    </div>
  );
}

export default MemoryStep;