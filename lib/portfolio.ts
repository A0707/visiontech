import type { LucideIcon } from "lucide-react";
import { Server, Cloud, ShieldCheck, Layers, AppWindow, Wifi } from "lucide-react";

export type PortfolioCategory =
  | "Infrastructure"
  | "Cloud"
  | "Cybersécurité"
  | "Virtualisation"
  | "Microsoft 365"
  | "Wi-Fi";

export interface PortfolioProject {
  id: string;
  title: string;
  client: string;
  category: PortfolioCategory;
  description: string;
  technologies: string[];
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

/** Exemples illustratifs — à remplacer par de vrais projets clients avant publication. */
export const portfolioProjects: PortfolioProject[] = [
  {
    id: "refonte-reseau-industriel",
    title: "Refonte réseau d'un site industriel",
    client: "Groupe industriel, Casablanca",
    category: "Infrastructure",
    description:
      "Modernisation complète du réseau LAN/WAN sur 3 bâtiments, avec redondance et supervision centralisée.",
    technologies: ["Cisco", "Fibre optique", "VLAN", "QoS"],
    result: "Zéro incident réseau depuis la mise en production.",
    icon: Server,
  },
  {
    id: "migration-cloud-hybride",
    title: "Migration vers un environnement hybride",
    client: "Cabinet de conseil",
    category: "Cloud",
    description:
      "Bascule progressive de l'infrastructure on-premise vers un environnement cloud hybride sécurisé.",
    technologies: ["Azure", "VPN Site-to-Site", "Sauvegarde cloud"],
    result: "Réduction de 30% des coûts d'infrastructure.",
    icon: Cloud,
  },
  {
    id: "audit-securite-fintech",
    title: "Audit et durcissement sécurité",
    client: "Fintech, Casablanca",
    category: "Cybersécurité",
    description:
      "Audit complet du système d'information, remédiation des vulnérabilités critiques et mise en place d'un EDR.",
    technologies: ["Pentest", "EDR", "Pare-feu NGFW"],
    result: "12 vulnérabilités critiques corrigées en 3 semaines.",
    icon: ShieldCheck,
  },
  {
    id: "consolidation-virtualisation",
    title: "Consolidation de serveurs",
    client: "Groupe de distribution",
    category: "Virtualisation",
    description:
      "Virtualisation de 18 serveurs physiques vers une infrastructure hyperconvergée haute disponibilité.",
    technologies: ["VMware vSphere", "SAN", "Cluster HA"],
    result: "Réduction de 60% de la consommation électrique du datacenter.",
    icon: Layers,
  },
  {
    id: "deploiement-m365",
    title: "Déploiement Microsoft 365",
    client: "Cabinet d'avocats",
    category: "Microsoft 365",
    description:
      "Migration de la messagerie et des fichiers vers Microsoft 365 avec politiques de sécurité et conformité.",
    technologies: ["Exchange Online", "SharePoint", "Intune"],
    result: "Migration de 80 postes sans interruption d'activité.",
    icon: AppWindow,
  },
  {
    id: "wifi-hopital",
    title: "Couverture Wi-Fi haute densité",
    client: "Clinique privée",
    category: "Wi-Fi",
    description:
      "Déploiement d'un réseau Wi-Fi 6 sur 4 étages avec authentification sécurisée pour le personnel médical.",
    technologies: ["Wi-Fi 6", "802.1X", "Gestion centralisée cloud"],
    result: "Couverture homogène à 100%, zéro zone blanche.",
    icon: Wifi,
  },
];
