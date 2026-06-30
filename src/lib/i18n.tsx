import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "fr" | "en";
const STORAGE_KEY = "wizardops-lang";

/**
 * Bilingual dictionary. English is the primary language; French is offered to
 * Québec visitors. Device language is auto-detected on first visit
 * (navigator.language → fr | en) and can be toggled manually thereafter.
 */
export const dict = {
  // ── Nav ───────────────────────────────────────────────────────
  "nav.product": { en: "The Kit", fr: "Le Kit" },
  "nav.pricing": { en: "Pricing", fr: "Prix" },
  "nav.sectors": { en: "Trades", fr: "Secteurs" },
  "nav.stack": { en: "Tech", fr: "Techno" },
  "nav.faq": { en: "FAQ", fr: "FAQ" },
  "nav.manifesto": { en: "Manifesto", fr: "Manifeste" },
  "nav.contact": { en: "Contact", fr: "Contact" },
  "nav.demo": { en: "Book a demo", fr: "Réserver une démo" },
  "nav.demo.short": { en: "Demo", fr: "Démo" },
  "nav.menu": { en: "Menu", fr: "Menu" },
  "nav.home": { en: "Home", fr: "Accueil" },
  "nav.back": { en: "Back home", fr: "Retour à l'accueil" },

  // ── Hero ──────────────────────────────────────────────────────
  "hero.badge": {
    en: "The anti-subscription field-service kit",
    fr: "Le kit terrain anti-abonnement",
  },
  "hero.title.a": { en: "Lifetime Software.", fr: "Logiciel à vie." },
  "hero.title.b": { en: "Zero Subscriptions.", fr: "Zéro abonnement." },
  "hero.desc": {
    en: "Wizard Ops is the complete website + field-service CRM for local trades — booking, instant quotes, dispatch and auto-invoicing, all in your branding. Buy your kit once. Own it forever. No monthly rent.",
    fr: "Wizard Ops, c'est le site web + CRM terrain complet pour les métiers locaux — soumissions instantanées, répartition et facturation automatique, à tes couleurs. Achète ton kit une fois. Possède-le à vie. Zéro location mensuelle.",
  },
  "hero.cta.demo": { en: "Book a free demo", fr: "Réserver une démo gratuite" },
  "hero.cta.pricing": { en: "See pricing", fr: "Voir les prix" },
  "hero.bullet.own": { en: "Own it for life", fr: "À toi, à vie" },
  "hero.bullet.infra": { en: "$0–10 / mo infra", fr: "0–10 $ / mois d'infra" },
  "hero.bullet.brand": { en: "Your brand, your colors", fr: "Ta marque, tes couleurs" },
  "hero.bullet.bilingual": { en: "Bilingual out of the box", fr: "Bilingue dès le départ" },
  "hero.logo.alt": {
    en: "Wizard Ops — pixel-art wizard logo",
    fr: "Wizard Ops — logo magicien pixel-art",
  },
  "hero.kit": { en: "The Kit", fr: "Le Kit" },
  "hero.tile.life": { en: "Lifetime", fr: "À vie" },
  "hero.tile.once": { en: "One-time", fr: "Unique" },
  "hero.tile.permonth": { en: "Per month", fr: "Par mois" },
  "hero.tile.bilingual": { en: "Bilingual", fr: "Bilingue" },
  "hero.stat.infra": { en: "/ mo infra", fr: "/ mois infra" },

  // ── Sector marquee ────────────────────────────────────────────
  "marquee.lead": { en: "Built for every local trade", fr: "Conçu pour tous les métiers locaux" },

  // ── Problem: the subscription tax ─────────────────────────────
  "prob.kicker": { en: "// The subscription trap", fr: "// Le piège de l'abonnement" },
  "prob.title.a": { en: "You're renting", fr: "Tu loues" },
  "prob.title.b": { en: "five tools that don't talk.", fr: "cinq outils qui ne se parlent pas." },
  "prob.lead": {
    en: "A website here, a dispatch app there, an invoicing tool somewhere else — generic, ugly, and billed every single month. Forever. The price can jump tomorrow morning and you'd still own nothing.",
    fr: "Un site web ici, une app de répartition là, un outil de facturation ailleurs — génériques, laids, et facturés chaque mois. À vie. Le prix peut grimper demain matin et tu ne possèdes toujours rien.",
  },
  "prob.saas.label": { en: "The SaaS stack", fr: "La pile SaaS" },
  "prob.saas.site": { en: "Website builder (Wix-style)", fr: "Constructeur de site (genre Wix)" },
  "prob.saas.crm": { en: "Dispatch / CRM", fr: "Répartition / CRM" },
  "prob.saas.invoice": { en: "Invoicing tool", fr: "Outil de facturation" },
  "prob.saas.total": { en: "≈ $2,500+ every year, forever", fr: "≈ 2 500 $+ par année, à vie" },
  "prob.saas.note": {
    en: "Disconnected. Generic branding. Rent due again next month.",
    fr: "Déconnectés. Branding générique. Loyer dû le mois prochain.",
  },
  "prob.ours.label": { en: "The Wizard Ops kit", fr: "Le kit Wizard Ops" },
  "prob.ours.point1": {
    en: "Site, quotes, dispatch & invoices — one welded system",
    fr: "Site, soumissions, répartition et factures — un seul système soudé",
  },
  "prob.ours.point2": {
    en: "Built to your brand, your colors, your services",
    fr: "Bâti à ta marque, tes couleurs, tes services",
  },
  "prob.ours.point3": { en: "One payment. Yours for life.", fr: "Un paiement. À toi pour la vie." },
  "prob.ours.total": {
    en: "Pays for itself in under 2 years",
    fr: "Rentabilisé en moins de 2 ans",
  },

  // ── Bundle / Features ─────────────────────────────────────────
  "feat.kicker": { en: "// Everything in the kit", fr: "// Tout dans le kit" },
  "feat.title.a": { en: "One system,", fr: "Un système," },
  "feat.title.b": {
    en: "from first click to paid invoice.",
    fr: "du premier clic à la facture payée.",
  },
  "feat.lead": {
    en: "No bloated ERP, no endless menus. Just the core of the field: a showcase site, live quoting, technician dispatch and automated invoicing — welded together and branded to you.",
    fr: "Pas d'ERP lourd, pas de menus interminables. Juste le cœur du terrain : site vitrine, soumission en direct, répartition des techniciens et facturation automatisée — soudés ensemble et à ton image.",
  },
  "feat.site.t": { en: "Showcase website", fr: "Site vitrine" },
  "feat.site.d": {
    en: "A fast, SSR marketing site with your services, team and service area — fully editable, no code.",
    fr: "Un site marketing rapide (SSR) avec tes services, ton équipe et ta zone — 100 % éditable, sans code.",
  },
  "feat.quote.t": { en: "Instant Quote Wizard", fr: "Quote Wizard instantané" },
  "feat.quote.d": {
    en: "Customers get a clear price in minutes. Per-trade pricing models — flat, per-window, or custom quote.",
    fr: "Le client obtient un prix clair en minutes. Modèles par métier — fixe, à la fenêtre, ou sur mesure.",
  },
  "feat.dispatch.t": { en: "Field dispatch", fr: "Répartition terrain" },
  "feat.dispatch.d": {
    en: 'Assign technicians and fire the "Jean is on the way 🚐" email automatically. Same team as your site.',
    fr: "Assigne les techniciens et envoie l'email « Jean est en route 🚐 » automatiquement. La même équipe que sur ton site.",
  },
  "feat.invoice.t": { en: "Auto-invoicing", fr: "Facturation automatique" },
  "feat.invoice.d": {
    en: "Invoices and PDFs generate themselves in your colors, logo and footer — accepted quote to paid, no double entry.",
    fr: "Factures et PDF se génèrent à tes couleurs, logo et pied de page — soumission acceptée à payée, sans double saisie.",
  },
  "feat.whitelabel.t": { en: "White-label branding", fr: "Image de marque white-label" },
  "feat.whitelabel.d": {
    en: "Your primary + accent colors drive the whole app via CSS variables — rebranded instantly, no recompile.",
    fr: "Tes couleurs primaire et accent pilotent toute l'app via variables CSS — rebrandé instantanément, sans recompilation.",
  },
  "feat.pages.t": { en: "Team & contact pages", fr: "Pages équipe et contact" },
  "feat.pages.d": {
    en: "A team grid that humanizes your business and a contact page wired to email — both editable from the admin.",
    fr: "Une grille d'équipe qui humanise ta business et une page contact reliée à l'email — éditables depuis l'admin.",
  },

  // ── Field operations (run the crew) ──────────────────────────
  "ops.kicker": { en: "// Run your whole crew", fr: "// Gère toute ton équipe" },
  "ops.included": { en: "Included", fr: "Inclus" },
  "ops.title.a": { en: "Not just a website —", fr: "Pas juste un site web —" },
  "ops.title.b": { en: "your whole field operation.", fr: "toute ton opération terrain." },
  "ops.lead": {
    en: "The kit runs the crew, not just the funnel: a branded fleet your team is proud of, fuel and expenses tracked per truck, time-clock punches, and an offline-first app that never quits in the field.",
    fr: "Le kit gère l'équipe, pas juste le tunnel de vente : une flotte à ton image dont ton équipe est fière, carburant et dépenses suivis par camion, le punch, et une app hors-ligne qui ne lâche jamais sur le terrain.",
  },
  "ops.fleet.t": { en: "Branded fleet", fr: "Flotte à ton image" },
  "ops.fleet.d": {
    en: "We brand and 3D-model your trucks — included. One identity for the whole crew: the sense of belonging that turns a job into a team.",
    fr: "On brande et modélise tes camions en 3D — inclus. Une seule identité pour toute l'équipe : le sentiment d'appartenance qui transforme une job en équipe.",
  },
  "ops.fuel.t": { en: "Fuel & expense log", fr: "Carburant et dépenses" },
  "ops.fuel.d": {
    en: "Log every gas fill-up and expense per truck — full history and totals, no shoebox of receipts.",
    fr: "Enregistre chaque plein et dépense par camion — historique complet et totaux, fini la boîte de reçus.",
  },
  "ops.punch.t": { en: "Time-clock punch", fr: "Le punch" },
  "ops.punch.d": {
    en: "Crews punch in and out from their phone; live timesheets, overtime and payroll-ready hours.",
    fr: "Les équipes punchent depuis leur cell ; feuilles de temps en direct, temps supp et heures prêtes pour la paie.",
  },
  "ops.offline.t": { en: "Offline-first", fr: "Hors-ligne d'abord" },
  "ops.offline.d": {
    en: "Quotes, photos and punches keep working with no signal in the field and sync the moment you're back online.",
    fr: "Soumissions, photos et punchs fonctionnent sans signal et se synchronisent dès le retour du réseau.",
  },

  // ── How it works ──────────────────────────────────────────────
  "how.kicker": {
    en: "// From clone to live in 10 minutes",
    fr: "// Du clone au live en 10 minutes",
  },
  "how.title": { en: "How you get your kit", fr: "Comment tu obtiens ton kit" },
  "how.s1.t": { en: "We deploy your instance", fr: "On déploie ton instance" },
  "how.s1.d": {
    en: "Your own dedicated app on your accounts (Vercel, Supabase, Resend). No shared platform, no middleman margin.",
    fr: "Ta propre app dédiée sur tes comptes (Vercel, Supabase, Resend). Aucune plateforme partagée, aucune marge d'intermédiaire.",
  },
  "how.s2.t": { en: "You fill in your business", fr: "Tu remplis ta business" },
  "how.s2.d": {
    en: "Log into the admin, add your services, team, colors and contact info. No developer, no ticket queue.",
    fr: "Connecte-toi à l'admin, ajoute tes services, ton équipe, tes couleurs et tes coordonnées. Aucun développeur, aucune file de tickets.",
  },
  "how.s3.t": { en: "Your site + CRM go live", fr: "Ton site + CRM partent en ligne" },
  "how.s3.d": {
    en: "Website and field CRM launch in your branding — quoting, dispatch and invoicing all wired together.",
    fr: "Site web et CRM terrain lancés à ton image — soumission, répartition et facturation reliés ensemble.",
  },
  "how.s4.t": { en: "You own it. Forever.", fr: "C'est à toi. À vie." },
  "how.s4.d": {
    en: "It's a tangible asset, like your Milwaukee drill kit. No subscription, no lock-in. Sell it, move it, keep it.",
    fr: "C'est un actif tangible, comme ton kit de drills Milwaukee. Pas d'abonnement, pas de cadenas. Vends-le, déplace-le, garde-le.",
  },

  // ── Pricing ───────────────────────────────────────────────────
  "price.kicker": { en: "// One price. Yours for life.", fr: "// Un prix. À toi pour la vie." },
  "price.title.a": { en: "Buy the kit once.", fr: "Achète le kit une fois." },
  "price.title.b": { en: "Stop paying rent.", fr: "Arrête de payer le loyer." },
  "price.lead": {
    en: "A single licence fee covers deployment, your branded theme, your service catalog, field dispatch and invoice automation. The infrastructure runs on your own free-tier accounts.",
    fr: "Une licence unique couvre le déploiement, ton thème brandé, ton catalogue de services, la répartition et l'automatisation des factures. L'infrastructure roule sur tes propres comptes (forfaits gratuits).",
  },
  "price.card.badge": { en: "One-time licence", fr: "Licence unique" },
  "price.card.name": { en: "The Wizard Ops Kit", fr: "Le Kit Wizard Ops" },
  "price.card.range": { en: "one-time", fr: "une seule fois" },
  "price.card.infra": {
    en: "+ $0–10 / mo infrastructure, billed at cost on your own accounts",
    fr: "+ 0–10 $ / mois d'infra, au coût brut sur tes propres comptes",
  },
  "price.card.cta": { en: "Book a demo", fr: "Réserver une démo" },
  "price.tiers.title": { en: "What sets your price", fr: "Ce qui détermine ton prix" },
  "price.tiers.lead": {
    en: "Moving your data is like hauling a giant toolbox from one garage to another — it takes time and expertise to lose nothing on the way. That's the only difference between the two:",
    fr: "Transférer tes données, c'est comme déménager un coffre à outils géant d'un garage à l'autre — ça prend du temps et de l'expertise pour ne rien perdre en chemin. C'est la seule différence entre les deux :",
  },
  "price.tier.base.t": { en: "The Raw Kit", fr: "Le Kit Brut" },
  "price.tier.base.tag": { en: "Empty toolbox", fr: "Coffre vide" },
  "price.tier.base.d": {
    en: "You buy the drill and the tools. We deliver the brand-new software with the infrastructure ready — but the toolbox is empty. You organize it and enter your data from scratch.",
    fr: "Tu achètes la drill et les outils. On livre le logiciel flambant neuf, l'infrastructure prête — mais le coffre est vide. C'est toi qui l'organises et qui entres tes données de zéro.",
  },
  "price.tier.full.t": { en: "Turnkey", fr: "Clé en main" },
  "price.tier.full.tag": { en: "Migration included", fr: "Migration incluse" },
  "price.tier.full.d": {
    en: "We handle everything. We build the structure and migrate your whole world in — old inventory, clients, paper or Excel history — cleanly into your new database, without you losing a minute on the job.",
    fr: "On s'occupe de tout. On bâtit la structure et on migre ton monde au complet — vieil inventaire, clients, historiques papier ou Excel — proprement dans ta nouvelle base, sans que tu perdes une minute de break.",
  },
  "price.incl.title": { en: "Everything included", fr: "Tout est inclus" },
  "price.incl.1": {
    en: "Dedicated instance deployed (TanStack Start + Supabase)",
    fr: "Instance dédiée déployée (TanStack Start + Supabase)",
  },
  "price.incl.2": {
    en: "Dynamic theming in your brand colors",
    fr: "Thémisation dynamique à tes couleurs",
  },
  "price.incl.3": {
    en: "Custom service catalog + Quote Wizard",
    fr: "Catalogue de services sur mesure + Quote Wizard",
  },
  "price.incl.4": {
    en: 'Field dispatch + "on the way" alerts',
    fr: "Répartition terrain + alertes « en route »",
  },
  "price.incl.5": {
    en: "Automated, branded invoices & PDFs",
    fr: "Factures et PDF automatisés, à tes couleurs",
  },
  "price.incl.6": { en: "Team, contact & about pages", fr: "Pages équipe, contact et à propos" },
  "price.incl.7": {
    en: "Bilingual (FR / EN) site + admin",
    fr: "Site et admin bilingues (FR / EN)",
  },
  "price.incl.8": {
    en: "Full ownership — transferable for life",
    fr: "Pleine propriété — transférable à vie",
  },

  // Comparison table
  "cmp.title": { en: "Subscriptions vs. ownership", fr: "Abonnements vs. propriété" },
  "cmp.col.saas": { en: "Generic SaaS stack", fr: "Pile SaaS générique" },
  "cmp.col.ours": { en: "Wizard Ops", fr: "Wizard Ops" },
  "cmp.row.cost": { en: "Cost", fr: "Coût" },
  "cmp.row.cost.saas": { en: "~$2,500 / year, forever", fr: "~2 500 $ / an, à vie" },
  "cmp.row.cost.ours": { en: "One-time, then ~$0–10 / mo", fr: "Une fois, puis ~0–10 $ / mois" },
  "cmp.row.own": { en: "Ownership", fr: "Propriété" },
  "cmp.row.own.saas": { en: "You rent. You own nothing.", fr: "Tu loues. Tu ne possèdes rien." },
  "cmp.row.own.ours": { en: "Yours, transferable for life", fr: "À toi, transférable à vie" },
  "cmp.row.brand": { en: "Branding", fr: "Image de marque" },
  "cmp.row.brand.saas": { en: "Generic templates", fr: "Gabarits génériques" },
  "cmp.row.brand.ours": { en: "Fully white-labeled to you", fr: "100 % à ton image" },
  "cmp.row.integ": { en: "Integration", fr: "Intégration" },
  "cmp.row.integ.saas": { en: "5 tools that don't talk", fr: "5 outils qui ne se parlent pas" },
  "cmp.row.integ.ours": { en: "One welded system", fr: "Un seul système soudé" },
  "cmp.row.price": { en: "Price hikes", fr: "Hausses de prix" },
  "cmp.row.price.saas": { en: "Anytime, no notice", fr: "N'importe quand, sans préavis" },
  "cmp.row.price.ours": { en: "Never — you already own it", fr: "Jamais — tu le possèdes déjà" },

  // ROI calculator
  "roi.title": { en: "Your payback, in numbers", fr: "Ton retour, en chiffres" },
  "roi.lead": {
    en: "Drag in what you pay today. See when ownership wins.",
    fr: "Glisse ce que tu paies aujourd'hui. Vois quand la propriété gagne.",
  },
  "roi.monthly": {
    en: "What you pay in subscriptions / month",
    fr: "Ce que tu paies en abonnements / mois",
  },
  "roi.licence": { en: "Wizard Ops one-time licence", fr: "Licence unique Wizard Ops" },
  "roi.yearly": { en: "Your subscriptions per year", fr: "Tes abonnements par année" },
  "roi.breakeven": { en: "Break-even point", fr: "Point de rentabilité" },
  "roi.fiveyear": { en: "Saved over 5 years", fr: "Économisé sur 5 ans" },
  "roi.months": { en: "months", fr: "mois" },
  "roi.foot": {
    en: "After break-even, every month is money you keep instead of renting.",
    fr: "Après la rentabilité, chaque mois est de l'argent que tu gardes au lieu de louer.",
  },

  // ── Sectors ───────────────────────────────────────────────────
  "sec.kicker": { en: "// One kit, every trade", fr: "// Un kit, tous les métiers" },
  "sec.title.a": { en: "Data-driven for", fr: "Data-driven pour" },
  "sec.title.b": { en: "any field business.", fr: "n'importe quel métier terrain." },
  "sec.lead": {
    en: "From the garage-door installer to the landscaper, the pricing engine and pages adapt to your trade. Swap the services, the colors and the catalog — the system fits.",
    fr: "De l'installateur de portes de garage au paysagiste, le moteur de prix et les pages s'adaptent à ton métier. Change les services, les couleurs et le catalogue — le système s'ajuste.",
  },
  "sec.landscaping": { en: "Landscaping", fr: "Paysagement" },
  "sec.garage": { en: "Garage doors", fr: "Portes de garage" },
  "sec.plumbing": { en: "Plumbing", fr: "Plomberie" },
  "sec.pest": { en: "Pest control", fr: "Extermination" },
  "sec.painting": { en: "Painting", fr: "Peinture" },
  "sec.snow": { en: "Snow removal", fr: "Déneigement" },
  "sec.windows": { en: "Window cleaning", fr: "Lavage de vitres" },
  "sec.electric": { en: "Electrical", fr: "Électricité" },
  "sec.hvac": { en: "HVAC", fr: "CVAC" },
  "sec.roofing": { en: "Roofing", fr: "Toiture" },
  "sec.more": { en: "…and your trade too", fr: "…et ton métier aussi" },

  // ── Tech stack ────────────────────────────────────────────────
  "stack.kicker": {
    en: "// Formula-1 tech under the hood",
    fr: "// De la techno Formule 1 sous le capot",
  },
  "stack.title.a": { en: "The fastest stack", fr: "La pile la plus rapide" },
  "stack.title.b": { en: "in field service.", fr: "du service terrain." },
  "stack.lead": {
    en: "Industrial-grade engineering for the price of peanuts. The whole thing is so optimized it sleeps when nobody clicks — which is why your infrastructure costs almost nothing.",
    fr: "De l'ingénierie de calibre industriel pour des pinottes. Le tout est si optimisé qu'il dort quand personne ne clique — c'est pourquoi ton infrastructure ne coûte presque rien.",
  },
  "stack.bun.t": { en: "Bun", fr: "Bun" },
  "stack.bun.d": {
    en: "A particle accelerator instead of Node.js — installs in seconds, builds at absurd speed.",
    fr: "Un accélérateur de particules à la place de Node.js — installe en secondes, compile à une vitesse absurde.",
  },
  "stack.tanstack.t": { en: "TanStack Start", fr: "TanStack Start" },
  "stack.tanstack.d": {
    en: "Server + client in one type-safe file. SSR so the app appears instantly on a phone in the sun.",
    fr: "Serveur + client dans un seul fichier type-safe. SSR pour que l'app apparaisse instantanément sur un cell au soleil.",
  },
  "stack.vercel.t": { en: "Vercel Edge", fr: "Vercel Edge" },
  "stack.vercel.d": {
    en: "Your code runs on the serverless node nearest the customer — Montréal, Vancouver or Europe.",
    fr: "Ton code roule sur le nœud serverless le plus proche du client — Montréal, Vancouver ou l'Europe.",
  },
  "stack.supabase.t": { en: "Supabase", fr: "Supabase" },
  "stack.supabase.d": {
    en: "Postgres with strict row-level security. Your data, on your account, isolated and yours.",
    fr: "Postgres avec sécurité stricte au niveau des lignes. Tes données, sur ton compte, isolées et à toi.",
  },
  "stack.resend.t": { en: "Resend", fr: "Resend" },
  "stack.resend.d": {
    en: 'Lightning-fast transactional email — quotes, "on the way" alerts and invoices, delivered.',
    fr: "Email transactionnel ultra-rapide — soumissions, alertes « en route » et factures, livrés.",
  },
  "stack.adv.title": { en: "Why it's a sales weapon", fr: "Pourquoi c'est une arme de vente" },
  "stack.adv.1.t": { en: "Ridiculous infra cost", fr: "Coût d'infra ridicule" },
  "stack.adv.1.d": {
    en: "$0–10 / mo. No idle $80 server burning money per client.",
    fr: "0–10 $ / mois. Pas de serveur à 80 $ qui roule dans le vide par client.",
  },
  "stack.adv.2.t": { en: "Instant on mobile", fr: "Instantané sur mobile" },
  "stack.adv.2.d": {
    en: "Techs in the field never wait on a white loading screen.",
    fr: "Les gars sur le terrain n'attendent jamais un écran blanc.",
  },
  "stack.adv.3.t": { en: "Near-zero maintenance", fr: "Maintenance quasi nulle" },
  "stack.adv.3.d": {
    en: "Lean, strict, standardized code that doesn't break on every update.",
    fr: "Code épuré, strict et standardisé qui ne pète pas à chaque mise à jour.",
  },

  // ── FAQ ───────────────────────────────────────────────────────
  "faq.kicker": { en: "// Straight answers", fr: "// Des réponses claires" },
  "faq.title": { en: "Questions, answered", fr: "Questions, répondues" },
  "faq.q1": { en: "Do I really own it?", fr: "Est-ce que je le possède vraiment ?" },
  "faq.a1": {
    en: "Yes. You pay once and the licence is yours for life — transferable, like a tool kit. It runs on your own accounts, so there's no platform that can lock you out or shut it down.",
    fr: "Oui. Tu paies une fois et la licence est à toi à vie — transférable, comme un coffre d'outils. Ça roule sur tes propres comptes, donc aucune plateforme ne peut te barrer ou tout fermer.",
  },
  "faq.q2": {
    en: "What does the $0–10/mo actually cover?",
    fr: "Le 0–10 $/mois couvre quoi au juste ?",
  },
  "faq.a2": {
    en: "Just raw infrastructure (Vercel, Supabase, Resend) on your own accounts. The stack is so light it mostly sits inside free tiers; you only pay at cost if your volume explodes. No middleman margin, ever.",
    fr: "Juste l'infrastructure brute (Vercel, Supabase, Resend) sur tes propres comptes. La pile est si légère qu'elle reste surtout dans les forfaits gratuits ; tu ne paies au coût que si ton volume explose. Aucune marge d'intermédiaire, jamais.",
  },
  "faq.q3": { en: "Is it really bilingual?", fr: "C'est vraiment bilingue ?" },
  "faq.a3": {
    en: "The public site and the admin are fully FR/EN, and the language auto-detects from the visitor's device. A Québécois customer and an English one each get their own.",
    fr: "Le site public et l'admin sont entièrement FR/EN, et la langue se détecte automatiquement selon l'appareil du visiteur. Un client québécois et un anglophone ont chacun le leur.",
  },
  "faq.q4": {
    en: "What if I need changes later?",
    fr: "Et si j'ai besoin de changements plus tard ?",
  },
  "faq.a4": {
    en: "Your team, services, colors, hours and contact info are all editable in the admin — no developer needed. For deeper custom work, you own the code, so any developer can pick it up.",
    fr: "Ton équipe, tes services, tes couleurs, tes heures et tes coordonnées sont tous éditables dans l'admin — sans développeur. Pour du sur-mesure plus poussé, tu possèdes le code, donc n'importe quel développeur peut le reprendre.",
  },
  "faq.q5": { en: "Can it grow with my business?", fr: "Ça grandit avec ma business ?" },
  "faq.a5": {
    en: "The model is one deployment per client today — clean, robust and immediately yours. The architecture is built to move to true multi-tenant later without rebuilding your data.",
    fr: "Le modèle est un déploiement par client aujourd'hui — propre, robuste et à toi immédiatement. L'architecture est bâtie pour passer au vrai multi-tenant plus tard sans refaire tes données.",
  },
  "faq.q6": {
    en: "How long until I'm live?",
    fr: "Ça prend combien de temps avant d'être en ligne ?",
  },
  "faq.a6": {
    en: "Once your instance is deployed, you fill in your business and you can be live in minutes. Book a demo and we'll scope your trade and timeline.",
    fr: "Une fois ton instance déployée, tu remplis ta business et tu peux être en ligne en quelques minutes. Réserve une démo et on cadre ton métier et ton échéancier.",
  },

  // ── Final CTA ─────────────────────────────────────────────────
  "cta.title.a": { en: "Stop renting", fr: "Arrête de louer" },
  "cta.title.b": { en: "your own tools.", fr: "tes propres outils." },
  "cta.lead": {
    en: "Book a free 20-minute demo. We'll show you your future site and CRM, in your colors, and the exact numbers on your payback.",
    fr: "Réserve une démo gratuite de 20 minutes. On te montre ton futur site et CRM, à tes couleurs, avec les chiffres exacts de ta rentabilité.",
  },
  "cta.button": { en: "Book my demo", fr: "Réserver ma démo" },
  "cta.secondary": { en: "Read the manifesto", fr: "Lire le manifeste" },

  // ── Contact ───────────────────────────────────────────────────
  "ct.kicker": { en: "// Book a demo", fr: "// Réserver une démo" },
  "ct.title": { en: "Let's scope your kit", fr: "Cadrons ton kit" },
  "ct.lead": {
    en: "Tell us your trade and what you pay today. We'll come back fast with a tailored demo and a one-time price.",
    fr: "Dis-nous ton métier et ce que tu paies aujourd'hui. On revient vite avec une démo sur mesure et un prix unique.",
  },
  "ct.info.email": { en: "Email", fr: "Courriel" },
  "ct.info.response": { en: "Typical reply", fr: "Réponse habituelle" },
  "ct.info.response.v": { en: "Within 1 business day", fr: "En 1 jour ouvrable" },
  "ct.info.region": { en: "Based in", fr: "Basé à" },
  "ct.info.region.v": { en: "Québec · serving everywhere", fr: "Québec · partout au service" },
  "ct.f.name": { en: "Name", fr: "Nom" },
  "ct.f.email": { en: "Email", fr: "Courriel" },
  "ct.f.business": { en: "Business / trade", fr: "Business / métier" },
  "ct.f.spend": {
    en: "Current monthly software spend (optional)",
    fr: "Dépense logicielle mensuelle actuelle (optionnel)",
  },
  "ct.f.message": { en: "What do you want automated?", fr: "Que veux-tu automatiser ?" },
  "ct.f.name.ph": { en: "Jean Tremblay", fr: "Jean Tremblay" },
  "ct.f.email.ph": { en: "you@email.com", fr: "toi@courriel.com" },
  "ct.f.business.ph": { en: "Tremblay Landscaping", fr: "Paysagement Tremblay" },
  "ct.f.spend.ph": { en: "$200 / mo", fr: "200 $ / mois" },
  "ct.f.message.ph": {
    en: "I quote by hand, dispatch by text and invoice in Excel…",
    fr: "Je soumissionne à la main, je répartis par texto et je facture dans Excel…",
  },
  "ct.f.send": { en: "Book my demo", fr: "Réserver ma démo" },
  "ct.f.sending": { en: "Sending…", fr: "Envoi en cours…" },
  "ct.f.sent": { en: "Sent — we'll be in touch!", fr: "Envoyé — on te revient !" },
  "ct.err.name": { en: "Please enter your name.", fr: "Entre ton nom." },
  "ct.err.email": { en: "Enter a valid email.", fr: "Entre un courriel valide." },
  "ct.err.message": {
    en: "Tell us a bit about your needs (10 characters min.).",
    fr: "Décris brièvement ton besoin (10 caractères min.).",
  },
  "ct.toast.ok": { en: "Demo request sent!", fr: "Demande de démo envoyée !" },
  "ct.toast.ok.d": {
    en: "Thanks — we'll reply within one business day.",
    fr: "Merci — on répond en 1 jour ouvrable.",
  },
  "ct.toast.err": { en: "Could not send", fr: "Échec de l'envoi" },
  "ct.toast.err.d": {
    en: "Please retry or email us directly.",
    fr: "Réessaie ou écris-nous directement.",
  },

  // ── Manifesto ─────────────────────────────────────────────────
  "man.kicker": { en: "// The manifesto", fr: "// Le manifeste" },
  "man.title.a": { en: "A hard no", fr: "Un non catégorique" },
  "man.title.b": { en: "to monthly rent.", fr: "au loyer mensuel." },
  "man.p1": {
    en: "The modern subscription model has become an operating tax on small business. Agencies and rigid platforms lock local entrepreneurs into closed, ugly, generic systems — paid month after month for tools they will never own and that never talk to each other.",
    fr: "Le modèle d'abonnement moderne est devenu une taxe d'exploitation imposée aux PME. Les agences et les plateformes rigides enferment les entrepreneurs locaux dans des systèmes fermés, laids et génériques — payés mois après mois pour des outils qu'ils ne posséderont jamais et qui ne se parlent pas.",
  },
  "man.p2": {
    en: "Wizard Ops breaks the rule. We hand financial and technological control back to local trades by selling simplified software engineering as a single licence — transferable, and yours to use for life. No heavy ERP. Just the essentials, automated.",
    fr: "Wizard Ops casse la règle. On redonne le contrôle financier et technologique aux métiers locaux en vendant une ingénierie logicielle simplifiée sous forme de licence unique — transférable, et à toi à vie. Pas d'ERP lourd. Juste l'essentiel, automatisé.",
  },
  "man.p3": {
    en: "It's a tangible asset, not a rental — like buying a Milwaukee drill kit instead of leasing one forever. Welded to your operations, branded to your colors, and paid for once. In under two years, it has paid for itself. After that, the money stays in your pocket.",
    fr: "C'est un actif tangible, pas une location — comme acheter un kit de drills Milwaukee au lieu d'en louer un à vie. Soudé à tes opérations, à tes couleurs, et payé une seule fois. En moins de deux ans, c'est rentabilisé. Après ça, l'argent reste dans tes poches.",
  },
  "man.pull": {
    en: "You buy your kit once. You own it for life.",
    fr: "Tu achètes ton kit une fois. Tu le possèdes à vie.",
  },
  "man.sib": {
    en: "Wizard Ops is the agile little brother of Ops Companion, the heavy industrial ERP for heavy machinery. Ops Companion runs the big iron; Wizard Ops is the perfect bundle for the local service SMB.",
    fr: "Wizard Ops est le petit frère agile de Ops Companion, le gros ERP industriel pour la machinerie lourde. Ops Companion gère la grosse machine ; Wizard Ops est le bundle parfait pour la PME de services locale.",
  },
  "man.author": {
    en: "— Sébastien Germain, Senior Software Architect",
    fr: "— Sébastien Germain, architecte logiciel senior",
  },
  "man.cta": { en: "Book a demo", fr: "Réserver une démo" },

  // ── Footer ────────────────────────────────────────────────────
  "ft.tagline": {
    en: "Lifetime software for local field-service businesses. Buy your kit once, own it forever.",
    fr: "Logiciel à vie pour les business de service terrain. Achète ton kit une fois, possède-le à vie.",
  },
  "ft.product": { en: "Product", fr: "Produit" },
  "ft.company": { en: "Company", fr: "Entreprise" },
  "ft.lineage": { en: "Adjacent to Ops Companion", fr: "Adossé à Ops Companion" },
  "ft.rights": { en: "All rights reserved.", fr: "Tous droits réservés." },
  "ft.built": {
    en: "Built on TanStack Start · Bun · Vercel",
    fr: "Bâti sur TanStack Start · Bun · Vercel",
  },

  // ── Toggles ───────────────────────────────────────────────────
  "lang.toggle": { en: "Passer au français", fr: "Switch to English" },
  "theme.toggle": { en: "Toggle theme", fr: "Basculer le thème" },
} as const;

export type TKey = keyof typeof dict;

function detectLang(): Lang {
  if (typeof navigator === "undefined") return "en";
  const langs = navigator.languages?.length ? navigator.languages : [navigator.language];
  return langs.some((l) => l?.toLowerCase().startsWith("fr")) ? "fr" : "en";
}

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (k: TKey) => string };
const LangContext = createContext<Ctx | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  // SSR renders English first (primary language); the client resolves the real
  // preference (stored choice → device language) on mount to avoid hydration drift.
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const stored =
      (typeof window !== "undefined" && (localStorage.getItem(STORAGE_KEY) as Lang | null)) || null;
    const next = stored ?? detectLang();
    setLangState(next);
    if (typeof document !== "undefined") document.documentElement.lang = next;
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") localStorage.setItem(STORAGE_KEY, l);
    if (typeof document !== "undefined") document.documentElement.lang = l;
  };

  const t = (k: TKey) => dict[k][lang];
  return <LangContext.Provider value={{ lang, setLang, t }}>{children}</LangContext.Provider>;
}

export function useT() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useT must be used inside LanguageProvider");
  return ctx;
}
