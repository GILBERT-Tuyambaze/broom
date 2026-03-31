import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppBackdrop } from "../components/layout/AppBackdrop.jsx";
import { BrandLogo } from "../components/layout/BrandLogo.jsx";
import { ThemeSwitcher } from "../components/layout/ThemeSwitcher.jsx";
import { AppIcon } from "../components/shared/AppIcon.jsx";
import { useAppContext } from "../context/AppContext.jsx";

const NAV_ITEMS = [
  { label: "Platform", href: "#platform" },
  { label: "AI Support", href: "#ai-support" },
  { label: "Mentorship", href: "#mentorship" },
  { label: "Community", href: "#community" },
];

const FEATURE_PILLARS = [
  {
    icon: "calendar",
    title: "Body intelligence",
    copy: "Cycle tracking, phase-aware rhythm, and clearer health reflection without information overload.",
  },
  {
    icon: "heart",
    title: "Emotional awareness",
    copy: "Mood check-ins, journaling cues, and calmer insight that connects feelings with lived context.",
  },
  {
    icon: "spark",
    title: "AI-guided support",
    copy: "Personalized, suggestive guidance shaped by goals, habits, and recent signals instead of hard conclusions.",
  },
  {
    icon: "users",
    title: "Human empowerment",
    copy: "Mentors, role models, and moderated community spaces that turn support into long-term growth.",
  },
];

const FLOW_ITEMS = [
  {
    eyebrow: "Health",
    title: "Understand what your body may be telling you",
    copy: "Phase color, symptoms, and gentle trend signals make daily life easier to plan.",
  },
  {
    eyebrow: "Mind",
    title: "Name emotions before they become overwhelming",
    copy: "Reflection prompts help users notice patterns in stress, rest, and energy.",
  },
  {
    eyebrow: "Growth",
    title: "Move from support into confidence and opportunity",
    copy: "BLOOM grows beyond tracking into mentorship, role models, and skills for the future.",
  },
];

const MENTOR_CARDS = [
  { name: "Arielle N.", role: "Frontend engineer", focus: "Career confidence and coding growth" },
  { name: "Dr. Teta U.", role: "Health educator", focus: "Body literacy and wellbeing guidance" },
  { name: "Lina M.", role: "Leadership mentor", focus: "Confidence, communication, and ambition" },
];

const COMMUNITY_CARDS = [
  {
    alias: "QuietOrbit12",
    copy: "How do you stay gentle with yourself when school pressure and cramps happen together?",
  },
  {
    alias: "NovaLeaf",
    copy: "Has anyone noticed they think more clearly during certain cycle days and plan around it?",
  },
];

