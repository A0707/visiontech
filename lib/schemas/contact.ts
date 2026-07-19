import { z } from "zod";

/** Types de besoin proposés dans le formulaire de contact. */
export const NEED_TYPES = [
  "Audit gratuit de mon infrastructure",
  "Infrastructure & réseau",
  "Cloud & Microsoft 365",
  "Cybersécurité",
  "Contrat de maintenance",
  "Devis matériel (boutique)",
  "Autre demande",
] as const;

/**
 * Schéma partagé client/serveur : le navigateur valide pour le confort de
 * saisie, le serveur revalide car les données client ne sont jamais fiables.
 */
export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Merci d'indiquer votre nom complet.")
    .max(100, "Nom trop long."),
  company: z
    .string()
    .trim()
    .max(120, "Nom d'entreprise trop long.")
    .optional()
    .or(z.literal("")),
  email: z
    .string()
    .trim()
    .min(1, "L'email est obligatoire.")
    .email("Adresse email invalide.")
    .max(160, "Adresse email trop longue."),
  phone: z
    .string()
    .trim()
    .regex(/^[\d+\s().-]{8,20}$/, "Numéro de téléphone invalide.")
    .optional()
    .or(z.literal("")),
  needType: z.enum(NEED_TYPES, {
    errorMap: () => ({ message: "Merci de sélectionner un type de besoin." }),
  }),
  message: z
    .string()
    .trim()
    .min(10, "Votre message doit contenir au moins 10 caractères.")
    .max(4000, "Message trop long (4000 caractères maximum)."),
  /**
   * Champ piège anti-spam : rempli uniquement par les robots.
   * Volontairement accepté par le schéma — c'est la route API qui l'inspecte,
   * afin de rejeter silencieusement sans signaler la détection au robot.
   */
  website: z.string().optional(),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
