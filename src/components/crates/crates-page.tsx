import Link from "next/link";
import {
  addonOptions,
  crateOptions,
  dipOptions,
  flavourOptions,
  howItWorks,
  occasions,
  sideOptions,
} from "@/components/crates/data";

type SectionIntroProps = {
  eyebrow: string;
  title: string;
  body: string;
  theme?: "light" | "dark";
  level?: "h1" | "h2";
};

type OrderButtonProps = {
  href: string;
  label: string;
  variant?: "primary" | "secondary";
  compact?: boolean;
};

function cn(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

function OrderButton({
  href,
  label,
  variant = "primary",
  compact = false,
}: OrderButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={cn(
        "inline-flex items-center justify-center rounded-full border-2 border-brand-ink px-5 text-center font-black uppercase tracking-[0.2em] transition-transform duration-150 hover:-translate-y-0.5",
        compact ? "min-h-12 text-sm" : "min-h-14 text-base",
        variant === "primary"
          ? "bg-brand-red text-[#fff7ed] shadow-[0_8px_0_0_#100800]"
          : "bg-brand-yellow text-brand-ink shadow-[0_8px_0_0_#100800]"
      )}
    >
      {label}
    </a>
  );
}

function SectionIntro({
  eyebrow,
  title,
  body,
  theme = "light",
  level = "h2",
}: SectionIntroProps) {
  const HeadingTag = level;

  return (
    <div className="max-w-2xl space-y-3">
      <p
        className={cn(
          "text-sm font-black uppercase tracking-[0.28em]",
          theme === "dark" ? "text-brand-yellow" : "text-brand-red"
        )}
      >
        {eyebrow}
      </p>
      <HeadingTag
        className={cn(
          "font-display text-5xl leading-[0.92] sm:text-6xl",
          theme === "dark" ? "text-[#fff7ed]" : "text-brand-ink"
        )}
      >
        {title}
      </HeadingTag>
      <p
        className={cn(
          "text-base leading-7 sm:text-lg",
          theme === "dark" ? "text-[#fff7ed]/82" : "text-brand-ink/78"
        )}
      >
        {body}
      </p>
    </div>
  );
}

function PageSection({
  id,
  className,
  children,
}: Readonly<{
  id?: string;
  className?: string;
  children: React.ReactNode;
}>) {
  return (
    <section id={id} className={cn("px-4 py-8 sm:px-6 sm:py-10", className)}>
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  );
}

function PlaceholderPanel({
  title,
  detail,
  tone = "warm",
}: Readonly<{
  title: string;
  detail: string;
  tone?: "warm" | "dark";
}>) {
  return (
    <div
      className={cn(
        "grain relative overflow-hidden rounded-[2rem] border-2 border-brand-ink p-5 shadow-[0_14px_0_0_#100800]",
        tone === "dark"
          ? "bg-brand-ink text-[#fff7ed]"
          : "brand-burst text-brand-ink"
      )}
    >
      <div
        className={cn(
          "relative flex min-h-60 flex-col justify-between rounded-[1.5rem] border-2 border-dashed p-4",
          tone === "dark"
            ? "border-[#fff7ed]/30 bg-[#fff7ed]/8"
            : "border-brand-ink/30 bg-[#fff9ef]/75"
        )}
      >
        <span
          className={cn(
            "w-fit rounded-full px-3 py-1 text-xs font-black uppercase tracking-[0.22em]",
            tone === "dark"
              ? "bg-brand-yellow text-brand-ink"
              : "bg-brand-ink text-[#fff7ed]"
          )}
        >
          Placeholder visual
        </span>
        <div className="space-y-2">
          <p className="font-display text-4xl uppercase leading-none">{title}</p>
          <p
            className={cn(
              "max-w-sm text-sm leading-6",
              tone === "dark" ? "text-[#fff7ed]/78" : "text-brand-ink/74"
            )}
          >
            {detail}
          </p>
        </div>
      </div>
    </div>
  );
}