export function LandingPage() {
  const { appState, startPreviewMode } = useAppContext();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const primaryPath = appState.user ? "/app/dashboard" : "/auth";

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handlePreview = () => {
    startPreviewMode();
    navigate("/app/dashboard");
  };

  return (
    <div className="relative min-h-screen overflow-x-clip bg-[linear-gradient(180deg,var(--bg),var(--bg-alt))]">
      <AppBackdrop />

      <header
        className={`fixed inset-x-0 top-0 z-50 px-[5vw] py-4 transition duration-300 md:px-[8vw] ${
          scrolled
            ? "bg-[color:var(--panel-strong)]/90 shadow-[0_18px_60px_rgba(0,0,0,0.08)] backdrop-blur-2xl"
            : "bg-transparent backdrop-blur-md"
        }`}
      >
        <div className={`flex items-center justify-between gap-4 rounded-full border px-4 py-3 transition duration-300 md:px-5 ${
          scrolled ? "border-[var(--border)] bg-[color:var(--surface)]/85" : "border-transparent bg-transparent"
        }`}>
          <BrandLogo
            size="md"
            withWordmark
            title="BLOOM"
            subtitleClassName="normal-case tracking-normal text-sm font-medium"
          />

          <div className="hidden items-center gap-2 lg:flex">
            {NAV_ITEMS.map((item) => (
              <a key={item.label} href={item.href} className="chip-btn">
                {item.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <ThemeSwitcher />
            <Link to={primaryPath} className="primary-btn hidden sm:inline-flex">
              {appState.user ? "Open workspace" : "Get started"}
            </Link>
          </div>
        </div>
      </header>

      <main className="relative z-10">
        <section className="landing-section flex min-h-screen items-center pt-32" id="top">
          <div className="grid w-full gap-16 xl:grid-cols-[1.08fr_0.92fr] xl:items-center">
            <div className="space-y-8">
              <div className="inline-flex rounded-full border border-[var(--border)] bg-[color:var(--surface)]/88 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-[var(--muted)]">
                A personal support ecosystem
              </div>

              <div className="space-y-5">
                <h1 className="max-w-5xl font-display text-5xl font-semibold leading-[0.92] tracking-tight text-[color:var(--text-strong)] md:text-7xl xl:text-[5.7rem]">
                  Understand your body. Protect your peace. Grow with support that evolves with you.
                </h1>
                <p className="max-w-3xl text-lg leading-9 text-[var(--text)]">
                  BLOOM is a calm, futuristic platform for women&apos;s health, emotional awareness, AI-guided support, mentorship, and safe community connection.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Link to={primaryPath} className="primary-btn justify-center">
                  {appState.user ? "Enter your dashboard" : "Start with BLOOM"}
                </Link>
                <button type="button" onClick={handlePreview} className="chip-btn justify-center">
                  Explore preview
                </button>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <FloatingStat value="Health + Mind" copy="One connected experience instead of disconnected tools." />
                <FloatingStat value="Safe by design" copy="Privacy, moderation, and AI guardrails built into the product." />
                <FloatingStat value="Built to scale" copy="Role-based dashboards for users, mentors, and admins." />
              </div>
            </div>

            <div className="relative min-h-[34rem]">
              <div className="absolute -left-10 top-10 h-48 w-48 rounded-full bg-[var(--glow-a)] blur-3xl" />
              <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-[var(--glow-b)] blur-3xl" />

              <div className="absolute right-[6%] top-[4%] rounded-[1.8rem] border border-[var(--border)] bg-[color:var(--surface-strong)]/90 p-4 shadow-[var(--shadow-soft)] backdrop-blur-xl">
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[var(--muted)]">Emotion aware</p>
                <p className="mt-2 max-w-[12rem] text-sm leading-6 text-[var(--text)]">Gentle guidance that stays supportive instead of clinical.</p>
              </div>

              <div className="absolute left-[2%] top-[26%] rounded-[1.8rem] border border-[var(--border)] bg-[color:var(--surface-strong)]/90 p-4 shadow-[var(--shadow-soft)] backdrop-blur-xl">
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[var(--muted)]">Mentorship</p>
                <p className="mt-2 max-w-[12rem] text-sm leading-6 text-[var(--text)]">Verified mentors with stronger boundaries and safer guidance.</p>
              </div>

              <div className="absolute bottom-[6%] right-[10%] rounded-[1.8rem] border border-[var(--border)] bg-[color:var(--surface-strong)]/90 p-4 shadow-[var(--shadow-soft)] backdrop-blur-xl">
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[var(--muted)]">Cycle rhythm</p>
                <p className="mt-2 max-w-[12rem] text-sm leading-6 text-[var(--text)]">Readable phase signals and calmer planning support.</p>
              </div>

              <div className="absolute inset-x-[10%] inset-y-[10%] rounded-[3rem] border border-[var(--border)] bg-[linear-gradient(180deg,rgba(255,255,255,0.58),rgba(255,255,255,0.18))] p-6 shadow-[var(--shadow-soft)] backdrop-blur-2xl">
                <div className="flex h-full flex-col justify-between rounded-[2.3rem] border border-[var(--border)] bg-[linear-gradient(180deg,rgba(255,255,255,0.45),rgba(255,255,255,0.18))] p-6">
                  <div className="flex items-center justify-between">
                    <span className="rounded-full border border-[var(--border)] bg-[color:var(--surface)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
                      BLOOM flow
                    </span>
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[linear-gradient(135deg,var(--accent),var(--accent-2))] text-white">
                      <AppIcon name="heart" className="h-5 w-5" />
                    </span>
                  </div>

                  <div className="space-y-4">
                    <HeroLayer title="Daily check-in" copy="Mood, energy, and symptoms become softer insight." />
                    <HeroLayer title="AI companion" copy="Support that may guide, reflect, and encourage with care." />
                    <HeroLayer title="Growth layer" copy="Community, mentorship, and stories that expand what feels possible." />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="landing-section" id="platform">
          <div className="space-y-6">
            <div className="space-y-3">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[var(--muted)]">Platform pillars</p>
              <h2 className="max-w-4xl font-display text-4xl font-semibold text-[color:var(--text-strong)] md:text-5xl">
                One focus per layer, connected through one fluid experience.
              </h2>
            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {FEATURE_PILLARS.map((item) => (
                <article key={item.title} className="rounded-[2rem] border border-[var(--border)] bg-[color:var(--surface-strong)]/72 p-7 shadow-[var(--shadow-soft)] backdrop-blur-xl transition duration-300 hover:-translate-y-1.5">
                  <span className="flex h-14 w-14 items-center justify-center rounded-[1.4rem] bg-[linear-gradient(135deg,var(--accent),var(--accent-2))] text-white">
                    <AppIcon name={item.icon} className="h-5 w-5" />
                  </span>
                  <h3 className="mt-6 font-display text-2xl font-semibold text-[color:var(--text-strong)]">{item.title}</h3>
                  <p className="mt-3 text-sm leading-8 text-[var(--text)]">{item.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="landing-section">
          <div className="grid gap-10 xl:grid-cols-[0.95fr_1.05fr] xl:items-start">
            <div className="space-y-4">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[var(--muted)]">Why it matters</p>
              <h2 className="max-w-3xl font-display text-4xl font-semibold text-[color:var(--text-strong)] md:text-5xl">
                Support should feel fluid, trustworthy, and deeply human.
              </h2>
              <p className="max-w-2xl text-base leading-9 text-[var(--text)]">
                BLOOM is designed to reduce confusion, make daily planning easier, and help girls and young women feel understood rather than overwhelmed.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {FLOW_ITEMS.map((item) => (
                <article key={item.title} className="rounded-[2rem] border border-[var(--border)] bg-[color:var(--panel)]/82 p-6 shadow-[var(--shadow-soft)] backdrop-blur-xl">
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.26em] text-[var(--muted)]">{item.eyebrow}</p>
                  <h3 className="mt-4 font-display text-2xl font-semibold text-[color:var(--text-strong)]">{item.title}</h3>
                  <p className="mt-3 text-sm leading-8 text-[var(--text)]">{item.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="landing-section" id="ai-support">
          <div className="grid gap-10 xl:grid-cols-[1.02fr_0.98fr] xl:items-center">
            <div className="space-y-4">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[var(--muted)]">AI support</p>
              <h2 className="max-w-3xl font-display text-4xl font-semibold text-[color:var(--text-strong)] md:text-5xl">
                Personalized guidance that stays suggestive, calm, and safe.
              </h2>
              <p className="max-w-2xl text-base leading-9 text-[var(--text)]">
                The AI companion learns from profile memory, cycle rhythm, and recent check-ins so support can adapt over time without pretending to diagnose or replace professionals.
              </p>
            </div>

            <div className="grid gap-4">
              <GradientBand title="Learns over time" copy="Builds a personal baseline from onboarding, habits, and saved signals." />
              <GradientBand title="Uses careful language" copy="Responds with may, could, and might instead of absolute conclusions." />
              <GradientBand title="Works with humans" copy="Pairs AI with mentors, moderated community, and clear crisis escalation." />
            </div>
          </div>
        </section>

        <section className="landing-section" id="mentorship">
          <div className="space-y-6">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
              <div className="space-y-3">
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[var(--muted)]">Mentorship</p>
                <h2 className="max-w-4xl font-display text-4xl font-semibold text-[color:var(--text-strong)] md:text-5xl">
                  Verified mentors who guide with clarity and boundaries.
                </h2>
              </div>
              <button type="button" className="primary-btn w-fit">
                Connect with mentors
              </button>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {MENTOR_CARDS.map((mentor, index) => (
                <article key={mentor.name} className="rounded-[2rem] border border-[var(--border)] bg-[color:var(--surface-strong)]/76 p-6 shadow-[var(--shadow-soft)] backdrop-blur-xl transition duration-300 hover:-translate-y-1.5">
                  <div className="h-40 rounded-[1.8rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.6),rgba(242,184,181,0.55))] p-5">
                    <div className="flex h-16 w-16 items-center justify-center rounded-[1.3rem] bg-white text-xl font-display text-[var(--accent-2)] shadow-[var(--shadow-soft)]">
                      {index + 1}
                    </div>
                  </div>
                  <h3 className="mt-5 font-display text-2xl font-semibold text-[color:var(--text-strong)]">{mentor.name}</h3>
                  <p className="mt-2 text-sm font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">{mentor.role}</p>
                  <p className="mt-3 text-sm leading-8 text-[var(--text)]">{mentor.focus}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="landing-section" id="community">
          <div className="grid gap-10 xl:grid-cols-[1.05fr_0.95fr]">
            <div className="space-y-5">
              <div className="space-y-3">
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[var(--muted)]">Community</p>
                <h2 className="max-w-3xl font-display text-4xl font-semibold text-[color:var(--text-strong)] md:text-5xl">
                  Anonymous by default. Safe by design. Built for shared growth.
                </h2>
              </div>

              <div className="rounded-[2rem] border border-[var(--border)] bg-[color:var(--surface-strong)]/76 p-6 shadow-[var(--shadow-soft)] backdrop-blur-xl">
                <div className="rounded-[1.6rem] border border-[var(--border)] bg-[color:var(--surface)]/86 px-5 py-4 text-sm text-[var(--muted)]">
                  Share something with the community...
                </div>
                <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-2">
                    {["Health", "Tech", "Learning", "Wins"].map((tag) => (
                      <span key={tag} className="rounded-full border border-[var(--border)] bg-[color:var(--surface)] px-3 py-2 text-xs font-semibold text-[var(--muted)]">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <button type="button" className="primary-btn !px-6 !py-2.5">
                    Post
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {COMMUNITY_CARDS.map((item) => (
                  <article key={item.alias} className="rounded-[2rem] border border-[var(--border)] bg-[color:var(--panel)]/82 p-6 shadow-[var(--shadow-soft)] backdrop-blur-xl">
                    <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[var(--muted)]">{item.alias}</p>
                    <p className="mt-4 text-base leading-9 text-[var(--text-strong)]">{item.copy}</p>
                  </article>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-[2.4rem] bg-[linear-gradient(90deg,#4b1740_0%,#de5d83_100%)] px-8 py-10 text-white shadow-[var(--shadow-soft)]">
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.26em] text-white/70">Stories and role models</p>
                <h3 className="mt-4 font-display text-4xl font-semibold">Be inspired. Be bold.</h3>
                <p className="mt-4 max-w-xl text-base leading-8 text-white/78">
                  Discover journeys of women in health, technology, leadership, and entrepreneurship who show what growth can look like.
                </p>
              </div>

              <div className="grid gap-4">
                {["Tech futures", "Health leadership", "Community confidence"].map((story) => (
                  <article key={story} className="rounded-[2rem] border border-[var(--border)] bg-[color:var(--surface-strong)]/78 p-6 shadow-[var(--shadow-soft)] backdrop-blur-xl">
                    <div className="h-28 rounded-[1.6rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.5),rgba(242,184,181,0.5))]" />
                    <h3 className="mt-5 font-display text-2xl font-semibold text-[color:var(--text-strong)]">{story}</h3>
                    <p className="mt-3 text-sm leading-8 text-[var(--text)]">
                      Real journeys that help girls and young women see confidence, possibility, and direction in a more tangible way.
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="landing-section border-t border-[var(--border)]" id="footer">
          <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
            <div className="space-y-4">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[var(--muted)]">Next step</p>
              <h2 className="max-w-4xl font-display text-4xl font-semibold text-[color:var(--text-strong)] md:text-5xl">
                Create a support platform that feels premium, fluid, and ready to grow.
              </h2>
              <p className="max-w-2xl text-base leading-9 text-[var(--text)]">
                Start with a calmer landing experience now, then continue shaping the product into a full ecosystem for care, confidence, and opportunity.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link to={primaryPath} className="primary-btn justify-center">
                {appState.user ? "Open workspace" : "Get started"}
              </Link>
              <button type="button" onClick={handlePreview} className="chip-btn justify-center">
                Open preview
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function FloatingStat({ value, copy }) {
  return (
    <article className="rounded-[1.8rem] border border-[var(--border)] bg-[color:var(--surface-strong)]/76 p-5 shadow-[var(--shadow-soft)] backdrop-blur-xl">
      <h3 className="font-display text-2xl font-semibold text-[color:var(--text-strong)]">{value}</h3>
      <p className="mt-2 text-sm leading-7 text-[var(--text)]">{copy}</p>
    </article>
  );
}

function HeroLayer({ title, copy }) {
  return (
    <article className="rounded-[1.6rem] border border-[var(--border)] bg-[rgba(255,255,255,0.5)] p-4 backdrop-blur-lg">
      <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">{title}</p>
      <p className="mt-2 text-sm leading-7 text-[var(--text)]">{copy}</p>
    </article>
  );
}

function GradientBand({ title, copy }) {
  return (
    <article className="rounded-[2rem] border border-[var(--border)] bg-[linear-gradient(135deg,rgba(255,255,255,0.62),rgba(242,184,181,0.28))] p-6 shadow-[var(--shadow-soft)] backdrop-blur-xl">
      <h3 className="font-display text-2xl font-semibold text-[color:var(--text-strong)]">{title}</h3>
      <p className="mt-3 text-sm leading-8 text-[var(--text)]">{copy}</p>
    </article>
  );
}
