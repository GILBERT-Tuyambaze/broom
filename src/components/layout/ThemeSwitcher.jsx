import { useTheme } from "../../context/ThemeContext.jsx";
import { AppIcon } from "../shared/AppIcon.jsx";

const LABELS = {
  light: "Light",
  dark: "Dark",
};

export function ThemeSwitcher() {
  const { theme, setTheme, cycleTheme, themes } = useTheme();

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button type="button" onClick={cycleTheme} className="icon-btn md:hidden" aria-label="Toggle theme">
        <AppIcon name={theme === "dark" ? "moon" : "sun"} className="h-4 w-4" />
      </button>
      <div className="hidden items-center gap-1 rounded-full border border-[var(--border)] bg-[var(--surface)] p-1 md:flex">
        {themes.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setTheme(item)}
            aria-pressed={theme === item}
            className={`icon-btn ${theme === item ? "icon-btn-active" : ""}`}
            aria-label={`${LABELS[item]} mode`}
            title={`${LABELS[item]} mode`}
          >
            <AppIcon name={item === "dark" ? "moon" : "sun"} className="h-4 w-4" />
            <span className="hidden lg:inline">{LABELS[item]}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
