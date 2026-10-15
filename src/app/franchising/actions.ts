"use server";

import { Resend } from "resend";
import { investmentRanges } from "@/components/franchising/data";

const FRANCHISE_INBOX = "franchise@wingschknshack.com";

export type FranchiseInquiryState = {
  status: "idle" | "success" | "error";
  message: string;
  investmentRange?: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function field(formData: FormData, name: string, maxLength: number) {
  const value = formData.get(name);
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function submitFranchiseInquiry(
  _previousState: FranchiseInquiryState,
  formData: FormData
): Promise<FranchiseInquiryState> {
  // Honeypot: real visitors never see this field, bots tend to fill it.
  if (field(formData, "website", 200)) {
    return { status: "success", message: "Thanks — we’ll be in touch soon." };
  }

  const fullName = field(formData, "fullName", 120);
  const email = field(formData, "email", 200);
  const phone = field(formData, "phone", 40);
  const cityProvince = field(formData, "cityProvince", 120);
  const rawRange = field(formData, "investmentRange", 40);
  const investmentRange = investmentRanges.includes(rawRange) ? rawRange : "";
  const notes = field(formData, "notes", 5000);

  if (!fullName || !EMAIL_PATTERN.test(email)) {
    return {
      status: "error",
      message: "Please add your name and a valid email so we can reach you.",
    };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("Franchise inquiry: RESEND_API_KEY is not set");
    return {
      status: "error",
      message: `Something went wrong on our end. Please email ${FRANCHISE_INBOX} directly.`,
    };
  }

  const domain = process.env.RESEND_EMAIL_DOMAIN || "wingschknshack.com";
  const rows: Array<[string, string]> = [
    ["Name", fullName],
    ["Email", email],
    ["Phone", phone || "—"],
    ["City / Province", cityProvince || "—"],
    ["Investment range", investmentRange || "—"],
  ];

  const text = [
    ...rows.map(([label, value]) => `${label}: ${value}`),
    "",
    "Notes:",
    notes || "—",
  ].join("\n");

  const html = `
    <h2>New franchise inquiry</h2>
    <table cellpadding="6" style="border-collapse:collapse">
      ${rows
        .map(
          ([label, value]) =>
            `<tr><td><strong>${label}</strong></td><td>${escapeHtml(value)}</td></tr>`
        )
        .join("")}
    </table>
    <h3>Notes</h3>
    <p style="white-space:pre-wrap">${escapeHtml(notes || "—")}</p>
  `;

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: `CHKN Shack Franchising <inquiries@${domain}>`,
    to: [FRANCHISE_INBOX],
    replyTo: email,
    subject: `Franchise inquiry — ${fullName}${cityProvince ? ` (${cityProvince})` : ""}`,
    text,
    html,
  });

  if (error) {
    console.error("Franchise inquiry: Resend send failed", error);
    return {
      status: "error",
      message: `We couldn’t send that just now. Please try again, or email ${FRANCHISE_INBOX}.`,
    };
  }

  return {
    status: "success",
    message: "Thanks — your inquiry is in. We’ll follow up with next steps soon.",
    investmentRange,
  };
}
