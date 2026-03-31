import { Panel } from "../components/shared/Panel.jsx";
import { AppIcon } from "../components/shared/AppIcon.jsx";
import { useAppContext } from "../context/AppContext.jsx";
import {
  PREVIEW_COMMUNITY_GUIDELINES,
  PREVIEW_COMMUNITY_POSTS,
  PREVIEW_CRISIS_PROTOCOL,
} from "../state/seedData.js";

export function CommunityPage() {
  const { appState } = useAppContext();
  const guidelines = appState.communityGuidelines.length ? appState.communityGuidelines : PREVIEW_COMMUNITY_GUIDELINES;
  const posts = appState.communityPosts.length ? appState.communityPosts : PREVIEW_COMMUNITY_POSTS;
  const crisis = appState.crisisProtocol.length ? appState.crisisProtocol : PREVIEW_CRISIS_PROTOCOL;

  return (
    <div className="space-y-6">
      <section className="glass-panel-strong overflow-hidden p-8">
        <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr] xl:items-center">
          <div className="space-y-4">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[var(--muted)]">Community</p>
            <h2 className="font-display text-4xl font-semibold tracking-tight text-white md:text-5xl">
              Safer spaces for sharing, support, and wellbeing.
            </h2>
            <p className="max-w-2xl text-sm leading-8 text-slate-300 md:text-base">
              This hub collects community guidelines, shared posts, and crisis resources so you can connect with confidence and care.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 xl:justify-end">
            <button type="button" className="chip-btn">
              View guidelines
            </button>
            <button type="button" className="primary-btn">
              Post safely
            </button>
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <Panel eyebrow="Community rules" title="Guidelines for safe sharing">
          <div className="space-y-4">
            {guidelines.map((item) => (
              <article key={item.title} className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5">
                <h3 className="font-display text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">{item.copy}</p>
              </article>
            ))}
          </div>
        </Panel>

        <Panel eyebrow="Crisis support" title="When a conversation needs extra care">
          <div className="space-y-4">
            {crisis.map((item) => (
              <article key={item.title} className="rounded-[1.75rem] border border-rose-300/15 bg-rose-300/5 p-5">
                <h3 className="font-display text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">{item.copy}</p>
              </article>
            ))}
          </div>
        </Panel>
      </section>

      <section className="space-y-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[var(--muted)]">Discussion feed</p>
            <h3 className="font-display text-3xl font-semibold text-white">Recent posts from the circle</h3>
          </div>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold uppercase tracking-[0.24em] text-[var(--text-strong)]">
            <AppIcon name="spark" className="h-4 w-4" />
            {posts.length} threads
          </span>
        </div>

        <div className="grid gap-4">
          {posts.map((post) => (
            <article key={post.id} className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h4 className="font-display text-xl font-semibold text-white">{post.topic}</h4>
                  <p className="mt-1 text-sm text-[var(--muted)]">{post.alias}</p>
                </div>
                <div className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-200">
                  {post.replies} replies
                </div>
              </div>
              <p className="mt-4 text-sm leading-7 text-slate-300">{post.body}</p>
              <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-slate-300">
                <span>♥ {post.hearts}</span>
                <span>Share</span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
