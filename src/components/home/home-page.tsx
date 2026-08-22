import Image from "next/image";
import Link from "next/link";
import PartyBuilder from "@/components/party-builder";
import { locations, menuCategories } from "@/components/home/data";
import { HeroOrderActions } from "@/components/home/hero-order-actions";
import { MenuAccordion } from "@/components/home/menu-accordion";
import {
  SIGNATURE_FLAVOURS,
  flavourTaglineFor,
} from "@/components/home/taglines";
import { crateOptions } from "@/components/crates/data";
import { WING_FLAVOURS } from "@/lib/menu-constants";

type SectionIntroProps = {
  eyebrow: string;
  title: string;
  body: string;
  theme?: "light" | "dark";
};

type LinkButtonProps = {
  href: string;
  label: string;
  variant?: "light" | "dark";
};

type PlaceholderVisualProps = {
  label: string;
  detail: string;
  className?: string;
};

function cn(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

function LinkButton({
  href,
  label,
  variant = "light",
}: LinkButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex min-h-12 items-center justify-center rounded-full border-2 px-5 text-center text-sm font-black uppercase tracking-[0.2em] transition-transform duration-150 hover:-translate-y-0.5",
        variant === "dark"
          ? "border-[#fff7ed] bg-transparent text-[#fff7ed]"
          : "border-brand-ink bg-[#fff7ed] text-brand-ink shadow-[0_8px_0_0_#100800]"
      )}
    >
      {label}
    </Link>
  );
}

