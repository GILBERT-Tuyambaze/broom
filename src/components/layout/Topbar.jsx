import { useLocation } from "react-router-dom";
import { getProfileRole, getRouteMeta, getRoleConfig } from "../../state/appState.js";
import { BrandLogo } from "./BrandLogo.jsx";
import { ThemeSwitcher } from "./ThemeSwitcher.jsx";
import { AppIcon } from "../shared/AppIcon.jsx";

function getInitials(name) {
  return (
    name
      ?.split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join("") || "BR"
  );
}

export function Topbar({ profile, onOpenOnboarding, onSignOut }) {
  const location = useLocation();
  const role = getProfileRole(profile);
  const routeMeta = getRouteMeta(location.pathname, role);
  const roleConfig = getRoleConfig(role);

  return (
    <header className="glass-panel-strong rounded-none z-40 flex flex-col gap-4 p-4 xl:flex-row xl:items-center xl:justify-between">
      <div className="space-y-3">
        <div className="xl:hidden">
          <BrandLogo size="sm" withWordmark title="Broom" subtitle="Empowerment platform" titleClassName="text-base" />
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[var(--muted)]">
            {routeMeta.eyebrow}
          </span>
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[var(--text-strong)]">
            {roleConfig.label}
          </span>
        </div>
        <div className="flex flex-col gap-2 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <h1 className="font-display text-2xl font-semibold tracking-tight text-white md:text-3xl">
              {routeMeta.title}
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">
              {routeMeta.copy}
            </p>
          </div>
          <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-3 py-2">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[linear-gradient(135deg,var(--accent),var(--accent-2))] text-sm font-semibold text-[var(--button-text)]">
              {getInitials(profile?.displayName)}
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-white">{profile?.displayName || "Broom workspace"}</p>
              <p className="truncate text-xs uppercase tracking-[0.18em] text-[var(--muted)]">{roleConfig.title}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <ThemeSwitcher />
        <button type="button" onClick={onOpenOnboarding} className="icon-btn" aria-label="Edit profile" title="Edit profile">
          <AppIcon name="edit" className="h-4 w-4" />
        </button>
        <button type="button" onClick={onSignOut} className="icon-btn chip-btn-danger" aria-label="Sign out" title="Sign out">
          <AppIcon name="logout" className="h-4 w-4" />
        </button>
      </div>
    </header>
  );
}
