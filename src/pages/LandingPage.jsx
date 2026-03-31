import { Link, useNavigate } from "react-router-dom";
import { AppBackdrop } from "../components/layout/AppBackdrop.jsx";
import { BrandLogo } from "../components/layout/BrandLogo.jsx";
import { ThemeSwitcher } from "../components/layout/ThemeSwitcher.jsx";
import { useAppContext } from "../context/AppContext.jsx";

const CORE_FEATURES = [
  {
    title: "Body literacy",
    copy: "Cycle tracking, symptom reflection, and gentle patterns that help users understand what is happening instead of feeling confused by it.",
  },
  {
    title: "Emotion-aware support",
    copy: "An AI companion that responds with calmer guidance shaped by goals, routines, mood, and lived context.",
  },
  {
    title: "Safe community",
    copy: "Anonymous participation, moderation design, and healthier interaction cues built for trust from the beginning.",
  },
  {
    title: "Growth pathways",
    copy: "Mentorship, guidance, and future opportunities that turn a wellness tool into an empowerment platform.",
  },
];

const BENEFITS = [
  {
    title: "Feel less alone",
    copy: "The product helps users name what they are feeling and see that their experience makes sense.",
  },
  {
    title: "Plan with more confidence",
    copy: "Gentle predictions and support prompts make school, work, rest, and self-care feel easier to organize.",
  },
  {
    title: "Grow with support that respects you",
    copy: "Private controls, calmer language, and safer human support create a more trustworthy long-term experience.",
  },
];

const PREVIEW_PANELS = [
  {
    eyebrow: "Daily rhythm",
    title: "See what your body may be asking for today",
    copy: "Morning check-ins, energy signals, and phase colors turn wellness data into something simple and readable.",
  },
  {
    eyebrow: "AI companion",
    title: "Receive guidance that feels calm, not clinical",
    copy: "The assistant can suggest routines, reflection prompts, and next steps without sounding harsh or absolute.",
  },
  {
    eyebrow: "Community care",
    title: "Stay connected without losing safety",
    copy: "Anonymous posting, reporting, and moderated conversations help support feel human and protected.",
  },
];

const HUMAN_SUPPORT = [
  {
    title: "Anonymous community",
    copy: "A supportive space for shared experiences, honest questions, and safer connection.",
  },
  {
    title: "Verified mentorship",
    copy: "Guidance from trained women in health, leadership, business, and technology.",
  },
  {
    title: "Trust-centered design",
    copy: "Clear boundaries, accessible language, and privacy choices that help users feel safe from the first screen.",
  },
];

