/**
 * Exemples à valider avant publication réelle : n'afficher un statut "Certifié"
 * que si le partenariat/certification est effectivement obtenu, sous peine de
 * représentation trompeuse vis-à-vis des éditeurs et des clients.
 */
export interface Certification {
  name: string;
  status: "Certifié" | "En cours";
}

export const certifications: Certification[] = [
  { name: "Microsoft Partner", status: "Certifié" },
  { name: "Cisco", status: "Certifié" },
  { name: "VMware", status: "En cours" },
  { name: "Fortinet", status: "Certifié" },
  { name: "ITIL", status: "Certifié" },
  { name: "ISO 27001", status: "En cours" },
];
