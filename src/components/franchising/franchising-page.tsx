import Link from "next/link";
import {
  credibilityStatements,
  franchiseSteps,
  franchiseSupport,
  idealPartnerPoints,
  investmentRanges,
  whyChknShack,
} from "@/components/franchising/data";

type SectionIntroProps = {
  eyebrow: string;
  title: string;
  body: string;
  theme?: "light" | "dark";
  level?: "h1" | "h2";
};

function cn(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
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

function ActionButton({
  href,
  label,
  variant = "primary",
}: Readonly<{
  href: string;
  label: string;
  variant?: "primary" | "secondary";
}>) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex min-h-14 items-center justify-center rounded-full border-2 px-5 text-center font-black uppercase tracking-[0.2em] transition-transform duration-150 hover:-translate-y-0.5",
        variant === "primary"
          ? "border-brand-ink bg-brand-yellow text-brand-ink shadow-[0_10px_0_0_#100800]"
          : "border-[#fff7ed] bg-transparent text-[#fff7ed]"
      )}
    >
      {label}
    </Link>
  );
}

function PlaceholderPanel({
  title,
  detail,
}: Readonly<{
  title: string;
  detail: string;
}>) {
  return (
    <div className="grain brand-burst relative overflow-hidden rounded-[2rem] border-2 border-brand-ink p-5 text-brand-ink shadow-[0_14px_0_0_#100800]">
      <div className="relative flex min-h-64 flex-col justify-between rounded-[1.5rem] border-2 border-dashed border-brand-ink/30 bg-[#fff9ef]/75 p-4">
        <span className="w-fit rounded-full bg-brand-ink px-3 py-1 text-xs font-black uppercase tracking-[0.22em] text-[#fff7ed]">
          Placeholder visual
        </span>
        <div className="space-y-2">
          <p className="font-display text-4xl uppercase leading-none">{title}</p>
          <p className="max-w-sm text-sm leading-6 text-brand-ink/74">{detail}</p>
        </div>
      </div>
    </div>
  );
}

function InfoCard({
  title,
  detail,
  accent = "light",
}: Readonly<{
  title: string;
  detail: string;
  accent?: "light" | "dark";
}>) {
  return (
    <article
      className={cn(
        "rounded-[1.7rem] border-2 p-5 shadow-[0_10px_0_0_#100800]",
        accent === "dark"
          ? "border-brand-ink bg-brand-ink text-[#fff7ed]"
          : "border-brand-ink bg-[#fff9ef] text-brand-ink"
      )}
    >
      <p className="font-display text-3xl uppercase leading-none">{title}</p>
      <p
        className={cn(
          "mt-3 text-sm leading-6",
          accent === "dark" ? "text-[#fff7ed]/82" : "text-brand-ink/78"
        )}
      >
        {detail}
      </p>
    </article>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
}: Readonly<{
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
}>) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-black uppercase tracking-[0.18em] text-brand-ink">
        {label}
      </span>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className="min-h-14 w-full rounded-[1.2rem] border-2 border-brand-ink bg-[#fffdf7] px-4 text-base text-brand-ink outline-none placeholder:text-brand-ink/45"
      />
    </label>
  );
}

