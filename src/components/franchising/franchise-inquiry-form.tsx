"use client";

import { useActionState } from "react";
import {
  submitFranchiseInquiry,
  type FranchiseInquiryState,
} from "@/app/franchising/actions";
import { investmentRanges } from "@/components/franchising/data";

const initialState: FranchiseInquiryState = { status: "idle", message: "" };

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required = false,
  autoComplete,
}: Readonly<{
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  autoComplete?: string;
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
        required={required}
        autoComplete={autoComplete}
        className="min-h-14 w-full rounded-[1.2rem] border-2 border-brand-ink bg-[#fffdf7] px-4 text-base text-brand-ink outline-none placeholder:text-brand-ink/45"
      />
    </label>
  );
}

export function FranchiseInquiryForm() {
  const [state, formAction, pending] = useActionState(
    submitFranchiseInquiry,
    initialState
  );

  if (state.status === "success") {
    return (
      <div role="status" className="space-y-3">
        <p className="font-display text-4xl uppercase leading-none text-brand-ink">
          Inquiry sent.
        </p>
        <p className="text-base leading-7 text-brand-ink/78">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="grid gap-4">
      <p className="text-base leading-7 text-brand-ink/78">
        Tell us a bit about yourself — we’ll follow up with next steps.
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          label="Full Name"
          name="fullName"
          placeholder="Your name"
          autoComplete="name"
          required
        />
        <Field
          label="Email"
          name="email"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          required
        />
        <Field
          label="Phone"
          name="phone"
          type="tel"
          placeholder="(555) 555-5555"
          autoComplete="tel"
        />
        <Field
          label="City / Province"
          name="cityProvince"
          placeholder="Vancouver, BC"
        />
      </div>

      {/* Honeypot — hidden from people, catches form-filling bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
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

      {state.status === "error" ? (
        <p role="alert" className="text-sm font-bold leading-6 text-brand-red">
          {state.message}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="inline-flex min-h-14 items-center justify-center rounded-full border-2 border-brand-ink bg-brand-yellow px-5 text-center font-black uppercase tracking-[0.2em] text-brand-ink shadow-[0_10px_0_0_#100800] transition-transform duration-150 hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-70 sm:max-w-[16rem]"
      >
        {pending ? "Sending…" : "Inquire Now"}
      </button>
    </form>
  );
}
