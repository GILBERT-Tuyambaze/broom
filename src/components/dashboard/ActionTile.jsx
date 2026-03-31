import { Link } from "react-router-dom";
import { AppIcon } from "../shared/AppIcon.jsx";

export function ActionTile({ to, title, copy, icon = "spark" }) {
  return (
    <Link
      to={to}
      className="group rounded-[1.8rem] border border-white/10 bg-white/5 p-5 transition duration-300 hover:-translate-y-1 hover:bg-white/8"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <h3 className="font-display text-xl font-semibold text-white">{title}</h3>
          <p className="text-sm leading-7 text-slate-300">{copy}</p>
        </div>
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-[var(--text-strong)] transition duration-300 group-hover:scale-105">
          <AppIcon name={icon} className="h-5 w-5" />
        </span>
      </div>
    </Link>
  );
}
