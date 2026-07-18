"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  subject: string;
  message: string;
}

const SUBJECTS = [
  "Demande de devis",
  "Support technique",
  "Question sur nos services",
  "Partenariat",
  "Autre",
];

const initialData: FormData = {
  name: "",
  email: "",
  phone: "",
  company: "",
  subject: SUBJECTS[0],
  message: "",
};

type Errors = Partial<Record<keyof FormData, string>>;

function validate(data: FormData): Errors {
  const errors: Errors = {};
  if (!data.name.trim() || data.name.trim().length < 2) {
    errors.name = "Merci d'indiquer votre nom complet.";
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Adresse email invalide.";
  }
  if (data.phone && !/^[\d+\s().-]{8,}$/.test(data.phone)) {
    errors.phone = "Numéro de téléphone invalide.";
  }
  if (!data.message.trim() || data.message.trim().length < 10) {
    errors.message = "Votre message doit contenir au moins 10 caractères.";
  }
  return errors;
}

export function ContactForm() {
  const [data, setData] = useState<FormData>(initialData);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  function handleChange<K extends keyof FormData>(key: K, value: FormData[K]) {
    setData((d) => ({ ...d, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const validation = validate(data);
    setErrors(validation);
    if (Object.keys(validation).length > 0) return;

    setStatus("submitting");
    // Simulation d'envoi — à remplacer par un appel API réel (ex: /api/contact)
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setStatus("success");
    setData(initialData);
  }

  if (status === "success") {
    return (
      <div className="glass-card flex flex-col items-center gap-3 p-10 text-center">
        <CheckCircle2 className="h-12 w-12 text-emerald-500 dark:text-emerald-400" />
        <h3 className="text-xl font-bold text-night-900 dark:text-white">Message envoyé avec succès</h3>
        <p className="max-w-sm text-sm text-slate-600 dark:text-slate">
          Merci de nous avoir contactés. Un expert VisionTech reviendra vers vous sous
          24h ouvrées.
        </p>
        <Button variant="outline" size="sm" className="mt-2" onClick={() => setStatus("idle")}>
          Envoyer un autre message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="glass-card space-y-5 p-7 sm:p-8" noValidate>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="name">Nom complet *</Label>
          <Input
            id="name"
            value={data.name}
            onChange={(e) => handleChange("name", e.target.value)}
            placeholder="Votre nom"
            error={errors.name}
          />
        </div>
        <div>
          <Label htmlFor="email">Email professionnel *</Label>
          <Input
            id="email"
            type="email"
            value={data.email}
            onChange={(e) => handleChange("email", e.target.value)}
            placeholder="vous@entreprise.ma"
            error={errors.email}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="phone">Téléphone</Label>
          <Input
            id="phone"
            type="tel"
            value={data.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            placeholder="+212 6 00 00 00 00"
            error={errors.phone}
          />
        </div>
        <div>
          <Label htmlFor="company">Entreprise</Label>
          <Input
            id="company"
            value={data.company}
            onChange={(e) => handleChange("company", e.target.value)}
            placeholder="Nom de votre entreprise"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="subject">Sujet</Label>
        <select
          id="subject"
          value={data.subject}
          onChange={(e) => handleChange("subject", e.target.value)}
          className="flex h-12 w-full rounded-xl border border-slate-900/10 bg-slate-900/[0.03] px-4 text-sm text-night-900 outline-none transition-colors focus:border-electric-500 dark:border-white/10 dark:bg-white/[0.03] dark:text-white"
        >
          {SUBJECTS.map((s) => (
            <option key={s} value={s} className="bg-white text-night-900 dark:bg-night-800 dark:text-white">
              {s}
            </option>
          ))}
        </select>
      </div>

      <div>
        <Label htmlFor="message">Message *</Label>
        <Textarea
          id="message"
          value={data.message}
          onChange={(e) => handleChange("message", e.target.value)}
          placeholder="Décrivez votre besoin ou votre projet..."
          error={errors.message}
        />
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        className={cn("w-full", status === "submitting" && "opacity-70")}
        disabled={status === "submitting"}
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Envoi en cours...
          </>
        ) : (
          <>
            <Send className="h-4 w-4" />
            Envoyer ma demande
          </>
        )}
      </Button>
      <p className="text-center text-xs text-slate-500 dark:text-slate">
        En soumettant ce formulaire, vous acceptez d&apos;être contacté par notre équipe
        au sujet de votre demande.
      </p>
    </form>
  );
}
