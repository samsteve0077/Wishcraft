import { useState, useEffect } from "react";

import BackgroundWords from "../components/BackgroundWords";

import BirthdayInfoStep from "../components/steps/BirthdayInfoStep";
import WorldStep from "../components/steps/WorldStep";
import MemoryStep from "../components/steps/MemoryStep";
import LetterStep from "../components/steps/LetterStep";
import MusicStep from "../components/steps/MusicStep";
import QuestionStep from "../components/steps/QuestionStep";
import PreviewStep from "../components/steps/PreviewStep";
import ShareStep from "../components/steps/ShareStep";

import ProgressBar from "../components/dashboard/ProgressBar";

import {
  Sparkles,
  Globe,
  Images,
  Heart,
  Music,
  CircleHelp,
  Eye,
  Gift,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";

const DEFAULT_QUESTIONS = [
  {
    id: "question-1",
    text: "Will you make more beautiful memories with me?",
  },
  {
    id: "question-2",
    text: "Will you always remember how special you are to me?",
  },
  {
    id: "question-3",
    text: "Will you join me on more amazing adventures?",
  },
];

const pageContent = {
  1: {
    icon: Sparkles,
    iconColor: "text-fuchsia-400",
    title: "Meet the Birthday Star",
    subtitle:
      "Every unforgettable birthday begins with someone special. Let's start creating something magical.",
    gradient: "from-white via-fuchsia-200 to-violet-400",
    button: "Build Their Dream World",
  },

  2: {
    icon: Globe,
    iconColor: "text-sky-400",
    title: "Build Their Dream World",
    subtitle:
      "Choose a world that feels just like them. Every great surprise deserves the perfect setting.",
    gradient: "from-white via-sky-200 to-cyan-400",
    button: "Relive Beautiful Memories",
  },

  3: {
    icon: Images,
    iconColor: "text-amber-400",
    title: "Relive Every Beautiful Memory",
    subtitle:
      "Every photo tells a story. Fill their world with moments they'll treasure forever.",
    gradient: "from-white via-orange-200 to-pink-400",
    button: "Speak From the Heart",
  },

  4: {
    icon: Heart,
    iconColor: "text-pink-400",
    title: "Speak From the Heart",
    subtitle:
      "Sometimes a few genuine words become memories that last a lifetime.",
    gradient: "from-white via-rose-200 to-fuchsia-400",
    button: "Find Their Perfect Melody",
  },

  5: {
    icon: Music,
    iconColor: "text-violet-400",
    title: "Find Their Perfect Melody",
    subtitle:
      "Every unforgettable memory deserves a soundtrack they'll always remember.",
    gradient: "from-white via-indigo-200 to-violet-400",
    button: "Create Their YES or NO Moment",
  },

  6: {
    icon: CircleHelp,
    iconColor: "text-fuchsia-400",
    title: "The YES or NO Moment",
    subtitle:
      "Create playful questions, personalise your message, and make their birthday surprise unforgettable.",
    gradient: "from-white via-fuchsia-200 to-violet-400",
    button: "Preview the Magic",
  },

  7: {
    icon: Eye,
    iconColor: "text-cyan-400",
    title: "See the Magic Before They Do",
    subtitle:
      "Take one final look before revealing your surprise.",
    gradient: "from-white via-emerald-200 to-cyan-400",
    button: "Prepare the Surprise",
  },

  8: {
    icon: Gift,
    iconColor: "text-orange-400",
    title: "Your Surprise Is Ready!",
    subtitle:
      "Everything is beautifully wrapped into one unforgettable birthday experience.",
    gradient: "from-white via-yellow-200 to-orange-400",
    button: "Celebrate!",
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

    questionEnabled: true,

    questions: DEFAULT_QUESTIONS.map((question) => ({
      ...question,
    })),

    questionClosingMessage:
      "You've just made my birthday surprise even more special! ❤️",
  });

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [step]);

  const goToStep = (nextStep) => {
    const safeStep = Math.max(1, Math.min(8, nextStep));

    setStep(safeStep);

    setMaxUnlockedStep((previous) =>
      Math.max(previous, safeStep)
    );
  };

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
        return (
          <QuestionStep
            creatorData={creatorData}
            setCreatorData={setCreatorData}
          />
        );

      case 7:
        return (
          <PreviewStep
            creatorData={creatorData}
          />
        );

      case 8:
        return (
          <ShareStep
            creatorData={creatorData}
            setCreatorData={setCreatorData}
          />
        );

      default:
        return null;
    }
  };

  const currentPage = pageContent[step];
  const Icon = currentPage.icon;

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0B0B0F] px-4 py-8 text-white sm:px-6">

      <BackgroundWords />

      <div className="relative z-10 mx-auto max-w-7xl">

        {/* Header */}

        <header className="mb-8 rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-[0_0_50px_rgba(168,85,247,0.08)] backdrop-blur-xl sm:p-10">

          <div className="flex justify-center">

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">

              <Icon
                size={40}
                strokeWidth={2.3}
                className={`${currentPage.iconColor} drop-shadow-[0_0_25px_rgba(255,255,255,0.18)]`}
              />

            </div>

          </div>

          <h1
            className={`heading-font mt-8 bg-gradient-to-r ${currentPage.gradient} bg-clip-text text-center text-3xl font-extrabold leading-tight tracking-tight text-transparent sm:text-4xl md:text-6xl`}
          >
            {currentPage.title}
          </h1>

          <p className="body-font mx-auto mt-5 max-w-3xl text-center text-base leading-7 text-slate-300 sm:mt-6 sm:text-xl sm:leading-8">
            {currentPage.subtitle}
          </p>

        </header>

        {/* Progress */}

        <div className="mb-8 overflow-x-auto pb-3">

          <div className="min-w-[760px]">

            <ProgressBar
              currentStep={step}
              maxUnlockedStep={maxUnlockedStep}
              onStepClick={goToStep}
            />

          </div>

        </div>

        {/* Current step */}

        <div key={step}>
          {renderStep()}
        </div>

        {/* Navigation */}

        <nav className="mt-12 flex items-center justify-between gap-4">

          <button
            type="button"
            onClick={() => goToStep(step - 1)}
            disabled={step === 1}
            className="body-font inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 transition-all duration-300 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40 sm:px-6"
          >
            <ArrowLeft size={18} />

            <span>Back</span>
          </button>

          <span className="text-sm text-slate-500">
            Step {step} of 8
          </span>

          <button
            type="button"
            onClick={() => goToStep(step + 1)}
            disabled={step === 8}
            className="body-font inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-fuchsia-600 via-purple-600 to-violet-600 px-5 py-3 font-semibold text-white shadow-[0_0_25px_rgba(168,85,247,0.2)] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_35px_rgba(168,85,247,0.35)] active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100 sm:px-6"
          >
            <span>{currentPage.button}</span>

            <ArrowRight size={18} />
          </button>

        </nav>

        {/* Footer */}

        <footer className="mt-12 pb-6 text-center">

          <p className="text-xs tracking-wide text-slate-600">
            MADE WITH LOVE · WISHCRAFT
          </p>

        </footer>

      </div>

    </main>
  );
}

export default CreatorDashboard;