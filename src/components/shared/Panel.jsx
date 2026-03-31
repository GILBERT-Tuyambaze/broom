export function Panel({ eyebrow, title, children, action, compact = false, className = "" }) {
  return (
    <section className={`glass-panel h-full ${compact ? "p-4" : "p-6"} ${className}`}>
      <div className={`${compact ? "mb-4" : "mb-5"} flex items-start justify-between gap-3`}>
        <div>
          {eyebrow ? (
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[var(--muted)]">
              {eyebrow}
            </p>
          ) : null}
          <h2 className={`mt-2 font-display ${compact ? "text-xl" : "text-2xl"} font-semibold text-white`}>{title}</h2>
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}
