import { Panel } from "../components/shared/Panel.jsx";
import { AppIcon } from "../components/shared/AppIcon.jsx";
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

const ROLE_MODEL_STORIES = [
  {
    name: "Ngozi Adeyemi",
    role: "Software Engineer to Founder",
    quote: "I coded my first app in a cybercafe. Today, we train girls across Africa to build with confidence.",
    tags: ["Tech", "Entrepreneurship", "Nigeria"],
    tone: "from-blue-500 to-blue-700",
  },
  {
    name: "Dr. Hawa Diallo",
    role: "Gynecologist and Women's Health Advocate",
    quote: "Every girl deserves to understand her body. Health literacy is a form of freedom.",
    tags: ["Health", "Medicine", "Guinea"],
    tone: "from-emerald-500 to-emerald-700",
  },
  {
    name: "Sandrine Murore",
    role: "AI Researcher and Mentor",
    quote: "Technology becomes more powerful when young women see themselves shaping it.",
    tags: ["AI", "Mentorship", "Rwanda"],
    tone: "from-fuchsia-500 to-purple-700",
  },
  {
    name: "Amina Al-Rashid",
    role: "Policy Leader",
    quote: "Safe systems and bold dreams can exist together when girls are included from the beginning.",
    tags: ["Leadership", "Policy", "Community"],
    tone: "from-orange-500 to-amber-700",
  },
];

const CHALLENGES = [
  { title: "Build a Health App", copy: "April challenge · 24 joined", status: "Active" },
  { title: "Write Your Story", copy: "Share your journey · 18 joined", status: "Active" },
  { title: "Digital Safety Quiz", copy: "Learn and earn a badge · 31 joined", status: "New" },
];

