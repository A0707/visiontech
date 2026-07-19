export type ProductCategory =
  | "Réseau"
  | "Serveurs"
  | "Sécurité"
  | "Postes de travail"
  | "Cloud & Licences";

export type StockStatus = "in-stock" | "limited" | "on-order";

export const STOCK_LABELS: Record<StockStatus, string> = {
  "in-stock": "En stock",
  limited: "Stock limité",
  "on-order": "Sur commande",
};

export type ProductBadge = "Nouveau" | "Populaire" | "Meilleure vente" | "Stock limité";

/** Ligne de spécification technique affichée sur la fiche produit. */
export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  sales: number;
  stock: StockStatus;
  /** Spécifications techniques détaillées (fiche produit). */
  specs?: ProductSpec[];
  /** Prix de la prestation d'installation et configuration par VisionTech. */
  installationPrice?: number;
  /** Badge affiché en coin de carte. Ignoré si oldPrice est défini (la remise prime). */
  badge?: ProductBadge;
  /** Marque le produit pour la rangée "Offres du moment" en haut de la boutique. */
  featured?: boolean;
  /** Durée (en heures, à partir du chargement de la page) d'une offre flash réelle et limitée. */
  promoHours?: number;
  description: string;
  image: string;
}

export const products: Product[] = [
  {
    id: "fw-3000",
    name: "Pare-feu VisionShield FW-3000",
    category: "Sécurité",
    price: 18500,
    oldPrice: 21900,
    rating: 4.8,
    reviews: 42,
    sales: 156,
    stock: "in-stock",
    featured: true,
    promoHours: 52,
    description: "Pare-feu nouvelle génération avec IPS, VPN site-à-site et filtrage applicatif.",
    installationPrice: 3500,
    specs: [
      { label: "Débit pare-feu", value: "10 Gbps" },
      { label: "Débit IPS", value: "3,5 Gbps" },
      { label: "Sessions simultanées", value: "2 000 000" },
      { label: "Tunnels VPN IPSec", value: "500" },
      { label: "Interfaces", value: "8 × RJ45 GbE, 2 × SFP+" },
      { label: "Garantie", value: "3 ans retour atelier" },
    ],
    image: "firewall",
  },
  {
    id: "srv-r740",
    name: "Serveur Rack VT PowerEdge R740",
    category: "Serveurs",
    price: 64900,
    rating: 4.9,
    reviews: 27,
    sales: 41,
    stock: "on-order",
    badge: "Populaire",
    description: "Serveur rack 2U double Xeon Silver, 128 Go RAM, idéal pour virtualisation.",
    installationPrice: 6500,
    specs: [
      { label: "Format", value: "Rack 2U" },
      { label: "Processeurs", value: "2 × Intel Xeon Silver 4210R (10 cœurs)" },
      { label: "Mémoire", value: "128 Go DDR4 ECC (extensible 1 To)" },
      { label: "Stockage", value: "4 × 960 Go SSD SAS — RAID 10" },
      { label: "Alimentation", value: "2 × 750W redondantes hot-plug" },
      { label: "Garantie", value: "3 ans sur site J+1" },
    ],
    image: "server",
  },
  {
    id: "sw-24p",
    name: "Switch Manageable 24 ports PoE+",
    category: "Réseau",
    price: 6200,
    oldPrice: 7400,
    rating: 4.6,
    reviews: 63,
    sales: 203,
    stock: "in-stock",
    featured: true,
    description: "Switch niveau 2/3, PoE+ 370W, agrégation de liens, VLAN et QoS.",
    installationPrice: 1800,
    specs: [
      { label: "Ports", value: "24 × RJ45 GbE PoE+, 4 × SFP+" },
      { label: "Budget PoE", value: "370 W" },
      { label: "Capacité de commutation", value: "128 Gbps" },
      { label: "Fonctions", value: "VLAN 802.1Q, LACP, QoS, IGMP snooping" },
      { label: "Administration", value: "Web, CLI, SNMP v3" },
      { label: "Garantie", value: "Garantie à vie limitée" },
    ],
    image: "switch",
  },
  {
    id: "ap-wifi6",
    name: "Point d'accès Wi-Fi 6 Enterprise",
    category: "Réseau",
    price: 3400,
    rating: 4.7,
    reviews: 51,
    sales: 98,
    stock: "in-stock",
    badge: "Nouveau",
    description: "Couverture haute densité, gestion centralisée cloud, jusqu'à 2.4 Gbps.",
    installationPrice: 900,
    specs: [
      { label: "Norme", value: "Wi-Fi 6 (802.11ax)" },
      { label: "Débit théorique", value: "2,4 Gbps (2×2 MU-MIMO)" },
      { label: "Clients simultanés", value: "512" },
      { label: "Alimentation", value: "PoE+ 802.3at" },
      { label: "Sécurité", value: "WPA3, 802.1X, portail captif" },
      { label: "Garantie", value: "2 ans" },
    ],
    image: "wifi",
  },
  {
    id: "nas-8bay",
    name: "NAS Professionnel 8 baies 32To",
    category: "Serveurs",
    price: 22800,
    rating: 4.8,
    reviews: 19,
    sales: 22,
    stock: "limited",
    badge: "Stock limité",
    description: "Stockage RAID redondant, sauvegarde automatisée, snapshot et réplication.",
    installationPrice: 2900,
    specs: [
      { label: "Baies", value: "8 × 3,5\" hot-swap" },
      { label: "Capacité fournie", value: "32 To bruts (8 × 4 To)" },
      { label: "RAID", value: "0/1/5/6/10, SHR" },
      { label: "Réseau", value: "4 × RJ45 GbE (agrégation)" },
      { label: "Fonctions", value: "Snapshots, réplication, chiffrement AES-256" },
      { label: "Garantie", value: "3 ans" },
    ],
    image: "nas",
  },
  {
    id: "edr-license",
    name: "Licence EDR Endpoint Protection (50 postes)",
    category: "Cloud & Licences",
    price: 12500,
    rating: 4.9,
    reviews: 34,
    sales: 287,
    stock: "in-stock",
    badge: "Meilleure vente",
    description: "Détection et réponse aux menaces en temps réel avec IA comportementale.",
    installationPrice: 4500,
    specs: [
      { label: "Postes couverts", value: "50" },
      { label: "Durée", value: "12 mois" },
      { label: "Plateformes", value: "Windows, macOS, Linux" },
      { label: "Détection", value: "Comportementale + signatures + IA" },
      { label: "Console", value: "Cloud centralisée, rapports automatisés" },
      { label: "Support éditeur", value: "24/7 inclus" },
    ],
    image: "shield",
  },
  {
    id: "ups-3kva",
    name: "Onduleur Rack 3000VA/2700W",
    category: "Serveurs",
    price: 9800,
    rating: 4.5,
    reviews: 22,
    sales: 37,
    stock: "in-stock",
    description: "Protection électrique en ligne double conversion pour infrastructures critiques.",
    installationPrice: 1500,
    specs: [
      { label: "Puissance", value: "3000 VA / 2700 W" },
      { label: "Technologie", value: "Online double conversion" },
      { label: "Format", value: "Rack 2U" },
      { label: "Autonomie", value: "~8 min à pleine charge" },
      { label: "Sorties", value: "8 × IEC C13, 1 × IEC C19" },
      { label: "Garantie", value: "2 ans (batteries incluses)" },
    ],
    image: "ups",
  },
  {
    id: "laptop-pro14",
    name: "Poste de travail Pro 14\" i7 32Go",
    category: "Postes de travail",
    price: 15900,
    oldPrice: 17500,
    rating: 4.7,
    reviews: 58,
    sales: 134,
    stock: "in-stock",
    featured: true,
    description: "Ultrabook professionnel, chiffrement TPM 2.0, autonomie 14h.",
    installationPrice: 800,
    specs: [
      { label: "Écran", value: "14\" WUXGA IPS antireflet" },
      { label: "Processeur", value: "Intel Core i7 (12 cœurs)" },
      { label: "Mémoire", value: "32 Go LPDDR5" },
      { label: "Stockage", value: "1 To SSD NVMe" },
      { label: "Sécurité", value: "TPM 2.0, lecteur d'empreinte, obturateur webcam" },
      { label: "Garantie", value: "3 ans sur site" },
    ],
    image: "laptop",
  },
  {
    id: "backup-cloud",
    name: "Sauvegarde Cloud VisionVault (1To)",
    category: "Cloud & Licences",
    price: 2400,
    rating: 4.6,
    reviews: 71,
    sales: 312,
    stock: "in-stock",
    description: "Sauvegarde chiffrée automatisée hébergée localement au Maroc, conforme RGPD.",
    installationPrice: 1200,
    specs: [
      { label: "Capacité", value: "1 To" },
      { label: "Durée", value: "12 mois" },
      { label: "Hébergement", value: "Datacenter au Maroc" },
      { label: "Chiffrement", value: "AES-256 de bout en bout" },
      { label: "Rétention", value: "30 jours de versions" },
      { label: "Restauration", value: "Illimitée, sans frais de sortie" },
    ],
    image: "cloud",
  },
  {
    id: "vpn-appliance",
    name: "Appliance VPN SD-WAN VT-Connect",
    category: "Sécurité",
    price: 27500,
    rating: 4.8,
    reviews: 15,
    sales: 18,
    stock: "on-order",
    badge: "Nouveau",
    description: "Interconnexion sécurisée multi-sites avec routage intelligent applicatif.",
    installationPrice: 5500,
    specs: [
      { label: "Débit VPN", value: "2 Gbps IPSec" },
      { label: "Sites interconnectables", value: "Jusqu'à 64" },
      { label: "Routage", value: "SD-WAN applicatif, basculement automatique" },
      { label: "Interfaces", value: "4 × RJ45 GbE, 2 × SFP" },
      { label: "Administration", value: "Console cloud centralisée" },
      { label: "Garantie", value: "3 ans" },
    ],
    image: "vpn",
  },
  {
    id: "sw-48p",
    name: "Switch Core 48 ports 10G SFP+",
    category: "Réseau",
    price: 34900,
    rating: 4.9,
    reviews: 11,
    sales: 9,
    stock: "on-order",
    description: "Commutateur cœur de réseau haute performance pour datacenters.",
    installationPrice: 7500,
    specs: [
      { label: "Ports", value: "48 × SFP+ 10G, 4 × QSFP+ 40G" },
      { label: "Capacité de commutation", value: "1,44 Tbps" },
      { label: "Latence", value: "< 1 µs" },
      { label: "Fonctions", value: "Stacking, MLAG, routage L3 dynamique" },
      { label: "Alimentation", value: "2 × PSU redondantes hot-swap" },
      { label: "Garantie", value: "5 ans" },
    ],
    image: "switch",
  },
  {
    id: "mon-siem",
    name: "Supervision SIEM VisionWatch (annuel)",
    category: "Cloud & Licences",
    price: 45000,
    rating: 5,
    reviews: 9,
    sales: 14,
    stock: "in-stock",
    badge: "Populaire",
    description: "Centralisation des logs, corrélation d'événements et alerting SOC 24/7.",
    installationPrice: 12000,
    specs: [
      { label: "Durée", value: "12 mois" },
      { label: "Sources de logs", value: "Jusqu'à 100 équipements" },
      { label: "Rétention", value: "12 mois consultables" },
      { label: "Corrélation", value: "Règles personnalisées + détection d'anomalies" },
      { label: "Alerting", value: "Email, SMS, webhook — 24/7" },
      { label: "Rapports", value: "Mensuels + conformité sur demande" },
    ],
    image: "siem",
  },
];

export const categories: ProductCategory[] = [
  "Réseau",
  "Serveurs",
  "Sécurité",
  "Postes de travail",
  "Cloud & Licences",
];

export function isPromo(product: Product): boolean {
  return typeof product.oldPrice === "number" && product.oldPrice > product.price;
}

export function discountPercent(product: Product): number {
  if (!isPromo(product) || !product.oldPrice) return 0;
  return Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100);
}
