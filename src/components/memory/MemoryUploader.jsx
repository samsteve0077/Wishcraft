import { useState } from "react";
import { UploadCloud, ImagePlus } from "lucide-react";

function MemoryUploader({
  photos,
  setPhotos,
  fileInputRef,
}) {
  const [isDragging, setIsDragging] = useState(false);

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

  const handleChange = (e) => {
    addFiles(e.target.files);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    addFiles(e.dataTransfer.files);
  };

    return (
    <>
      {/* Hidden Input (used by Upload + Add More) */}


      {/* Show uploader only before first upload */}

      {photos.length === 0 && (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={`
            group
            flex
            flex-col
            items-center
            justify-center

            rounded-3xl
            border-2
            border-dashed

            ${
              isDragging
                ? "border-fuchsia-400 bg-fuchsia-500/10"
                : "border-fuchsia-500/40"
            }

            bg-gradient-to-br
            from-white/[0.03]
            to-white/[0.06]

            backdrop-blur-xl

            min-h-[420px]

            cursor-pointer

            transition-all
            duration-300
          `}
          onClick={() => fileInputRef.current?.click()}
        >
          <div
            className="
              w-24
              h-24

              rounded-full

              flex
              items-center
              justify-center

              bg-fuchsia-500/10

              group-hover:scale-110

              transition-all
              duration-300
            "
          >
            <UploadCloud
              size={50}
              className="text-fuchsia-400"
            />
          </div>

          <h2 className="heading-font text-4xl font-bold mt-8">
            Drop Your Memories Here
          </h2>

          <p className="body-font text-slate-400 mt-4 text-lg">
            Drag & Drop your favourite moments
          </p>

          <span className="body-font text-slate-500 mt-2">
            or
          </span>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              fileInputRef.current?.click();
            }}
            className="
              mt-6

              px-8
              py-3

              rounded-xl

              bg-gradient-to-r
              from-fuchsia-600
              via-purple-600
              to-violet-600

              hover:scale-105

              transition-all
              duration-300

              flex
              items-center
              gap-3
            "
          >
            <ImagePlus size={20} />
            Browse Your Photos
          </button>

          <p className="body-font text-slate-500 mt-8">
            JPG • PNG • WEBP
          </p>

          <p className="body-font text-fuchsia-300 mt-3">
            Optional • Add up to 12 Photos
          </p>
        </div>
      )}
    </>
  );
}

export default MemoryUploader;