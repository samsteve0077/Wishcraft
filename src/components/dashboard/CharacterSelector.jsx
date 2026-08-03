import { User, Venus, Mars, CheckCircle2 } from "lucide-react";

function CharacterSelector({ creatorData, setCreatorData }) {
  return (
    <div className="bg-[#15151D]/90 backdrop-blur-lg border border-white/10 rounded-3xl p-8 shadow-2xl">

      <h2 className="text-3xl font-bold">
        ✨ Let's meet the birthday star!
      </h2>

      <p className="text-gray-400 mt-3">
        Tell us a little about the amazing person you're celebrating.
      </p>

      <div className="mt-8 space-y-6">

        {/* Birthday Person */}

        <div>

          <label className="flex items-center gap-2 mb-2 text-gray-300">
            <User size={18} />
            Birthday Person's Name 👑
          </label>

          <input
            type="text"
            placeholder="Enter their name..."
            value={creatorData.recipientName}
            onChange={(e) =>
              setCreatorData({
                ...creatorData,
                recipientName: e.target.value,
              })
            }
            className="w-full bg-[#0B0B0F] border border-white/10 rounded-xl px-5 py-4 outline-none focus:border-purple-500 transition"
          />

        </div>

        {/* Creator */}

        <div>

          <label className="flex items-center gap-2 mb-2 text-gray-300">
            <User size={18} />
            Your Name
          </label>

          <input
            type="text"
            placeholder="Enter your name..."
            value={creatorData.creatorName}
            onChange={(e) =>
              setCreatorData({
                ...creatorData,
                creatorName: e.target.value,
              })
            }
            className="w-full bg-[#0B0B0F] border border-white/10 rounded-xl px-5 py-4 outline-none focus:border-pink-500 transition"
          />

        </div>

        {/* Age */}

        <div>

          <label className="mb-2 block text-gray-300">
            Birthday Age (Optional)
          </label>

          <input
            type="number"
            placeholder="Age"
            value={creatorData.age}
            onChange={(e) =>
              setCreatorData({
                ...creatorData,
                age: e.target.value,
              })
            }
            className="w-full bg-[#0B0B0F] border border-white/10 rounded-xl px-5 py-4 outline-none focus:border-blue-500 transition"
          />

        </div>

        {/* Character */}

        <div className="pt-6">

          <h3 className="text-xl font-semibold mb-5">
            Choose Character
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Girl */}

            <div
              onClick={() =>
                setCreatorData({
                  ...creatorData,
                  character: "girl",
                })
              }
              className={`cursor-pointer rounded-2xl p-8 border transition-all duration-300 hover:-translate-y-2 hover:shadow-purple-500/20 hover:shadow-xl ${
                creatorData.character === "girl"
                  ? "border-purple-500 bg-purple-500/10"
                  : "border-white/10 bg-[#0B0B0F]"
              }`}
            >

              <div className="flex justify-between">

                <Venus size={42} />

                {creatorData.character === "girl" && (
                  <CheckCircle2 className="text-purple-400" />
                )}

              </div>

              <h4 className="mt-8 text-2xl font-bold">
                Girl
              </h4>

            </div>

            {/* Boy */}

            <div
              onClick={() =>
                setCreatorData({
                  ...creatorData,
                  character: "boy",
                })
              }
              className={`cursor-pointer rounded-2xl p-8 border transition-all duration-300 hover:-translate-y-2 hover:shadow-blue-500/20 hover:shadow-xl ${
                creatorData.character === "boy"
                  ? "border-blue-500 bg-blue-500/10"
                  : "border-white/10 bg-[#0B0B0F]"
              }`}
            >

              <div className="flex justify-between">

                <Mars size={42} />

                {creatorData.character === "boy" && (
                  <CheckCircle2 className="text-blue-400" />
                )}

              </div>

              <h4 className="mt-8 text-2xl font-bold">
                Boy
              </h4>

            </div>

          </div>

        </div>

      </div>

      <p className="mt-8 text-center text-sm text-purple-300 italic">
        Every unforgettable surprise starts with someone special.💖
      </p>

    </div>
  );
}

export default CharacterSelector;