function CrateCard({
  name,
  price,
  badge,
  feeds,
  wings,
  fries,
  dips,
  addons,
  vibe,
}: (typeof crateOptions)[number]) {
  return (
    <article className="relative rounded-[1.8rem] border-2 border-brand-ink bg-[#fff9ef] p-5 shadow-[0_12px_0_0_#100800]">
      {badge ? (
        <span className="absolute right-4 top-4 rounded-full border-2 border-brand-ink bg-brand-red px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-[#fff7ed]">
          {badge}
        </span>
      ) : null}
      <p className="text-sm font-black uppercase tracking-[0.2em] text-brand-red">
        {feeds}
      </p>
      <div className="mt-2 flex items-start justify-between gap-3">
        <h2 className="font-display text-4xl uppercase leading-none text-brand-ink">
          {name}
        </h2>
        <span className="shrink-0 rounded-full border-2 border-brand-ink bg-brand-yellow px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-brand-ink">
          {price}
        </span>
      </div>
      <p className="mt-3 text-sm leading-6 text-brand-ink/76">{vibe}</p>

      <div className="mt-5 space-y-3 rounded-[1.3rem] border-2 border-brand-ink bg-brand-yellow p-4 text-sm font-black uppercase tracking-[0.14em] text-brand-ink">
        <div className="flex items-center justify-between gap-4">
          <span>Wings</span>
          <span>{wings}</span>
        </div>
        <div className="flex items-center justify-between gap-4">
          <span>Fries</span>
          <span>{fries}</span>
        </div>
        <div className="flex items-center justify-between gap-4">
          <span>Dips</span>
          <span>{dips}</span>
        </div>
      </div>

      <div className="mt-5 rounded-[1.3rem] bg-brand-ink p-4 text-[#fff7ed]">
        <p className="text-xs font-black uppercase tracking-[0.24em] text-brand-yellow">
          Optional add-ons
        </p>
        <p className="mt-2 text-sm leading-6 text-[#fff7ed]/82">{addons}</p>
      </div>
    </article>
  );
}

function PillList({
  items,
  theme = "light",
}: Readonly<{
  items: string[];
  theme?: "light" | "dark";
}>) {
  return (
    <div className="mt-5 flex flex-wrap gap-3">
      {items.map((item) => (
        <span
          key={item}
          className={cn(
            "rounded-full border-2 px-4 py-3 text-sm font-black uppercase tracking-[0.16em] sm:text-base",
            theme === "dark"
              ? "border-[#fff7ed] bg-brand-ink text-[#fff7ed]"
              : "border-brand-ink bg-brand-yellow text-brand-ink"
          )}
        >
          {item}
        </span>
      ))}
    </div>
  );
}

