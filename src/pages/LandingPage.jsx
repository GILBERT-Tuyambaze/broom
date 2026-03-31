import { Link, useNavigate } from "react-router-dom";
import { AppBackdrop } from "../components/layout/AppBackdrop.jsx";
import { BrandLogo } from "../components/layout/BrandLogo.jsx";
import { ThemeSwitcher } from "../components/layout/ThemeSwitcher.jsx";
import { AppIcon } from "../components/shared/AppIcon.jsx";
import { useAppContext } from "../context/AppContext.jsx";

const NAV_ITEMS = [
  { label: "Home", href: "#home" },
  { label: "Community", href: "#community" },
  { label: "Mentors", href: "#mentors" },
  { label: "AI Support", href: "#ai-support" },
  { label: "Stories", href: "#stories" },
  { label: "Contact", href: "#footer" },
];

const TRACKING_CARDS = [
  {
    icon: "calendar",
    title: "Cycle tracking",
    copy: "A softer calendar that shows body rhythm, phase color, and timing cues without confusion.",
  },
  {
    icon: "heart",
    title: "Mood tracking",
    copy: "Quick emotional check-ins that help users connect feelings with habits, energy, and rest.",
  },
  {
    icon: "chart",
    title: "Insights",
    copy: "Clear patterns that explain what may be happening instead of only showing raw data.",
  },
];

const BENEFITS = [
  {
    title: "Feel safer and more understood",
    copy: "Broom creates a calm space where body changes, emotions, and questions feel easier to name.",
  },
  {
    title: "Make daily life easier to manage",
    copy: "Cycle-aware prompts and reflection tools help with planning school, work, rest, and self-care.",
  },
  {
    title: "Grow with guidance that respects boundaries",
    copy: "AI, community, and mentorship are shaped to support, not overwhelm, diagnose, or pressure.",
  },
];

const MENTORS = [
  { name: "Arielle", field: "Technology mentor", tone: "Frontend, confidence, and study-to-career growth" },
  { name: "Dr. Teta", field: "Health educator", tone: "Cycle literacy, wellbeing, and body awareness" },
  { name: "Lina", field: "Leadership mentor", tone: "Confidence, communication, and entrepreneurship" },
];

const COMMUNITY_POSTS = [
  {
    alias: "QuietOrbit12",
    title: "Safe space for sharing",
    copy: "How do you stay calm when stress and cramps happen in the same week?",
  },
  {
    alias: "NovaLeaf",
    title: "Anonymous community",
    copy: "Does anyone plan difficult study sessions around higher-energy cycle days?",
  },
];

const STORIES = [
  { title: "From uncertainty to self-trust", copy: "A gentle story about learning body awareness and building confidence." },
  { title: "Women building futures in tech", copy: "Role models showing what growth can look like across diverse communities." },
  { title: "Support that becomes opportunity", copy: "How mentorship can turn reflection into direction and action." },
];

