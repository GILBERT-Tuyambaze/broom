import { Panel } from "../components/shared/Panel.jsx";
import { AppIcon } from "../components/shared/AppIcon.jsx";
import { useAppContext } from "../context/AppContext.jsx";
import { PREVIEW_MENTORS, PREVIEW_MENTORSHIP_ACCESS } from "../state/seedData.js";

export function MentorshipPage() {
  const { appState } = useAppContext();
  const mentors = appState.mentors.length ? appState.mentors : PREVIEW_MENTORS;
  const access = appState.mentorshipAccess.length ? appState.mentorshipAccess : PREVIEW_MENTORSHIP_ACCESS;

  return (
    <div className="space-y-6">
      <section className="glass-panel-strong overflow-hidden p-8">
        <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr] xl:items-center">
          <div className="space-y-4">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[var(--muted)]">Mentorship</p>
            <h2 className="font-display text-4xl font-semibold tracking-tight text-white md:text-5xl">
              Connect with mentors, plan sessions, and grow with guided support.
            </h2>
            <p className="max-w-2xl text-sm leading-8 text-slate-300 md:text-base">
              Discover mentors who match your goals, access safer support pathways, and use structured sessions for long-term growth.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 xl:justify-end">
            <button type="button" className="chip-btn">
              Find a mentor
            </button>
            <button type="button" className="primary-btn">
              Start mentorship plan
            </button>
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <Panel eyebrow="Mentor directory" title="Trusted mentors and support profiles">
          <div className="grid gap-4 md:grid-cols-2">
            {mentors.map((mentor, index) => (
              <article key={mentor.name} className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5">
                <div className="flex items-start gap-4">
                  <div className={`flex h-14 w-14 items-center justify-center rounded-[1.2rem] text-lg font-semibold text-white ${
                    index === 0 ? "bg-blue-500" : index === 1 ? "bg-emerald-500" : "bg-orange-500"
                  }`}>
                    {mentor.name
                      .split(" ")
                      .map((part) => part[0])
                      .slice(0, 2)
                      .join("")}
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-display text-xl font-semibold text-white">{mentor.name}</h3>
                    <p className="text-sm text-slate-300">{mentor.role}</p>
                    <p className="mt-1 text-sm font-medium text-[var(--muted)]">{mentor.focus}</p>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {mentor.focus.split(",").slice(0, 3).map((tag) => (
                    <span key={tag} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-[var(--muted)]">
                      {tag.trim()}
                    </span>
                  ))}
                </div>
                <div className="mt-5 flex items-center justify-between text-sm text-slate-300">
                  <span className="flex items-center gap-2 text-amber-200">
                    <AppIcon name="spark" className="h-4 w-4" />
                    {4.6 + index * 0.1}
                  </span>
                  <span>{80 + index * 23} sessions</span>
                </div>
                <button type="button" className={`mt-5 w-full rounded-[1rem] px-4 py-3 text-sm font-semibold ${
                  index === 0 ? "bg-emerald-400/80 text-slate-950" : "bg-rose-200/30 text-rose-100"
                }`}>
                  {index === 0 ? "Connected" : "Connect"}
                </button>
              </article>
            ))}
          </div>
        </Panel>

        <Panel eyebrow="Access model" title="How mentorship and support are provided">
          <div className="space-y-4">
            {access.map((item) => (
              <article key={item.title} className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5">
                <h3 className="font-display text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">{item.copy}</p>
              </article>
            ))}
          </div>
        </Panel>
      </section>
    </div>
  );
}
