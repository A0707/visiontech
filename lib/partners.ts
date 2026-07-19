export interface Partner {
  name: string;
  /**
   * Chemin du logo dans /public/brand/partners/ (ex. "/brand/partners/cisco.svg").
   * Laisser vide tant que le logo officiel n'a pas été obtenu : le composant
   * affiche alors le nom en texte, ce qui reste juridiquement sûr.
   */
  logo?: string;
}

/**
 * ⚠️ Marques de tiers — à ne renseigner qu'avec un accord de partenariat effectif.
 *
 * Les logos Microsoft, Cisco, Fortinet, VMware, Dell, HP, Lenovo et Synology sont
 * des marques déposées. Les afficher sans autorisation (ou sans être partenaire
 * référencé) expose à une mise en demeure et laisse entendre au visiteur une
 * relation commerciale qui n'existe pas.
 *
 * Chaque éditeur fournit un kit de marque à ses partenaires :
 *   Microsoft  → partner.microsoft.com (badge « Solutions Partner »)
 *   Cisco      → cisco.com/go/partnerbranding
 *   Fortinet   → fortinet.com/partners (Engage Partner Program)
 *   VMware     → partnerconnect.vmware.com
 *   Dell / HP / Lenovo / Synology → programmes revendeur respectifs
 *
 * Déposer les fichiers officiels dans /public/brand/partners/ puis renseigner
 * le champ `logo` ci-dessous.
 */
export const partners: Partner[] = [
  { name: "Microsoft" },
  { name: "Cisco" },
  { name: "Fortinet" },
  { name: "VMware" },
  { name: "Dell" },
  { name: "HP" },
  { name: "Lenovo" },
  { name: "Synology" },
];
