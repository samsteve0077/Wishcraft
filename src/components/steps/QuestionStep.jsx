import { useState } from "react";

import {
  CircleHelp,
  ToggleLeft,
  ToggleRight,
  Heart,
  Sparkles,
  Check,
  Pencil,
  MessageCircleHeart,
} from "lucide-react";

const DEFAULT_QUESTIONS = [
  {
    id: "question-1",
    text: "Will you make more beautiful memories with me? ❤️",
  },
  {
    id: "question-2",
    text: "Will you always remember how special you are to me? 🥹",
  },
  {
    id: "question-3",
    text: "Will you join me on more amazing adventures? ✨",
  },
];

function QuestionStep({ creatorData, setCreatorData }) {
  const [customQuestion, setCustomQuestion] = useState(
    creatorData.customQuestion ?? ""
  );

  const enabled = creatorData.questionEnabled ?? true;

  const questionMode = creatorData.questionMode ?? "builtin";

  const selectedQuestionId =
    creatorData.selectedQuestionId ?? "question-1";

  const updateCreatorData = (updates) => {
    setCreatorData((previous) => ({
      ...previous,
      ...updates,
    }));
  };

  const selectBuiltInQuestion = (question) => {
    updateCreatorData({
      questionMode: "builtin",
      selectedQuestionId: question.id,
      question: question.text,
    });
  };

  const selectCustomQuestion = () => {
    updateCreatorData({
      questionMode: "custom",
      customQuestion,
      question: customQuestion,
    });
  };

  const handleCustomQuestionChange = (value) => {
    setCustomQuestion(value);

    if (questionMode === "custom") {
      updateCreatorData({
        customQuestion: value,
        question: value,
      });
    } else {
      updateCreatorData({
        customQuestion: value,
      });
    }
  };

  const updateClosingMessage = (message) => {
    updateCreatorData({
      questionClosingMessage: message,
    });
  };

  const selectedBuiltInQuestion = DEFAULT_QUESTIONS.find(
    (question) => question.id === selectedQuestionId
  );

  return (
    <section className="space-y-8">

      {/* Main Question Settings */}

      <div className="rounded-3xl border border-fuchsia-400/20 bg-gradient-to-br from-fuchsia-500/[0.09] via-purple-500/[0.05] to-transparent p-6 backdrop-blur-xl md:p-8">

        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

          <div className="flex items-start gap-4">

            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-fuchsia-400/20 bg-fuchsia-500/10">

              <CircleHelp
                size={28}
                className="text-fuchsia-400"
              />

            </div>

            <div>

              <h2 className="heading-font text-2xl font-bold text-white">
                The YES or NO Moment
              </h2>

              <p className="body-font mt-2 max-w-xl text-sm leading-6 text-slate-300">
                Choose one special question for the birthday
                experience. Make it personal, meaningful, and
                unforgettable.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() =>
              updateCreatorData({
                questionEnabled: !enabled,
              })
            }
            aria-pressed={enabled}
            className={`flex shrink-0 items-center gap-2 rounded-2xl border px-4 py-3 transition-all ${
              enabled
                ? "border-emerald-400/25 bg-emerald-500/10 text-emerald-300"
                : "border-white/10 bg-white/[0.04] text-slate-400"
            }`}
          >

            {enabled ? (
              <ToggleRight size={23} />
            ) : (
              <ToggleLeft size={23} />
            )}

            <span className="text-sm font-semibold">
              {enabled ? "Enabled" : "Disabled"}
            </span>

          </button>

        </div>

        {!enabled && (
          <div className="mt-6 rounded-2xl border border-amber-400/20 bg-amber-500/[0.07] p-4 text-sm leading-6 text-amber-200">
            The question experience is disabled. Your
            selected question and closing message are
            preserved.
          </div>
        )}

      </div>

      {/* Built-in Questions */}

      <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 backdrop-blur-xl md:p-8">

        <div className="mb-7">

          <h3 className="heading-font text-xl font-bold text-white">
            Choose Your Question
          </h3>

          <p className="body-font mt-2 text-sm leading-6 text-slate-400">
            Select one of these three built-in questions,
            or create your own below.
          </p>

        </div>

        <div className="space-y-4">

          {DEFAULT_QUESTIONS.map((question, index) => {
            const selected =
              questionMode === "builtin" &&
              selectedQuestionId === question.id;

            return (
              <button
                key={question.id}
                type="button"
                onClick={() => selectBuiltInQuestion(question)}
                aria-pressed={selected}
                className={`group flex w-full items-start gap-4 rounded-2xl border p-5 text-left transition-all duration-300 ${
                  selected
                    ? "border-fuchsia-400/60 bg-fuchsia-500/[0.10] shadow-[0_0_25px_rgba(217,70,239,0.08)]"
                    : "border-white/10 bg-black/20 hover:border-fuchsia-400/30 hover:bg-white/[0.035]"
                }`}
              >

                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-sm font-bold transition-colors ${
                    selected
                      ? "bg-gradient-to-br from-fuchsia-600 to-violet-600 text-white"
                      : "bg-white/[0.05] text-slate-400"
                  }`}
                >
                  {String(index + 1).padStart(2, "0")}
                </div>

                <div className="min-w-0 flex-1">

                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Built-in question {index + 1}
                  </p>

                  <p className="body-font mt-2 text-sm font-medium leading-6 text-slate-100 sm:text-base">
                    {question.text}
                  </p>

                </div>

                <div
                  className={`mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-all ${
                    selected
                      ? "border-fuchsia-400 bg-fuchsia-500 text-white"
                      : "border-white/20 text-transparent group-hover:border-fuchsia-400/50"
                  }`}
                >

                  {selected && <Check size={15} />}

                </div>

              </button>
            );
          })}

        </div>

      </div>

      {/* Custom Question */}

      <div
        className={`rounded-3xl border p-6 backdrop-blur-xl transition-all duration-300 md:p-8 ${
          questionMode === "custom"
            ? "border-violet-400/40 bg-violet-500/[0.06]"
            : "border-white/10 bg-white/[0.025]"
        }`}
      >

        <button
          type="button"
          onClick={selectCustomQuestion}
          aria-pressed={questionMode === "custom"}
          className="flex w-full items-center gap-4 text-left"
        >

          <div
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border ${
              questionMode === "custom"
                ? "border-violet-400/30 bg-violet-500/15"
                : "border-white/10 bg-white/[0.04]"
            }`}
          >

            <Pencil
              size={22}
              className={
                questionMode === "custom"
                  ? "text-violet-300"
                  : "text-slate-400"
              }
            />

          </div>

          <div className="min-w-0 flex-1">

            <h3 className="heading-font text-lg font-bold text-white">
              Write Your Own Question
            </h3>

            <p className="body-font mt-1 text-sm leading-6 text-slate-400">
              Create a question that means something special
              to both of you.
            </p>

          </div>

          <div
            className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border ${
              questionMode === "custom"
                ? "border-violet-400 bg-violet-500 text-white"
                : "border-white/20"
            }`}
          >

            {questionMode === "custom" && <Check size={15} />}

          </div>

        </button>

        <label
          htmlFor="custom-question"
          className="mb-2 mt-6 block text-sm font-medium text-slate-300"
        >
          Your personal question
        </label>

        <textarea
          id="custom-question"
          value={customQuestion}
          onFocus={() => {
            if (questionMode !== "custom") {
              updateCreatorData({
                questionMode: "custom",
              });
            }
          }}
          onChange={(event) =>
            handleCustomQuestionChange(
              event.target.value.slice(0, 200)
            )
          }
          maxLength={200}
          rows={3}
          placeholder="Type your own YES or NO question here..."
          className="body-font w-full resize-y rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm leading-6 text-white outline-none transition placeholder:text-slate-500 focus:border-violet-400/50 focus:ring-2 focus:ring-violet-400/10"
        />

        <p className="mt-2 text-right text-xs text-slate-500">
          {customQuestion.length}/200 characters
        </p>

        {questionMode === "custom" && !customQuestion.trim() && (
          <p className="mt-3 text-sm text-amber-300">
            Enter your custom question before previewing the experience.
          </p>
        )}

      </div>

      {/* Final Message */}

      <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 backdrop-blur-xl md:p-8">

        <div className="flex items-start gap-3">

          <div className="rounded-xl border border-pink-400/20 bg-pink-500/10 p-3">

            <Heart
              size={22}
              className="text-pink-400"
            />

          </div>

          <div>

            <h3 className="heading-font text-xl font-bold text-white">
              Your Final Message
            </h3>

            <p className="body-font mt-2 text-sm leading-6 text-slate-400">
              This message appears after the receiver selects YES.
            </p>

          </div>

        </div>

        <textarea
          value={creatorData.questionClosingMessage ?? ""}
          onChange={(event) =>
            updateClosingMessage(event.target.value)
          }
          maxLength={500}
          rows={4}
          placeholder="You've just made my birthday surprise even more special! ❤️"
          className="body-font mt-5 w-full resize-y rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm leading-6 text-white outline-none transition placeholder:text-slate-500 focus:border-pink-400/50"
        />

        <p className="mt-2 text-right text-xs text-slate-500">
          {(creatorData.questionClosingMessage ?? "").length}/500 characters
        </p>

      </div>

      {/* Interaction explanation */}

      <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">

        <div className="flex items-start gap-3">

          <Sparkles
            size={20}
            className="mt-0.5 shrink-0 text-violet-400"
          />

          <div>

            <h3 className="text-sm font-semibold text-white">
              The playful YES or NO interaction
            </h3>

            <p className="body-font mt-2 text-sm leading-6 text-slate-400">
              The receiver sees one question. The NO button
              dodges attempted clicks and gradually shrinks
              while YES grows. After five NO attempts, NO
              disappears. Selecting YES reveals your final message.
            </p>

          </div>

        </div>

      </div>

    </section>
  );
}

export default QuestionStep;