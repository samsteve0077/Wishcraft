import {
  User,
  Globe,
  Images,
  Mail,
  Music,
  Eye,
  Share2,
  CheckCircle2,
} from "lucide-react";

const steps = [
  {
    icon: User,
    title: "Birthday Star",
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
    icon: Share2,
    title: "Share",
  },
];

function ProgressBar({ currentStep }) {
  return (
    <div className="w-full mb-12">

      <div className="flex justify-between items-center">

        {steps.map((step, index) => {
          const Icon = step.icon;

          const completed = currentStep > index + 1;

          const active = currentStep === index + 1;

          return (
            <div
              key={index}
              className="flex items-center flex-1"
            >

              <div className="flex flex-col items-center">

                <div
                  className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-500

                  ${
                    completed
                      ? "bg-green-500 shadow-lg shadow-green-500/30"
                      : active
                      ? "bg-purple-600 scale-110 shadow-lg shadow-purple-500/30"
                      : "bg-[#1A1A24] border border-white/10"
                  }`}
                >
                  {completed ? (
                    <CheckCircle2 size={26} />
                  ) : (
                    <Icon size={24} />
                  )}
                </div>

                <p
                  className={`mt-3 text-sm font-medium transition-all

                  ${
                    active
                      ? "text-white"
                      : completed
                      ? "text-green-300"
                      : "text-gray-500"
                  }`}
                >
                  {step.title}
                </p>

              </div>

              {index !== steps.length - 1 && (
                <div
                  className={`flex-1 h-[3px] mx-4 rounded-full transition-all duration-500

                  ${
                    completed
                      ? "bg-green-500"
                      : "bg-white/10"
                  }`}
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