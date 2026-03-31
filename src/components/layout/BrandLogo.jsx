const SIZE_MAP = {
  sm: "h-10 w-10 rounded-[1rem]",
  md: "h-12 w-12 rounded-[1.2rem]",
  lg: "h-14 w-14 rounded-[1.35rem]",
};

export function BrandLogo({
  size = "md",
  withWordmark = false,
  title = "BLOOM",
  subtitle = "",
  className = "",
  titleClassName = "",
  subtitleClassName = "",
}) {
  return (
    <div className={`flex items-center gap-4 ${className}`.trim()}>
      <img
        src="/app-icon.svg"
        alt="BLOOM logo"
        className={`${SIZE_MAP[size] || SIZE_MAP.md} shrink-0 object-cover shadow-[0_14px_30px_var(--ring)]`.trim()}
      />
      {withWordmark ? (
        <div>
          <p className={`font-display text-lg font-semibold text-[color:var(--text-strong)] ${titleClassName}`.trim()}>
            {title}
          </p>
          {subtitle ? (
            <p className={`text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[var(--muted)] ${subtitleClassName}`.trim()}>
              {subtitle}
            </p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
