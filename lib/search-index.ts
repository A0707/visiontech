import { products } from "./products";
import { blogPosts } from "./blog";
import { portfolioProjects } from "./portfolio";

export type SearchKind = "Service" | "Produit" | "Article" | "Réalisation" | "Page";

export interface SearchEntry {
  kind: SearchKind;
  title: string;
  description: string;
  href: string;
  /** Termes additionnels non affichés mais pris en compte dans la recherche. */
  keywords?: string[];
}

/** Services et pages statiques — pas de source de données dédiée. */
const staticEntries: SearchEntry[] = [
  {
    kind: "Service",
    title: "Infrastructure IT",
    description: "Réseaux, serveurs et postes de travail robustes et évolutifs.",
    href: "/services#infrastructure",
    keywords: ["réseau", "lan", "wan", "serveur", "câblage", "switch", "datacenter"],
  },
  {
    kind: "Service",
    title: "Cloud & Hybride",
    description: "Migration cloud, architectures hybrides et optimisation des coûts.",
    href: "/services#cloud",
    keywords: ["azure", "aws", "migration", "sauvegarde", "pra", "finops"],
  },
  {
    kind: "Service",
    title: "Cybersécurité",
    description: "Audit, EDR, pare-feu nouvelle génération et supervision SOC.",
    href: "/services#securite",
    keywords: ["sécurité", "pentest", "edr", "xdr", "firewall", "siem", "soc", "audit"],
  },
  {
    kind: "Service",
    title: "Support & Maintenance",
    description: "Assistance réactive et contrats adaptés à la criticité de vos systèmes.",
    href: "/services#support",
    keywords: ["support", "maintenance", "assistance", "monitoring", "astreinte"],
  },
  {
    kind: "Service",
    title: "Microsoft 365",
    description: "Déploiement, sécurisation et administration de votre suite collaborative.",
    href: "/services#cloud",
    keywords: ["office", "exchange", "sharepoint", "teams", "intune", "m365"],
  },
  {
    kind: "Service",
    title: "Wi-Fi Professionnel",
    description: "Couverture haute densité et gestion centralisée.",
    href: "/services#infrastructure",
    keywords: ["wifi", "wi-fi", "sans fil", "point d'accès", "borne"],
  },
  {
    kind: "Page",
    title: "Contrats de maintenance",
    description: "Comparez les formules Essentiel, Business et Premium.",
    href: "/maintenance",
    keywords: ["contrat", "sla", "tarif", "prix", "formule", "abonnement"],
  },
  {
    kind: "Page",
    title: "Demander un audit gratuit",
    description: "Contactez nos experts pour un diagnostic de votre infrastructure.",
    href: "/contact",
    keywords: ["contact", "devis", "audit", "rendez-vous", "téléphone", "email"],
  },
  {
    kind: "Page",
    title: "Calculateur de devis",
    description: "Estimez le budget de votre projet en quelques clics.",
    href: "/devis",
    keywords: ["devis", "estimation", "budget", "prix", "calculateur", "simulateur"],
  },
  {
    kind: "Page",
    title: "Centre de téléchargement",
    description: "Outils de prise en main à distance et documentation.",
    href: "/downloads",
    keywords: ["téléchargement", "download", "teamviewer", "anydesk", "forticlient", "assistance"],
  },
  {
    kind: "Page",
    title: "À propos de VisionTech",
    description: "Notre mission, nos valeurs, notre équipe et notre parcours.",
    href: "/a-propos",
    keywords: ["équipe", "histoire", "mission", "valeurs", "société", "entreprise"],
  },
  {
    kind: "Page",
    title: "Carrières",
    description: "Rejoignez les équipes de VisionTech à Casablanca.",
    href: "/carrieres",
    keywords: ["emploi", "recrutement", "job", "candidature", "stage"],
  },
];

/** Index unifié construit une seule fois au chargement du module. */
export const searchIndex: SearchEntry[] = [
  ...staticEntries,
  ...products.map((p) => ({
    kind: "Produit" as const,
    title: p.name,
    description: p.brand ? `${p.brand} · ${p.description}` : p.description,
    href: `/boutique/${p.id}`,
    keywords: [
      p.category,
      ...(p.brand ? [p.brand] : []),
      ...(p.searchTerms ?? []),
      ...(p.specs?.map((s) => s.value) ?? []),
    ],
  })),
  ...blogPosts.map((post) => ({
    kind: "Article" as const,
    title: post.title,
    description: post.excerpt,
    href: `/blog/${post.slug}`,
    keywords: [post.category, post.author],
  })),
  ...portfolioProjects.map((project) => ({
    kind: "Réalisation" as const,
    title: project.title,
    description: project.description,
    href: `/portfolio/${project.id}`,
    keywords: [project.category, project.sector, ...project.technologies],
  })),
];

/** Normalise pour une recherche insensible à la casse et aux accents. */
function normalize(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export function searchAll(query: string, limit = 8): SearchEntry[] {
  const q = normalize(query.trim());
  if (q.length < 2) return [];

  const terms = q.split(/\s+/);

  return searchIndex
    .map((entry) => {
      const haystack = normalize(
        [entry.title, entry.description, entry.kind, ...(entry.keywords ?? [])].join(" ")
      );
      const titleNorm = normalize(entry.title);

      // Tous les termes doivent être présents quelque part.
      if (!terms.every((t) => haystack.includes(t))) return null;

      // Un résultat dont le titre commence par la requête remonte en tête.
      let score = 0;
      if (titleNorm.startsWith(q)) score += 100;
      else if (titleNorm.includes(q)) score += 50;
      if (entry.kind === "Produit" || entry.kind === "Service") score += 5;

      return { entry, score };
    })
    .filter((r): r is { entry: SearchEntry; score: number } => r !== null)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((r) => r.entry);
}
