import Link from "next/link";
import { CRATE_TAGLINES } from "@/components/home/taglines";

function cn(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

type ActionButtonProps = {
  href: string;
  label: string;
  variant?: "primary" | "secondary" | "ghost";
  external?: boolean;
};

function ActionButton({
  href,
  label,
  variant = "primary",
  external = false,
}: ActionButtonProps) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={cn(
        "inline-flex min-h-14 items-center justify-center rounded-full border-2 border-brand-ink px-5 text-center text-base font-black uppercase tracking-[0.2em] transition-transform duration-150 hover:-translate-y-0.5",
        variant === "primary" && "bg-brand-red text-[#fff7ed] shadow-[0_8px_0_0_#100800]",
        variant === "secondary" && "bg-brand-yellow text-brand-ink shadow-[0_8px_0_0_#100800]",
        variant === "ghost" && "bg-[#fff7ed] text-brand-ink shadow-[0_8px_0_0_#100800]"
      )}
    >
      {label}
    </a>
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

const crates = [
  {
    name: "CHKN Crate 50pc",
    price: "$75",
    tier: "Small chaos",
    subtitle: undefined as string | undefined,
  },
  {
    name: "CHKN Crate 100pc",
    price: "$135",
    tier: "Medium mayhem",
    subtitle: undefined as string | undefined,
  },
  {
    name: "CHKN Crate 200pc",
    price: "$245",
    tier: "Full send",
    subtitle: "24-hour notice required.",
  },
];

const trays = [
  {
    name: "Mac and Cheese Tray",
    price: "$32",
    copy: "The one that ends the argument about sides. Cheddar, parm, breadcrumb top, feeds 4-6.",
  },
  {
    name: "Perogie Tray",
    price: "$30",
    copy: "Full pierogie commitment. Butter-pan-finished, sour cream + chili crisp on standby, feeds 4-6.",
  },
];

const steps = [
  "Order online — Uber Eats or DoorDash.",
  "Same-day pickup or delivery for 50pc + 100pc. 200pc needs 24 hours.",
  "Custom orders? Email orders@wingschknshack.com.",
];

export function GroupOrdersPage() {
  return (
    <main className="bg-background pb-28 text-foreground md:pb-12">
      <PageSection className="pt-4 sm:pt-6">
        <div className="brand-grid rounded-[2rem] border-2 border-brand-ink bg-surface px-4 py-4 shadow-[0_12px_0_0_#100800] sm:px-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="font-display text-3xl uppercase leading-none text-brand-ink sm:text-4xl">
                Group Orders
              </p>
              <p className="mt-1 text-sm font-semibold uppercase tracking-[0.2em] text-brand-red">
                Wings catering for downtown Vancouver
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
        <div className="rounded-[2.5rem] border-2 border-brand-ink bg-brand-ink px-5 py-7 text-[#fff7ed] shadow-[0_16px_0_0_#ef3d23] sm:px-8 sm:py-9">
          <p className="w-fit rounded-full bg-brand-yellow px-3 py-1 text-xs font-black uppercase tracking-[0.24em] text-brand-ink">
            Offices · Parties · Events
          </p>
          <h1 className="mt-5 max-w-2xl font-display text-6xl uppercase leading-[0.9] text-balance sm:text-7xl">
            Feed the room.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-[#fff7ed]/84">
            Wing crates built for offices, parties, game nights, and anything
            else worth gathering for. Mix up to two flavours. Pick your sides.
            Pick your dips. Show up with the box. Everybody wins.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <ActionButton href="https://www.order.store/store/wings-chkn-shack/P6HcLdBWWTOobb5RB31jJw" label="Order on Uber Eats" external />
            <ActionButton
              href="https://order.online/business/wings-chkn-shack-13029476"
              label="Order on DoorDash"
              variant="secondary"
              external
            />
            <ActionButton
              href="mailto:orders@wingschknshack.com"
              label="Email for custom orders"
              variant="ghost"
            />
          </div>
        </div>
      </PageSection>

      <PageSection id="crates">
        <div className="grid gap-4 lg:grid-cols-3">
          {crates.map((crate) => (
            <article
              key={crate.name}
              className="flex flex-col rounded-[1.8rem] border-2 border-brand-ink bg-[#fff9ef] p-5 shadow-[0_12px_0_0_#100800]"
            >
              <p className="text-sm font-black uppercase tracking-[0.2em] text-brand-red">
                {crate.tier}
              </p>
              <div className="mt-2 flex items-start justify-between gap-3">
                <h2 className="font-display text-3xl uppercase leading-none text-brand-ink">
                  {crate.name}
                </h2>
                <span className="shrink-0 rounded-full border-2 border-brand-ink bg-brand-yellow px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-brand-ink">
                  {crate.price}
                </span>
              </div>
              {CRATE_TAGLINES[crate.name] && (
                <p className="mt-3 text-sm leading-6 text-brand-ink/78">
                  {CRATE_TAGLINES[crate.name]}
                </p>
              )}
              {crate.subtitle && (
                <p className="mt-4 w-fit rounded-full border-2 border-brand-ink bg-brand-red px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-[#fff7ed]">
                  {crate.subtitle}
                </p>
              )}
            </article>
          ))}
        </div>
      </PageSection>

      <PageSection id="trays">
        <div className="rounded-[2.3rem] border-2 border-brand-ink bg-[#fff8ea] p-5 shadow-[0_14px_0_0_#100800] sm:p-7">
          <h2 className="max-w-2xl font-display text-4xl leading-none text-brand-ink sm:text-5xl">
            Add trays to any crate — or order solo.
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {trays.map((tray) => (
              <article
                key={tray.name}
                className="rounded-[1.6rem] border-2 border-brand-ink bg-[#fff9ef] p-5"
              >
                <div className="flex items-start justify-between gap-3">
                  <p className="font-display text-3xl uppercase leading-none text-brand-ink">
                    {tray.name}
                  </p>
                  <span className="shrink-0 rounded-full border-2 border-brand-ink bg-brand-yellow px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-brand-ink">
                    {tray.price}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-6 text-brand-ink/78">{tray.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </PageSection>

      <PageSection id="how-it-works">
        <div className="rounded-[2.3rem] border-2 border-brand-ink bg-brand-ink p-5 text-[#fff7ed] shadow-[0_14px_0_0_#ffd54a] sm:p-7">
          <h2 className="max-w-2xl font-display text-4xl leading-none text-[#fff7ed] sm:text-5xl">
            How it works.
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {steps.map((step, index) => (
              <article
                key={step}
                className="rounded-[1.6rem] border-2 border-[#fff7ed] bg-[#fff7ed]/8 p-5"
              >
                <p className="text-sm font-black uppercase tracking-[0.24em] text-brand-yellow">
                  Step {index + 1}
                </p>
                <p className="mt-3 text-base leading-7 text-[#fff7ed]/88">{step}</p>
              </article>
            ))}
          </div>
        </div>
      </PageSection>

      <PageSection>
        <div className="rounded-[2.4rem] border-2 border-brand-ink bg-brand-red px-5 py-7 text-[#fff7ed] shadow-[0_16px_0_0_#100800] sm:px-7">
          <div className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
            <div className="max-w-xl space-y-3">
              <p className="text-sm font-black uppercase tracking-[0.28em] text-brand-yellow">
                Ready when you are
              </p>
              <h2 className="font-display text-5xl leading-[0.92] text-[#fff7ed] sm:text-6xl">
                Big order. Zero panic.
              </h2>
            </div>
            <div className="flex flex-wrap gap-3">
              <ActionButton href="https://www.order.store/store/wings-chkn-shack/P6HcLdBWWTOobb5RB31jJw" label="Uber Eats" external />
              <ActionButton
                href="https://order.online/business/wings-chkn-shack-13029476"
                label="DoorDash"
                variant="secondary"
                external
              />
              <ActionButton
                href="mailto:orders@wingschknshack.com"
                label="Email us"
                variant="ghost"
              />
            </div>
          </div>
        </div>
      </PageSection>
    </main>
  );
}
