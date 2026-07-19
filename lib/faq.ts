export interface FaqItem {
  question: string;
  answer: string;
}

export const faqItems: FaqItem[] = [
  {
    question: "Pourquoi choisir VisionTech ?",
    answer:
      "Parce que nous combinons expertise technique certifiée, réactivité réelle et solutions sur mesure — sans sous-traitance ni discours marketing vide. Chaque architecture est pensée pour votre activité.",
  },
  {
    question: "Intervenez-vous partout au Maroc ?",
    answer:
      "Nous sommes basés à Casablanca et intervenons sur l'ensemble de l'axe Casablanca-Rabat en direct. Pour les autres villes, une intervention à distance ou sur devis est possible selon la criticité.",
  },
  {
    question: "Quels sont vos délais ?",
    answer:
      "Le premier diagnostic est généralement livré sous 48h. Les délais de déploiement varient selon la complexité du projet — un délai précis est toujours communiqué dans le devis.",
  },
  {
    question: "Faites-vous des contrats de maintenance ?",
    answer:
      "Oui, nous proposons trois formules de maintenance (Essentiel, Business, Premium) adaptées au niveau de criticité de votre infrastructure. Voir la page Maintenance pour le détail complet.",
  },
  {
    question: "Travaillez-vous avec les PME ?",
    answer:
      "Absolument. Nos offres sont dimensionnées aussi bien pour les PME que pour les grands comptes, avec des formules d'entrée de gamme accessibles et évolutives.",
  },
];
