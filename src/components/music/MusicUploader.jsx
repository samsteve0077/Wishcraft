import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Upload, Music2 } from "lucide-react";

import { formatDuration } from "../../utils/music";

function MusicUploader({
  creatorData,
  setCreatorData,
  storySection = null,
  onStoryUpload,
}) {
  const fileInputRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = (file) => {
    if (!file) return;

    const allowedTypes = [
      "audio/mpeg",
      "audio/mp3",
      "audio/wav",
      "audio/x-wav",
      "audio/ogg",
      "audio/mp4",
      "audio/x-m4a",
    ];

    if (
      !allowedTypes.includes(file.type) &&
      !file.type.startsWith("audio/")
    ) {
      alert("Please upload a valid audio file.");
      return;
    }

    if (file.size > 25 * 1024 * 1024) {
      alert("Maximum file size is 25 MB.");
      return;
    }

    setIsUploading(true);

    const objectURL = URL.createObjectURL(file);
    const audio = document.createElement("audio");

    audio.preload = "metadata";
    audio.src = objectURL;

    audio.onloadedmetadata = () => {
      const totalSeconds = Number.isFinite(audio.duration)
        ? Math.floor(audio.duration)
        : 0;

      const uploadedSong = {
        id:
          typeof crypto !== "undefined" &&
          typeof crypto.randomUUID === "function"
            ? crypto.randomUUID()
            : `${Date.now()}-${Math.random()}`,

        type: "uploaded",
        title: file.name.replace(/\.[^/.]+$/, ""),
        subtitle: "Your Uploaded Song",
        file,
        src: objectURL,
        duration: formatDuration(totalSeconds),
        durationSeconds: totalSeconds,
        cover: null,
        trim: null,
      };

      if (storySection) {
        // Assign the uploaded song to this chapter only.
        onStoryUpload?.(uploadedSong);
      } else {
        // Preserve the existing single-soundtrack behavior.
        setCreatorData((previous) => ({
          ...previous,
          music: uploadedSong,
          uploadedMusic: uploadedSong,
        }));
      }

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      audio.onloadedmetadata = null;
      audio.removeAttribute("src");
      audio.load();

      setIsUploading(false);
    };

    audio.onerror = () => {
      URL.revokeObjectURL(objectURL);

      audio.onloadedmetadata = null;
      audio.onerror = null;
      audio.removeAttribute("src");
      audio.load();

      setIsUploading(false);
      alert("Unable to read this audio file. Please try another file.");
    };
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={storySection || "single-upload"}
        initial={{
          opacity: 0,
          scale: 0.96,
          y: -20,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
        }}
        exit={{
          opacity: 0,
          scale: 0.96,
          y: -20,
        }}
        transition={{
          duration: 0.35,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <div
          onClick={() => {
            if (!isUploading) {
              fileInputRef.current?.click();
            }
          }}
          className="
            group
            cursor-pointer
            rounded-3xl
            border
            border-dashed
            border-violet-500/30
            bg-white/4
            backdrop-blur-xl
            py-12
            sm:py-16
            text-center
            hover:border-violet-500
            hover:bg-white/6
            transition-all
            duration-300
          "
        >
          <div
            className="
              w-20
              h-20
              rounded-full
              mx-auto
              flex
              items-center
              justify-center
              bg-violet-500/10
              group-hover:scale-110
              transition-all
            "
          >
            <Upload
              size={36}
              className="text-violet-400"
            />
          </div>

          <h2 className="heading-font text-2xl sm:text-3xl font-bold mt-8">
            {storySection
              ? `Upload Music for ${storySection}`
              : "Upload Your Own Song"}
          </h2>

          <p className="body-font text-slate-400 mt-4">
            Can't find the perfect soundtrack?
          </p>

          <p className="body-font text-slate-500 mt-2 px-4">
            Upload your own MP3, WAV, OGG or M4A file.
          </p>

          <button
            type="button"
            disabled={isUploading}
            onClick={(event) => {
              event.stopPropagation();

              if (!isUploading) {
                fileInputRef.current?.click();
              }
            }}
            className="
              mt-8
              px-8
              py-3
              rounded-xl
              bg-gradient-to-r
              from-violet-600
              via-fuchsia-600
              to-purple-600
              hover:scale-105
              transition-all
              flex
              items-center
              gap-3
              mx-auto
              disabled:opacity-60
              disabled:cursor-wait
            "
          >
            <Music2 size={20} />

            {isUploading ? "Processing Audio..." : "Browse Music"}
          </button>

          <p className="body-font text-slate-500 mt-8">
            Maximum file size: 25 MB
          </p>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept=".mp3,.wav,.ogg,.m4a,audio/*"
          className="hidden"
          onChange={(event) => {
            handleUpload(event.target.files?.[0]);
          }}
        />
      </motion.div>
    </AnimatePresence>
  );
}

export default MusicUploader;