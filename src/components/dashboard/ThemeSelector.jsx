import { useState } from "react";
import { CheckCircle2 } from "lucide-react";

const themes = {
  girl: [
    {
      name: "Princess",
      icon: "👑",
      description: "Elegant & Royal",
      gradient: "from-fuchsia-500 to-purple-600",
    },
    {
      name: "Butterfly",
      icon: "🦋",
      description: "Soft & Beautiful",
      gradient: "from-pink-500 to-purple-500",
    },
    {
      name: "Floral",
      icon: "🌸",
      description: "Fresh & Blooming",
      gradient: "from-pink-500 to-rose-500",
    },
    {
      name: "Pastel",
      icon: "🌙",
      description: "Cute & Calm",
      gradient: "from-violet-500 to-indigo-500",
    },
    {
      name: "Fairy",
      icon: "✨",
      description: "Magical World",
      gradient: "from-fuchsia-500 to-violet-500",
    },
    {
      name: "Pink Dream",
      icon: "🎀",
      description: "Sweet & Lovely",
      gradient: "from-pink-500 to-red-400",
    },
  ],

  boy: [
    {
      name: "Gaming",
      icon: "🎮",
      description: "Level Up the Celebration",
      gradient: "from-sky-500 to-blue-700",
    },
    {
      name: "Space",
      icon: "🚀",
      description: "Beyond the Stars",
      gradient: "from-blue-500 to-indigo-700",
    },
    {
      name: "Cars",
      icon: "🏎️",
      description: "Speed & Passion",
      gradient: "from-cyan-500 to-blue-700",
    },
    {
      name: "Sports",
      icon: "⚽",
      description: "Play Like a Champion",
      gradient: "from-blue-400 to-cyan-600",
    },
    {
      name: "Superhero",
      icon: "🦸",
      description: "Save the Day",
      gradient: "from-indigo-500 to-blue-800",
    },
    {
      name: "Adventure",
      icon: "🐉",
      description: "Ready to Explore",
      gradient: "from-slate-600 to-blue-800",
    },
  ],
};

function ThemeSelector({ character }) {
  const [selectedTheme, setSelectedTheme] = useState("");

  const isGirl = character === "girl";

  return (
    <div className="mt-12">

      <h2 className="text-3xl font-bold text-white">
        🎨 Choose a Theme
      </h2>

      <p className="text-gray-400 mt-2">
        Pick a theme that matches the birthday person.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">

        {themes[character].map((theme) => (

          <div
            key={theme.name}
            onClick={() => setSelectedTheme(theme.name)}
            className={`cursor-pointer rounded-3xl overflow-hidden border transition-all duration-300 hover:scale-105 hover:-translate-y-1

            ${
              selectedTheme === theme.name
                ? isGirl
                  ? "border-purple-500 shadow-2xl shadow-purple-500/30 scale-105"
                  : "border-blue-500 shadow-2xl shadow-blue-500/30 scale-105"
                : "border-white/10 hover:border-white/20"
            }
            `}
          >

            <div
              className={`h-44 bg-gradient-to-br ${theme.gradient}
              flex items-center justify-center text-6xl`}
            >
              {theme.icon}
            </div>

            <div className="bg-[#17171F] p-5">

              <div className="flex justify-between items-center">

                <div>

                  <h3 className="text-2xl font-bold text-white">
                    {theme.name}
                  </h3>

                  <p className="text-gray-400 mt-1">
                    {theme.description}
                  </p>

                </div>

                {selectedTheme === theme.name && (

                  <CheckCircle2
                    size={28}
                    className={
                      isGirl
                        ? "text-purple-400"
                        : "text-blue-400"
                    }
                  />

                )}

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default ThemeSelector;