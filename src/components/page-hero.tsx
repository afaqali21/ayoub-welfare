import type { ReactNode } from "react";

export function PageHero({
  eyebrow,
  title,
  description,
  children,
  eyebrowClassName = "text-btn-donate",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
  eyebrowClassName?: string;
}) {
  return (
    <section className="border-b border-border bg-cream">
      <div className="mx-auto max-w-5xl px-6 py-20 md:py-28">
        {eyebrow && (
          <p className={`mb-4 text-xs font-semibold uppercase tracking-[0.2em] ${eyebrowClassName}`}>
            {eyebrow}
          </p>
        )}
        <h1 className="font-display text-4xl font-bold leading-tight text-foreground md:text-6xl uppercase tracking-tight">
          {title}
        </h1>
        {description && (
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {description}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}