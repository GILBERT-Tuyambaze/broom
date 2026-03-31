import { Panel } from "../components/shared/Panel.jsx";
import { CycleCalendar } from "../components/tracker/CycleCalendar.jsx";
import { useAppContext } from "../context/AppContext.jsx";
import { capitalize, formatDate, formatDateTime } from "../utils/formatters.js";
import { getCurrentPhase, getCycleDay, getNextPeriodDate } from "../utils/profile.js";

export function TrackerPage() {
  const { appState } = useAppContext();
  const cycleDay = getCycleDay(appState.profile);
  const nextPeriod = getNextPeriodDate(appState.profile);
  const currentPhase = getCurrentPhase(appState.profile);

  const signals = [
    {
      emoji: "🩸",
      value: cycleDay ? String(cycleDay) : "--",
      title: "Cycle Day",
      note: nextPeriod ? `Next period around ${formatDate(nextPeriod)}` : "Add a cycle start date",
      tint: "from-rose-200/70 to-transparent",
    },
    {
      emoji: "🥚",
      value:
        currentPhase.phase !== "unknown"
          ? capitalize(currentPhase.phase)
          : "--",
      title: "Current Phase",
      note:
        currentPhase.phase !== "unknown"
          ? "Gentle body rhythm estimate"
          : "Phase appears after enough cycle data",
      tint: "from-emerald-200/70 to-transparent",
    },
    {
      emoji: "👩🏽‍💻",
      value: String(appState.logs.length),
      title: "Saved Check-ins",
      note: appState.logs.length ? "Recent logs shape calmer insights" : "Start with a first quick log",
      tint: "from-orange-200/70 to-transparent",
    },
  ];

  return (
    <div className="space-y-5">
      <section className="glass-panel-strong overflow-hidden p-8">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
          <div className="space-y-3">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[var(--muted)]">Cycle tracker</p>
            <h2 className="font-display text-4xl font-semibold tracking-tight text-white md:text-5xl">
              Your cycle at a glance
            </h2>
            <p className="max-w-2xl text-sm leading-8 text-slate-300 md:text-base">
              A clearer rhythm view for cycle timing, mood context, and lighter day planning based on what you have saved.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <a href="#calendar" className="chip-btn">
              View calendar
            </a>
            <a href="#quick-log" className="primary-btn">
              Log today
            </a>
          </div>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-3">
        {signals.map((signal) => (
          <article key={signal.title} className="glass-panel relative overflow-hidden p-6">
            <div className={`absolute inset-x-0 right-0 top-0 h-28 bg-gradient-to-br ${signal.tint}`} />
            <div className="relative">
              <p className="text-3xl">{signal.emoji}</p>
              <h3 className="mt-4 font-display text-5xl font-semibold text-white">{signal.value}</h3>
              <p className="mt-2 text-lg font-medium text-[var(--text)]">{signal.title}</p>
              <p className="mt-3 inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-[var(--muted)]">
                {signal.note}
              </p>
            </div>
          </article>
        ))}
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
        <Panel compact eyebrow="Monthly view" title="Phase-colored cycle calendar">
          <div id="calendar">
            <CycleCalendar profile={appState.profile} />
          </div>
        </Panel>

        <Panel compact eyebrow="Quick log" title="What should Broom notice today?">
          <div id="quick-log" className="space-y-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--muted)]">How are you feeling?</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {["Happy", "Tired", "Moody", "Calm", "Anxious"].map((mood) => (
                  <span key={mood} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300">
                    {mood}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--muted)]">Symptoms</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {["Cramps", "Headache", "Bloating", "Low energy"].map((symptom) => (
                  <span key={symptom} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300">
                    {symptom}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--muted)]">Support angle</p>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                {appState.profile.supportNeeds || "No support focus saved yet. Add one in your profile to help Broom tailor guidance."}
              </p>
            </div>

            <button type="button" className="primary-btn w-full justify-center">
              Save quick log
            </button>
          </div>
        </Panel>
      </section>

      <section className="grid gap-4 xl:grid-cols-[0.95fr_1.05fr]">
        <Panel compact eyebrow="Cycle summary" title="Estimated rhythm and support cues">
          <div className="grid gap-4 md:grid-cols-2">
            {[
              {
                title: "Current cycle day",
                copy: cycleDay ? `Day ${cycleDay}` : "Unavailable until the last period start is saved.",
              },
              {
                title: "Current phase",
                copy:
                  currentPhase.phase !== "unknown"
                    ? `${capitalize(currentPhase.phase)} phase`
                    : "Phase unavailable until a cycle start date is saved.",
              },
              {
                title: "Cycle length",
                copy: `${appState.profile.cycleLength || 28} days`,
              },
              {
                title: "Next estimated period",
                copy: nextPeriod ? formatDate(nextPeriod) : "Add a starting date to calculate this.",
              },
            ].map((signal) => (
              <article key={signal.title} className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5">
                <h3 className="font-display text-xl font-semibold text-white">{signal.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">{signal.copy}</p>
              </article>
            ))}
          </div>
        </Panel>

        <Panel compact eyebrow="Recent timeline" title="Latest check-ins">
          <div className="space-y-4">
            {appState.logs.length ? (
              appState.logs.map((log, index) => (
                <article key={`${log.createdAtMs}-${index}`} className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5">
                  <h3 className="font-display text-xl font-semibold text-white">
                    {capitalize(log.mood)} mood · {log.energy}/10 energy
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-300">
                    {log.focus || "No focus area saved"}
                    {log.symptoms ? ` · ${log.symptoms}` : ""}
                  </p>
                  <p className="mt-3 text-xs font-semibold uppercase tracking-[0.24em] text-[var(--muted)]">
                    {formatDateTime(log.createdAtMs)}
                  </p>
                </article>
              ))
            ) : (
              <article className="rounded-[1.75rem] border border-dashed border-white/10 bg-white/4 p-8 text-sm leading-7 text-slate-300">
                The first saved check-in will appear here.
              </article>
            )}
          </div>
        </Panel>
      </section>
    </div>
  );
}
