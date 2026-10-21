import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import CandleIntro from "./CandleIntro";
import WishScreen from "./WishScreen";
import BurnTransition from "./BurnTransition";
import WorldAtmosphere from "./WorldAtmosphere";
import QuestionGame from "./QuestionGame";
import MemoriesExperience from "./MemoriesExperience";
import LetterExperience from "./LetterExperience";

import { getWorldTheme } from "../../config/worldThemes.js";
import { worldData } from "../../utils/worldData.js";

const EXPERIENCE_STAGES = {
  CANDLE: "candle",
  WISH: "wish",
  BURN: "burn",
  QUESTION: "question",
  MEMORIES: "memories",
  LETTER: "letter",
  CELEBRATION: "celebration",
  CREDITS: "credits",
};

function Experience({ creatorData = {} }) {
  const [stage, setStage] = useState(EXPERIENCE_STAGES.CANDLE);

  const worldTheme = getWorldTheme(creatorData.world);
  const selectedWorld = worldData[creatorData.world];
  const worldScenes = selectedWorld?.scenes ?? [];

  const shouldRevealWorld = [
    EXPERIENCE_STAGES.QUESTION,
    EXPERIENCE_STAGES.MEMORIES,
    EXPERIENCE_STAGES.LETTER,
    EXPERIENCE_STAGES.CELEBRATION,
    EXPERIENCE_STAGES.CREDITS,
  ].includes(stage);

  const sceneIndexByStage = {
    [EXPERIENCE_STAGES.QUESTION]: 0,
    [EXPERIENCE_STAGES.MEMORIES]: 1,
    [EXPERIENCE_STAGES.LETTER]: 2,
    [EXPERIENCE_STAGES.CELEBRATION]: 3,
    [EXPERIENCE_STAGES.CREDITS]: 4,
  };

  const currentSceneIndex = sceneIndexByStage[stage];

  const currentScene =
    currentSceneIndex !== undefined
      ? worldScenes[currentSceneIndex]
      : undefined;

  // A section is enabled unless its setting is explicitly false.
  // This preserves compatibility with projects created before toggles existed.
  const isQuestionEnabled = creatorData.questionEnabled !== false;
  const areMemoriesEnabled = creatorData.memoryEnabled !== false;
  const isLetterEnabled = creatorData.letterEnabled !== false;

  // Find the next enabled section without modifying saved creator data.
  const getNextEnabledStage = (startAt) => {
    const sequence = [
      EXPERIENCE_STAGES.QUESTION,
      EXPERIENCE_STAGES.MEMORIES,
      EXPERIENCE_STAGES.LETTER,
      EXPERIENCE_STAGES.CELEBRATION,
      EXPERIENCE_STAGES.CREDITS,
    ];

    const enabled = {
      [EXPERIENCE_STAGES.QUESTION]: isQuestionEnabled,
      [EXPERIENCE_STAGES.MEMORIES]: areMemoriesEnabled,
      [EXPERIENCE_STAGES.LETTER]: isLetterEnabled,
      [EXPERIENCE_STAGES.CELEBRATION]: true,
      [EXPERIENCE_STAGES.CREDITS]: true,
    };

    const startIndex = sequence.indexOf(startAt);

    for (let index = Math.max(startIndex, 0); index < sequence.length; index += 1) {
      if (enabled[sequence[index]]) {
        return sequence[index];
      }
    }

    return EXPERIENCE_STAGES.CREDITS;
  };

  const goToNextEnabledStage = (currentStage) => {
    const sequence = [
      EXPERIENCE_STAGES.QUESTION,
      EXPERIENCE_STAGES.MEMORIES,
      EXPERIENCE_STAGES.LETTER,
      EXPERIENCE_STAGES.CELEBRATION,
      EXPERIENCE_STAGES.CREDITS,
    ];

    const currentIndex = sequence.indexOf(currentStage);
    const nextStage = sequence[currentIndex + 1];

    setStage(getNextEnabledStage(nextStage ?? EXPERIENCE_STAGES.CREDITS));
  };

  const renderStage = () => {
    switch (stage) {
      // STAGE 1: LIGHT THE CANDLES
      case EXPERIENCE_STAGES.CANDLE:
        return (
          <CandleIntro
            creatorData={creatorData}
            theme={worldTheme}
            onComplete={() => setStage(EXPERIENCE_STAGES.WISH)}
          />
        );

      // STAGE 2: MAKE A WISH
      case EXPERIENCE_STAGES.WISH:
        return (
          <WishScreen
            creatorData={creatorData}
            theme={worldTheme}
            onComplete={() => setStage(EXPERIENCE_STAGES.BURN)}
          />
        );

      // STAGE 3: CINEMATIC BURN TRANSITION
      case EXPERIENCE_STAGES.BURN:
        return (
          <BurnTransition
            theme={worldTheme}
            onComplete={() => {
              setStage(
                getNextEnabledStage(EXPERIENCE_STAGES.QUESTION)
              );
            }}
          />
        );

      // STAGE 4: YES / NO QUESTION GAME
      case EXPERIENCE_STAGES.QUESTION:
        return (
          <QuestionGame
            creatorData={creatorData}
            theme={worldTheme}
            onComplete={() => {
              goToNextEnabledStage(EXPERIENCE_STAGES.QUESTION);
            }}
          />
        );

      // STAGE 5: MEMORIES
case EXPERIENCE_STAGES.MEMORIES:
  return (
    <MemoriesExperience
      creatorData={creatorData}
      theme={worldTheme}
      onComplete={() => {
        goToNextEnabledStage(EXPERIENCE_STAGES.MEMORIES);
      }}
    />
  );

      // STAGE 6: LETTER
case EXPERIENCE_STAGES.LETTER:
  return (
    <LetterExperience
      creatorData={creatorData}
      theme={worldTheme}
      onComplete={() => {
        goToNextEnabledStage(EXPERIENCE_STAGES.LETTER);
      }}
    />
  );

      // STAGE 7: CELEBRATION
      case EXPERIENCE_STAGES.CELEBRATION:
        return (
          <ExperiencePlaceholder
            title="Celebration"
            description="Cake, NPCs and celebration animations will appear here."
            buttonText="Continue to Credits"
            theme={worldTheme}
            onContinue={() => setStage(EXPERIENCE_STAGES.CREDITS)}
          />
        );

      // STAGE 8: CREDITS
      case EXPERIENCE_STAGES.CREDITS:
        return (
          <ExperiencePlaceholder
            title="Made by JD ❤️"
            description="Made with love for her."
            buttonText="Restart Experience"
            theme={worldTheme}
            onContinue={() => setStage(EXPERIENCE_STAGES.CANDLE)}
          />
        );

      default:
        return null;
    }
  };

  return (
    <main
      className="relative min-h-screen w-full overflow-hidden text-white"
      style={{
        backgroundColor: worldTheme.colors.background,
        color: worldTheme.colors.text,
        transition: "background-color 800ms ease, color 800ms ease",
      }}
    >
      {shouldRevealWorld && (
        <WorldAtmosphere
          theme={worldTheme}
          backgroundImage={currentScene}
          intensity="balanced"
        />
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={stage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 min-h-screen w-full"
        >
          {renderStage()}
        </motion.div>
      </AnimatePresence>
    </main>
  );
}

// Reusable placeholder for sections still awaiting their full implementation.
function ExperiencePlaceholder({
  title,
  description,
  buttonText,
  theme,
  onContinue,
}) {
  const colors = theme.colors;

  return (
    <section className="flex min-h-screen items-center justify-center px-6 py-10">
      <div className="w-full max-w-3xl text-center">
        <div
          className="rounded-3xl border p-10 backdrop-blur-md md:p-16"
          style={{
            backgroundColor: `${colors.background}45`,
            borderColor: `${colors.accent}45`,
            boxShadow: `
              0 12px 60px rgba(0, 0, 0, 0.16),
              inset 0 1px 0 rgba(255, 255, 255, 0.08)
            `,
          }}
        >
          <h1
            className="heading-font text-4xl font-bold md:text-6xl"
            style={{ color: colors.text }}
          >
            {title}
          </h1>

          <p
            className="body-font mt-6 text-lg leading-8 md:text-xl"
            style={{ color: `${colors.text}B3` }}
          >
            {description}
          </p>

          <button
            type="button"
            onClick={onContinue}
            className="
              mt-10 rounded-xl px-8 py-3 font-semibold
              transition-transform duration-300
              hover:scale-105 active:scale-95
            "
            style={{
              background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
              color: "#FFFFFF",
              boxShadow: `0 8px 30px ${colors.primary}35`,
            }}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </section>
  );
}

export { EXPERIENCE_STAGES };
export default Experience;