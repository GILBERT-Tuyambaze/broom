import { buildCycleCalendar, getCurrentPhase } from "../../utils/profile.js";

const PHASE_STYLES = {
  menstrual: {
    badge: "bg-rose-400/20 text-rose-100 border border-rose-300/20",
    dot: "bg-rose-300",
    tile: "border-rose-300/30 bg-rose-400/15 text-rose-50",
    label: "Menstrual",
  },
  follicular: {
    badge: "bg-cyan-400/20 text-cyan-100 border border-cyan-300/20",
    dot: "bg-cyan-300",
    tile: "border-cyan-300/20 bg-cyan-400/10 text-cyan-50",
    label: "Follicular",
  },
  fertile: {
    badge: "bg-emerald-400/20 text-emerald-100 border border-emerald-300/20",
    dot: "bg-emerald-300",
    tile: "border-emerald-300/25 bg-emerald-400/12 text-emerald-50",
    label: "Fertile",
  },
  ovulation: {
    badge: "bg-amber-400/20 text-amber-100 border border-amber-300/25",
    dot: "bg-amber-300",
    tile: "border-amber-300/30 bg-amber-400/18 text-amber-50",
    label: "Ovulation",
  },
  luteal: {
    badge: "bg-fuchsia-400/20 text-fuchsia-100 border border-fuchsia-300/20",
    dot: "bg-fuchsia-300",
    tile: "border-fuchsia-300/20 bg-fuchsia-400/10 text-fuchsia-50",
    label: "Luteal",
  },
  unknown: {
    badge: "bg-white/10 text-slate-200 border border-white/10",
    dot: "bg-slate-300",
    tile: "border-white/10 bg-white/5 text-slate-200",
    label: "Unknown",
  },
};

export function CycleCalendar({ profile }) {
  const calendar = buildCycleCalendar(profile);
  const currentPhase = getCurrentPhase(profile);
  const currentPhaseMeta = PHASE_STYLES[currentPhase.phase] || PHASE_STYLES.unknown;

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[var(--muted)]">Phase calendar</p>
          <h3 className="mt-2 font-display text-2xl font-semibold text-white">{calendar.monthLabel}</h3>
        </div>

        <div className={`inline-flex w-fit items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] ${currentPhaseMeta.badge}`}>
          <span className={`h-2.5 w-2.5 rounded-full ${currentPhaseMeta.dot}`} />
          {currentPhaseMeta.label}
          {currentPhase.cycleDay ? ` · Day ${currentPhase.cycleDay}` : ""}
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2 text-center text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
        {calendar.weekdayLabels.map((label) => (
          <div key={label} className="py-1">
            {label}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {calendar.entries.map((entry) => {
          if (entry.type === "empty") {
            return <div key={entry.key} className="aspect-square rounded-[1.25rem] border border-transparent" />;
          }

          const phaseMeta = PHASE_STYLES[entry.phase] || PHASE_STYLES.unknown;

          return (
            <div
              key={entry.key}
              className={`aspect-square rounded-[1.25rem] border p-2 transition ${phaseMeta.tile} ${entry.isToday ? "ring-2 ring-white/70" : ""}`}
              title={`${phaseMeta.label}${entry.cycleDay ? ` · Cycle day ${entry.cycleDay}` : ""}`}
            >
              <div className="flex h-full flex-col justify-between">
                <span className="text-sm font-semibold">{entry.day}</span>
                <span className="text-[0.62rem] uppercase tracking-[0.18em] opacity-80">
                  {phaseMeta.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid gap-2 md:grid-cols-5">
        {["menstrual", "follicular", "fertile", "ovulation", "luteal"].map((phase) => {
          const meta = PHASE_STYLES[phase];
          return (
            <div key={phase} className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-slate-200">
              <span className={`h-2.5 w-2.5 rounded-full ${meta.dot}`} />
              {meta.label}
            </div>
          );
        })}
      </div>
    </div>
  );
}
