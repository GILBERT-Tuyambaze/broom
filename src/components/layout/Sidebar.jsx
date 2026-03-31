import { NavLink } from "react-router-dom";
import { getNavigationItems, getProfileRole, getRoleConfig } from "../../state/appState.js";
import { AppIcon } from "../shared/AppIcon.jsx";
import { BrandLogo } from "./BrandLogo.jsx";

export function Sidebar({ profile, messagesCount, logsCount }) {
  const role = getProfileRole(profile);
  const roleConfig = getRoleConfig(role);
  const navItems = getNavigationItems(role);

  return (
    <>
      <aside className="glass-panel-strong rounded-none hidden min-h-screen w-72 shrink-0 flex-col justify-between overflow-hidden p-6 lg:flex">
        <div className="space-y-8">
          <div className="space-y-4">
            <BrandLogo
              size="lg"
              withWordmark
              title="Broom"
              subtitle="Empowerment platform"
              titleClassName="text-xl"
              subtitleClassName="normal-case tracking-normal text-sm font-medium"
            />
            <div className="flex items-center gap-3 rounded-[1.8rem] border border-white/10 bg-white/5 p-4">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-[var(--text-strong)]">
                <AppIcon name={role === "admin" ? "shield" : role === "mentor" ? "users" : "user"} className="h-5 w-5" />
              </span>
              <div>
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[var(--muted)]">{roleConfig.label}</p>
                <p className="mt-1 text-sm font-medium text-white">{roleConfig.title}</p>
              </div>
            </div>
          </div>

          <nav className="space-y-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `sidebar-link flex items-center justify-between gap-3 ${isActive ? "sidebar-link-active" : ""}`
                }
              >
                <span className="flex items-center gap-3">
                  <AppIcon name={item.icon} className="h-4 w-4" />
                  {item.label}
                </span>
                <span className="text-[0.68rem] uppercase tracking-[0.2em] opacity-70">{item.short}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[var(--muted)]">
            {role === "admin" ? "Platform load" : role === "mentor" ? "Support flow" : "Memory graph"}
          </p>
          <h2 className="mt-3 font-display text-2xl font-semibold text-white">{messagesCount + logsCount} signals</h2>
          <p className="mt-2 text-sm leading-6 text-slate-300">
            {role === "admin"
              ? "Moderation, AI review, and mentor governance should stay visible as the platform grows."
              : role === "mentor"
                ? "Keep guidance structured, supportive, and within the boundaries of mentorship rather than diagnosis."
                : profile.displayName
                  ? `${profile.displayName}${profile.primaryGoal ? ` is focused on ${profile.primaryGoal}.` : " is building a more personalized wellness flow."}`
                  : "Finish onboarding and log a few check-ins to deepen personalization."}
          </p>
        </div>
      </aside>

      <nav className="glass-panel z-30 flex flex-wrap gap-2 p-3 lg:hidden">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-semibold transition ${isActive ? "bg-white text-slate-950" : "bg-white/5 text-slate-200 hover:bg-white/10"}`
            }
          >
            <AppIcon name={item.icon} className="h-4 w-4" />
            {item.short}
          </NavLink>
        ))}
      </nav>
    </>
  );
}