export function CratesPage() {
  return (
    <main className="bg-background pb-28 text-foreground md:pb-12">
      <PageSection className="pt-4 sm:pt-6">
        <div className="brand-grid rounded-[2rem] border-2 border-brand-ink bg-surface px-4 py-4 shadow-[0_12px_0_0_#100800] sm:px-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="font-display text-3xl uppercase leading-none text-brand-ink sm:text-4xl">
                CHKN Crates
              </p>
              <p className="mt-1 text-sm font-semibold uppercase tracking-[0.2em] text-brand-red">
                Big box energy for hungry groups
              </p>
            </div>
            <Link
              href="/"
              className="rounded-full border-2 border-brand-ink bg-[#fff7ed] px-4 py-2 text-sm font-black uppercase tracking-[0.2em] text-brand-ink"
            >
              Home
            </Link>
          </div>
        </div>
      </PageSection>

      <PageSection>
        <div className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr] lg:items-stretch">
          <div className="rounded-[2.5rem] border-2 border-brand-ink bg-brand-ink px-5 py-6 text-[#fff7ed] shadow-[0_16px_0_0_#ef3d23] sm:px-7 sm:py-8">
            <p className="w-fit rounded-full bg-brand-yellow px-3 py-1 text-xs font-black uppercase tracking-[0.24em] text-brand-ink">
              Crates only
            </p>
            <SectionIntro
              eyebrow="Large orders"
              title="Feed the Crew."
              body="Wings, fries, dips, and everything you need — built for groups. Big boxes, fast decisions, no weak portions."
              theme="dark"
              level="h1"
            />
            <div className="mt-7 space-y-3">
              <p className="text-xs font-black uppercase tracking-[0.24em] text-brand-yellow">
                Order now
              </p>
              <div className="grid gap-3 sm:max-w-md sm:grid-cols-2">
                <OrderButton href="https://www.ubereats.com" label="Uber Eats" />
                <OrderButton
                  href="https://www.doordash.com"
                  label="DoorDash"
                  variant="secondary"
                />
              </div>
            </div>
            <a
              href="#crate-options"
              className="mt-4 inline-flex min-h-12 items-center justify-center rounded-full border-2 border-[#fff7ed] px-5 text-sm font-black uppercase tracking-[0.2em] text-[#fff7ed] transition-transform duration-150 hover:-translate-y-0.5"
            >
              Plan a Large Order
            </a>
            <div className="mt-7 grid gap-3 text-sm font-semibold text-[#fff7ed]/82 sm:grid-cols-3">
              <p>Office lunch sorted.</p>
              <p>Game day under control.</p>
              <p>Party table no longer embarrassing.</p>
            </div>
          </div>

          <PlaceholderPanel
            title="Crate hero shot"
            detail="Use stacked CHKN Crates, open wing trays, fries spill, branded dips, and one absurd ranch moment."
          />
        </div>
      </PageSection>

      <PageSection className="pt-0">
        <div className="mx-auto max-w-3xl rounded-[1.8rem] border-2 border-brand-ink/15 bg-[#fff9ef] px-5 py-6 text-center shadow-[0_6px_0_0_rgba(16,8,0,0.08)]">
          <p className="text-lg font-black text-brand-ink sm:text-xl">
            The move when the group chat gets real.
          </p>
          <p className="mt-2 text-sm leading-6 text-brand-ink/68 sm:text-base">
            Used for game days, office lunches, and last-minute saves.
          </p>
        </div>
      </PageSection>

      <PageSection id="crate-options">
        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <SectionIntro
              eyebrow="Crate options"
              title="Pick your level of hunger denial."
              body="Every crate is built to move fast, split cleanly, and keep the group from falling apart at the first empty tray."
            />
            <p className="mt-4 text-sm leading-6 text-brand-ink/76">
              Choose the size, lock in flavours, add whatever extra damage feels
              responsible, then send it.
            </p>
          </div>
          <div className="grid gap-4 xl:grid-cols-2">
            {crateOptions.map((crate) => (
              <CrateCard key={crate.name} {...crate} />
            ))}
          </div>
        </div>
      </PageSection>

      <PageSection id="inside">
        <div className="rounded-[2.3rem] border-2 border-brand-ink bg-[#fff8ea] p-5 shadow-[0_14px_0_0_#100800] sm:p-7">
          <SectionIntro
            eyebrow="What’s inside"
            title="The parts that actually matter."
            body="Crates are not mystery boxes. You get flavour options, dip range, proper sides, and add-ons that keep the order from feeling thin."
          />
          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            <article className="rounded-[1.6rem] border-2 border-brand-ink bg-[#fff9ef] p-5">
              <p className="font-display text-3xl uppercase leading-none text-brand-ink">
                Wing flavours
              </p>
              <PillList items={flavourOptions} />
            </article>
            <article className="rounded-[1.6rem] border-2 border-brand-ink bg-brand-red p-5 text-[#fff7ed]">
              <p className="font-display text-3xl uppercase leading-none">Dip options</p>
              <PillList items={dipOptions} theme="dark" />
            </article>
            <article className="rounded-[1.6rem] border-2 border-brand-ink bg-brand-yellow p-5 text-brand-ink">
              <p className="font-display text-3xl uppercase leading-none">Sides</p>
              <PillList items={sideOptions} />
            </article>
            <article className="rounded-[1.6rem] border-2 border-brand-ink bg-brand-ink p-5 text-[#fff7ed]">
              <p className="font-display text-3xl uppercase leading-none">Add-ons</p>
              <PillList items={addonOptions} theme="dark" />
            </article>
          </div>
        </div>
      </PageSection>

      <PageSection id="occasions">
        <div className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <SectionIntro
            eyebrow="Occasions"
            title="Built for groups, not polite little snacks."
            body="Use a crate when the headcount jumps, the appetite gets loud, or nobody has time for individual-cart nonsense."
          />
          <div className="grid gap-4 sm:grid-cols-2">
            {occasions.map((occasion) => (
              <article
                key={occasion.name}
                className="rounded-[1.7rem] border-2 border-brand-ink bg-[#fff9ef] p-5 shadow-[0_10px_0_0_#100800]"
              >
                <p className="font-display text-3xl uppercase leading-none text-brand-ink">
                  {occasion.name}
                </p>
                <p className="mt-3 text-sm leading-6 text-brand-ink/78">
                  {occasion.detail}
                </p>
              </article>
            ))}
          </div>
        </div>
      </PageSection>

      <PageSection id="bucket">
        <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <PlaceholderPanel
            title="The Bucket"
            detail="Use a totally unreasonable ranch vessel. Ten gallons. Stainless steel if possible. Nobody should mistake this for subtle."
            tone="dark"
          />
          <div className="rounded-[2.3rem] border-2 border-brand-ink bg-brand-yellow p-5 shadow-[0_14px_0_0_#100800] sm:p-7">
            <SectionIntro
              eyebrow="10 Gallon Ranch"
              title="The Bucket is not a joke. It is a warning."
              body="Ten gallons of ranch for the people who look at a normal dip cup and feel personally insulted. Add it to the biggest orders when restraint has already left the building."
            />
            <p className="mt-5 text-lg font-semibold leading-8 text-brand-ink/80">
              It is excessive. It is ridiculous. It is also exactly the kind of move
              that gets remembered after the wings are gone.
            </p>
          </div>
        </div>
      </PageSection>

      <PageSection id="how-it-works">
        <div className="rounded-[2.3rem] border-2 border-brand-ink bg-brand-ink p-5 text-[#fff7ed] shadow-[0_14px_0_0_#ffd54a] sm:p-7">
          <SectionIntro
            eyebrow="How it works"
            title="Easy enough to do hungry."
            body="No spreadsheets. No awkward forms. Just choose the box, split the flavours, hit the app, and let the food do the heavy lifting."
            theme="dark"
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {howItWorks.map((step, index) => (
              <article
                key={step}
                className="rounded-[1.6rem] border-2 border-[#fff7ed] bg-[#fff7ed]/8 p-5"
              >
                <p className="text-sm font-black uppercase tracking-[0.24em] text-brand-yellow">
                  Step {index + 1}
                </p>
                <p className="mt-3 font-display text-3xl uppercase leading-none">
                  {step}
                </p>
              </article>
            ))}
          </div>
        </div>
      </PageSection>

      <PageSection>
        <div className="rounded-[2.4rem] border-2 border-brand-ink bg-brand-red px-5 py-7 text-[#fff7ed] shadow-[0_16px_0_0_#100800] sm:px-7">
          <div className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
            <SectionIntro
              eyebrow="Final move"
              title="Feeding 8+? Don’t wing it."
              body="Crates are built for speed. Skip the chaos."
              theme="dark"
            />
            <div className="grid gap-3 sm:grid-cols-2">
              <OrderButton href="https://www.ubereats.com" label="Uber Eats" />
              <OrderButton
                href="https://www.doordash.com"
                label="DoorDash"
                variant="secondary"
              />
            </div>
          </div>
        </div>
      </PageSection>

      <div className="fixed inset-x-0 bottom-0 z-50 border-t-2 border-brand-ink bg-brand-ink p-3 text-[#fff7ed] shadow-[0_-10px_24px_rgba(16,8,0,0.38)] md:hidden">
        <div className="mx-auto max-w-6xl rounded-[1.4rem] border-2 border-brand-yellow bg-brand-ink/95 p-3">
          <p className="mb-3 text-center text-sm font-black uppercase tracking-[0.18em] text-brand-yellow">
            Ordering for a group? Start here.
          </p>
          <div className="grid grid-cols-2 gap-2">
            <OrderButton
              href="https://www.ubereats.com"
              label="Uber Eats"
              compact
            />
            <OrderButton
              href="https://www.doordash.com"
              label="DoorDash"
              variant="secondary"
              compact
            />
          </div>
        </div>
      </div>
    </main>
  );
}
