import type { LucideIcon } from "lucide-react";
import { Server, Cloud, ShieldCheck, Layers, AppWindow, Wifi } from "lucide-react";

export type PortfolioCategory =
  | "Infrastructure"
  | "Cloud"
  | "Cybersécurité"
  | "Virtualisation"
  | "Microsoft 365"
  | "Wi-Fi";

/** Indicateur chiffré mis en avant sur la carte et la page détail. */
export interface ProjectMetric {
  value: string;
  label: string;
}

export interface PortfolioProject {
  id: string;
  title: string;
  client: string;
  sector: string;
  category: PortfolioCategory;
  /** Résumé court affiché sur la carte. */
  description: string;
  /** Étude de cas structurée (page détail). */
  challenge: string;
  solution: string[];
  outcome: string;
  metrics: ProjectMetric[];
  technologies: string[];
  duration: string;
  /** Phrase de synthèse affichée sur la carte. */
  result: string;
  icon: LucideIcon;
}

export const portfolioCategories: PortfolioCategory[] = [
  "Infrastructure",
  "Cloud",
  "Cybersécurité",
  "Virtualisation",
  "Microsoft 365",
  "Wi-Fi",
];

/**
 * ⚠️ Études de cas illustratives — à remplacer par de vrais projets avant
 * publication, et uniquement avec l'accord écrit des clients concernés
 * (mention du nom, du secteur et des chiffres).
 */