const ACTIVE_MEMBERS = [
  { alias: "Asha K.", role: "Tech Enthusiast", initials: "AK", color: "bg-blue-500" },
  { alias: "Mutoni G.", role: "Health Advocate", initials: "MG", color: "bg-emerald-500" },
  { alias: "Uwase B.", role: "Aspiring Developer", initials: "UB", color: "bg-orange-500" },
  { alias: "Fatou D.", role: "Community Builder", initials: "FD", color: "bg-pink-500" },
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
      <section className="glass-panel-strong overflow-hidden p-8">
        <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr] xl:items-center">
          <div className="space-y-4">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[var(--muted)]">Empowerment layer</p>
            <h2 className="font-display text-4xl font-semibold tracking-tight text-white md:text-5xl">
              Mentorship, role models, and community in one calmer space
            </h2>
            <p className="max-w-2xl text-sm leading-8 text-slate-300 md:text-base">
              This area brings together the human side of Broom: people to learn from, stories that build confidence, and a moderated forum for safer connection.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 xl:justify-end">
            <button type="button" className="chip-btn">
              My sessions
            </button>
            <button type="button" className="primary-btn">
              Become a mentor
            </button>
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.06fr_0.94fr]">
        <Panel eyebrow="Mentorship hub" title="Connect with inspiring women in tech and beyond">
          <div className="flex flex-wrap gap-2">
            {["All", "Tech", "Health", "Business", "Leadership"].map((filter, index) => (
              <button key={filter} type="button" className={index === 0 ? "primary-btn !px-4 !py-2.5" : "chip-btn"}>
                {filter}
              </button>
            ))}
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {mentors.map((mentor, index) => (
              <article key={mentor.name} className="rounded-[1.8rem] border border-white/10 bg-white/5 p-5">
                <div className="flex items-start gap-4">
                  <div className={`flex h-14 w-14 items-center justify-center rounded-[1.2rem] text-lg font-semibold text-white ${
                    index === 0 ? "bg-blue-500" : index === 1 ? "bg-emerald-500" : "bg-orange-500"
                  }`}>
                    {mentor.name.split(" ").map((part) => part[0]).slice(0, 2).join("")}
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
                  index === 0
                    ? "bg-emerald-400/80 text-slate-950"
                    : "bg-rose-200/30 text-rose-100"
                }`}>
                  {index === 0 ? "Connected" : "Connect"}
                </button>
              </article>
            ))}
          </div>
        </Panel>

        <Panel eyebrow="Access and AI safety" title="Human support with stronger trust systems">
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

          <div className="mt-5 grid gap-3">
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

      <section className="space-y-4">
        <div className="space-y-2">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[var(--muted)]">Role models</p>
          <h2 className="font-display text-3xl font-semibold text-white">Stories that inspire and empower</h2>
        </div>

        <article className="rounded-[2rem] bg-[linear-gradient(90deg,#48183f_0%,#e75e80_100%)] px-8 py-10 text-white">
          <h3 className="font-display text-4xl font-semibold">Be Inspired. Be Bold.</h3>
          <p className="mt-4 max-w-3xl text-base leading-8 text-white/78">
            Discover journeys of women who broke barriers in technology, health, entrepreneurship, and leadership across Africa and beyond.
          </p>
        </article>

        <div className="grid gap-5 xl:grid-cols-2">
          {ROLE_MODEL_STORIES.map((story) => (
            <article key={story.name} className="overflow-hidden rounded-[1.9rem] border border-white/10 bg-white/5">
              <div className={`h-24 bg-gradient-to-r ${story.tone}`} />
              <div className="p-6">
                <h3 className="font-display text-2xl font-semibold text-white">{story.name}</h3>
                <p className="mt-1 text-sm text-slate-300">{story.role}</p>
                <blockquote className="mt-5 border-l-4 border-rose-200/60 pl-4 text-lg italic leading-8 text-slate-200">
                  {story.quote}
                </blockquote>
                <div className="mt-5 flex flex-wrap gap-2">
                  {story.tags.map((tag) => (
                    <span key={tag} className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-rose-100">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.08fr_0.92fr]">
        <div className="space-y-6">
          <div className="space-y-2">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[var(--muted)]">Community forum</p>
            <h2 className="font-display text-3xl font-semibold text-white">A safe space to share, support, and grow</h2>
          </div>

          <article className="rounded-[1.9rem] border border-white/10 bg-white/5 p-5">
            <div className="rounded-[1.5rem] border border-white/10 bg-white/5 px-5 py-4 text-sm text-slate-300">
              Share something with the community...
            </div>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap gap-2">
                {["Health", "Tech", "Learning", "Wins"].map((tag) => (
                  <span key={tag} className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-rose-100">
                    {tag}
                  </span>
                ))}
              </div>
              <button type="button" className="primary-btn !px-6 !py-2.5">
                Post
              </button>
            </div>
          </article>

          <div className="space-y-4">
            {communityPosts.map((post) => (
              <article key={post.id} className="rounded-[1.9rem] border border-white/10 bg-white/5 p-5">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500 text-sm font-semibold text-white">
                      {post.alias.split("").slice(0, 2).join("").toUpperCase()}
                    </div>
                    <div>
                      <h3 className="font-display text-xl font-semibold text-white">{post.alias}</h3>
                      <p className="text-sm text-[var(--muted)]">{post.topic}</p>
                    </div>
                  </div>
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-cyan-100">
                    {post.topic}
                  </span>
                </div>
                <p className="mt-4 text-base leading-8 text-slate-200">{post.body}</p>
                <div className="mt-4 flex flex-wrap gap-4 text-sm text-[var(--muted)]">
                  <span>♥ {post.hearts}</span>
                  <span>💬 {post.replies}</span>
                  <span>Share</span>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <Panel eyebrow="Monthly challenges" title="Keep the community active">
            <div className="space-y-4">
              {CHALLENGES.map((item) => (
                <article key={item.title} className="flex items-start justify-between gap-4 rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
                  <div>
                    <h3 className="font-display text-lg font-semibold text-white">{item.title}</h3>
                    <p className="mt-1 text-sm text-slate-300">{item.copy}</p>
                  </div>
                  <span className="rounded-full border border-emerald-300/20 bg-emerald-300/12 px-3 py-1 text-xs font-semibold text-emerald-100">
                    {item.status}
                  </span>
                </article>
              ))}
            </div>
          </Panel>

          <Panel eyebrow="Active members" title="Who is showing up today">
            <div className="space-y-4">
              {ACTIVE_MEMBERS.map((member) => (
                <article key={member.alias} className="flex items-center justify-between gap-4 rounded-[1.4rem] border border-white/10 bg-white/5 p-4">
                  <div className="flex items-center gap-4">
                    <div className={`flex h-11 w-11 items-center justify-center rounded-full text-sm font-semibold text-white ${member.color}`}>
                      {member.initials}
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{member.alias}</h3>
                      <p className="text-sm text-slate-300">{member.role}</p>
                    </div>
                  </div>
                  <span className="h-3 w-3 rounded-full bg-emerald-300" />
                </article>
              ))}
            </div>
          </Panel>

          <Panel eyebrow="Trust blueprint" title="Moderation and platform rules">
            <div className="space-y-3">
              {communityGuidelines.slice(0, 2).map((item) => (
                <article key={item.title} className="rounded-[1.4rem] border border-white/10 bg-white/5 p-4">
                  <h3 className="font-display text-lg font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-300">{item.copy}</p>
                </article>
              ))}
              {moderationQueue.map((item) => (
                <article key={item.title} className="rounded-[1.4rem] border border-white/10 bg-black/10 p-4">
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[var(--muted)]">Moderation flow</p>
                  <h3 className="mt-2 font-display text-lg font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-300">{item.copy}</p>
                </article>
              ))}
            </div>
          </Panel>
        </div>
      </section>

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
            {[
              "Identity and sign-in keep access secure and role-based.",
              "Profile memory helps Broom personalize support over time.",
              "Check-ins and conversations build context for better AI guidance.",
              "Safety events and reports help admins protect trust across the platform.",
            ].map((copy, index) => (
              <article key={copy} className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5">
                <h3 className="font-display text-xl font-semibold text-white">Layer 0{index + 1}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">{copy}</p>
              </article>
            ))}
          </div>
        </Panel>
      </section>
    </div>
  );
}