function SectionIntro({
  eyebrow,
  title,
  body,
  theme = "light",
}: SectionIntroProps) {
  return (
    <div className="max-w-xl space-y-3">
      <p
        className={cn(
          "text-sm font-black uppercase tracking-[0.28em]",
          theme === "dark" ? "text-brand-yellow" : "text-brand-red"
        )}
      >
        {eyebrow}
      </p>
      <h2
        className={cn(
          "font-display text-4xl leading-none sm:text-5xl",
          theme === "dark" ? "text-[#fff7ed]" : "text-brand-ink"
        )}
      >
        {title}
      </h2>
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

function PlaceholderVisual({
  label,
  detail,
  className,
}: PlaceholderVisualProps) {
  return (
    <div
      className={cn(
        "grain brand-burst relative overflow-hidden rounded-[2rem] border-2 border-brand-ink p-5 text-brand-ink shadow-[0_14px_0_0_#100800]",
        className
      )}
    >
      <div className="relative flex h-full min-h-48 flex-col justify-between rounded-[1.5rem] border-2 border-dashed border-brand-ink/35 bg-[#fff9ef]/75 p-4">
        <span className="w-fit rounded-full bg-brand-ink px-3 py-1 text-xs font-black uppercase tracking-[0.22em] text-[#fff7ed]">
          Placeholder image
        </span>
        <div className="space-y-2">
          <p className="font-display text-3xl uppercase leading-none">{label}</p>
          <p className="max-w-xs text-sm leading-6 text-brand-ink/75">{detail}</p>
        </div>
      </div>
    </div>
  );
}

function HomeSection({
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

// TODO: temporarily hidden — 10-gal ranch bucket. Restore by flipping BUCKET_HIDDEN to false.
const BUCKET_HIDDEN = true;

export function HomePage() {
  return (
    <main className="bg-background pb-28 text-foreground md:pb-12">
      <HomeSection className="pt-4 sm:pt-6">
        <div className="brand-grid rounded-[2rem] border-2 border-brand-ink bg-surface px-4 py-4 shadow-[0_12px_0_0_#100800] sm:px-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3 sm:gap-4">
              <Image
                src="/chkn-icon.png"
                alt=""
                width={40}
                height={40}
                className="mt-0.5 h-10 w-auto shrink-0 sm:h-11"
              />
              <div>
                <p className="font-display text-3xl uppercase leading-none text-brand-ink sm:text-4xl">
                  CHKN Shack
                </p>
                <p className="mt-1 text-sm font-semibold uppercase tracking-[0.2em] text-brand-red">
                  Wings for the wildly hungry
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-3 sm:items-end">
              <nav
                aria-label="Main navigation"
                className="flex flex-wrap gap-2 text-sm font-black uppercase tracking-[0.18em] text-brand-ink"
              >
                <a
                  href="#menu"
                  className="rounded-full border-2 border-brand-ink bg-[#fff7ed] px-3 py-2"
                >
                  Menu
                </a>
                <a
                  href="#flavours"
                  className="rounded-full border-2 border-brand-ink bg-[#fff7ed] px-3 py-2"
                >
                  Flavours
                </a>
                <Link
                  href="/crates"
                  className="rounded-full border-2 border-brand-ink bg-brand-yellow px-3 py-2"
                >
                  Crates
                </Link>
                <Link
                  href="/franchising"
                  className="rounded-full border-2 border-brand-ink bg-[#fff7ed] px-3 py-2"
                >
                  Franchising
                </Link>
                <a
                  href="#locations"
                  className="rounded-full border-2 border-brand-ink bg-[#fff7ed] px-3 py-2"
                >
                  Locations
                </a>
              </nav>
            </div>
          </div>
        </div>
      </HomeSection>

      <HomeSection>
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="rounded-[2.4rem] border-2 border-brand-ink bg-brand-ink px-5 py-6 text-[#fff7ed] shadow-[0_16px_0_0_#ef3d23] sm:px-7 sm:py-8">
            <p className="w-fit rounded-full bg-brand-yellow px-3 py-1 text-xs font-black uppercase tracking-[0.24em] text-brand-ink">
              Delivery-first. Sauce-forward.
            </p>
            <h1 className="mt-5 max-w-xl font-display text-6xl uppercase leading-[0.9] text-balance sm:text-7xl">
              Big wing energy. Zero dining room small talk.
            </h1>
            <p className="mt-5 max-w-lg text-lg leading-8 text-[#fff7ed]/82">
              Loaded wings. Crisp fries. Cold dips.
              <br />
              Enough dip to cause problems.
            </p>
            <HeroOrderActions />
          </div>

          <Image src="/menu/hero.webp" alt="Wings platter" width={1600} height={1067} priority className="w-full h-auto rounded-[2rem] border-2 border-brand-ink shadow-[0_14px_0_0_#100800]" />
        </div>
      </HomeSection>

      <HomeSection id="menu">
        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <SectionIntro
              eyebrow="Quick menu"
              title="Built for hungry people with no patience."
              body="Short menu. Big payoff. Every item earns its space and plays nicely with extra sauce."
            />
            <div className="mt-4">
              <PartyBuilder
                showHero={false}
                triggerLabel="Plan My Party"
                triggerClassName="inline-flex min-h-12 items-center justify-center rounded-full border-2 border-brand-ink bg-[#fff7ed] px-5 text-center text-sm font-black uppercase tracking-[0.2em] text-brand-ink shadow-[0_8px_0_0_#100800] transition-transform duration-150 hover:-translate-y-0.5"
              />
            </div>
          </div>
          <MenuAccordion categories={menuCategories} />
        </div>
      </HomeSection>

      <HomeSection id="flavours">
        <div className="mb-6 rounded-[2.2rem] border-2 border-brand-ink bg-brand-red p-5 text-[#fff7ed] shadow-[0_14px_0_0_#100800] sm:p-7">
          <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-center">
            <SectionIntro
              eyebrow="CHKN Crates"
              title="Feeding 6+? This is the move."
              body="Built to land fast. Built to disappear faster."
              theme="dark"
            />
            <div className="lg:min-w-44">
              <LinkButton href="/crates" label="View Crates" />
            </div>
          </div>
        </div>

        <div className="rounded-[2.2rem] border-2 border-brand-ink bg-[#fff8ea] p-5 shadow-[0_14px_0_0_#100800] sm:p-7">
          <SectionIntro
            eyebrow="Flavours"
            title="Every wing flavour, no mystery scroll required."
            body="Pick your lane: sticky, peppery, sweet, fiery, or a choice you immediately need ranch to justify."
          />
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {WING_FLAVOURS.map((flavour) => {
              const tagline = flavourTaglineFor(flavour);
              return (
                <div
                  key={flavour}
                  className="rounded-[1.2rem] border-2 border-brand-ink bg-brand-yellow px-4 py-3 text-brand-ink"
                >
                  <p className="text-sm font-black uppercase tracking-[0.16em] sm:text-base">
                    {flavour}
                    {SIGNATURE_FLAVOURS.has(flavour) && (
                      <span aria-label="Signature flavour" title="Signature flavour">
                        {" \u2605"}
                      </span>
                    )}
                  </p>
                  {tagline && (
                    <p className="mt-1 text-xs font-normal leading-5 text-brand-ink/70">
                      {tagline}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </HomeSection>

      <HomeSection id="dips">
        <div className="space-y-6">
          <div className="max-w-2xl space-y-3">
            <p className="text-sm font-black uppercase tracking-[0.28em] text-brand-red">
              THE DIPS
            </p>
            <h2 className="font-display text-4xl leading-none text-brand-ink sm:text-5xl">
              Not just sides. The whole system.
            </h2>
            <p className="text-base leading-7 text-brand-ink/78 sm:text-lg">
              10 dips. Almost nobody orders just one. Not a coincidence.
            </p>
          </div>
        </div>
      </HomeSection>

      <HomeSection id="crates">
        <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div className="rounded-[2.2rem] border-2 border-brand-ink bg-brand-red p-5 text-[#fff7ed] shadow-[0_14px_0_0_#100800] sm:p-7">
            <SectionIntro
              eyebrow="CHKN Crates"
              title="Group orders that actually survive group hunger."
              body="Our CHKN Crates are built for office lunches, watch parties, birthdays, and that one friend who says they only want a few."
              theme="dark"
            />
            <div className="mt-5 sm:max-w-[14rem]">
              <LinkButton href="/crates" label="View Crates" />
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {crateOptions.map((crate) => (
                <div
                  key={crate.name}
                  className="rounded-[1.4rem] border-2 border-[#fff7ed] bg-brand-ink/18 p-4"
                >
                  {crate.ribbon && (
                    <p className="mb-2 w-fit rounded-full bg-brand-yellow px-2 py-0.5 text-[10px] font-black uppercase tracking-[0.14em] text-brand-ink">
                      {crate.ribbon}
                    </p>
                  )}
                  <p className="font-display text-2xl uppercase">{crate.badge}</p>
                  <p className="mt-1 text-sm font-black uppercase tracking-[0.16em] text-brand-yellow break-words">
                    {crate.name} · {crate.price}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[#fff7ed]/82">
                    {crate.wings} · {crate.feeds}
                  </p>
                  <p className="mt-1 text-xs font-black uppercase tracking-[0.16em] text-[#fff7ed]/70">
                    {crate.notice}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <Image src="/menu/crate-stack.webp" alt="CHKN Crate of wings with ranch dips" width={1600} height={1067} className="w-full h-auto rounded-[2rem] border-2 border-brand-ink shadow-[0_14px_0_0_#100800]" />
        </div>
      </HomeSection>

      {!BUCKET_HIDDEN && (
        <HomeSection id="bucket">
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <Image src="/the-bucket.webp" alt="Ranch bucket" width={1133} height={1418} className="w-full h-auto rounded-[2rem] border-2 border-brand-ink shadow-[0_14px_0_0_#100800]" />
            <div className="rounded-[2.2rem] border-2 border-brand-ink bg-brand-yellow p-5 shadow-[0_14px_0_0_#100800] sm:p-7">
              <SectionIntro
                eyebrow="The Bucket"
                title="Yes, that is a 10 gallon ranch bucket."
                body="Some brands talk about signature items. We hand you a ranch landmark. The Bucket is excessive, hilarious, and weirdly practical when the whole crew wants sauce like they mean it."
              />
              <p className="mt-5 text-lg font-semibold leading-8 text-brand-ink/80">
                Perfect for parties, tournaments, office takeovers, or anyone who
                thinks a normal ramekin is an insult.
              </p>
            </div>
          </div>
        </HomeSection>
      )}

      <HomeSection id="locations">
        <div className="grid gap-6 lg:grid-cols-[0.78fr_1.22fr]">
          <SectionIntro
            eyebrow="Locations"
            title="A few neighborhoods down. More on the way."
            body="We’re rolling out delivery zones city by city. Tap in, check your app, and see if your couch qualifies."
          />
          <div className="grid gap-4 sm:grid-cols-3">
            {locations.map((location) => {
              const isComingSoon = location.status === "coming-soon";
              return (
                <article
                  key={location.city}
                  className={`rounded-[1.7rem] border-2 border-brand-ink bg-brand-ink p-5 text-[#fff7ed] shadow-[0_10px_0_0_#ef3d23]${
                    isComingSoon ? " opacity-65" : ""
                  }`}
                >
                  <p className="font-display text-3xl uppercase leading-none">
                    {location.city}
                  </p>
                  {isComingSoon ? (
                    <span className="mt-3 inline-block rounded-full bg-brand-yellow px-3 py-1 text-[11px] font-black uppercase tracking-[0.18em] text-brand-ink">
                      Coming Soon
                    </span>
                  ) : (
                    <span className="mt-3 inline-block rounded-full bg-brand-red px-3 py-1 text-[11px] font-black uppercase tracking-[0.18em] text-[#fff7ed]">
                      Live
                    </span>
                  )}
                  <p className="mt-3 text-sm font-black uppercase tracking-[0.18em] text-brand-yellow">
                    {location.area}
                  </p>
                  {location.availability ? (
                    <p className="mt-4 text-sm leading-6 text-[#fff7ed]/82">
                      {location.availability}
                    </p>
                  ) : null}
                </article>
              );
            })}
          </div>
        </div>
        <div className="mt-6 rounded-[1.7rem] border-2 border-dashed border-brand-ink/35 bg-[#fff9ef]/70 p-6 text-center">
          <p className="font-display text-2xl uppercase leading-none text-brand-ink">
            More locations coming.
          </p>
          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-brand-ink/70">
            We’re rolling into more neighbourhoods across Metro Vancouver. Get on
            the list at{" "}
            <a
              href="mailto:damon@wingschknshack.com"
              className="font-black text-brand-red underline"
            >
              damon@wingschknshack.com
            </a>
            .
          </p>
        </div>
      </HomeSection>

      <HomeSection id="franchise">
        <div className="rounded-[2.4rem] border-2 border-brand-ink bg-brand-ink px-5 py-7 text-[#fff7ed] shadow-[0_16px_0_0_#ffd54a] sm:px-7">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <SectionIntro
              eyebrow="Franchising"
              title="Franchise With CHKN Shack"
              body="Built for operators. Start lean, then grow into real locations."
              theme="dark"
            />
            <div className="rounded-[1.8rem] border-2 border-[#fff7ed] bg-[#fff7ed]/8 p-5">
              <p className="text-base leading-7 text-[#fff7ed]/84">
                The full franchise story lives on its own page now, with the model,
                support structure, and inquiry form in one place.
              </p>
              <Link
                href="/franchising"
                className="mt-5 inline-flex rounded-full border-2 border-brand-yellow bg-brand-yellow px-5 py-3 text-sm font-black uppercase tracking-[0.2em] text-brand-ink shadow-[0_8px_0_0_#fff7ed]"
              >
                Explore Franchising
              </Link>
            </div>
          </div>
        </div>
      </HomeSection>

      <div className="fixed inset-x-0 bottom-0 z-50 border-t-2 border-brand-ink bg-brand-ink p-3 text-[#fff7ed] shadow-[0_-6px_0_0_#ef3d23] md:hidden">
        <div className="mx-auto flex max-w-6xl items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-brand-yellow">
              Order now
            </p>
            <p className="truncate text-sm text-[#fff7ed]/82">
              Wings, fries, dips, and crate-level decisions.
            </p>
          </div>
          <div className="grid shrink-0 grid-cols-2 gap-2">
            <a
              href="https://www.order.store/store/wings-chkn-shack/P6HcLdBWWTOobb5RB31jJw"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center rounded-full border-2 border-brand-ink bg-brand-yellow px-5 text-center text-sm font-black uppercase tracking-[0.2em] text-brand-ink shadow-[0_10px_0_0_#100800] transition-transform duration-150 hover:-translate-y-0.5"
            >
              Uber Eats
            </a>
            <a
              href="https://order.online/business/wings-chkn-shack-13029476"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center rounded-full border-2 border-brand-ink bg-[#fff7ed] px-5 text-center text-sm font-black uppercase tracking-[0.2em] text-brand-ink shadow-[0_8px_0_0_#100800] transition-transform duration-150 hover:-translate-y-0.5"
            >
              DoorDash
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
