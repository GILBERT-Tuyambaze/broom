import { Link, Navigate } from "react-router-dom";
import { BrandLogo } from "../components/layout/BrandLogo.jsx";
import { useAppContext } from "../context/AppContext.jsx";

export function AuthPage() {
  const {
    appState,
    authView,
    authFeedback,
    setAuthView,
    startPreviewMode,
    signIn,
    signUp,
  } = useAppContext();

  if (appState.user) {
    return <Navigate to="/app/dashboard" replace />;
  }

  return (
    <div className="min-h-screen px-4 py-6 md:px-6">
      <div className="mx-auto mb-4 flex max-w-7xl items-center justify-between gap-3">
        <Link to="/" className="chip-btn">
          Back to landing
        </Link>
        <BrandLogo size="sm" withWordmark title="Broom" subtitle="Access" titleClassName="text-base" />
      </div>
      <div className="grid min-h-[calc(100vh-3rem)] gap-6 xl:grid-cols-[1.2fr_0.9fr]">
        <section className="glass-panel relative overflow-hidden p-8 md:p-12">
          <div className="max-w-4xl space-y-8">
            <div className="inline-flex rounded-full border border-white/12 bg-white/6 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-cyan-200">
              Vite + React Router + Tailwind + Firebase
            </div>
            <div className="space-y-5">
              <h1 className="max-w-4xl font-display text-5xl font-semibold leading-[0.95] tracking-tight text-white md:text-7xl">
                Broom is now a high-tech wellness and growth workspace.
              </h1>
              <p className="max-w-2xl text-base leading-8 text-slate-300 md:text-lg">
                Sign in, create an account, or open preview mode to explore the routed app, theme modes, cycle-aware tracker, and AI-supported experience.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <FeatureCard title="Auth ready" copy="Firebase email sign in and create account with room for future providers." />
              <FeatureCard title="User-friendly flow" copy="Cleaner forms, guided onboarding, quick actions, and responsive layouts." />
              <FeatureCard title="AI-centered" copy="Chat, saved context, and support features shaped around each user profile." />
            </div>
          </div>
        </section>

        <section className="glass-panel-strong self-center p-8">
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[var(--muted)]">
                Welcome back
              </p>
              <h2 className="mt-2 font-display text-3xl font-semibold text-white">
                Access your workspace
              </h2>
            </div>
            <button type="button" onClick={startPreviewMode} className="chip-btn">
              Preview mode
            </button>
          </div>

          <div className={`mb-5 rounded-3xl border px-4 py-3 text-sm ${appState.firebaseConfigured ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-100" : "border-cyan-400/20 bg-cyan-400/10 text-cyan-100"}`}>
            {appState.firebaseConfigured
              ? "Firebase is configured. Sign in or create an account to store user data."
              : "Add your keys in public/config.js to enable real auth and saved data."}
          </div>

          {authFeedback ? (
            <div className={`mb-5 rounded-3xl border px-4 py-3 text-sm ${authFeedback.type === "error" ? "border-rose-400/20 bg-rose-400/10 text-rose-100" : authFeedback.type === "success" ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-100" : "border-cyan-400/20 bg-cyan-400/10 text-cyan-100"}`}>
              {authFeedback.message}
            </div>
          ) : null}

          <div className="mb-6 grid grid-cols-2 gap-2 rounded-full border border-white/10 bg-white/5 p-1.5">
            <button type="button" onClick={() => setAuthView("signin")} className={`rounded-full px-4 py-3 text-sm font-semibold transition ${authView === "signin" ? "bg-white text-slate-950" : "text-slate-300 hover:bg-white/10"}`}>
              Sign in
            </button>
            <button type="button" onClick={() => setAuthView("signup")} className={`rounded-full px-4 py-3 text-sm font-semibold transition ${authView === "signup" ? "bg-white text-slate-950" : "text-slate-300 hover:bg-white/10"}`}>
              Create account
            </button>
          </div>

          {authView === "signin" ? (
            <form
              className="space-y-4"
              onSubmit={async (event) => {
                event.preventDefault();
                const data = new FormData(event.currentTarget);
                const ok = await signIn(String(data.get("email") || "").trim(), String(data.get("password") || ""));
                if (ok) {
                  event.currentTarget.reset();
                }
              }}
            >
              <Field label="Email" name="email" type="email" placeholder="you@example.com" />
              <Field label="Password" name="password" type="password" placeholder="Enter your password" />
              <button type="submit" className="primary-btn w-full justify-center">
                Sign in with Firebase
              </button>
            </form>
          ) : (
            <form
              className="space-y-4"
              onSubmit={async (event) => {
                event.preventDefault();
                const data = new FormData(event.currentTarget);
                const ok = await signUp(
                  String(data.get("displayName") || "").trim(),
                  String(data.get("email") || "").trim(),
                  String(data.get("password") || ""),
                );
                if (ok) {
                  event.currentTarget.reset();
                }
              }}
            >
              <Field label="Display name" name="displayName" placeholder="Your name" />
              <Field label="Email" name="email" type="email" placeholder="you@example.com" />
              <Field label="Password" name="password" type="password" placeholder="At least 6 characters" />
              <button type="submit" className="primary-btn w-full justify-center">
                Create account
              </button>
            </form>
          )}
        </section>
      </div>
    </div>
  );
}

function FeatureCard({ title, copy }) {
  return (
    <article className="rounded-[1.75rem] border border-white/10 bg-white/6 p-5">
      <h3 className="font-display text-xl font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm leading-7 text-slate-300">{copy}</p>
    </article>
  );
}

function Field({ label, name, type = "text", placeholder }) {
  return (
    <label className="field-label">
      <span>{label}</span>
      <input className="field-input" name={name} type={type} placeholder={placeholder} required />
    </label>
  );
}
