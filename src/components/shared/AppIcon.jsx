const ICONS = {
  home: (
    <>
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5.25 9.75V21h13.5V9.75" />
    </>
  ),
  spark: (
    <>
      <path d="m12 3 1.7 4.3L18 9l-4.3 1.7L12 15l-1.7-4.3L6 9l4.3-1.7Z" />
      <path d="m18.5 15 1 2.5 2.5 1-2.5 1-1 2.5-1-2.5-2.5-1 2.5-1Z" />
      <path d="m5.5 15 .75 1.75L8 17.5l-1.75.75L5.5 20l-.75-1.75L3 17.5l1.75-.75Z" />
    </>
  ),
  calendar: (
    <>
      <path d="M7 2.5v3" />
      <path d="M17 2.5v3" />
      <rect x="3" y="5.5" width="18" height="15.5" rx="3" />
      <path d="M3 9.5h18" />
    </>
  ),
  library: (
    <>
      <path d="M4 5h4v15H4z" />
      <path d="M10 3h4v17h-4z" />
      <path d="M16 7h4v13h-4z" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20a7 7 0 0 1 14 0" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3 5 6v5c0 4.5 2.8 8.4 7 10 4.2-1.6 7-5.5 7-10V6Z" />
      <path d="m9.5 12 1.7 1.7 3.8-4.2" />
    </>
  ),
  edit: (
    <>
      <path d="m4 20 4.5-1 8.8-8.8a1.8 1.8 0 0 0 0-2.5l-1-1a1.8 1.8 0 0 0-2.5 0L5 15.5 4 20Z" />
      <path d="m12.5 6.5 5 5" />
    </>
  ),
  logout: (
    <>
      <path d="M10 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h4" />
      <path d="M14 16l4-4-4-4" />
      <path d="M8 12h10" />
    </>
  ),
  menu: (
    <>
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8.5" r="2.5" />
      <circle cx="16.5" cy="9.5" r="2" />
      <path d="M4.5 19a4.5 4.5 0 0 1 9 0" />
      <path d="M14 18.5a3.5 3.5 0 0 1 6 0" />
    </>
  ),
  chart: (
    <>
      <path d="M4 20h16" />
      <path d="M7 17v-5" />
      <path d="M12 17V9" />
      <path d="M17 17v-8" />
    </>
  ),
  heart: (
    <>
      <path d="M12 20s-6.5-4.2-8.2-8A4.8 4.8 0 0 1 12 6a4.8 4.8 0 0 1 8.2 6C18.5 15.8 12 20 12 20Z" />
    </>
  ),
  message: (
    <>
      <path d="M5 6.5h14a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H11l-4.5 3v-3H5a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2Z" />
    </>
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v2.2" />
      <path d="M12 19.3v2.2" />
      <path d="m4.9 4.9 1.6 1.6" />
      <path d="m17.5 17.5 1.6 1.6" />
      <path d="M2.5 12h2.2" />
      <path d="M19.3 12h2.2" />
      <path d="m4.9 19.1 1.6-1.6" />
      <path d="m17.5 6.5 1.6-1.6" />
    </>
  ),
  moon: (
    <>
      <path d="M18 14.8A7.8 7.8 0 1 1 9.2 6 6.2 6.2 0 0 0 18 14.8Z" />
    </>
  ),
};

export function AppIcon({ name, className = "h-5 w-5", strokeWidth = 1.8, title }) {
  const glyph = ICONS[name] || ICONS.spark;

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden={title ? undefined : "true"}
      role={title ? "img" : "presentation"}
    >
      {title ? <title>{title}</title> : null}
      {glyph}
    </svg>
  );
}
