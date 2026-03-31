export function Panel({ eyebrow, title, children, action }) {
  return (
    <section className="glass-panel h-full p-6">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          {eyebrow ? (
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[var(--muted)]">
              {eyebrow}
            </p>
          ) : null}
          <h2 className="mt-2 font-display text-2xl font-semibold text-white">{title}</h2>
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}
