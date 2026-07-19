import type { LucideIcon } from "lucide-react";
import { ShieldCheck, Cloud, Server, Activity } from "lucide-react";

export type BlogCategory = "Cybersécurité" | "Cloud" | "Infrastructure" | "Actualités";

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  category: BlogCategory;
  author: string;
  authorRole: string;
  date: string;
  readingTime: number;
  icon: LucideIcon;
}

export const blogCategories: BlogCategory[] = ["Cybersécurité", "Cloud", "Infrastructure", "Actualités"];

export const blogPosts: BlogPost[] = [
  {
    slug: "5-signes-infrastructure-it-vieillissante",
    title: "5 signes que votre infrastructure IT devient un risque",
    excerpt:
      "Pannes récurrentes, lenteurs, matériel obsolète : comment repérer les signaux avant qu'ils ne coûtent cher à votre entreprise.",
    content: [
      "Une infrastructure IT vieillissante ne tombe rarement en panne d'un coup — elle se dégrade progressivement, jusqu'à ce que le coût de l'inaction dépasse largement celui d'une modernisation planifiée.",
      "Premier signal : des pannes de plus en plus fréquentes sur les mêmes équipements. Un serveur qui redémarre seul une fois par trimestre est un avertissement, pas un incident isolé.",
      "Deuxième signal : l'absence de pièces de rechange ou de support constructeur. Quand un fournisseur arrête de maintenir un modèle, chaque panne devient une urgence sans solution rapide.",
      "Troisième signal : des sauvegardes jamais testées. Une sauvegarde qui existe mais n'a jamais été restaurée en conditions réelles n'est qu'une hypothèse de sécurité.",
      "Quatrième signal : la dépendance à une seule personne qui \"sait comment ça marche\". C'est un risque organisationnel autant que technique.",
      "Cinquième signal : l'absence de supervision proactive. Si vous découvrez les pannes via les utilisateurs plutôt que via un outil de monitoring, vous réagissez toujours trop tard.",
      "Un audit d'infrastructure permet de transformer ces signaux diffus en plan d'action chiffré, avec des priorités claires plutôt qu'une refonte totale dans l'urgence.",
    ],
    category: "Infrastructure",
    author: "Amine Chraibi",
    authorRole: "Responsable Infrastructure",
    date: "2026-05-12",
    readingTime: 4,
    icon: Server,
  },
  {
    slug: "checklist-cybersecurite-pme",
    title: "Cybersécurité : la checklist essentielle pour les PME marocaines",
    excerpt:
      "Vous n'avez pas besoin d'un budget de grand groupe pour réduire drastiquement votre surface d'attaque. Voici les priorités.",
    content: [
      "Les PME sont aujourd'hui des cibles privilégiées : moins protégées que les grands comptes, mais tout aussi connectées à des partenaires et des données sensibles.",
      "Priorité n°1 : l'authentification à deux facteurs sur tous les accès critiques (messagerie, VPN, outils cloud). C'est la mesure au meilleur rapport coût/impact.",
      "Priorité n°2 : des sauvegardes régulières, chiffrées, et surtout isolées du réseau principal — pour résister à une attaque par rançongiciel.",
      "Priorité n°3 : un pare-feu à jour avec des règles revues au moins une fois par an, pas seulement configuré au moment de l'installation.",
      "Priorité n°4 : la sensibilisation des équipes au phishing. La majorité des incidents commencent par un clic, pas par une faille technique.",
      "Priorité n°5 : un inventaire à jour de vos équipements et logiciels. On ne peut pas sécuriser ce que l'on ne sait pas posséder.",
      "Ces cinq mesures ne remplacent pas un audit complet, mais elles réduisent significativement le risque avec un investissement raisonnable.",
    ],
    category: "Cybersécurité",
    author: "Salma Ouazzani",
    authorRole: "Responsable Cybersécurité",
    date: "2026-04-03",
    readingTime: 5,
    icon: ShieldCheck,
  },
  {
    slug: "cloud-hybride-vs-tout-cloud",
    title: "Cloud hybride ou tout-cloud : comment choisir ?",
    excerpt:
      "Migrer entièrement vers le cloud n'est pas toujours la meilleure option. Voici comment trancher selon votre contexte réel.",
    content: [
      "Le \"tout cloud\" est souvent présenté comme l'aboutissement naturel d'une stratégie IT moderne. En pratique, le bon choix dépend de contraintes très concrètes.",
      "Le cloud hybride garde une partie de l'infrastructure on-premise — souvent pour des raisons de latence, de conformité réglementaire, ou d'applications legacy difficiles à migrer.",
      "Le tout-cloud simplifie l'exploitation et la scalabilité, mais transfère une dépendance forte au fournisseur et peut faire grimper les coûts si l'usage n'est pas maîtrisé.",
      "La bonne question n'est pas \"cloud ou pas cloud\" mais \"quelles charges de travail bénéficient réellement du cloud, et lesquelles restent plus stables en interne\".",
      "Un audit FinOps permet souvent de découvrir qu'une partie des ressources cloud existantes est surdimensionnée, avant même de parler de migration supplémentaire.",
    ],
    category: "Cloud",
    author: "Yassine Fassi",
    authorRole: "Fondateur & Directeur technique",
    date: "2026-03-18",
    readingTime: 4,
    icon: Cloud,
  },
  {
    slug: "supervision-proactive-reduire-pannes",
    title: "Pourquoi la supervision proactive réduit vos pannes de 80%",
    excerpt:
      "La majorité des incidents IT sont détectables avant qu'ils n'affectent les utilisateurs — à condition de regarder les bons signaux.",
    content: [
      "La supervision réactive consiste à attendre qu'un utilisateur signale un problème. La supervision proactive détecte les anomalies avant l'impact.",
      "Un disque qui se remplit progressivement, une latence réseau qui augmente, une température serveur anormale : ce sont des signaux faibles, mais mesurables des semaines à l'avance.",
      "La mise en place d'une supervision efficace ne nécessite pas de tout instrumenter d'un coup. Commencer par les équipements critiques (serveurs de production, pare-feu, liens internet) donne déjà un bénéfice immédiat.",
      "L'alerting doit être calibré pour éviter la fatigue d'alerte : trop de notifications non pertinentes tuent l'efficacité du système aussi sûrement que l'absence de supervision.",
      "Coupler supervision et astreinte technique permet de transformer une panne potentielle en simple ligne de log — c'est la différence entre subir et anticiper.",
    ],
    category: "Infrastructure",
    author: "Réda El Amrani",
    authorRole: "Responsable Support & Maintenance",
    date: "2026-02-09",
    readingTime: 3,
    icon: Activity,
  },
];

export function getBlogPost(slug: string) {
  return blogPosts.find((p) => p.slug === slug);
}
