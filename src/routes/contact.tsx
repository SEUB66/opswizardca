import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Mail,
  Clock,
  MapPin,
  Send,
  CheckCircle2,
  Loader2,
  Linkedin,
  Github,
  Globe,
  type LucideIcon,
} from "lucide-react";
import { toast } from "sonner";
import { SiteLayout } from "@/components/SiteLayout";
import { Reveal } from "@/components/Reveal";
import { AmbientGlow } from "@/components/AmbientGlow";
import { CrtTerminal } from "@/components/CrtTerminal";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useT, type TKey } from "@/lib/i18n";
import { leadSchema, sendLead } from "@/lib/send-lead";
import { cta } from "@/components/cta";
import { BRAND } from "@/lib/brand";

/** Jump focus to the lead form — wired to the retro "Contact" keyboard. */
function focusForm() {
  const el = document.getElementById("name");
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "center" });
  window.setTimeout(() => el.focus({ preventScroll: true }), 350);
}

export const Route = createFileRoute("/contact")({
  component: ContactPage,
});

type Status = "idle" | "sending" | "sent";

const serviceTags: TKey[] = ["dev.svc.apps", "dev.svc.erp", "dev.svc.rt", "dev.svc.3d"];

const SEB = {
  linkedin: "https://www.linkedin.com/in/seub",
  site: "https://seub.net",
  github: "https://github.com/seub66",
};

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
      window.setTimeout(() => setStatus("idle"), 4000);
    } catch {
      setStatus("idle");
      toast.error(t("ct.toast.err"), { description: t("ct.toast.err.d") });
    }
  }

  return (
    <SiteLayout>
      {/* ── The developer behind it ─────────────────────────────── */}
      <section className="relative isolate overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-20">
        <AmbientGlow />
        <div className="mx-auto max-w-[1560px] px-5 sm:px-8 lg:px-12">
          <div className="grid items-center gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
            {/* Seb on a retro TV */}
            <Reveal className="relative mx-auto w-full max-w-md lg:max-w-none">
              <div
                aria-hidden
                className="absolute -inset-5 -z-10 rounded-[2.5rem] opacity-60 blur-3xl"
                style={{
                  background: "radial-gradient(60% 60% at 50% 40%, #A855F7, transparent 70%)",
                }}
              />
              <img
                src="/img/seb-tv.png"
                alt={t("dev.tv.alt")}
                className="w-full rounded-2xl ring-1 ring-white/10 shadow-[0_44px_90px_-30px_rgba(0,0,0,0.6)]"
                decoding="async"
                fetchPriority="high"
              />
            </Reveal>

            {/* Bio */}
            <Reveal delay={0.08}>
              <img
                src="/img/seub-logo.gif"
                alt="seub.net — software engineering"
                className="h-14 w-auto object-contain sm:h-16"
                decoding="async"
              />
              <p className="mt-5 font-display text-xs font-black uppercase tracking-[0.18em] text-violet">
                {t("dev.role")}
              </p>
              <p className="mt-2 text-sm font-semibold text-muted-foreground">{t("dev.tagline")}</p>
              <h1 className="mt-4 font-display text-3xl font-bold leading-[1.05] tracking-[-0.03em] text-foreground sm:text-5xl">
                {t("dev.headline")}
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
                {t("dev.bio")}
              </p>

              <div className="mt-6 flex flex-wrap gap-2.5">
                {serviceTags.map((k) => (
                  <span
                    key={k}
                    className="rounded-md border border-border bg-card/60 px-3 py-1.5 font-display text-xs font-bold uppercase tracking-wide text-foreground/80"
                  >
                    {t(k)}
                  </span>
                ))}
              </div>

              <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                {t("dev.close")}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href={SEB.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cta("primary", "md")}
                >
                  <Linkedin className="h-4 w-4" strokeWidth={2.2} />
                  {t("dev.connect")}
                </a>
                <SocialLink href={SEB.site} icon={Globe} label="seub.net" />
                <SocialLink href={SEB.github} icon={Github} label="@seub66" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── seub.net stats band ─────────────────────────────────── */}
      <section className="relative z-10 px-5 sm:px-8 lg:px-12">
        <Reveal className="mx-auto max-w-[1560px]">
          <a
            href={SEB.github}
            target="_blank"
            rel="noopener noreferrer"
            className="block overflow-hidden rounded-2xl ring-1 ring-white/10 transition hover:ring-violet/40"
          >
            <img
              src="/img/seub-stats.png"
              alt={t("dev.stats.alt")}
              className="w-full"
              loading="lazy"
              decoding="async"
            />
          </a>
        </Reveal>
      </section>

      {/* ── Book a demo: CRT + form ─────────────────────────────── */}
      <section id="contact" className="relative isolate overflow-hidden py-20 sm:py-28">
        <AmbientGlow />
        <div className="mx-auto max-w-[1560px] px-5 sm:px-8 lg:px-12">
          <Reveal className="max-w-2xl">
            <p className="font-display text-sm font-bold uppercase tracking-[0.15em] text-violet">
              {t("ct.kicker")}
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold leading-[1.02] tracking-[-0.03em] text-foreground sm:text-5xl">
              {t("ct.title")}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
              {t("ct.lead")}
            </p>
          </Reveal>

          <div className="mt-12 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
            {/* CRT PC + info */}
            <Reveal className="flex flex-col gap-5">
              <CrtTerminal />
              <div className="grid gap-3">
                <InfoCard
                  icon={Mail}
                  label={t("ct.info.email")}
                  value="hello@wizardops.ca"
                  href="mailto:hello@wizardops.ca"
                />
                <div className="grid gap-3 sm:grid-cols-2">
                  <InfoCard
                    icon={Clock}
                    label={t("ct.info.response")}
                    value={t("ct.info.response.v")}
                  />
                  <InfoCard
                    icon={MapPin}
                    label={t("ct.info.region")}
                    value={t("ct.info.region.v")}
                  />
                </div>
              </div>

              {/* Retro keyboard — press the "Contact" key to jump into the form */}
              <button
                type="button"
                onClick={focusForm}
                className="group flex items-center gap-4 rounded-2xl border border-border bg-card/50 p-4 text-left backdrop-blur-sm transition hover:border-violet sm:p-5"
              >
                <img
                  src="/img/retro-keyboard.png"
                  alt=""
                  aria-hidden
                  className="h-[5.5rem] w-auto shrink-0 object-contain transition-transform duration-300 group-hover:-translate-y-1 group-active:translate-y-0.5 sm:h-24"
                  loading="lazy"
                  decoding="async"
                />
                <div>
                  <p className="font-display text-base font-bold tracking-tight text-foreground sm:text-lg">
                    {t("ct.kb")}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {t("ct.kb.sub")}
                  </p>
                </div>
              </button>
            </Reveal>

            {/* Form */}
            <Reveal delay={0.08} className="glass glass-edge rounded-3xl p-6 sm:p-8">
              <div className="mb-6 flex items-center gap-4 border-b border-border pb-5">
                <img
                  src={BRAND.logo}
                  alt=""
                  aria-hidden
                  className="h-14 w-auto shrink-0 object-contain drop-shadow-[0_3px_14px_rgba(124,58,237,0.35)] sm:h-16"
                  decoding="async"
                />
                <div>
                  <p className="font-display text-lg font-bold tracking-tight text-foreground sm:text-xl">
                    {t("ct.form.t")}
                  </p>
                  <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">
                    {t("ct.form.d")}
                  </p>
                </div>
              </div>
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
                  className={cta("primary", "md", "mt-1 w-full")}
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

function SocialLink({
  href,
  icon: Icon,
  label,
}: {
  href: string;
  icon: LucideIcon;
  label: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-lg border border-border bg-card/60 px-4 py-3 font-display text-[0.78rem] font-bold uppercase tracking-[0.1em] text-foreground backdrop-blur transition hover:-translate-y-0.5 hover:border-violet hover:text-violet"
    >
      <Icon className="h-4 w-4" strokeWidth={2.2} />
      {label}
    </a>
  );
}

function InfoCard({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  href?: string;
}) {
  const body = (
    <div className="flex items-center gap-4 rounded-2xl border border-border bg-card/50 p-5 backdrop-blur-sm transition hover:border-violet">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-white/10 bg-background/50 text-violet">
        <Icon className="h-5 w-5" strokeWidth={2.1} />
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
