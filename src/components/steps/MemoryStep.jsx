import { useRef } from "react";
import { Heart, ToggleLeft, ToggleRight, Images } from "lucide-react";

import MemoryUploader from "../memory/MemoryUploader";
import MemoryGrid from "../memory/MemoryGrid";

function MemoryStep({ creatorData, setCreatorData }) {
  const fileInputRef = useRef(null);

  const photos = creatorData.photos || [];
  const memoryEnabled = creatorData.memoryEnabled !== false;

  const setMemoryEnabled = (enabled) => {
    setCreatorData((previous) => ({
      ...previous,
      memoryEnabled: enabled,
    }));
  };

  const setPhotos = (updater) => {
    setCreatorData((previous) => ({
      ...previous,
      photos:
        typeof updater === "function"
          ? updater(previous.photos || [])
          : updater,
    }));
  };

  const addFiles = (fileList) => {
    if (!fileList) return;

    const files = Array.from(fileList).filter((file) =>
      file.type.startsWith("image/")
    );

    if (files.length === 0) return;

    setPhotos((previous) => {
      const available = Math.max(0, 12 - previous.length);

      if (available === 0) return previous;

      const selected = files.slice(0, available);

      const newPhotos = selected.map((file) => ({
        id: crypto.randomUUID(),
        file,
        preview: URL.createObjectURL(file),
      }));

      return [...previous, ...newPhotos];
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* MEMORIES FEATURE SETTINGS */}
      <section
        className="rounded-2xl border p-5 sm:p-6"
        style={{
          background: "rgba(255,255,255,0.035)",
          borderColor: "rgba(255,255,255,0.12)",
        }}
      >
        <div className="flex items-center justify-between gap-4">
          <div className="flex min-w-0 items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-pink-500/10 text-pink-300">
              <Heart size={22} />
            </div>

            <div>
              <h3 className="text-base font-semibold text-white sm:text-lg">
                Memory Lane
              </h3>

              <p className="mt-1 text-sm leading-6 text-white/60">
                Let your favourite photos tell your story.
              </p>
            </div>
          </div>

          <button
            type="button"
            role="switch"
            aria-checked={memoryEnabled}
            aria-label="Enable or disable Memories"
            onClick={() => setMemoryEnabled(!memoryEnabled)}
            className="shrink-0 rounded-xl transition-transform hover:scale-105 active:scale-95"
          >
            {memoryEnabled ? (
              <ToggleRight
                size={38}
                className="text-pink-400"
              />
            ) : (
              <ToggleLeft
                size={38}
                className="text-white/40"
              />
            )}
          </button>
        </div>

        <div className="mt-4 flex items-center gap-2">
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              memoryEnabled
                ? "bg-emerald-400/10 text-emerald-300"
                : "bg-white/10 text-white/50"
            }`}
          >
            {memoryEnabled ? "Enabled" : "Disabled"}
          </span>

          <span className="text-xs text-white/45">
            {memoryEnabled
              ? "Photos will be included in the experience."
              : "Your photos are saved in the editor but skipped during playback."}
          </span>
        </div>
      </section>

      {/* PHOTO UPLOAD AND GRID */}
      <div
        className={`space-y-4 transition-opacity duration-300 ${
          memoryEnabled ? "" : "opacity-60"
        }`}
      >
        <div className="flex items-center gap-2">
          <Images size={18} className="text-pink-300" />

          <h3 className="text-sm font-semibold text-white">
            Your memories
          </h3>

          <span className="ml-auto text-xs text-white/50">
            {photos.length}/12 photos
          </span>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          onChange={(event) => addFiles(event.target.files)}
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
    </div>
  );
}

export default MemoryStep;