import { Link, Navigate } from "react-router-dom";
import { BrandLogo } from "../components/layout/BrandLogo.jsx";
import { AppIcon } from "../components/shared/AppIcon.jsx";
import { useAppContext } from "../context/AppContext.jsx";

const AUTH_BENEFITS = [
  "Cycle tracking with softer phase-aware guidance",
  "Mentorship, community, and AI in one support ecosystem",
  "Private, role-based access with Firebase-ready accounts",
];

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
    <div className="min-h-screen bg-[linear-gradient(135deg,#4c1741_0%,#7e2f67_48%,#c94d92_100%)] px-4 py-6 md:px-6">
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] max-w-7xl flex-col">
        <div className="mb-5 flex items-center justify-between gap-3">
          <Link to="/" className="chip-btn border-white/20 text-white hover:bg-white/10">
            Back to landing
          </Link>
          <BrandLogo size="sm" withWordmark title="BLOOM" subtitle="Secure access" titleClassName="text-base text-white" subtitleClassName="normal-case tracking-normal text-white/70" />
            <div className="max-w-2xl space-y-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-white/80">
                BLOOM workspace
              </div>

              <div className="space-y-4">
                <h1 className="font-display text-6xl font-semibold leading-[0.96] tracking-tight">
                  Welcome back
                </h1>
                <p className="max-w-xl text-base leading-8 text-white/78">
                  Sign in to continue your journey with BLOOM through health awareness, emotional support, mentorship, and safer community connection.
                </p>
              </div>

              <div className="grid gap-4">
                {AUTH_BENEFITS.map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-[1.5rem] border border-white/10 bg-white/8 px-4 py-4">
                    <span className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-full bg-white/12">
                      <AppIcon name="spark" className="h-4 w-4" />
                    </span>
                    <p className="text-sm leading-7 text-white/82">{item}</p>
                  </div>
                ))}
              </div>

              <button type="button" onClick={startPreviewMode} className="chip-btn w-fit border-white/20 text-white hover:bg-white/10">
                Explore preview mode
              </button>
            </div>
          </section>

          <section className="mx-auto w-full max-w-xl rounded-[2.4rem] border border-white/12 bg-white/10 p-6 shadow-[0_24px_80px_rgba(37,8,36,0.28)] backdrop-blur-2xl md:p-8">
            <div className="space-y-3 text-center text-white">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-[1.4rem] bg-white/14 shadow-[0_12px_32px_rgba(255,255,255,0.12)]">
                <AppIcon name="heart" className="h-6 w-6" />
              </div>
              <h2 className="font-display text-4xl font-semibold tracking-tight">Welcome Back</h2>
              <p className="text-sm leading-7 text-white/72">
                {authView === "signin"
                  ? "Sign in to continue your journey with BLOOM."
                  : "Create an account to unlock your personal support space."}
              </p>
            </div>

            <div className="mt-6 rounded-[2rem] border border-white/12 bg-white/8 p-5 md:p-6">
              <div className={`mb-4 rounded-[1.3rem] border px-4 py-3 text-sm ${
                appState.firebaseConfigured
                  ? "border-emerald-300/25 bg-emerald-300/12 text-emerald-50"
                  : "border-white/15 bg-white/8 text-white/80"
              }`}>
                {appState.firebaseConfigured
                  ? "Firebase is configured. Sign in or create an account to save your progress."
                  : "Add your keys in public/config.js to enable live authentication and cloud data."}
              </div>

              {authFeedback ? (
                <div className={`mb-4 rounded-[1.3rem] border px-4 py-3 text-sm ${
                  authFeedback.type === "error"
                    ? "border-rose-300/30 bg-rose-300/12 text-rose-50"
                    : authFeedback.type === "success"
                      ? "border-emerald-300/25 bg-emerald-300/12 text-emerald-50"
                      : "border-white/15 bg-white/8 text-white/80"
                }`}>
                  {authFeedback.message}
                </div>
              ) : null}

              <div className="mb-5 grid grid-cols-2 gap-2 rounded-full border border-white/12 bg-white/8 p-1.5">
                <button
                  type="button"
                  onClick={() => setAuthView("signin")}
                  className={`rounded-full px-4 py-3 text-sm font-semibold transition ${
                    authView === "signin" ? "bg-white text-[#5b1d4a]" : "text-white/76 hover:bg-white/10"
                  }`}
                >
                  Sign in
                </button>
                <button
                  type="button"
                  onClick={() => setAuthView("signup")}
                  className={`rounded-full px-4 py-3 text-sm font-semibold transition ${
                    authView === "signup" ? "bg-white text-[#5b1d4a]" : "text-white/76 hover:bg-white/10"
                  }`}
                >
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
                  <Field label="Email" name="email" type="email" placeholder="Enter your email" />
                  <Field label="Password" name="password" type="password" placeholder="Enter your password" />
                  <button type="submit" className="mt-3 w-full rounded-full bg-white px-5 py-3.5 text-sm font-semibold text-[#5b1d4a] transition hover:-translate-y-0.5">
                    Sign In
                  </button>
                  <button type="button" onClick={startPreviewMode} className="w-full text-sm text-white/78 underline underline-offset-4">
                    Open preview mode instead
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
                  <Field label="Email" name="email" type="email" placeholder="Enter your email" />
                  <Field label="Password" name="password" type="password" placeholder="At least 6 characters" />
                  <button type="submit" className="mt-3 w-full rounded-full bg-white px-5 py-3.5 text-sm font-semibold text-[#5b1d4a] transition hover:-translate-y-0.5">
                    Create Account
                  </button>
                </form>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function Field({ label, name, type = "text", placeholder }) {
  return (
    <label className="flex flex-col gap-2 text-sm font-medium text-white">
      <span>{label}</span>
      <input
        className="w-full rounded-[1.1rem] border border-white/20 bg-white/10 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/45 focus:border-white/35 focus:ring-2 focus:ring-white/15"
        name={name}
        type={type}
        placeholder={placeholder}
        required
      />
    </label>
  );
}
