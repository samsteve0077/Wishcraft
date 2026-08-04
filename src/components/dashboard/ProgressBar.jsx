import {
  User,
  Globe,
  Images,
  Mail,
  Music,
  Eye,
  PartyPopper,
  Check,
} from "lucide-react";

const steps = [
  {
    icon: User,
    title: "Birthday",
  },
  {
    icon: Globe,
    title: "World",
  },
  {
    icon: Images,
    title: "Memories",
  },
  {
    icon: Mail,
    title: "Letter",
  },
  {
    icon: Music,
    title: "Melody",
  },
  {
    icon: Eye,
    title: "Preview",
  },
  {
    icon: PartyPopper,
    title: "Celebrate",
  },
];

function ProgressBar({
  currentStep,
  maxUnlockedStep,
  onStepClick,
}) {
  return (
    <div className="w-full mb-12">

      <div className="flex justify-between items-center">

        {steps.map((step, index) => {

          const Icon = step.icon;

          const stepNumber = index + 1;

          const completed = stepNumber < currentStep;

          const active = stepNumber === currentStep;

          const unlocked = stepNumber <= maxUnlockedStep;

          return (

            <div
              key={step.title}
              className="flex items-center flex-1"
            >

              <div className="flex flex-col items-center">

                <button
                  type="button"
                  disabled={!unlocked}
                  onClick={() => onStepClick(stepNumber)}
                  className={`
                    relative

                    w-14
                    h-14

                    rounded-full

                    flex
                    items-center
                    justify-center

                    transition-all
                    duration-300

                    ${
                      completed
                        ? "bg-gradient-to-r from-fuchsia-600 via-purple-600 to-violet-600 hover:scale-110 hover:shadow-[0_0_30px_rgba(168,85,247,.45)] cursor-pointer"
                        : active
                        ? "bg-gradient-to-r from-fuchsia-600 via-purple-600 to-violet-600 scale-110 shadow-[0_0_35px_rgba(168,85,247,.45)]"
                        : unlocked
                        ? "bg-[#1A1A24] border border-white/10 hover:border-fuchsia-500 hover:scale-105 cursor-pointer"
                        : "bg-[#1A1A24] border border-white/10 opacity-40 cursor-not-allowed"
                    }
                  `}
                >

                  {completed ? (
                    <Check size={24} />
                  ) : (
                    <Icon size={22} />
                  )}

                </button>

                <p
                  className={`
                    mt-3

                    text-sm

                    transition-all

                    ${
                      active
                        ? "text-white font-semibold"
                        : completed
                        ? "text-fuchsia-300"
                        : unlocked
                        ? "text-slate-300"
                        : "text-slate-600"
                    }
                  `}
                >
                  {step.title}
                </p>


              </div>

              {index !== steps.length - 1 && (

                <div
                  className={`
                    flex-1

                    h-[3px]

                    mx-4

                    rounded-full

                    transition-all
                    duration-500

                    ${
                      completed
                        ? "bg-gradient-to-r from-fuchsia-500 via-purple-500 to-violet-500"
                        : "bg-white/10"
                    }
                  `}
                />

              )}

            </div>

          );

        })}

      </div>

    </div>
  );
}

export default ProgressBar;