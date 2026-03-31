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
    {
      title: "Support angle",
      copy: appState.profile.supportNeeds || "No support focus saved yet.",
    },
  ];

  return (
    <div className="grid gap-6 xl:grid-cols-[1.12fr_0.88fr]">
      <div className="space-y-6">
        <Panel eyebrow="Cycle calendar" title="Phase colors across the month">
          <CycleCalendar profile={appState.profile} />
        </Panel>

        <Panel eyebrow="Cycle map" title="Estimated rhythm and support cues">
          <div className="grid gap-4 md:grid-cols-2">
            {signals.map((signal) => (
              <article key={signal.title} className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5">
                <h3 className="font-display text-xl font-semibold text-white">{signal.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">{signal.copy}</p>
              </article>
            ))}
          </div>
        </Panel>
      </div>

      <Panel eyebrow="Recent timeline" title="Latest user check-ins">
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
    </div>
  );
}
