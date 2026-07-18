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
