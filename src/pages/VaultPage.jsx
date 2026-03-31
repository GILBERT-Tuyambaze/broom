import { Panel } from "../components/shared/Panel.jsx";
import { useAppContext } from "../context/AppContext.jsx";
import { RESOURCE_ITEMS } from "../state/appState.js";
import {
  PREVIEW_AI_GUARDRAILS,
  PREVIEW_COMMUNITY_GUIDELINES,
  PREVIEW_COMMUNITY_POSTS,
  PREVIEW_CRISIS_PROTOCOL,
  PREVIEW_MENTORS,
  PREVIEW_MENTORSHIP_ACCESS,
  PREVIEW_MODERATION_QUEUE,
} from "../state/seedData.js";

const DATA_BLOCKS = [
  {
    title: "Identity",
    copy: "Firebase Authentication stores the user's account and keeps the app behind a proper sign-in flow.",
  },
  {
    title: "Profile memory",
    copy: "Display name, cycle settings, goals, focus areas, and AI tone live in the user document in Firestore.",
  },
  {
    title: "Daily signals",
    copy: "Each check-in writes a timestamped log entry so the assistant and dashboard can react to recent changes.",
  },
  {
    title: "Assistant history",
    copy: "Chat messages are stored per user when Firebase is configured, making the experience feel continuous.",
  },
];

export function VaultPage() {
  const { appState } = useAppContext();
  const communityGuidelines = appState.communityGuidelines.length ? appState.communityGuidelines : PREVIEW_COMMUNITY_GUIDELINES;
  const moderationQueue = appState.moderationQueue.length ? appState.moderationQueue : PREVIEW_MODERATION_QUEUE;
  const communityPosts = appState.communityPosts.length ? appState.communityPosts : PREVIEW_COMMUNITY_POSTS;
  const mentors = appState.mentors.length ? appState.mentors : PREVIEW_MENTORS;
  const mentorshipAccess = appState.mentorshipAccess.length ? appState.mentorshipAccess : PREVIEW_MENTORSHIP_ACCESS;
  const aiGuardrails = appState.aiGuardrails.length ? appState.aiGuardrails : PREVIEW_AI_GUARDRAILS;
  const crisisProtocol = appState.crisisProtocol.length ? appState.crisisProtocol : PREVIEW_CRISIS_PROTOCOL;

  return (
    <div className="space-y-6">
      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <Panel eyebrow="Resource vault" title="Curated support content">
          <div className="grid gap-4 md:grid-cols-2">
            {RESOURCE_ITEMS.map((item) => (
              <article key={item.title} className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5">
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-cyan-200">{item.tag}</p>
                <h3 className="mt-3 font-display text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">{item.description}</p>
              </article>
            ))}
          </div>
        </Panel>

        <Panel eyebrow="Data design" title="What the app collects and why">
          <div className="space-y-4">
            {DATA_BLOCKS.map((item) => (
              <article key={item.title} className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5">
                <h3 className="font-display text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">{item.copy}</p>
              </article>
            ))}
          </div>
        </Panel>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <Panel eyebrow="Community system" title="Anonymous by default, moderated by design">
          <div className="grid gap-4 md:grid-cols-2">
            {communityGuidelines.map((item) => (
              <article key={item.title} className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5">
                <h3 className="font-display text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">{item.copy}</p>
              </article>
            ))}
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {moderationQueue.map((item) => (
              <article key={item.title} className="rounded-[1.5rem] border border-white/10 bg-black/10 p-4">
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[var(--muted)]">Moderation flow</p>
                <h3 className="mt-2 font-display text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-300">{item.copy}</p>
              </article>
            ))}
          </div>
        </Panel>

        <Panel eyebrow="Community preview" title="Sample seeded posts">
          <div className="space-y-4">
            {communityPosts.map((post) => (
              <article key={post.id} className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-cyan-200">{post.alias}</p>
                    <h3 className="mt-2 font-display text-xl font-semibold text-white">{post.topic}</h3>
                  </div>
                  <span className={`rounded-full border px-3 py-1.5 text-[0.72rem] font-semibold uppercase tracking-[0.2em] ${post.status === "under_review" ? "border-amber-300/20 bg-amber-400/10 text-amber-100" : "border-emerald-300/20 bg-emerald-400/10 text-emerald-100"}`}>
                    {post.status === "under_review" ? "Under review" : "Visible"}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-7 text-slate-300">{post.body}</p>
                <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2">{post.replies} replies</span>
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2">{post.hearts} support</span>
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2">{post.reports} reports</span>
                </div>
              </article>
            ))}
          </div>
        </Panel>
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <Panel eyebrow="Mentorship system" title="Verified mentors with stronger safeguards">
          <div className="space-y-4">
            {mentors.map((mentor) => (
              <article key={mentor.name} className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-cyan-200">{mentor.role}</p>
                    <h3 className="mt-2 font-display text-xl font-semibold text-white">{mentor.name}</h3>
                  </div>
                  <span className="rounded-full border border-emerald-300/20 bg-emerald-400/10 px-3 py-1.5 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-emerald-100">
                    {mentor.status}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-7 text-slate-300">{mentor.focus}</p>
                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">{mentor.pricing}</p>
              </article>
            ))}
          </div>
        </Panel>

        <Panel eyebrow="Access and AI safety" title="Human support plus guardrails">
          <div className="grid gap-4 md:grid-cols-2">
            {mentorshipAccess.map((item) => (
              <article key={item.title} className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5">
                <h3 className="font-display text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">{item.copy}</p>
              </article>
            ))}
            {aiGuardrails.map((item) => (
              <article key={item.title} className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5">
                <h3 className="font-display text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">{item.copy}</p>
              </article>
            ))}
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {crisisProtocol.map((item) => (
              <article key={item.title} className="rounded-[1.5rem] border border-rose-300/10 bg-rose-300/5 p-4">
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-rose-200">Crisis protocol</p>
                <h3 className="mt-2 font-display text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-300">{item.copy}</p>
              </article>
            ))}
          </div>
        </Panel>
      </section>
    </div>
  );
}
