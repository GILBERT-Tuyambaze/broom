export function AppBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 12% 14%, var(--glow-a), transparent 28%), radial-gradient(circle at 86% 18%, var(--glow-b), transparent 32%), radial-gradient(circle at 52% 100%, var(--glow-c), transparent 38%)",
        }}
      />
      <div className="grid-overlay absolute inset-0 opacity-40" />
      <div className="absolute -left-24 top-10 h-72 w-72 rounded-full blur-3xl" style={{ background: "var(--glow-a)" }} />
      <div className="absolute right-0 top-1/3 h-96 w-96 rounded-full blur-3xl" style={{ background: "var(--glow-b)" }} />
      <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full blur-3xl" style={{ background: "var(--glow-c)" }} />
    </div>
  );
}
