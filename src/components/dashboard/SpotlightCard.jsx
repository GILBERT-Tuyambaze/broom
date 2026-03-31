import { AppIcon } from "../shared/AppIcon.jsx";

export function SpotlightCard({ eyebrow, title, copy, icon = "spark", tone = "default" }) {
  const toneClass =
    tone === "warm"
      ? "from-orange-400/16 via-orange-300/8 to-transparent"
      : tone === "alert"
        ? "from-rose-400/16 via-rose-300/8 to-transparent"
        : "from-cyan-400/16 via-violet-300/10 to-transparent";

  return (
    <article className="glass-panel relative overflow-hidden p-6">
      <div className={`absolute inset-x-0 top-0 h-16 bg-gradient-to-b ${toneClass}`} />
      <div className="relative flex items-start justify-between gap-4">
        <div>
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[var(--muted)]">{eyebrow}</p>
          <h3 className="mt-3 font-display text-2xl font-semibold text-white">{title}</h3>
        </div>
        <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-[var(--text-strong)]">
          <AppIcon name={icon} className="h-5 w-5" />
        </span>
      </div>
      <p className="relative mt-4 text-sm leading-7 text-slate-300">{copy}</p>
    </article>
  );
}
