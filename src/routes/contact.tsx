import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Clock, MapPin, Send, CheckCircle2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { SiteLayout } from "@/components/SiteLayout";
import { Reveal } from "@/components/Reveal";
import { AmbientGlow } from "@/components/AmbientGlow";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useT } from "@/lib/i18n";
import { leadSchema, sendLead } from "@/lib/send-lead";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
});

type Status = "idle" | "sending" | "sent";

function ContactPage() {
  const { t } = useT();
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    const form = e.currentTarget;
    const fd = new FormData(form);
    const raw = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      business: String(fd.get("business") ?? ""),
      spend: String(fd.get("spend") ?? ""),
      message: String(fd.get("message") ?? ""),
    };

    const parsed = leadSchema.safeParse(raw);
    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const field = String(issue.path[0] ?? "");
        if (field === "name") next.name = t("ct.err.name");
        else if (field === "email") next.email = t("ct.err.email");
        else if (field === "message") next.message = t("ct.err.message");
      }
      setErrors(next);
      return;
    }

    setErrors({});
    setStatus("sending");
    try {
      await sendLead({ data: parsed.data });
      setStatus("sent");
      toast.success(t("ct.toast.ok"), { description: t("ct.toast.ok.d") });
      form.reset();
      // Return to idle so the visitor can send a second request if they need to.
      window.setTimeout(() => setStatus("idle"), 4000);
    } catch {
      setStatus("idle");
      toast.error(t("ct.toast.err"), { description: t("ct.toast.err.d") });
    }
  }

  return (
    <SiteLayout>
      <section className="relative isolate overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-28">
        <AmbientGlow />
        <div className="mx-auto max-w-[1560px] px-5 sm:px-8 lg:px-12">
          <Reveal className="max-w-2xl">
            <p className="font-display text-sm font-bold uppercase tracking-[0.15em] text-violet">
              {t("ct.kicker")}
            </p>
            <h1 className="mt-3 font-display text-4xl font-bold leading-[1.02] tracking-[-0.03em] text-foreground sm:text-6xl">
              {t("ct.title")}
            </h1>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
              {t("ct.lead")}
            </p>
          </Reveal>

          <div className="mt-12 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
            {/* Info column */}
            <Reveal className="flex flex-col gap-4">
              <InfoCard
                icon={<Mail className="h-5 w-5 text-violet" />}
                label={t("ct.info.email")}
                value="hello@wizardops.ca"
                href="mailto:hello@wizardops.ca"
              />
              <InfoCard
                icon={<Clock className="h-5 w-5 text-violet" />}
                label={t("ct.info.response")}
                value={t("ct.info.response.v")}
              />
              <InfoCard
                icon={<MapPin className="h-5 w-5 text-violet" />}
                label={t("ct.info.region")}
                value={t("ct.info.region.v")}
              />
              <div
                className="relative mt-2 hidden overflow-hidden rounded-2xl border border-violet/25 sm:block"
                aria-hidden
              >
                <img
                  src="/img/wizardops-banner-dark.jpg"
                  alt=""
                  className="h-40 w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </Reveal>

            {/* Form column */}
            <Reveal delay={0.08} className="glass glass-edge rounded-3xl p-6 sm:p-8">
              <form onSubmit={onSubmit} noValidate className="grid gap-4">
                <Field id="name" label={t("ct.f.name")} error={errors.name}>
                  <Input
                    id="name"
                    name="name"
                    placeholder={t("ct.f.name.ph")}
                    autoComplete="name"
                  />
                </Field>
                <Field id="email" label={t("ct.f.email")} error={errors.email}>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    inputMode="email"
                    placeholder={t("ct.f.email.ph")}
                    autoComplete="email"
                  />
                </Field>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field id="business" label={t("ct.f.business")}>
                    <Input id="business" name="business" placeholder={t("ct.f.business.ph")} />
                  </Field>
                  <Field id="spend" label={t("ct.f.spend")}>
                    <Input id="spend" name="spend" placeholder={t("ct.f.spend.ph")} />
                  </Field>
                </div>
                <Field id="message" label={t("ct.f.message")} error={errors.message}>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder={t("ct.f.message.ph")}
                    rows={5}
                  />
                </Field>

                <button
                  type="submit"
                  disabled={status === "sending" || status === "sent"}
                  className="mt-1 inline-flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-3.5 text-sm font-bold text-white shadow-[0_12px_36px_-10px_rgba(124,58,237,0.75)] transition hover:translate-y-[-1px] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {status === "sending" && <Loader2 className="h-4 w-4 animate-spin" />}
                  {status === "sent" && <CheckCircle2 className="h-4 w-4" />}
                  {status === "idle" && <Send className="h-4 w-4" />}
                  {status === "sending"
                    ? t("ct.f.sending")
                    : status === "sent"
                      ? t("ct.f.sent")
                      : t("ct.f.send")}
                </button>
              </form>
            </Reveal>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function InfoCard({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const body = (
    <div className="flex items-center gap-4 rounded-2xl border border-border bg-card/50 p-5 backdrop-blur-sm transition hover:border-violet">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-white/10 bg-background/50">
        {icon}
      </span>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {label}
        </p>
        <p className="mt-0.5 font-display text-base font-bold tracking-tight text-foreground">
          {value}
        </p>
      </div>
    </div>
  );
  return href ? (
    <a href={href} className="block">
      {body}
    </a>
  ) : (
    body
  );
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-1.5">
      <Label htmlFor={id}>{label}</Label>
      {children}
      {error && <p className="text-xs font-medium text-destructive">{error}</p>}
    </div>
  );
}
