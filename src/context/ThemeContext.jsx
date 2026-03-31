import { createContext, useContext, useEffect, useState } from "react";

const THEMES = ["light", "dark"];
const ThemeContext = createContext(null);

function normalizeTheme(theme) {
  if (theme === "dark" || theme === "eclipse") {
    return "dark";
  }

  if (theme === "light" || theme === "aurora" || theme === "sunrise") {
    return "light";
  }

  if (typeof window !== "undefined" && window.matchMedia?.("(prefers-color-scheme: dark)").matches) {
    return "dark";
  }

  return "light";
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() =>
    normalizeTheme(localStorage.getItem("broom-theme") || localStorage.getItem("bloom-theme")),
  );

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("broom-theme", theme);
  }, [theme]);

  const cycleTheme = () => {
    setTheme((currentTheme) => (currentTheme === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, cycleTheme, themes: THEMES }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }

  return context;
}
