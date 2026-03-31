import { Link } from "react-router-dom";
import { getRoleConfig } from "../../state/appState.js";
import { AppIcon } from "../shared/AppIcon.jsx";

const HERO_CONTENT = {
  user: {
    title: "A softer, safer support space for your body, emotions, and growth.",
    copy: "Track cycle signals, reflect on your mood, talk to the AI companion, and move toward mentorship without feeling overwhelmed.",
    primary: { to: "/app/assistant", label: "Open AI companion", icon: "spark" },
    secondary: { to: "/app/profile", label: "Update profile", icon: "edit" },
    badge: "Personal wellness workspace",
  },
  mentor: {
    title: "Guide with clarity, boundaries, and the right context at the right moment.",
    copy: "See learner needs, prepare group support, and keep mentorship structured, safe, and consistent across the platform.",
    primary: { to: "/app/tracker", label: "Review session queue", icon: "calendar" },
    secondary: { to: "/app/vault", label: "Open mentor vault", icon: "library" },
    badge: "Verified mentor workspace",
  },
  admin: {
    title: "Keep Broom trustworthy as the platform scales across support, safety, and AI.",
    copy: "Review moderation flow, mentor readiness, AI guardrails, and platform health in one calmer operational cockpit.",
    primary: { to: "/app/tracker", label: "Open safety tracker", icon: "shield" },
    secondary: { to: "/app/vault", label: "Review policy vault", icon: "library" },
    badge: "Trust and governance workspace",
  },
};

export function WorkspaceHero({ role = "user", profile }) {
  const content = HERO_CONTENT[role] || HERO_CONTENT.user;
  const roleConfig = getRoleConfig(role);

  return (
    <section className="glass-panel-strong overflow-hidden p-8">
      <div className="grid gap-8 xl:grid-cols-[1.25fr_0.75fr] xl:items-end">
        <div className="space-y-5">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.26em] text-[var(--muted)]">
            <AppIcon name={role === "admin" ? "shield" : role === "mentor" ? "users" : "heart"} className="h-4 w-4" />
            {content.badge}
          </div>
          <div className="space-y-3">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[var(--muted)]">{roleConfig.title}</p>
            <h2 className="max-w-3xl font-display text-4xl font-semibold tracking-tight text-white md:text-6xl">
              {content.title}
            </h2>
            <p className="max-w-2xl text-sm leading-8 text-slate-300 md:text-base">
              {content.copy}
            </p>
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-1">
          <Link to={content.primary.to} className="primary-btn justify-center">
            <AppIcon name={content.primary.icon} className="h-4 w-4" />
            {content.primary.label}
          </Link>
          <Link to={content.secondary.to} className="chip-btn justify-center text-center">
            <AppIcon name={content.secondary.icon} className="h-4 w-4" />
            {content.secondary.label}
          </Link>
        </div>
      </div>
    </section>
  );
}