export function LandingPage() {
  const { appState, startPreviewMode } = useAppContext();
  const navigate = useNavigate();
  const primaryPath = appState.user ? "/app/dashboard" : "/auth";

  const handlePreview = () => {
    startPreviewMode();
    navigate("/app/dashboard");
  };

  return (
    <div className="relative min-h-screen overflow-hidden px-4 py-5 md:px-6">
      <AppBackdrop />

      <div className="relative mx-auto max-w-7xl space-y-8">
        <header className="glass-panel-strong sticky top-4 z-40 flex flex-col gap-4 px-5 py-4 md:px-6">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <BrandLogo
              size="md"
              withWordmark
              title="Broom"
              subtitle="Women&apos;s health and empowerment"
              className="gap-4"
              titleClassName="text-lg"
              subtitleClassName="normal-case tracking-normal text-sm font-medium"
            />

            <div className="flex flex-wrap items-center gap-2">
              <nav className="hidden items-center gap-2 xl:flex">
                {NAV_ITEMS.map((item) => (
                  <a key={item.label} href={item.href} className="chip-btn">
                    {item.label}
                  </a>
                ))}
              </nav>
              <ThemeSwitcher />
              <button type="button" className="icon-btn" aria-label="Search">
                <AppIcon name="spark" className="h-4 w-4" />
              </button>
              <button type="button" className="icon-btn" aria-label="Notifications">
                <AppIcon name="message" className="h-4 w-4" />
              </button>
              <Link to={primaryPath} className="icon-btn" aria-label="Profile">
                <AppIcon name="user" className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <nav className="flex flex-wrap gap-2 xl:hidden">
            {NAV_ITEMS.map((item) => (
              <a key={item.label} href={item.href} className="chip-btn">
                {item.label}
              </a>
            ))}
          </nav>
        </header>

        <section id="home" className="glass-panel-strong overflow-hidden px-6 py-8 md:px-8 md:py-10 xl:px-12 xl:py-14">
          <div className="grid gap-10 xl:grid-cols-[1fr_0.96fr] xl:items-center">
            <div className="space-y-6">
              <div className="inline-flex rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-[var(--muted)]">
                Calm support for growth, health, and confidence
              </div>

              <div className="space-y-4">
                <h1 className="max-w-4xl font-display text-5xl font-semibold leading-[0.96] tracking-tight text-[color:var(--text-strong)] md:text-7xl">
                  Grow Into Your Strongest Self
                </h1>
                <p className="max-w-2xl text-base leading-8 text-[var(--text)] md:text-lg">
                  Understand your body, emotions, and future with guidance that evolves with you.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Link to={primaryPath} className="primary-btn justify-center">
                  Get Started
                </Link>
                <a href="#ai-support" className="chip-btn justify-center">
                  Learn More
                </a>
              </div>

              <div className="grid gap-3 md:grid-cols-3">
                <ValueBadge eyebrow="Navigation" value="Simple" copy="Easy paths into health, AI, mentors, and community." />
                <ValueBadge eyebrow="Design" value="Soft" copy="Rounded, light, and emotionally calm instead of harsh or clinical." />
                <ValueBadge eyebrow="Access" value="Scalable" copy="Built to start simply and grow into a full support ecosystem." />
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-[32rem]">
              <div className="absolute inset-0 rounded-[3rem] bg-[radial-gradient(circle_at_top,rgba(239,167,163,0.32),transparent_55%)] blur-3xl" />
              <div className="relative flex items-center justify-center">
                <div className="absolute right-4 top-6 rounded-[1.6rem] border border-[var(--border)] bg-[var(--surface-strong)] px-4 py-3 shadow-[var(--shadow-soft)]">
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[var(--muted)]">Emotion-aware</p>
                  <p className="mt-2 text-sm leading-6 text-[var(--text)]">Gentle check-ins and safer support cues</p>
                </div>
                <div className="absolute bottom-8 left-0 rounded-[1.6rem] border border-[var(--border)] bg-[var(--surface-strong)] px-4 py-3 shadow-[var(--shadow-soft)]">
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[var(--muted)]">Mentorship</p>
                  <p className="mt-2 text-sm leading-6 text-[var(--text)]">Verified guidance with clear boundaries</p>
                </div>
                <div className="relative h-[28rem] w-full rounded-[3rem] border border-[var(--border)] bg-[linear-gradient(180deg,#fffdfc_0%,#f8d7d4_100%)] p-5 shadow-[var(--shadow-soft)]">
                  <div className="flex h-full flex-col justify-between rounded-[2.5rem] border border-[var(--border)] bg-[rgba(255,255,255,0.35)] p-6">
                    <div className="flex items-center justify-between">
                      <span className="rounded-full bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
                        Personalized support
                      </span>
                      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-[color:var(--accent-2)]">
                        <AppIcon name="heart" className="h-5 w-5" />
                      </span>
                    </div>
                    <div className="mx-auto flex h-60 w-60 items-center justify-center rounded-full border-[14px] border-white bg-[radial-gradient(circle_at_top,#f8d7d4_0%,#f2b8b5_52%,#efa7a3_100%)] shadow-[0_20px_45px_rgba(239,167,163,0.28)]">
                      <div className="flex h-44 w-44 items-center justify-center rounded-full bg-[rgba(255,255,255,0.32)]">
                        <div className="flex h-36 w-36 items-center justify-center rounded-full bg-white/50">
                          <span className="font-display text-6xl text-white">B</span>
                        </div>
                      </div>
                    </div>
                    <div className="grid gap-3">
                      <MockTile title="Body intelligence" copy="Cycle and symptom awareness that stays simple and readable." />
                      <MockTile title="Mind intelligence" copy="Mood check-ins with insight, not overwhelm." />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <div className="max-w-3xl space-y-3">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[var(--muted)]">Smart health and emotion tracking</p>
            <h2 className="font-display text-3xl font-semibold text-[color:var(--text-strong)] md:text-4xl">
              A cleaner foundation for understanding health, mood, and patterns.
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {TRACKING_CARDS.map((card) => (
              <article key={card.title} className="glass-panel p-6 transition duration-300 hover:-translate-y-1">
                <span className="flex h-12 w-12 items-center justify-center rounded-[1.25rem] bg-[linear-gradient(135deg,var(--accent),var(--accent-2))] text-white">
                  <AppIcon name={card.icon} className="h-5 w-5" />
                </span>
                <h3 className="mt-5 font-display text-2xl font-semibold text-[color:var(--text-strong)]">{card.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[var(--text)]">{card.copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="ai-support" className="grid gap-6 xl:grid-cols-[0.92fr_1.08fr]">
          <article className="glass-panel p-6 md:p-8">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[var(--muted)]">Your personal AI guide</p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-[color:var(--text-strong)] md:text-4xl">
              Support that adapts to the user without pretending to know everything.
            </h2>
            <p className="mt-4 text-sm leading-8 text-[var(--text)] md:text-base">
              Broom&apos;s AI learns from habits, mood, cycle rhythm, and support preferences to offer calm, safe, and suggestive guidance.
            </p>
            <div className="mt-6 grid gap-3">
              <SupportLine label="Learns over time" value="It remembers patterns and preferences to make support feel more personal." />
              <SupportLine label="Safe language" value="It suggests, reflects, and encourages instead of diagnosing or making absolute claims." />
              <SupportLine label="Works with people" value="AI is paired with community, mentorship, and human review rather than replacing them." />
            </div>
          </article>

          <div className="grid gap-4 md:grid-cols-3">
            {BENEFITS.map((benefit) => (
              <article key={benefit.title} className="glass-panel-strong p-6 transition duration-300 hover:-translate-y-1">
                <h3 className="font-display text-2xl font-semibold text-[color:var(--text-strong)]">{benefit.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[var(--text)]">{benefit.copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="mentors" className="space-y-4">
          <div className="max-w-3xl space-y-3">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[var(--muted)]">Mentorship</p>
            <h2 className="font-display text-3xl font-semibold text-[color:var(--text-strong)] md:text-4xl">
              Guidance from women who can help users imagine a bigger future.
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {MENTORS.map((mentor, index) => (
              <article key={mentor.name} className="glass-panel-strong overflow-hidden p-6">
                <div className="flex h-44 items-end rounded-[2rem] bg-[linear-gradient(180deg,#fffdfc_0%,#f8d7d4_100%)] p-5">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-2xl font-display text-[var(--accent-2)] shadow-[var(--shadow-soft)]">
                    {index + 1}
                  </div>
                </div>
                <h3 className="mt-5 font-display text-2xl font-semibold text-[color:var(--text-strong)]">{mentor.name}</h3>
                <p className="mt-2 text-sm font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">{mentor.field}</p>
                <p className="mt-3 text-sm leading-7 text-[var(--text)]">{mentor.tone}</p>
                <button type="button" className="primary-btn mt-5 w-full justify-center">
                  Connect
                </button>
              </article>
            ))}
          </div>
        </section>

        <section id="community" className="grid gap-6 xl:grid-cols-[1.08fr_0.92fr]">
          <article className="glass-panel-strong p-6 md:p-8">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[var(--muted)]">Community</p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-[color:var(--text-strong)] md:text-4xl">
              Safe Space for Sharing
            </h2>
            <p className="mt-4 text-sm leading-8 text-[var(--text)] md:text-base">
              Anonymous posting, reporting, and moderated review create a supportive social layer without sacrificing safety.
            </p>
            <div className="mt-6 grid gap-4">
              {COMMUNITY_POSTS.map((post) => (
                <article key={post.alias} className="rounded-[1.75rem] border border-[var(--border)] bg-[var(--surface)] p-5">
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[var(--muted)]">{post.alias}</p>
                  <h3 className="mt-2 font-display text-xl font-semibold text-[color:var(--text-strong)]">{post.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[var(--text)]">{post.copy}</p>
                </article>
              ))}
            </div>
          </article>

          <article id="stories" className="glass-panel p-6 md:p-8">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[var(--muted)]">Role model stories</p>
            <div className="mt-5 flex gap-4 overflow-x-auto pb-2">
              {STORIES.map((story) => (
                <article key={story.title} className="min-w-[18rem] rounded-[1.9rem] border border-[var(--border)] bg-[var(--surface)] p-5">
                  <div className="h-32 rounded-[1.5rem] bg-[linear-gradient(180deg,#fffdfc_0%,#f2b8b5_100%)]" />
                  <h3 className="mt-4 font-display text-xl font-semibold text-[color:var(--text-strong)]">{story.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[var(--text)]">{story.copy}</p>
                </article>
              ))}
            </div>
          </article>
        </section>

        <section className="glass-panel overflow-hidden p-6 md:p-8">
          <div className="grid gap-5 xl:grid-cols-[1fr_auto] xl:items-center">
            <div>
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[var(--muted)]">Final call to action</p>
              <h2 className="mt-3 max-w-3xl font-display text-3xl font-semibold text-[color:var(--text-strong)] md:text-4xl">
                Build a support ecosystem that feels timeless, safe, and truly empowering.
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-8 text-[var(--text)] md:text-base">
                Broom can grow from a gentle health tool into a platform for reflection, confidence, mentorship, and opportunity.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row xl:flex-col">
              <Link to={primaryPath} className="primary-btn justify-center">
                {appState.user ? "Open your dashboard" : "Get Started"}
              </Link>
              <button type="button" onClick={handlePreview} className="chip-btn justify-center">
                Explore Preview
              </button>
            </div>
          </div>
        </section>

        <footer id="footer" className="glass-panel flex flex-col gap-4 px-5 py-5 text-sm text-[var(--text)] md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <BrandLogo size="sm" />
            <div>
              <p className="font-display text-lg font-semibold text-[color:var(--text-strong)]">Broom</p>
              <p className="mt-1">A calm digital support space for women&apos;s health, reflection, and growth.</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 text-[var(--muted)]">
            {NAV_ITEMS.map((item) => (
              <a key={item.label} href={item.href} className="hover:text-[color:var(--text-strong)]">
                {item.label}
              </a>
            ))}
          </div>
        </footer>
      </div>
    </div>
  );
}

function ValueBadge({ eyebrow, value, copy }) {
  return (
    <article className="rounded-[1.7rem] border border-[var(--border)] bg-[var(--surface)] p-5">
      <p className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[var(--muted)]">{eyebrow}</p>
      <h3 className="mt-3 font-display text-2xl font-semibold text-[color:var(--text-strong)]">{value}</h3>
      <p className="mt-2 text-sm leading-7 text-[var(--text)]">{copy}</p>
    </article>
  );
}

function MockTile({ title, copy }) {
  return (
    <article className="rounded-[1.4rem] border border-[var(--border)] bg-[rgba(255,255,255,0.64)] p-4">
      <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">{title}</p>
      <p className="mt-2 text-sm leading-7 text-[var(--text)]">{copy}</p>
    </article>
  );
}

function SupportLine({ label, value }) {
  return (
    <div className="flex flex-col gap-1 rounded-[1.25rem] border border-[var(--border)] bg-[var(--panel)] px-4 py-3">
      <span className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[var(--muted)]">{label}</span>
      <span className="text-sm leading-7 text-[color:var(--text-strong)]">{value}</span>
    </div>
  );
}
