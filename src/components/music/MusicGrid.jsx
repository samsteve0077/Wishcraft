import { useState } from "react";

import MusicCard from "./MusicCard";

// Songs
import celebration from "../../assets/music/celebration.mp3";
import emotional from "../../assets/music/emotional-piano.mp3";
import classic from "../../assets/music/hbd-classic.mp3";
import instrumental from "../../assets/music/hbd-instrumental.mp3";

// Covers
import celebrationCover from "../../assets/music-cover/celebration.jpg";
import emotionalCover from "../../assets/music-cover/emotional.jpg";
import classicCover from "../../assets/music-cover/classic.jpg";
import instrumentalCover from "../../assets/music-cover/instrumental.jpg";

function MusicGrid({
  creatorData,
  setCreatorData,
}) {

  const [currentAudio, setCurrentAudio] = useState(null);
  const [playingSong, setPlayingSong] = useState("");

  const songs = [
    {
      title: "Happy Birthday Instrumental",
      subtitle: "Soft Piano • Relaxing",
      duration: "2:45",
      cover: instrumentalCover,
      src: instrumental,
    },

    {
      title: "Happy Birthday Classic",
      subtitle: "Birthday Song • Vocal",
      duration: "2:18",
      cover: classicCover,
      src: classic,
    },

    {
      title: "Emotional Piano",
      subtitle: "Emotional • Calm",
      duration: "3:32",
      cover: emotionalCover,
      src: emotional,
    },

    {
      title: "Celebration",
      subtitle: "Party • Fun",
      duration: "2:54",
      cover: celebrationCover,
      src: celebration,
    },
  ];

  const playSong = (song) => {

    if (currentAudio) {
      currentAudio.pause();
    }

    if (playingSong === song.title) {
      setPlayingSong("");
      setCurrentAudio(null);
      return;
    }

    const audio = new Audio(song.src);

    audio.play();

    audio.onended = () => {
      setPlayingSong("");
    };

    setCurrentAudio(audio);

    setPlayingSong(song.title);

  };

  const selectSong = (song) => {

    setCreatorData((prev) => ({
      ...prev,
      music: {
        type: "default",
        title: song.title,
        src: song.src,
        cover: song.cover,
      },
    }));

  };

  return (

    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">

      {songs.map((song) => (

        <MusicCard
          key={song.title}
          song={song}
          accent="purple"
          selected={creatorData.music?.title === song.title}
          playing={playingSong === song.title}
          onPlay={() => playSong(song)}
          onSelect={() => selectSong(song)}
        />

      ))}

    </div>

  );

}

export default MusicGrid;