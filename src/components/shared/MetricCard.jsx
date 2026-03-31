export function MetricCard({ eyebrow, value, copy, accent = "cyan" }) {
  const glowClass =
    accent === "orange"
      ? "from-orange-400/20 to-transparent"
      : accent === "pink"
        ? "from-fuchsia-400/20 to-transparent"
        : "from-cyan-400/20 to-transparent";

  return (
    <article className="glass-panel relative overflow-hidden p-6">
      <div className={`absolute inset-x-0 top-0 h-20 bg-gradient-to-b ${glowClass}`} />
      <p className="relative text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[var(--muted)]">
        {eyebrow}
      </p>
      <h3 className="relative mt-4 font-display text-4xl font-semibold text-white">{value}</h3>
      <p className="relative mt-3 text-sm leading-6 text-slate-300">{copy}</p>
    </article>
  );
}
