import { useState } from "react";

import { Music2, X } from "lucide-react";

import MusicMode from "../music/MusicMode";
import MusicGrid from "../music/MusicGrid";
import MusicUploader from "../music/MusicUploader";

const STORY_SECTIONS = [
  "Waiting Screen",
  "Memories",
  "Letter",
  "Ending",
];

function MusicStep({
  creatorData,
  setCreatorData,
}) {
  const [activeStorySection, setActiveStorySection] =
    useState(null);

  // Keep each story chapter's song independent.
  const storyMusic =
    creatorData.storyMusic || {};

  const selectedStorySong = activeStorySection
    ? storyMusic[activeStorySection] || null
    : null;

  // Assign a song to the currently opened chapter.
  const selectStorySong = (song) => {
    if (!activeStorySection || !song) {
      return;
    }

    setCreatorData((previous) => ({
      ...previous,

      storyMusic: {
        ...(previous.storyMusic || {}),

        [activeStorySection]: {
          ...song,
        },
      },
    }));

    setActiveStorySection(null);
  };

  const closeStoryMusicPicker = () => {
    setActiveStorySection(null);
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-14">
        <div
          className="
            w-20
            h-20
            rounded-full
            mx-auto
            flex
            items-center
            justify-center
            bg-gradient-to-r
            from-violet-500
            via-fuchsia-500
            to-pink-500
          "
        >
          <Music2 size={34} />
        </div>

        <h2 className="heading-font text-5xl font-bold mt-8">
          Choose the Perfect Soundtrack
        </h2>

        <p className="body-font text-slate-400 mt-4 text-lg max-w-3xl mx-auto leading-8">
          Music creates emotion. Choose how you want your
          birthday journey to sound.
        </p>
      </div>

      {/* Music Mode */}
      <MusicMode
        creatorData={creatorData}
        setCreatorData={setCreatorData}
      />

      {/* Music Content */}
      <div className="mt-20">
        {/* Single Soundtrack */}
        {creatorData.musicMode === "single" && (
          <>
            <MusicGrid
              creatorData={creatorData}
              setCreatorData={setCreatorData}
            />

            <div className="mt-10">
              <MusicUploader
                creatorData={creatorData}
                setCreatorData={setCreatorData}
              />
            </div>
          </>
        )}

        {/* Story Soundtrack */}
        {creatorData.musicMode === "story" && (
          <div
            className="
              rounded-3xl
              border
              border-cyan-500/20
              bg-white/[0.04]
              backdrop-blur-xl
              p-6
              sm:p-12
            "
          >
            <h2 className="heading-font text-4xl font-bold text-center">
              🎬 Story Soundtrack
            </h2>

            <p className="body-font text-slate-400 text-center mt-4 max-w-3xl mx-auto">
              Choose a different soundtrack for each part of
              the birthday experience.
            </p>

            {/* Story Chapters */}
            <div className="grid md:grid-cols-2 gap-6 mt-12">
              {STORY_SECTIONS.map((section) => {
                const song = storyMusic[section];

                return (
                  <div
                    key={section}
                    className="
                      rounded-2xl
                      border
                      border-white/10
                      bg-white/[0.03]
                      p-8
                      transition-all
                      duration-300
                      hover:border-cyan-400/30
                    "
                  >
                    <h3 className="heading-font text-2xl font-semibold">
                      {section}
                    </h3>

                    <p
                      className={`
                        mt-3
                        ${
                          song
                            ? "text-cyan-300"
                            : "text-slate-400"
                        }
                      `}
                    >
                      {song?.title || "No song selected"}
                    </p>

                    {song?.subtitle && (
                      <p className="text-sm text-slate-500 mt-1">
                        {song.subtitle}
                      </p>
                    )}

                    <button
                      type="button"
                      onClick={() =>
                        setActiveStorySection(section)
                      }
                      className="
                        mt-6
                        px-5
                        py-3
                        rounded-xl
                        bg-gradient-to-r
                        from-cyan-500
                        to-sky-500
                        text-white
                        font-semibold
                        hover:scale-105
                        transition-all
                      "
                    >
                      {song ? "Change Music" : "Choose Music"}
                    </button>

                    {song && (
                      <button
                        type="button"
                        onClick={() => {
                          setCreatorData((previous) => {
                            const updatedStoryMusic = {
                              ...(previous.storyMusic || {}),
                            };

                            delete updatedStoryMusic[section];

                            return {
                              ...previous,
                              storyMusic: updatedStoryMusic,
                            };
                          });
                        }}
                        className="
                          ml-3
                          mt-6
                          px-4
                          py-3
                          rounded-xl
                          border
                          border-red-400/20
                          text-red-300
                          hover:bg-red-500/10
                          transition-all
                        "
                      >
                        Remove
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Silent Experience */}
        {creatorData.musicMode === "silent" && (
          <div
            className="
              rounded-3xl
              border
              border-white/10
              bg-white/[0.04]
              backdrop-blur-xl
              p-16
              text-center
            "
          >
            <h2 className="heading-font text-4xl font-bold">
              🔇 Silent Experience
            </h2>

            <p className="body-font text-slate-400 mt-5 max-w-2xl mx-auto leading-8">
              No background music will play. Your memories,
              photos and letter will speak for themselves.
            </p>
          </div>
        )}
      </div>

      {/* Story Music Selection Modal */}
      {activeStorySection && (
        <div
          className="
            fixed
            inset-0
            z-[9999]
            flex
            items-center
            justify-center
            p-3
            sm:p-6
            bg-black/85
            backdrop-blur-md
          "
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeStoryMusicPicker();
            }
          }}
          role="dialog"
          aria-modal="true"
          aria-label={`Choose music for ${activeStorySection}`}
        >
          <div
            className="
              relative
              w-full
              max-w-6xl
              max-h-[92vh]
              overflow-y-auto
              rounded-3xl
              border
              border-cyan-400/20
              bg-[#101016]
              p-5
              sm:p-8
              shadow-[0_0_60px_rgba(34,211,238,.12)]
            "
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 mb-8">
              <div>
                <p className="text-cyan-300 text-sm font-semibold uppercase tracking-widest">
                  Story Soundtrack
                </p>

                <h2 className="heading-font text-2xl sm:text-4xl font-bold mt-2">
                  Choose Music
                </h2>

                <p className="text-slate-400 mt-2">
                  Select a song for{" "}
                  <span className="text-white font-semibold">
                    {activeStorySection}
                  </span>
                  .
                </p>
              </div>

              <button
                type="button"
                onClick={closeStoryMusicPicker}
                className="
                  shrink-0
                  w-11
                  h-11
                  rounded-full
                  border
                  border-white/10
                  bg-white/5
                  flex
                  items-center
                  justify-center
                  hover:bg-white/10
                  transition-all
                "
                aria-label="Close music selection"
              >
                <X size={22} />
              </button>
            </div>

            {/* Existing Music Library */}
            <MusicGrid
              creatorData={{
                ...creatorData,
                music: selectedStorySong,
              }}
              setCreatorData={(updater) => {
                const previous = {
                  ...creatorData,
                  music: selectedStorySong,
                };

                const updated =
                  typeof updater === "function"
                    ? updater(previous)
                    : updater;

                if (
                  updated?.music &&
                  updated.music !== selectedStorySong
                ) {
                  selectStorySong(updated.music);
                }
              }}
            />

            {/* Upload Music */}
            <div className="mt-8">
              <MusicUploader
  key={activeStorySection}
  creatorData={creatorData}
  setCreatorData={setCreatorData}
  storySection={activeStorySection}
  onStoryUpload={selectStorySong}
/>
            </div>

            {/* Footer */}
            <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
              <p className="text-slate-400 text-sm">
                {selectedStorySong
                  ? `Selected: ${selectedStorySong.title}`
                  : "Choose a song from the library above."}
              </p>

              <button
                type="button"
                onClick={closeStoryMusicPicker}
                className="
                  px-6
                  py-3
                  rounded-xl
                  border
                  border-white/10
                  bg-white/5
                  text-white
                  hover:bg-white/10
                  transition-all
                "
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MusicStep;