export const portfolioProjects: PortfolioProject[] = [
  {
    id: "refonte-reseau-industriel",
    title: "Refonte réseau d'un site industriel",
    client: "Groupe industriel",
    sector: "Industrie — Casablanca",
    category: "Infrastructure",
    description:
      "Modernisation complète du réseau LAN/WAN sur 3 bâtiments, avec redondance et supervision centralisée.",
    challenge:
      "Le site subissait des coupures réseau hebdomadaires paralysant la chaîne de production. L'infrastructure reposait sur des switches non managés vieux de douze ans, sans documentation ni redondance : chaque panne nécessitait plusieurs heures de diagnostic à l'aveugle.",
    solution: [
      "Audit complet du câblage existant et cartographie des flux critiques",
      "Remplacement des switches par une architecture cœur/distribution redondante",
      "Segmentation en VLAN séparant production, bureautique et supervision",
      "Liaison fibre entre les trois bâtiments avec basculement automatique",
      "Mise en place d'une supervision centralisée avec alerting proactif",
    ],
    outcome:
      "La migration s'est déroulée sur trois week-ends successifs, sans interruption de production. Le site n'a connu aucune coupure réseau depuis la mise en service.",
    metrics: [
      { value: "0", label: "Coupure depuis la migration" },
      { value: "99,98 %", label: "Disponibilité mesurée" },
      { value: "-85 %", label: "Temps de diagnostic" },
    ],
    technologies: ["Cisco Catalyst", "Fibre optique OM4", "VLAN 802.1Q", "QoS", "SNMP v3"],
    duration: "6 semaines",
    result: "Zéro incident réseau depuis la mise en production.",
    icon: Server,
  },
  {
    id: "migration-cloud-hybride",
    title: "Migration vers un environnement hybride",
    client: "Cabinet de conseil",
    sector: "Services — Casablanca",
    category: "Cloud",
    description:
      "Bascule progressive de l'infrastructure on-premise vers un environnement cloud hybride sécurisé.",
    challenge:
      "Le cabinet arrivait en fin de vie de ses serveurs physiques et faisait face à un devis de renouvellement matériel élevé. Les consultants, souvent en déplacement, peinaient à accéder aux dossiers depuis l'extérieur via un VPN saturé.",
    solution: [
      "Analyse des charges de travail pour identifier ce qui gagnait réellement à migrer",
      "Migration de la messagerie et du stockage documentaire vers le cloud",
      "Maintien en interne de l'applicatif métier pour raisons de latence",
      "Interconnexion sécurisée site-à-site entre le cabinet et le cloud",
      "Optimisation FinOps des ressources après trois mois d'usage réel",
    ],
    outcome:
      "L'infrastructure hybride a supprimé l'investissement matériel prévu tout en rendant les dossiers accessibles en mobilité. L'ajustement FinOps a réduit la facture cloud initiale d'un tiers.",
    metrics: [
      { value: "-30 %", label: "Coût d'infrastructure annuel" },
      { value: "100 %", label: "Dossiers accessibles en mobilité" },
      { value: "0", label: "Investissement matériel" },
    ],
    technologies: ["Microsoft Azure", "VPN Site-to-Site", "Azure Backup", "Entra ID"],
    duration: "4 mois",
    result: "Réduction de 30% des coûts d'infrastructure.",
    icon: Cloud,
  },
  {
    id: "audit-securite-fintech",
    title: "Audit et durcissement sécurité",
    client: "Fintech",
    sector: "Services financiers — Casablanca",
    category: "Cybersécurité",
    description:
      "Audit complet du système d'information, remédiation des vulnérabilités critiques et mise en place d'un EDR.",
    challenge:
      "En vue d'une levée de fonds, la société devait démontrer un niveau de sécurité conforme aux attentes de ses investisseurs. Aucun audit n'avait jamais été mené, et les postes de travail ne disposaient que d'un antivirus grand public.",
    solution: [
      "Test d'intrusion externe et interne sur l'ensemble du périmètre",
      "Revue des droits d'accès et suppression des comptes orphelins",
      "Déploiement d'un EDR sur l'intégralité du parc",
      "Mise en place de l'authentification forte sur tous les accès critiques",
      "Session de sensibilisation au phishing pour l'ensemble des équipes",
    ],
    outcome:
      "Les douze vulnérabilités critiques identifiées ont été corrigées en trois semaines. Le rapport d'audit a été présenté aux investisseurs lors de la due diligence technique.",
    metrics: [
      { value: "12", label: "Vulnérabilités critiques corrigées" },
      { value: "3 semaines", label: "Délai de remédiation" },
      { value: "100 %", label: "Postes couverts par l'EDR" },
    ],
    technologies: ["Pentest", "EDR/XDR", "Pare-feu NGFW", "MFA", "SIEM"],
    duration: "8 semaines",
    result: "12 vulnérabilités critiques corrigées en 3 semaines.",
    icon: ShieldCheck,
  },
  {
    id: "consolidation-virtualisation",
    title: "Consolidation de serveurs",
    client: "Groupe de distribution",
    sector: "Distribution — Casablanca",
    category: "Virtualisation",
    description:
      "Virtualisation de 18 serveurs physiques vers une infrastructure hyperconvergée haute disponibilité.",
    challenge:
      "Dix-huit serveurs physiques hétérogènes occupaient deux baies complètes, avec une facture électrique et une charge de climatisation en hausse continue. Le taux d'utilisation moyen des processeurs ne dépassait pas 12 %.",
    solution: [
      "Inventaire des applicatifs et mesure de la charge réelle sur trois mois",
      "Dimensionnement d'un cluster hyperconvergé à trois nœuds",
      "Migration progressive des serveurs par lots, applicatif par applicatif",
      "Mise en place de la haute disponibilité avec bascule automatique",
      "Décommissionnement du matériel obsolète et libération d'une baie",
    ],
    outcome:
      "La consolidation a divisé par plus de deux la consommation électrique du local technique et libéré une baie entière, désormais utilisée pour le stockage de sauvegarde.",
    metrics: [
      { value: "-60 %", label: "Consommation électrique" },
      { value: "18 → 3", label: "Serveurs physiques" },
      { value: "< 2 min", label: "Bascule en cas de panne" },
    ],
    technologies: ["VMware vSphere", "vSAN", "Cluster HA", "Veeam Backup"],
    duration: "10 semaines",
    result: "Réduction de 60% de la consommation électrique du datacenter.",
    icon: Layers,
  },
  {
    id: "deploiement-m365",
    title: "Déploiement Microsoft 365",
    client: "Cabinet d'avocats",
    sector: "Juridique — Casablanca",
    category: "Microsoft 365",
    description:
      "Migration de la messagerie et des fichiers vers Microsoft 365 avec politiques de sécurité et conformité.",
    challenge:
      "Le cabinet utilisait un serveur de messagerie interne vieillissant et des partages réseau sans politique de rétention. La confidentialité des dossiers clients imposait un contrôle strict des accès et une traçabilité complète.",
    solution: [
      "Migration des boîtes aux lettres sans interruption de service",
      "Reprise de l'arborescence documentaire vers SharePoint",
      "Politiques de rétention et de classification des documents sensibles",
      "Gestion des appareils et chiffrement imposé via Intune",
      "Formation des utilisateurs sur deux demi-journées",
    ],
    outcome:
      "Les 80 postes ont été migrés sur un week-end, sans perte de données ni interruption. Le cabinet dispose désormais d'une traçabilité complète des accès aux dossiers.",
    metrics: [
      { value: "80", label: "Postes migrés" },
      { value: "0", label: "Interruption d'activité" },
      { value: "100 %", label: "Appareils chiffrés" },
    ],
    technologies: ["Exchange Online", "SharePoint", "Microsoft Intune", "Purview"],
    duration: "5 semaines",
    result: "Migration de 80 postes sans interruption d'activité.",
    icon: AppWindow,
  },
  {
    id: "wifi-clinique",
    title: "Couverture Wi-Fi haute densité",
    client: "Clinique privée",
    sector: "Santé — Casablanca",
    category: "Wi-Fi",
    description:
      "Déploiement d'un réseau Wi-Fi 6 sur 4 étages avec authentification sécurisée pour le personnel médical.",
    challenge:
      "Le personnel soignant utilisait des tablettes pour la saisie des dossiers patients, mais la couverture Wi-Fi existante présentait des zones blanches dans les chambres et au bloc. Les déconnexions entraînaient des pertes de saisie répétées.",
    solution: [
      "Étude radio sur site avec relevé de couverture étage par étage",
      "Déploiement de points d'accès Wi-Fi 6 dimensionnés pour la haute densité",
      "Réseaux séparés pour le personnel médical, l'administration et les patients",
      "Authentification par certificat pour les équipements médicaux",
      "Itinérance sans coupure entre les points d'accès",
    ],
    outcome:
      "La couverture est désormais homogène sur les quatre étages, y compris au bloc opératoire. Les pertes de saisie liées aux déconnexions ont disparu.",
    metrics: [
      { value: "0", label: "Zone blanche" },
      { value: "4", label: "Étages couverts" },
      { value: "3 réseaux", label: "Segmentation sécurisée" },
    ],
    technologies: ["Wi-Fi 6 (802.11ax)", "802.1X", "RADIUS", "Gestion cloud"],
    duration: "3 semaines",
    result: "Couverture homogène à 100%, zéro zone blanche.",
    icon: Wifi,
  },
];

export function getProject(id: string) {
  return portfolioProjects.find((p) => p.id === id);
}