export function LandingPage() {
  const { appState, startPreviewMode } = useAppContext();
  const navigate = useNavigate();
  const primaryPath = appState.user ? "/app/dashboard" : "/auth";
  const primaryLabel = appState.user ? "Open your space" : "Start with care";

  const handlePreview = () => {
    startPreviewMode();
    navigate("/app/dashboard");
  };

  return (
    <div className="relative min-h-screen overflow-hidden px-4 py-5 md:px-6">
      <AppBackdrop />

      <div className="relative mx-auto max-w-7xl space-y-6">
        <header className="glass-panel flex flex-col gap-4 px-5 py-4 md:flex-row md:items-center md:justify-between md:px-6">
          <BrandLogo
            size="md"
            withWordmark
            title="Broom"
            subtitle="Women&apos;s health and empowerment"
            className="gap-4"
            titleClassName="text-lg"
            subtitleClassName="normal-case tracking-normal text-sm font-medium"
          />

          <div className="flex flex-wrap items-center gap-3">
            <nav className="hidden items-center gap-2 md:flex">
              <a href="#features" className="chip-btn">Features</a>
              <a href="#benefits" className="chip-btn">Benefits</a>
              <a href="#community" className="chip-btn">Community</a>
            </nav>
            <ThemeSwitcher />
            <Link to={primaryPath} className="primary-btn">
              {primaryLabel}
            </Link>
          </div>
        </header>

        <section className="glass-panel-strong overflow-hidden px-6 py-8 md:px-8 md:py-10 xl:px-12 xl:py-12">
          <div className="grid gap-8 xl:grid-cols-[1.08fr_0.92fr] xl:items-center">
            <div className="space-y-6">
              <div className="inline-flex rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-[var(--muted)]">
                Calm, safe, and future-ready
              </div>

              <div className="space-y-4">
                <h2 className="max-w-4xl font-display text-5xl font-semibold leading-[0.96] tracking-tight text-[color:var(--text-strong)] md:text-7xl">
                  Understand your body, protect your peace, and grow with support that feels made for you.
                </h2>
                <p className="max-w-2xl text-base leading-8 text-[var(--text)] md:text-lg">
                  Broom is a gentle digital space for health awareness, emotional reflection, trusted guidance, and empowerment designed for girls and young women.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Link to={primaryPath} className="primary-btn justify-center">
                  {appState.user ? "Continue your journey" : "Create a calm start"}
                </Link>
                <button type="button" onClick={handlePreview} className="chip-btn justify-center">
                  Explore the preview
                </button>
              </div>

              <div className="grid gap-3 md:grid-cols-3">
                <ValueBadge eyebrow="Designed for" value="Mobile first" copy="Simple navigation and clear hierarchy on smaller screens." />
                <ValueBadge eyebrow="Feel" value="Soft futuristic" copy="Rounded forms, warm gradients, and emotionally aware visuals." />
                <ValueBadge eyebrow="Trust" value={appState.firebaseConfigured ? "Cloud ready" : "Preview ready"} copy="Safe entry points with room to grow into a full platform." />
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 rounded-[2.4rem] bg-[linear-gradient(135deg,var(--accent),var(--accent-3))] opacity-18 blur-3xl" />
              <div className="relative rounded-[2.6rem] border border-[var(--border)] bg-[var(--surface-strong)] p-4 shadow-[var(--shadow-soft)]">
                <div className="rounded-[2rem] border border-[var(--border)] bg-[var(--panel)] p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-[0.72rem] font-semibold uppercase tracking-[0.26em] text-[var(--muted)]">Today&apos;s pulse</p>
                      <h3 className="mt-2 font-display text-2xl font-semibold text-[color:var(--text-strong)]">A softer kind of guidance</h3>
                    </div>
                    <span className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                      Emotion-aware
                    </span>
                  </div>

                  <div className="mt-5 grid gap-3">
                    <MockTile
                      title="Check-in"
                      copy="Energy is steady. Mood feels a little fragile. Keep the day gentle and focused."
                    />
                    <MockTile
                      title="Cycle view"
                      copy="You may be in a more sensitive window. Plan recovery and lighter effort where possible."
                    />
                    <MockTile
                      title="Community note"
                      copy="Anonymous support and verified mentors can meet users where they are without judgment."
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="space-y-4">
          <div className="max-w-3xl space-y-3">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[var(--muted)]">Core features</p>
            <h3 className="font-display text-3xl font-semibold text-[color:var(--text-strong)] md:text-4xl">
              A simple foundation that can grow into a lifelong support system.
            </h3>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {CORE_FEATURES.map((feature, index) => (
              <article key={feature.title} className="glass-panel p-6 transition duration-300 hover:-translate-y-1">
                <div className="flex h-11 w-11 items-center justify-center rounded-[1.2rem] bg-[linear-gradient(135deg,var(--accent),var(--accent-2))] font-display text-sm font-semibold text-[color:var(--button-text)]">
                  0{index + 1}
                </div>
                <h4 className="mt-5 font-display text-2xl font-semibold text-[color:var(--text-strong)]">{feature.title}</h4>
                <p className="mt-3 text-sm leading-7 text-[var(--text)]">{feature.copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="benefits" className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
          <div className="glass-panel p-6 md:p-8">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[var(--muted)]">Real-life benefits</p>
            <h3 className="mt-3 font-display text-3xl font-semibold text-[color:var(--text-strong)] md:text-4xl">
              This is not just about tracking. It is about feeling more grounded in daily life.
            </h3>
            <p className="mt-4 text-sm leading-8 text-[var(--text)] md:text-base">
              Broom is designed to reduce confusion, make planning feel easier, and support young women with language and visuals that feel kind, clear, and emotionally intelligent.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {BENEFITS.map((benefit) => (
              <article key={benefit.title} className="glass-panel-strong p-6 transition duration-300 hover:-translate-y-1">
                <h4 className="font-display text-2xl font-semibold text-[color:var(--text-strong)]">{benefit.title}</h4>
                <p className="mt-3 text-sm leading-7 text-[var(--text)]">{benefit.copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <div className="max-w-3xl space-y-3">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[var(--muted)]">App preview</p>
            <h3 className="font-display text-3xl font-semibold text-[color:var(--text-strong)] md:text-4xl">
              Clear screens, gentle motion language, and a flow that stays easy to understand.
            </h3>
          </div>

          <div className="grid gap-4 xl:grid-cols-[0.78fr_1.22fr]">
            <article className="glass-panel p-6 md:p-8">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[var(--muted)]">Preview stack</p>
              <div className="mt-5 space-y-4">
                <MockPreview label="Daily check-in" title="How are you feeling today?" copy="A simple input flow for mood, energy, focus, and symptoms." />
                <MockPreview label="AI support" title="What may help right now?" copy="Supportive language with practical next steps and softer recommendations." />
                <MockPreview label="Cycle calendar" title="What phase am I in?" copy="A more readable month view with gentle phase colors and timing cues." />
              </div>
            </article>

            <div className="grid gap-4 md:grid-cols-3">
              {PREVIEW_PANELS.map((panel) => (
                <article key={panel.title} className="glass-panel-strong p-6 md:p-7 transition duration-300 hover:-translate-y-1">
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[var(--muted)]">{panel.eyebrow}</p>
                  <h4 className="mt-3 font-display text-2xl font-semibold text-[color:var(--text-strong)]">{panel.title}</h4>
                  <p className="mt-3 text-sm leading-7 text-[var(--text)]">{panel.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="community" className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
          <div className="glass-panel-strong p-6 md:p-8">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[var(--muted)]">Community and mentorship</p>
            <h3 className="mt-3 max-w-2xl font-display text-3xl font-semibold text-[color:var(--text-strong)] md:text-4xl">
              Human support should feel safe, moderated, and genuinely useful.
            </h3>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {HUMAN_SUPPORT.map((item) => (
                <article key={item.title} className="rounded-[1.75rem] border border-[var(--border)] bg-[var(--surface)] p-5">
                  <h4 className="font-display text-xl font-semibold text-[color:var(--text-strong)]">{item.title}</h4>
                  <p className="mt-3 text-sm leading-7 text-[var(--text)]">{item.copy}</p>
                </article>
              ))}
            </div>
          </div>

          <article className="glass-panel p-6 md:p-8">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[var(--muted)]">Mentorship highlight</p>
            <div className="mt-5 rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] p-6">
              <h4 className="font-display text-2xl font-semibold text-[color:var(--text-strong)]">Guidance that expands what feels possible</h4>
              <p className="mt-4 text-sm leading-8 text-[var(--text)]">
                Broom can evolve into a place where girls and young women meet supportive mentors, ask safer questions, and see role models who reflect their future.
              </p>
              <div className="mt-6 grid gap-3">
                <SupportLine label="Access" value="Paid models with room for sponsorship and scholarships" />
                <SupportLine label="Safety" value="Verified mentors, boundaries training, and in-platform reporting" />
                <SupportLine label="Impact" value="Confidence, direction, and long-term growth beyond health tracking" />
              </div>
            </div>
          </article>
        </section>

        <section className="glass-panel overflow-hidden p-6 md:p-8">
          <div className="grid gap-5 xl:grid-cols-[1fr_auto] xl:items-center">
            <div>
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[var(--muted)]">Final call to action</p>
              <h3 className="mt-3 max-w-3xl font-display text-3xl font-semibold text-[color:var(--text-strong)] md:text-4xl">
                Build a women&apos;s health platform that feels timeless, trustworthy, and ready for the future.
              </h3>
              <p className="mt-3 max-w-2xl text-sm leading-8 text-[var(--text)] md:text-base">
                Start with a calmer experience today, then let it evolve into a richer ecosystem for care, connection, and empowerment.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row xl:flex-col">
              <Link to={primaryPath} className="primary-btn justify-center">
                {primaryLabel}
              </Link>
              <button type="button" onClick={handlePreview} className="chip-btn justify-center">
                Open the live preview
              </button>
            </div>
          </div>
        </section>

        <footer className="glass-panel flex flex-col gap-4 px-5 py-5 text-sm text-[var(--text)] md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <BrandLogo size="sm" />
            <div>
              <p className="font-display text-lg font-semibold text-[color:var(--text-strong)]">Broom</p>
              <p className="mt-1">A calm digital support space for women&apos;s health, reflection, and growth.</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 text-[var(--muted)]">
            <a href="#features" className="hover:text-[color:var(--text-strong)]">Features</a>
            <a href="#benefits" className="hover:text-[color:var(--text-strong)]">Benefits</a>
            <a href="#community" className="hover:text-[color:var(--text-strong)]">Community</a>
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
    <article className="rounded-[1.4rem] border border-[var(--border)] bg-[var(--surface)] p-4">
      <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">{title}</p>
      <p className="mt-2 text-sm leading-7 text-[var(--text)]">{copy}</p>
    </article>
  );
}

function MockPreview({ label, title, copy }) {
  return (
    <article className="rounded-[1.8rem] border border-[var(--border)] bg-[var(--surface)] p-5">
      <p className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[var(--muted)]">{label}</p>
      <h4 className="mt-3 font-display text-xl font-semibold text-[color:var(--text-strong)]">{title}</h4>
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
