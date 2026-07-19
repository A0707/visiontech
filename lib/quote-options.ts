import type { LucideIcon } from "lucide-react";
import { Flame, Wifi, Camera, AppWindow, Server, DatabaseBackup } from "lucide-react";

/**
 * Grille tarifaire indicative du calculateur.
 *
 * ⚠️ Ces montants sont des ordres de grandeur destinés à qualifier une demande,
 * pas des prix fermes. Ajustez-les à votre grille réelle avant publication :
 * un écart important entre l'estimation et le devis final érode la confiance.
 *
 *   basePrice : forfait de mise en service de la prestation
 *   unitPrice : coût par unité (poste, borne, caméra, site…)
 */
export interface QuoteOption {
  id: string;
  label: string;
  description: string;
  icon: LucideIcon;
  basePrice: number;
  unitPrice: number;
  unitLabel: string;
  defaultUnits: number;
  maxUnits: number;
}

export const quoteOptions: QuoteOption[] = [
  {
    id: "firewall",
    label: "Pare-feu / Sécurité périmétrique",
    description: "Pare-feu nouvelle génération, VPN et filtrage applicatif.",
    icon: Flame,
    basePrice: 18500,
    unitPrice: 3500,
    unitLabel: "site",
    defaultUnits: 1,
    maxUnits: 10,
  },
  {
    id: "wifi",
    label: "Wi-Fi professionnel",
    description: "Étude radio, bornes Wi-Fi 6 et gestion centralisée.",
    icon: Wifi,
    basePrice: 4500,
    unitPrice: 3400,
    unitLabel: "borne",
    defaultUnits: 4,
    maxUnits: 40,
  },
  {
    id: "cameras",
    label: "Vidéosurveillance",
    description: "Caméras IP, enregistreur et supervision à distance.",
    icon: Camera,
    basePrice: 6500,
    unitPrice: 2200,
    unitLabel: "caméra",
    defaultUnits: 6,
    maxUnits: 60,
  },
  {
    id: "m365",
    label: "Microsoft 365",
    description: "Migration, sécurisation et administration de la suite.",
    icon: AppWindow,
    basePrice: 8000,
    unitPrice: 950,
    unitLabel: "poste",
    defaultUnits: 20,
    maxUnits: 500,
  },
  {
    id: "serveur",
    label: "Serveur & virtualisation",
    description: "Serveur, hyperviseur et haute disponibilité.",
    icon: Server,
    basePrice: 12000,
    unitPrice: 64900,
    unitLabel: "serveur",
    defaultUnits: 1,
    maxUnits: 10,
  },
  {
    id: "backup",
    label: "Sauvegarde & PRA",
    description: "Sauvegarde chiffrée automatisée et plan de reprise.",
    icon: DatabaseBackup,
    basePrice: 5500,
    unitPrice: 2400,
    unitLabel: "To",
    defaultUnits: 2,
    maxUnits: 100,
  },
];

/** Contrat de maintenance optionnel appliqué en pourcentage du matériel. */
export const MAINTENANCE_RATE = 0.12;

/** Marge d'incertitude affichée autour de l'estimation. */
export const ESTIMATE_MARGIN = 0.15;
