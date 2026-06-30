import { useState } from "react";
import {
  Rocket,
  Sun,
  LayoutGrid,
  Wrench,
  Car,
  Receipt,
  DollarSign,
  Users,
  ChevronDown,
  type LucideIcon,
} from "lucide-react";
import { useT } from "@/lib/i18n";

type Section = {
  Icon: LucideIcon;
  color: string;
  fr: { t: string; steps: string[] };
  en: { t: string; steps: string[] };
};

/**
 * The in-app system guide ported from the product (Wizard Ops admin) — the same
 * step-by-step onboarding the client's crew gets, shown on the marketing site so
 * prospects can see exactly how the system runs end to end.
 */
const GUIDE: Section[] = [
  {
    Icon: Rocket,
    color: "#7C3AED",
    en: {
      t: "Getting started",
      steps: [
        "Sign in to your admin with your email and password.",
        "Pick the language (FR/EN) and theme at the top.",
        "Your role (admin or employee) controls which tabs you see.",
        "Admins see everything; employees see their agenda, calendar and work orders.",
      ],
    },
    fr: {
      t: "Démarrage",
      steps: [
        "Connecte-toi à ton admin avec ton courriel et mot de passe.",
        "Choisis la langue (FR/EN) et le thème en haut de l'écran.",
        "Ton rôle (administrateur ou employé) détermine les onglets visibles.",
        "Les admins voient tout ; les employés voient leur agenda, le calendrier et les bons de travail.",
      ],
    },
  },
  {
    Icon: Sun,
    color: "#0EA5E9",
    en: {
      t: "My agenda (employee)",
      steps: [
        '"My agenda" tab: your day\'s jobs, sorted.',
        'Tap a job to open it, then "En route": the GPS opens and the client is notified with the vehicle photo.',
        '"Pre-trip round": check each point before leaving; an issue alerts the admins.',
        '"Add gas receipt": amount, liters, odometer — mileage updates itself.',
        "Use the camera button to change your profile photo and banner.",
      ],
    },
    fr: {
      t: "Mon agenda (employé)",
      steps: [
        "Onglet « Mon agenda » : tes jobs du jour, triés.",
        "Clique un job pour ouvrir le détail, puis « En route » : le GPS s'ouvre et le client est averti avec la photo du véhicule.",
        "« Ronde de départ » : coche chaque point avant de partir ; un problème alerte les admins.",
        "« Ajouter facture essence » : montant, litres, odomètre — le kilométrage se met à jour seul.",
        "Clique la caméra pour changer ta photo de profil et ta bannière.",
      ],
    },
  },
  {
    Icon: LayoutGrid,
    color: "#7C3AED",
    en: {
      t: "Quotes",
      steps: [
        '"Quotes" tab: the real-time Kanban board of requests.',
        '"+ New quote" to create a file (or a request arrives on its own from the site).',
        "Open a card to build the price: parts, labor, travel — taxes compute automatically.",
        '"Send to client": email + PDF with Accept / Decline buttons.',
        "On acceptance, the work order is created automatically.",
      ],
    },
    fr: {
      t: "Soumissions",
      steps: [
        "Onglet « Soumissions » : le tableau Kanban des demandes, en temps réel.",
        "« + Nouvelle soumission » pour créer un dossier (ou une demande arrive seule du site).",
        "Ouvre une carte pour bâtir le prix : pièces, main-d'œuvre, transport — les taxes se calculent automatiquement.",
        "« Envoyer au client » : courriel + PDF avec boutons Accepter / Refuser.",
        "À l'acceptation, le bon de travail se crée tout seul.",
      ],
    },
  },
  {
    Icon: Wrench,
    color: "#3B82F6",
    en: {
      t: "Work orders",
      steps: [
        '"Work orders" tab: every confirmed job.',
        "Open an order to assign a technician and set the date/time.",
        'The technician sees it in their agenda and taps "En route" on the day.',
        'Set the status to "Done" once finished — it becomes billable.',
      ],
    },
    fr: {
      t: "Bons de travail",
      steps: [
        "Onglet « Bons de travail » : tous les jobs confirmés.",
        "Ouvre un bon pour assigner un technicien et fixer la date/heure.",
        "Le technicien le voit dans son agenda et lance « En route » le jour venu.",
        "Change le statut à « Terminé » une fois le travail fait — il devient facturable.",
      ],
    },
  },
  {
    Icon: Car,
    color: "#0EA5E9",
    en: {
      t: "Garage & fleet",
      steps: [
        '"Garage" tab: every vehicle and its status.',
        "Assign a vehicle to an employee — that's the vehicle shown in the client notice.",
        "Review rounds, gas receipts, mileage and maintenance.",
        "An issue flagged during a round shows up as an admin alert.",
      ],
    },
    fr: {
      t: "Garage & flotte",
      steps: [
        "Onglet « Garage » : tous les véhicules et leur état.",
        "Assigne un véhicule à un employé — c'est ce véhicule qui apparaît dans l'avis client.",
        "Consulte les rondes, factures d'essence, kilométrage et entretiens.",
        "Un problème signalé lors d'une ronde apparaît en alerte pour les admins.",
      ],
    },
  },
  {
    Icon: Receipt,
    color: "#F59E0B",
    en: {
      t: "Accounting",
      steps: [
        '"Accounting" tab: receivable, overdue, collected — at a glance.',
        '"Create invoice" from a finished work order (amount + taxes pulled in automatically).',
        'Open the invoice to email it, or "Remind" if it\'s overdue.',
        '"Mark paid" records the payment (full or partial) in the ledger.',
      ],
    },
    fr: {
      t: "Comptabilité",
      steps: [
        "Onglet « Comptabilité » : à recevoir, en retard, encaissé — en un coup d'œil.",
        "« Créer une facture » depuis un bon de travail terminé (montant + taxes repris automatiquement).",
        "Ouvre la facture pour l'envoyer au client, ou « Relancer » si elle est en retard.",
        "« Marquer payé » enregistre le paiement (complet ou partiel) dans le grand livre.",
      ],
    },
  },
  {
    Icon: DollarSign,
    color: "#EC4899",
    en: {
      t: "Pricing",
      steps: [
        '"Pricing" tab: your prices, frequencies and discounts.',
        "Edit the price by unit/quantity, packages and frequency discounts.",
        "Adjust zones and travel fees.",
        "Everything saves live — no developer needed.",
      ],
    },
    fr: {
      t: "Tarification",
      steps: [
        "Onglet « Tarification » : tes prix, fréquences et rabais.",
        "Modifie le prix à l'unité/quantité, les forfaits et les rabais par fréquence.",
        "Ajuste les zones et frais de transport.",
        "Tout est sauvegardé en direct — aucun développeur requis.",
      ],
    },
  },
  {
    Icon: Users,
    color: "#10B981",
    en: {
      t: "Team & HR",
      steps: [
        '"Team" tab: the employee list with their photos.',
        '"New employee": name, email, temporary password, role.',
        "Grant HR access to a trusted person.",
        "Open a file to change the role, job title, emergency contact.",
      ],
    },
    fr: {
      t: "Équipe & RH",
      steps: [
        "Onglet « Équipe » : la liste des employés avec leur photo.",
        "« Nouvel employé » : nom, courriel, mot de passe temporaire, rôle.",
        "Donne l'accès RH à une personne de confiance.",
        "Ouvre une fiche pour modifier le rôle, le poste, le contact d'urgence.",
      ],
    },
  },
];

