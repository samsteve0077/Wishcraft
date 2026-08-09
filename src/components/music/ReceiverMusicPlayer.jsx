import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

import { getPlaybackRange } from "../../utils/music";

function ReceiverMusicPlayer({ music }) {
  const audioRef = useRef(null);

  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [showStartButton, setShowStartButton] = useState(false);

  useEffect(() => {
    if (!music?.src) return;

    if (audioRef.current) {
      audioRef.current.pause();
    }

    const audio = new Audio(music.src);
    const range = getPlaybackRange(music);

    audio.loop = true;
    audio.volume = 1;
    audioRef.current = audio;

    if (range) {
      audio.currentTime = range.start;
    }

    audio.addEventListener("timeupdate", () => {
      if (range && audio.currentTime >= range.end) {
        audio.pause();
        audio.currentTime = range.start;
      }
    });

    audio
      .play()
      .then(() => {
        setPlaying(true);
        setShowStartButton(false);
      })
      .catch(() => {
        setShowStartButton(true);
      });

    return () => {
      audio.pause();
      audio.currentTime = 0;
      audio.src = "";
    };
  }, [music]);

  const startMusic = () => {
    if (!audioRef.current) return;

    const range = getPlaybackRange(music);

    if (range) {
      audioRef.current.currentTime = range.start;
    }

    audioRef.current
      .play()
      .then(() => {
        setPlaying(true);
        setShowStartButton(false);
      })
      .catch(() => {});
  };

  const toggleMute = () => {
    if (!audioRef.current) return;

    const newMutedState = !muted;

    audioRef.current.muted = newMutedState;

    setMuted(newMutedState);
  };

  return (
    <>
      {showStartButton && (
        <button
          onClick={startMusic}
          className="
            fixed
            inset-0
            z-[999]

            flex
            items-center
            justify-center

            bg-black/70
            backdrop-blur-md

            text-white
          "
        >
          <div
            className="
              px-10
              py-5

              rounded-2xl

              bg-gradient-to-r
              from-fuchsia-600
              via-violet-600
              to-purple-600

              shadow-2xl

              text-lg
              font-semibold
            "
          >
            🎵 Tap to Start the Surprise
          </div>
        </button>
      )}

      {playing && (
        <button
          onClick={toggleMute}
          className="
            fixed

            top-6
            right-6

            z-50

            w-12
            h-12

            rounded-full

            bg-black/40
            backdrop-blur-xl

            flex
            items-center
            justify-center

            hover:scale-110

            transition-all
          "
        >
          {muted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>
      )}
    </>
  );
}

export default ReceiverMusicPlayer;