import { useRef } from "react";
import { Upload, Music2 } from "lucide-react";

function MusicUploader({
  creatorData,
  setCreatorData,
}) {
  const fileInputRef = useRef(null);

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

    const audio = document.createElement("audio");

    const objectURL = URL.createObjectURL(file);

    audio.src = objectURL;

    audio.onloadedmetadata = () => {
      const totalSeconds = Math.floor(audio.duration);

      const minutes = Math.floor(totalSeconds / 60);
      const seconds = String(totalSeconds % 60).padStart(2, "0");

      setCreatorData((prev) => ({
        ...prev,
        music: {
          type: "uploaded",
          title: file.name.replace(/\.[^/.]+$/, ""),
          file,
          src: objectURL,
          duration: `${minutes}:${seconds}`,
        },
      }));

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    };
  };

  const replaceMusic = () => {
    fileInputRef.current?.click();
  };

  const removeMusic = () => {
    if (creatorData.music?.src) {
      URL.revokeObjectURL(creatorData.music.src);
    }

    setCreatorData((prev) => ({
      ...prev,
      music: null,
    }));

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="mt-16">

      {/* Divider */}

      <div className="flex items-center gap-5 mb-10">

        <div className="flex-1 h-px bg-white/10" />

        <span className="body-font text-slate-500 uppercase tracking-[0.3em]">
          OR
        </span>

        <div className="flex-1 h-px bg-white/10" />

      </div>

      {/* Upload Card */}

      <div
        onClick={() => fileInputRef.current?.click()}
        className="
          group
          cursor-pointer

          rounded-3xl

          border
          border-dashed
          border-violet-500/30

          bg-white/[0.04]
          backdrop-blur-xl

          py-16

          text-center

          hover:border-violet-500
          hover:bg-white/[0.06]

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

        <h2 className="heading-font text-3xl font-bold mt-8">
          Upload Your Own Song
        </h2>

        <p className="body-font text-slate-400 mt-4">
          Can't find the perfect soundtrack?
        </p>

        <p className="body-font text-slate-500 mt-2">
          Upload your own MP3, WAV, OGG or M4A file.
        </p>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            fileInputRef.current?.click();
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
          "
        >
          <Music2 size={20} />
          Browse Music
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
        onChange={(e) => handleUpload(e.target.files[0])}
      />

    </div>
  );
}

export default MusicUploader;