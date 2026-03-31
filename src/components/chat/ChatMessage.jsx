export function ChatMessage({ role, text }) {
  const isAssistant = role === "assistant";

  return (
    <article
      className={`max-w-3xl rounded-[1.75rem] border px-5 py-4 shadow-[0_20px_80px_rgba(0,0,0,0.18)] ${
        isAssistant
          ? "border-white/10 bg-white/6 text-slate-100"
          : "ml-auto border-cyan-300/20 bg-[linear-gradient(135deg,var(--accent),var(--accent-2))] text-slate-950"
      }`}
    >
      <p className={`mb-2 text-[0.7rem] font-bold uppercase tracking-[0.28em] ${isAssistant ? "text-cyan-200" : "text-slate-900/75"}`}>
        {isAssistant ? "Broom AI" : "You"}
      </p>
      <p className="whitespace-pre-wrap text-sm leading-7">{text}</p>
    </article>
  );
}
