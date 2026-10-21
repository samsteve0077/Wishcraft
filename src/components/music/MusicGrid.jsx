import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import MusicCard from "./MusicCard";

import {
  formatDuration,
  getPlaybackRange,
  getSongDurationSeconds,
} from "../../utils/music";

import celebration from "../../assets/music/celebration.mp3";
import emotional from "../../assets/music/emotional-piano.mp3";
import classic from "../../assets/music/hbd-classic.mp3";
import instrumental from "../../assets/music/hbd-instrumental.mp3";

import celebrationCover from "../../assets/music-cover/celebration.jpg";
import emotionalCover from "../../assets/music-cover/emotional.jpg";
import classicCover from "../../assets/music-cover/classic.jpg";
import instrumentalCover from "../../assets/music-cover/instrumental.jpg";

const defaultSongs = [
  {
    type: "default",
    title: "Happy Birthday Instrumental",
    subtitle: "Soft Piano • Relaxing",
    cover: instrumentalCover,
    src: instrumental,
  },
  {
    type: "default",
    title: "Happy Birthday Classic",
    subtitle: "Birthday Song • Vocal",
    cover: classicCover,
    src: classic,
  },
  {
    type: "default",
    title: "Emotional Piano",
    subtitle: "Emotional • Calm",
    cover: emotionalCover,
    src: emotional,
  },
  {
    type: "default",
    title: "Celebration",
    subtitle: "Party • Fun",
    cover: celebrationCover,
    src: celebration,
  },
];