export function SystemGuide() {
  const { lang } = useT();
  const fr = lang === "fr";
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {GUIDE.map((s, i) => {
        const cc = fr ? s.fr : s.en;
        const isOpen = open === i;
        return (
          <div
            key={i}
            className="glass glass-edge overflow-hidden rounded-2xl"
            style={{ borderLeft: `4px solid ${s.color}` }}
          >
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center gap-3 px-5 py-4 text-left transition hover:bg-card/40"
            >
              <span
                className="grid h-11 w-11 shrink-0 place-items-center rounded-xl"
                style={{
                  background: `color-mix(in oklab, ${s.color} 16%, transparent)`,
                  color: s.color,
                }}
              >
                <s.Icon className="h-5 w-5" strokeWidth={2} />
              </span>
              <span className="flex-1 font-display text-base font-bold tracking-tight text-foreground sm:text-lg">
                {cc.t}
              </span>
              <ChevronDown
                className={`h-5 w-5 shrink-0 text-muted-foreground transition ${isOpen ? "rotate-180" : ""}`}
              />
            </button>
            {isOpen && (
              <ol className="space-y-3 px-5 pb-5 pl-6">
                {cc.steps.map((step, k) => (
                  <li
                    key={k}
                    className="flex items-start gap-3 text-sm leading-snug text-foreground/85"
                  >
                    <span
                      className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full text-[11px] font-black text-white"
                      style={{ background: s.color }}
                    >
                      {k + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            )}
          </div>
        );
      })}
    </div>
  );
}
