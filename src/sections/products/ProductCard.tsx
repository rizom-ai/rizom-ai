import type { JSX } from "preact";
import { Section } from "@rizom/ui";
import { ProductIllustration } from "./ProductIllustration";
import type { ProductCardContent, ProductVariant } from "./schema";

const VARIANT_INDEX: Record<ProductVariant, number> = {
  rover: 0,
  relay: 1,
  ranger: 2,
};

interface VariantTone {
  themeVars: string;
}

// `--card-text` is set per variant and switches in light mode where the
// dark-mode color would lack contrast on the paper-toned background.
const VARIANT_TONE: Record<ProductVariant, VariantTone> = {
  rover: {
    themeVars:
      "[--card-bg:var(--color-card-rover-bg)] [--card-border:var(--color-card-rover-border)] [--card-border-hover:var(--color-card-rover-border-hover)] [--card-glow:var(--color-glow-rover)] [--card-text:var(--color-accent)] [--card-bar:var(--color-accent)]",
  },
  relay: {
    themeVars:
      "[--card-bg:var(--color-card-relay-bg)] [--card-border:var(--color-card-relay-border)] [--card-border-hover:var(--color-card-relay-border-hover)] [--card-glow:var(--color-glow-relay)] [--card-text:var(--color-secondary)] [--card-bar:var(--color-secondary)]",
  },
  ranger: {
    themeVars:
      "[--card-bg:var(--color-card-ranger-bg)] [--card-border:var(--color-card-ranger-border)] [--card-border-hover:var(--color-card-ranger-border-hover)] [--card-glow:var(--color-glow-ranger)] [--card-text:var(--color-accent-bright)] [--card-bar:var(--color-accent-bright)] light:[--card-text:var(--palette-amber-dark)] light:[--card-bar:var(--palette-amber-dark)]",
  },
};

const ARTICLE_BASE =
  "relative grid grid-cols-1 gap-10 overflow-hidden rounded-[20px] border [border-color:var(--card-border)] [background-image:var(--card-bg)] p-6 md:p-12 md:gap-16 md:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] transition-all duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] hover:-translate-y-1 hover:[border-color:var(--card-border-hover)] hover:[box-shadow:0_30px_80px_-30px_var(--card-glow)]";

const ARTICLE_BAR =
  "before:content-[''] before:absolute before:left-0 before:right-0 before:top-0 before:h-[2px] before:opacity-90 before:[background:linear-gradient(90deg,transparent,var(--card-bar)_22%,var(--card-bar)_78%,transparent)]";

const TONE_TEXT = "[color:var(--card-text)]";

export const ProductCard = ({
  variant,
  label,
  badge,
  headline,
  description,
  tags,
}: ProductCardContent): JSX.Element => {
  const tone = VARIANT_TONE[variant];
  const flip = VARIANT_INDEX[variant] === 1;

  return (
    <Section className="reveal py-9">
      <article className={`${ARTICLE_BASE} ${ARTICLE_BAR} ${tone.themeVars}`}>
        <div
          className={`relative z-[1] flex flex-col gap-6 ${flip ? "md:order-2" : ""}`}
        >
          <header className="flex items-center justify-between gap-4">
            <span
              className={`font-display text-[24px] md:text-[32px] font-normal leading-none tracking-[-0.5px] ${TONE_TEXT}`}
            >
              {label}
            </span>
            <span
              className={`inline-flex items-center gap-2 rounded-full border [border-color:var(--card-border)] px-3 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.24em] ${TONE_TEXT}`}
            >
              <span
                className="h-[5px] w-[5px] rounded-full"
                style={{ background: "currentColor" }}
              />
              {badge}
            </span>
          </header>

          <h3 className="font-display text-display-sm md:text-display-md font-normal text-theme">
            {headline}
          </h3>

          <p className="max-w-[58ch] text-body-md text-theme-muted">
            {description}
          </p>

          <footer className="mt-auto pt-2">
            <div className="border-t [border-color:var(--color-card-divider)] pt-5">
              <div className="flex flex-wrap items-center gap-x-3.5 gap-y-2 font-mono text-[10px] font-medium uppercase tracking-[0.24em]">
                {tags.map((tag, index) => (
                  <span key={tag} className="contents">
                    {index > 0 ? (
                      <span className="[color:var(--color-card-tag-separator)]">
                        │
                      </span>
                    ) : null}
                    <span className={TONE_TEXT}>{tag}</span>
                  </span>
                ))}
              </div>
            </div>
          </footer>
        </div>

        <div
          className={`relative z-[1] order-first md:order-none ${flip ? "md:order-1" : ""}`}
        >
          <div className="relative h-[260px] w-full md:h-[420px]">
            <ProductIllustration variant={variant} />
          </div>
        </div>
      </article>
    </Section>
  );
};
