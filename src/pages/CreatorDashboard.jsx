import { useState, useEffect } from "react";

import BackgroundWords from "../components/BackgroundWords";

import BirthdayInfoStep from "../components/steps/BirthdayInfoStep";
import WorldStep from "../components/steps/WorldStep";
import MemoryStep from "../components/steps/MemoryStep";
import LetterStep from "../components/steps/LetterStep";
import MusicStep from "../components/steps/MusicStep";
import PreviewStep from "../components/steps/PreviewStep";
import ShareStep from "../components/steps/ShareStep";

import ProgressBar from "../components/dashboard/ProgressBar";

import {
  Sparkles,
  Globe,
  Images,
  Heart,
  Music,
  Eye,
  Gift,
} from "lucide-react";

const pageContent = {
  1: {
    icon: Sparkles,
    iconColor: "text-fuchsia-400",
    title: "Meet the Birthday Star",
    subtitle:
      "Every unforgettable birthday begins with someone special. Let's start creating something magical.",
    gradient: "from-white via-fuchsia-200 to-violet-400",
    button: "Build Their Dream World →",
  },

  2: {
    icon: Globe,
    iconColor: "text-sky-400",
    title: "Build Their Dream World",
    subtitle:
      "Choose a world that feels just like them. Every great surprise deserves the perfect setting.",
    gradient: "from-white via-sky-200 to-cyan-400",
    button: "Relive Beautiful Memories →",
  },

  3: {
    icon: Images,
    iconColor: "text-amber-400",
    title: "Relive Every Beautiful Memory",
    subtitle:
      "Every photo tells a story. Fill their world with moments they'll treasure forever.",
    gradient: "from-white via-orange-200 to-pink-400",
    button: "Speak From the Heart →",
  },

  4: {
    icon: Heart,
    iconColor: "text-pink-400",
    title: "Speak From the Heart",
    subtitle:
      "Sometimes a few genuine words become memories that last a lifetime.",
    gradient: "from-white via-rose-200 to-fuchsia-400",
    button: "Find Their Perfect Melody →",
  },

  5: {
    icon: Music,
    iconColor: "text-violet-400",
    title: "Find Their Perfect Melody",
    subtitle:
      "Every unforgettable memory deserves a soundtrack they'll always remember.",
    gradient: "from-white via-indigo-200 to-violet-400",
    button: "Preview the Magic →",
  },

  6: {
    icon: Eye,
    iconColor: "text-cyan-400",
    title: "See the Magic Before They Do",
    subtitle:
      "Take one final look before revealing your surprise.",
    gradient: "from-white via-emerald-200 to-cyan-400",
    button: "Share the Surprise →",
  },

  7: {
    icon: Gift,
    iconColor: "text-orange-400",
    title: "Your Surprise Is Ready!",
    subtitle:
      "Everything is beautifully wrapped into one unforgettable birthday experience.",
    gradient: "from-white via-yellow-200 to-orange-400",
    button: "Celebrate 🎉",
  },
};

function CreatorDashboard() {
  const [step, setStep] = useState(1);

const [maxUnlockedStep, setMaxUnlockedStep] = useState(1);

  const [creatorData, setCreatorData] = useState({
    recipientName: "",
    creatorName: "",
    age: "",
    character: "",
    world: "",
    photos: [],
    letter: "",
    music: null,
  });

  useEffect(() => {
    requestAnimationFrame(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }, [step]);

    const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <BirthdayInfoStep
            creatorData={creatorData}
            setCreatorData={setCreatorData}
          />
        );

      case 2:
        return (
          <WorldStep
            creatorData={creatorData}
            setCreatorData={setCreatorData}
          />
        );

      case 3:
  return (
    <MemoryStep
      creatorData={creatorData}
      setCreatorData={setCreatorData}
    />
  );

      case 4:
  return (
    <LetterStep
      creatorData={creatorData}
      setCreatorData={setCreatorData}
    />
  );

      case 5:
  return (
    <MusicStep
      creatorData={creatorData}
      setCreatorData={setCreatorData}
    />
  );

      case 6:
        return <PreviewStep />;

      case 7:
        return <ShareStep />;

      default:
        return null;
    }
  };

  const Icon = pageContent[step].icon;

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0B0B0F] text-white py-8 px-6">

      <BackgroundWords />

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* Premium Header */}

        <div
          className="
            mb-8
            rounded-3xl
            border border-white/10
            bg-white/[0.04]
            backdrop-blur-xl
            shadow-[0_0_50px_rgba(168,85,247,0.08)]
            p-10
          "
        >

          <div className="flex justify-center">

            <div
              className="
                rounded-2xl
                border border-white/10
                bg-white/5
                p-5
              "
            >

              <Icon
                size={40}
                strokeWidth={2.3}
                className={`${pageContent[step].iconColor}
                drop-shadow-[0_0_25px_rgba(255,255,255,0.18)]`}
              />

            </div>

          </div>

          <h1
            className={`heading-font mt-8 text-center
            text-4xl md:text-6xl font-extrabold
            tracking-tight leading-tight
            bg-gradient-to-r
            ${pageContent[step].gradient}
            bg-clip-text text-transparent`}
          >
            {pageContent[step].title}
          </h1>

          <p
            className="
              body-font
              mt-6
              text-center
              text-xl
              text-slate-300
              max-w-3xl
              mx-auto
              leading-8
            "
          >
            {pageContent[step].subtitle}
          </p>

        </div>

        {/* Progress */}

        <div className="mb-8">
          <ProgressBar
  currentStep={step}
  maxUnlockedStep={maxUnlockedStep}
  onStepClick={setStep}
/>
        </div>

        {/* Current Step */}

        {renderStep()}

        {/* Navigation */}

        <div className="flex justify-between items-center mt-12">

          <button
            onClick={() => setStep((prev) => Math.max(prev - 1, 1))}
            disabled={step === 1}
            className="
              body-font
              px-6 py-3
              rounded-2xl
              border border-white/10
              bg-white/5
              hover:bg-white/10
              backdrop-blur-md
              transition-all duration-300
              disabled:opacity-40
              disabled:cursor-not-allowed
            "
          >
            ← Back
          </button>

          <button
            onClick={() => {

  const next = Math.min(step + 1, 7);

  setStep(next);

  setMaxUnlockedStep((prev) => Math.max(prev, next));

}}
            disabled={step === 7}
            className="
              body-font
              px-8 py-3.5
              rounded-2xl
              font-semibold
              bg-gradient-to-r
              from-fuchsia-600
              via-purple-600
              to-violet-600
              hover:scale-105
              hover:shadow-[0_0_30px_rgba(168,85,247,0.45)]
              transition-all duration-300
              disabled:opacity-50
              disabled:cursor-not-allowed
            "
          >
            {pageContent[step].button}
          </button>

        </div>

      </div>

    </main>
  );
}

export default CreatorDashboard;