function MusicGrid({
  creatorData,
  setCreatorData,
}) {
  const replaceInputRef = useRef(null);
  const currentAudioRef = useRef(null);

  const [playingSong, setPlayingSong] = useState("");
  const [resolvedDurations, setResolvedDurations] = useState({});

  /*
   * Uploaded music is stored separately from
   * the currently selected music.
   *
   * creatorData.music
   *     = currently selected song
   *
   * creatorData.uploadedMusic
   *     = uploaded song that must remain available
   */

  const uploadedSong = creatorData.uploadedMusic || null;

  /* ======================================================
     LOAD DEFAULT SONG DURATIONS
  ====================================================== */

  useEffect(() => {
    const audioNodes = [];

    defaultSongs.forEach((song) => {
      const audio = new Audio(song.src);

      audio.preload = "metadata";

      const handleLoadedMetadata = () => {
        if (Number.isFinite(audio.duration)) {
          setResolvedDurations((previous) => ({
            ...previous,
            [song.title]: audio.duration,
          }));
        }
      };

      audio.addEventListener(
        "loadedmetadata",
        handleLoadedMetadata
      );

      audioNodes.push({
        audio,
        handleLoadedMetadata,
      });
    });

    return () => {
      audioNodes.forEach(
        ({ audio, handleLoadedMetadata }) => {
          audio.removeEventListener(
            "loadedmetadata",
            handleLoadedMetadata
          );

          audio.pause();
          audio.src = "";
        }
      );
    };
  }, []);

  /* ======================================================
     CLEANUP AUDIO
  ====================================================== */

  useEffect(() => {
    return () => {
      if (currentAudioRef.current) {
        currentAudioRef.current.pause();
        currentAudioRef.current.currentTime = 0;
        currentAudioRef.current.src = "";
        currentAudioRef.current = null;
      }
    };
  }, []);

  /* ======================================================
     BUILD SONG LIST
  ====================================================== */

  const songs = useMemo(() => {
    const resolvedDefaultSongs = defaultSongs.map(
      (song) => ({
        ...song,
        durationSeconds: Number(
          resolvedDurations[song.title] ?? 0
        ),
      })
    );

    if (!uploadedSong) {
      return resolvedDefaultSongs;
    }

    const resolvedUploadedSong = {
      ...uploadedSong,
      type: "uploaded",
      subtitle:
        uploadedSong.subtitle ||
        "Your Uploaded Song",
      cover: uploadedSong.cover || null,
      durationSeconds: Number(
        uploadedSong.durationSeconds ??
          getSongDurationSeconds(uploadedSong)
      ),
    };

    return [
      ...resolvedDefaultSongs,
      resolvedUploadedSong,
    ];
  }, [
    uploadedSong,
    resolvedDurations,
  ]);

  /* ======================================================
     STOP CURRENT AUDIO
  ====================================================== */

  const stopCurrentAudio = () => {
    if (!currentAudioRef.current) {
      return;
    }

    currentAudioRef.current.pause();
    currentAudioRef.current.currentTime = 0;
    currentAudioRef.current.src = "";

    currentAudioRef.current = null;

    setPlayingSong("");
  };

  /* ======================================================
     PLAY / PAUSE
  ====================================================== */

  const playSong = (song) => {
    if (playingSong === song.title) {
      stopCurrentAudio();
      return;
    }

    if (currentAudioRef.current) {
      currentAudioRef.current.pause();
      currentAudioRef.current.currentTime = 0;
      currentAudioRef.current.src = "";
      currentAudioRef.current = null;
    }

    const audio = new Audio(song.src);

    audio.preload = "auto";

    const range = getPlaybackRange(song);

    if (range) {
      audio.currentTime = range.start;
    }

    const handleTimeUpdate = () => {
      if (
        range &&
        audio.currentTime >= range.end
      ) {
        audio.currentTime = range.start;
      }
    };

    const handleEnded = () => {
      setPlayingSong("");
      currentAudioRef.current = null;
    };

    audio.addEventListener(
      "timeupdate",
      handleTimeUpdate
    );

    audio.addEventListener(
      "ended",
      handleEnded
    );

    audio
      .play()
      .then(() => {
        currentAudioRef.current = audio;
        setPlayingSong(song.title);
      })
      .catch((error) => {
        console.error(
          "Unable to play audio:",
          error
        );

        audio.removeEventListener(
          "timeupdate",
          handleTimeUpdate
        );

        audio.removeEventListener(
          "ended",
          handleEnded
        );

        audio.src = "";
      });
  };

  /* ======================================================
     SELECT SONG
  ====================================================== */

  const selectSong = (song) => {
    setCreatorData((previous) => ({
      ...previous,

      /*
       * IMPORTANT:
       * We ONLY change the selected music.
       *
       * uploadedMusic stays untouched.
       */

      music: {
        ...song,

        type: song.type,

        title: song.title,

        subtitle:
          song.subtitle ||
          (song.type === "uploaded"
            ? "Your Uploaded Song"
            : "Music"),

        duration: formatDuration(
          getSongDurationSeconds(song)
        ),

        durationSeconds:
          getSongDurationSeconds(song),

        src: song.src,

        cover:
          song.cover || null,

        trim: song.trim ?? null,
      },
    }));
  };

  /* ======================================================
     DELETE UPLOADED SONG
  ====================================================== */

  const deleteUploadedSong = () => {
    if (!uploadedSong) {
      return;
    }

    if (
      creatorData.music?.type === "uploaded"
    ) {
      stopCurrentAudio();
    }

    if (uploadedSong.src) {
      try {
        URL.revokeObjectURL(
          uploadedSong.src
        );
      } catch {
        // Ignore invalid object URLs.
      }
    }

    setCreatorData((previous) => ({
      ...previous,

      /*
       * Remove persistent uploaded music.
       */
      uploadedMusic: null,

      /*
       * Clear currently selected music
       * only if the uploaded song was selected.
       */
      music:
        previous.music?.type === "uploaded"
          ? null
          : previous.music,
    }));
  };

  /* ======================================================
     OPEN REPLACE PICKER
  ====================================================== */

  const openReplacePicker = () => {
    replaceInputRef.current?.click();
  };

  /* ======================================================
     REPLACE UPLOADED SONG
  ====================================================== */

  const handleReplace = (file) => {
    if (!file) {
      return;
    }

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
      alert(
        "Please upload a valid audio file."
      );
      return;
    }

    if (
      file.size >
      25 * 1024 * 1024
    ) {
      alert(
        "Maximum file size is 25 MB."
      );
      return;
    }

    stopCurrentAudio();

    if (uploadedSong?.src) {
      try {
        URL.revokeObjectURL(
          uploadedSong.src
        );
      } catch {
        // Ignore invalid object URLs.
      }
    }

    const objectURL =
      URL.createObjectURL(file);

    const audio =
      document.createElement("audio");

    audio.preload = "metadata";
    audio.src = objectURL;

    audio.onloadedmetadata = () => {
      const totalSeconds =
        Number.isFinite(audio.duration)
          ? Math.floor(audio.duration)
          : 0;

      const newUploadedSong = {
        type: "uploaded",

        title: file.name.replace(
          /\.[^/.]+$/,
          ""
        ),

        subtitle:
          "Your Uploaded Song",

        file,

        src: objectURL,

        duration:
          formatDuration(totalSeconds),

        durationSeconds:
          totalSeconds,

        cover: null,

        trim: null,
      };

      /*
       * IMPORTANT:
       * Save the replacement permanently
       * as uploadedMusic.
       */

      setCreatorData((previous) => ({
        ...previous,

        uploadedMusic:
          newUploadedSong,

        /*
         * Replacement also becomes
         * the currently selected song.
         */
        music: newUploadedSong,
      }));

      if (replaceInputRef.current) {
        replaceInputRef.current.value = "";
      }

      audio.onloadedmetadata = null;
      audio.src = "";
    };
  };

  /* ======================================================
     RENDER
  ====================================================== */

  return (
    <div className="w-full">

      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-3
          gap-6
        "
      >
        {songs.map((song) => (
          <MusicCard
            key={`${song.type}-${song.title}`}
            song={song}
            accent="purple"

            selected={
              creatorData.music?.title ===
                song.title &&
              creatorData.music?.type ===
                song.type
            }

            playing={
              playingSong === song.title
            }

            onPlay={() =>
              playSong(song)
            }

            onSelect={() =>
              selectSong(song)
            }

            onReplace={
              song.type === "uploaded"
                ? openReplacePicker
                : undefined
            }

            onRemove={
              song.type === "uploaded"
                ? deleteUploadedSong
                : undefined
            }
          />
        ))}
      </div>

      <input
        ref={replaceInputRef}
        type="file"
        accept=".mp3,.wav,.ogg,.m4a,audio/*"
        className="hidden"
        onChange={(event) => {
          handleReplace(
            event.target.files?.[0]
          );
        }}
      />

    </div>
  );
}

export default MusicGrid;