import { Music2 } from "lucide-react";

import MusicMode from "../music/MusicMode";
import MusicGrid from "../music/MusicGrid";
import MusicUploader from "../music/MusicUploader";

function MusicStep({
  creatorData,
  setCreatorData,
}) {
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
          Music creates emotion. Choose how you want your birthday journey to sound.
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

            <MusicUploader
              creatorData={creatorData}
              setCreatorData={setCreatorData}
            />

            

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
              p-12
            "
          >

            <h2 className="heading-font text-4xl font-bold text-center">
              🎬 Story Soundtrack
            </h2>

            <p className="body-font text-slate-400 text-center mt-4 max-w-3xl mx-auto">
              Choose a different soundtrack for each part of the birthday experience.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mt-12">

              {[
                "Waiting Screen",
                "Memories",
                "Letter",
                "Ending",
              ].map((section) => (

                <div
                  key={section}
                  className="
                    rounded-2xl
                    border
                    border-white/10
                    bg-white/[0.03]
                    p-8
                  "
                >

                  <h3 className="heading-font text-2xl font-semibold">
                    {section}
                  </h3>

                  <p className="text-slate-400 mt-2">
                    No song selected
                  </p>

                  <button
                    className="
                      mt-6

                      px-5
                      py-2

                      rounded-xl

                      bg-gradient-to-r
                      from-cyan-500
                      to-sky-500

                      hover:scale-105

                      transition-all
                    "
                  >
                    Choose Music
                  </button>

                </div>

              ))}

            </div>

          </div>

        )}

        {/* Silent */}

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
              No background music will play.
              Your memories, photos and letter will speak for themselves.
            </p>

          </div>

        )}

      </div>

    </div>
  );
}

export default MusicStep;