export function FranchisingPage() {
  return (
    <main className="bg-background pb-14 text-foreground">
      <PageSection className="pt-4 sm:pt-6">
        <div className="brand-grid rounded-[2rem] border-2 border-brand-ink bg-surface px-4 py-4 shadow-[0_12px_0_0_#100800] sm:px-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="font-display text-3xl uppercase leading-none text-brand-ink sm:text-4xl">
                Franchising
              </p>
              <p className="mt-1 text-sm font-semibold uppercase tracking-[0.2em] text-brand-red">
                Scale the shack
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
            <SectionIntro
              eyebrow="Franchise with CHKN Shack"
              title="Franchise With CHKN Shack"
              body="A delivery-first chicken brand built for operators who want scalable revenue — not complexity."
              theme="dark"
              level="h1"
            />
            <div className="mt-7 sm:max-w-[16rem]">
              <ActionButton href="#inquiry-form" label="Start the Conversation" />
            </div>
          </div>

          <PlaceholderPanel
            title="Brand system"
            detail="Use a modern operator-facing visual: bold packaging, tight menu boards, digital order flow, and clean build-out details."
          />
        </div>
      </PageSection>

      <PageSection className="pt-0">
        <div className="mx-auto flex max-w-6xl flex-wrap gap-3">
          {credibilityStatements.map((statement) => (
            <span
              key={statement}
              className="rounded-full border-2 border-brand-ink bg-[#fff9ef] px-4 py-2 text-sm font-semibold text-brand-ink shadow-[0_6px_0_0_rgba(16,8,0,0.08)]"
            >
              {statement}
            </span>
          ))}
        </div>
      </PageSection>

      <PageSection id="intro">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <SectionIntro
            eyebrow="For prospective franchisees"
            title="Built for operators who want a concept that can move."
            body="CHKN Shack is for growth-minded partners who understand execution, respect strong systems, and want a modern food brand built around digital demand instead of legacy baggage."
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <InfoCard
              title="Operator fit"
              detail="Best for people who care about systems, speed, unit economics, and building a business that runs cleanly."
            />
            <InfoCard
              title="Growth mindset"
              detail="Designed for partners who are looking past one store and thinking in terms of scalable market expansion."
            />
            <InfoCard
              title="Modern concept"
              detail="A delivery-first chicken brand that speaks to how people actually order now, not how they ordered ten years ago."
            />
            <InfoCard
              title="Focused execution"
              detail="Tight menu, loud brand, repeatable operations, and a concept that is easier to protect as it grows."
            />
          </div>
        </div>
      </PageSection>

      <PageSection id="why">
        <div className="rounded-[2.3rem] border-2 border-brand-ink bg-[#fff8ea] p-5 shadow-[0_14px_0_0_#100800] sm:p-7">
          <SectionIntro
            eyebrow="Why CHKN Shack"
            title="A modern chicken brand with sharp edges in the right places."
            body="The model is focused, the brand is distinct, and the operation is designed around digital ordering, not dead space."
          />
          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            {whyChknShack.map((item, index) => (
              <InfoCard
                key={item.title}
                title={item.title}
                detail={item.detail}
                accent={index === 1 ? "dark" : "light"}
              />
            ))}
          </div>
        </div>
      </PageSection>

      <PageSection id="how-it-works">
        <div className="rounded-[2.3rem] border-2 border-brand-ink bg-brand-red p-5 text-[#fff7ed] shadow-[0_14px_0_0_#100800] sm:p-7">
          <SectionIntro
            eyebrow="How it works"
            title="A clean path from first conversation to first launch."
            body="We keep the process direct so qualified partners can understand the opportunity, move through evaluation, and get into build mode with clarity."
            theme="dark"
          />
          <div className="mt-8 grid gap-4 lg:grid-cols-4">
            {franchiseSteps.map((step, index) => (
              <article
                key={step.title}
                className="rounded-[1.5rem] border-2 border-[#fff7ed] bg-brand-ink/14 p-5"
              >
                <p className="text-sm font-black uppercase tracking-[0.22em] text-brand-yellow">
                  Step {index + 1}
                </p>
                <p className="mt-3 font-display text-3xl uppercase leading-none">
                  {step.title}
                </p>
              </article>
            ))}
          </div>
        </div>
      </PageSection>

      <PageSection id="support">
        <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <SectionIntro
            eyebrow="Support"
            title="Support built to help operators launch clean and grow smart."
            body="The system is not just a brand book. It is the operating backbone, marketing engine, and digital support structure behind the concept."
          />
          <div className="grid gap-4 sm:grid-cols-3">
            {franchiseSupport.map((item) => (
              <InfoCard key={item.title} title={item.title} detail={item.detail} />
            ))}
          </div>
        </div>
      </PageSection>

      <PageSection id="inquiry-form">
        <div className="grid gap-6 lg:grid-cols-[0.86fr_1.14fr] lg:items-start">
          <div className="rounded-[2rem] border-2 border-brand-ink bg-brand-ink p-5 text-[#fff7ed] shadow-[0_12px_0_0_#ffd54a] sm:p-7">
            <SectionIntro
              eyebrow="Inquiry"
              title="Tell us who you are and where you want to build."
              body="If you are serious about the model, send the basics and we will take it from there."
              theme="dark"
            />
            <p className="mt-5 text-sm leading-6 text-[#fff7ed]/78">
              This form is a placeholder for the future email/CRM integration. The
              UI and field structure are ready; the submission wiring comes next.
            </p>
          </div>

          <div className="space-y-6">
            <div className="rounded-[2rem] border-2 border-brand-ink bg-[#fff9ef] p-5 shadow-[0_12px_0_0_#100800] sm:p-7">
              <SectionIntro
                eyebrow="Ideal partner"
                title="Ideal Partner"
                body="The best fit is operationally sharp, growth-oriented, and ready to build with intention."
              />
              <ul className="mt-5 space-y-3 text-base leading-7 text-brand-ink/78">
                {idealPartnerPoints.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-brand-red" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-[2rem] border-2 border-brand-ink bg-[#fff9ef] p-5 shadow-[0_12px_0_0_#100800] sm:p-7">
            {/* TODO: Replace the mailto placeholder with the real email/CRM integration endpoint. */}
            <form
              action="mailto:franchise@chknshack.example"
              method="post"
              encType="text/plain"
              className="grid gap-4"
            >
              <p className="text-base leading-7 text-brand-ink/78">
                Tell us a bit about yourself — we’ll follow up with next steps.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Full Name" name="fullName" placeholder="Your name" />
                <Field
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                />
                <Field label="Phone" name="phone" type="tel" placeholder="(555) 555-5555" />
                <Field
                  label="City / Province"
                  name="cityProvince"
                  placeholder="Vancouver, BC"
                />
              </div>

              <label className="block space-y-2">
                <span className="text-sm font-black uppercase tracking-[0.18em] text-brand-ink">
                  Investment Range
                </span>
                <select
                  name="investmentRange"
                  defaultValue=""
                  className="min-h-14 w-full rounded-[1.2rem] border-2 border-brand-ink bg-[#fffdf7] px-4 text-base text-brand-ink outline-none"
                >
                  <option value="" disabled>
                    Select range
                  </option>
                  {investmentRanges.map((range) => (
                    <option key={range} value={range}>
                      {range}
                    </option>
                  ))}
                </select>
                <p className="text-sm leading-6 text-brand-ink/60">
                  Typical partners are prepared for a multi-location growth path.
                </p>
              </label>

              <label className="block space-y-2">
                <span className="text-sm font-black uppercase tracking-[0.18em] text-brand-ink">
                  Notes / Why are you interested?
                </span>
                <textarea
                  name="notes"
                  rows={6}
                  placeholder="Tell us about your background, market, and why CHKN Shack fits what you are looking for."
                  className="w-full rounded-[1.2rem] border-2 border-brand-ink bg-[#fffdf7] px-4 py-3 text-base text-brand-ink outline-none placeholder:text-brand-ink/45"
                />
              </label>

              <button
                type="submit"
                className="inline-flex min-h-14 items-center justify-center rounded-full border-2 border-brand-ink bg-brand-yellow px-5 text-center font-black uppercase tracking-[0.2em] text-brand-ink shadow-[0_10px_0_0_#100800] transition-transform duration-150 hover:-translate-y-0.5 sm:max-w-[16rem]"
              >
                Inquire Now
              </button>
            </form>
          </div>
          </div>
        </div>
      </PageSection>
    </main>
  );
}
