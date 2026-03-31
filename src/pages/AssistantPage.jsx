import { useDeferredValue, useState } from "react";
import { Panel } from "../components/shared/Panel.jsx";
import { ChatMessage } from "../components/chat/ChatMessage.jsx";
import { useAppContext } from "../context/AppContext.jsx";
import { buildContextSummary } from "../utils/profile.js";

export function AssistantPage() {
  const { appState, sendChatMessage } = useAppContext();
  const [draft, setDraft] = useState("");
  const deferredDraft = useDeferredValue(draft);

  const contextSummary = buildContextSummary(appState.profile, appState.user, appState.logs);
  const promptSuggestions = [
    "Summarize what you know about me and how you will personalize Broom.",
    "Plan my next 3 days based on my cycle settings and current energy.",
    "What should I track more consistently to get better insights?",
  ];

  return (
    <div className="grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
      <Panel compact eyebrow="Context" title="What the assistant knows right now">
        <div className="space-y-4">
          <ContextCard title="User profile" copy={contextSummary} />
          <ContextCard title="Recommended prompts" copy="Ask for a 3-day plan, symptom reflection, study routine, work pacing, or a summary of saved signals." />
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {promptSuggestions.map((prompt) => (
            <button key={prompt} type="button" className="chip-btn" onClick={() => setDraft(prompt)}>
              {prompt.length > 28 ? `${prompt.slice(0, 28)}...` : prompt}
            </button>
          ))}
        </div>

        <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[var(--muted)]">Composer preview</p>
          <p className="mt-3 text-sm leading-7 text-slate-300">
            {deferredDraft || "Start typing a question and the preview will appear here."}
          </p>
        </div>
      </Panel>

      <Panel
        compact
        eyebrow="Chatbox"
        title="AI copilot"
        action={
          <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-cyan-200">
            {appState.aiModel && appState.profile.consentToPersonalization ? "Firebase AI live" : "Fallback assistant"}
          </span>
        }
      >
        <div className="flex flex-col gap-4 rounded-[2rem] border border-white/10 bg-black/10 p-4">
          <div className="flex-1 space-y-4 overflow-y-auto pr-1">
            {appState.messages.map((message, index) => (
              <ChatMessage key={`${message.role}-${index}-${message.createdAtMs || index}`} role={message.role} text={message.text} />
            ))}
            {appState.assistantPending ? (
              <article className="max-w-xl rounded-[1.75rem] border border-white/10 bg-white/5 px-5 py-4 text-sm text-slate-300">
                Broom is thinking...
              </article>
            ) : null}
          </div>

          <form
            className="space-y-4"
            onSubmit={async (event) => {
              event.preventDefault();
              const prompt = draft.trim();
              if (!prompt) {
                return;
              }
              setDraft("");
              await sendChatMessage(prompt);
            }}
            >
            <label className="field-label">
              <span>Ask Broom anything</span>
              <textarea
                className="field-input min-h-32 resize-y"
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                placeholder="Ask Broom to help with routines, symptoms, planning, or motivation"
              />
            </label>
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <p className="text-sm leading-7 text-slate-300">
                Messages are stored with the signed-in user when Firebase is configured.
              </p>
              <button type="submit" className="primary-btn justify-center" disabled={appState.assistantPending}>
                {appState.assistantPending ? "Thinking..." : "Send"}
              </button>
            </div>
          </form>
        </div>
      </Panel>
    </div>
  );
}

function ContextCard({ title, copy }) {
  return (
    <article className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5">
      <h3 className="font-display text-xl font-semibold text-white">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-slate-300">{copy}</p>
    </article>
  );
}
