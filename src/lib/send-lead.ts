import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { BRAND } from "@/lib/brand";

/** "Book a demo" lead payload from the /contact form. */
export const leadSchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(160),
  business: z.string().trim().max(160).optional().default(""),
  spend: z.string().trim().max(60).optional().default(""),
  message: z.string().trim().min(10).max(4000),
});

export type LeadInput = z.input<typeof leadSchema>;
export type LeadData = z.output<typeof leadSchema>;

const esc = (s: string) =>
  s.replace(
    /[&<>"]/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c] as string,
  );

function row(label: string, value?: string) {
  if (!value) return "";
  return `<tr><td style="padding:6px 14px 6px 0;color:#6B7280;font:600 12px/1.4 system-ui;white-space:nowrap;vertical-align:top">${esc(
    label,
  )}</td><td style="padding:6px 0;color:#111827;font:500 14px/1.5 system-ui">${esc(value)}</td></tr>`;
}

function renderEmail(d: LeadData) {
  return `<!doctype html><html><body style="margin:0;background:#E7E9EE;padding:28px">
  <div style="max-width:600px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;border:1px solid #D3D7DF">
    <div style="background:linear-gradient(110deg,#7C3AED,#22D3EE);padding:22px 28px">
      <span style="color:#fff;font:800 13px/1 system-ui;letter-spacing:.18em;text-transform:uppercase">${esc(
        BRAND.name,
      )} · New demo request</span>
    </div>
    <div style="padding:24px 28px">
      <table style="width:100%;border-collapse:collapse">
        ${row("Name", d.name)}
        ${row("Email", d.email)}
        ${row("Business / trade", d.business)}
        ${row("Current monthly spend", d.spend)}
      </table>
      <div style="margin-top:18px;padding-top:18px;border-top:1px solid #E5E7EB">
        <div style="color:#6B7280;font:600 12px/1.4 system-ui;text-transform:uppercase;letter-spacing:.08em">Message</div>
        <p style="margin:8px 0 0;color:#111827;font:500 14px/1.6 system-ui;white-space:pre-wrap">${esc(
          d.message,
        )}</p>
      </div>
    </div>
  </div></body></html>`;
}

/**
 * Server function — runs only on the server (Nitro/Vercel); the Resend SDK and
 * API key never reach the client bundle.
 *
 * Host env vars (Vercel → Settings → Environment Variables):
 *   RESEND_API_KEY   required to actually deliver
 *   LEADS_TO         where demo requests are emailed (default below)
 *   RESEND_FROM      verified sender (default "Wizard Ops <onboarding@resend.dev>")
 *
 * Until RESEND_API_KEY is present the call soft-succeeds (logs + delivered:false)
 * so the form stays functional; it goes fully live the moment the key is set.
 */
export const sendLead = createServerFn({ method: "POST" })
  .validator((data: unknown) => leadSchema.parse(data))
  .handler(async ({ data }) => {
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      console.warn(
        `[sendLead] RESEND_API_KEY not set — demo request from "${data.name}" (${data.email}) not emailed (graceful no-op).`,
      );
      return { ok: true as const, delivered: false as const };
    }

    const to = process.env.LEADS_TO ?? "sebastien.germain1989@gmail.com";
    const from = process.env.RESEND_FROM ?? `${BRAND.name} <onboarding@resend.dev>`;

    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);

    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: data.email,
      subject: `${BRAND.name} — demo request from ${data.name}`,
      html: renderEmail(data),
    });

    if (error) {
      console.error("[sendLead] Resend error:", error);
      throw new Error("EMAIL_SEND_FAILED");
    }
    return { ok: true as const, delivered: true as const };
  });
