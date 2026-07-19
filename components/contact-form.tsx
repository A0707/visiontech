"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";
import { contactSchema, NEED_TYPES, type ContactFormValues } from "@/lib/schemas/contact";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Status = "idle" | "success";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      company: "",
      email: "",
      phone: "",
      needType: NEED_TYPES[0],
      message: "",
      website: "",
    },
  });

  async function onSubmit(values: ContactFormValues) {
    setServerError(null);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        setServerError(result.error ?? "L'envoi a échoué. Merci de réessayer.");
        return;
      }

      setStatus("success");
      reset();
    } catch {
      setServerError(
        "Impossible de joindre le serveur. Vérifiez votre connexion ou contactez-nous par téléphone."
      );
    }
  }

  if (status === "success") {
    return (
      <div className="glass-card flex flex-col items-center gap-3 p-10 text-center">
        <CheckCircle2 className="h-12 w-12 text-emerald-500 dark:text-emerald-400" />
        <h3 className="text-xl font-bold text-night-900 dark:text-white">
          Demande envoyée avec succès
        </h3>
        <p className="max-w-sm text-sm text-slate-600 dark:text-slate">
          Merci de nous avoir contactés. Un expert VisionTech reviendra vers vous sous
          24h ouvrées.
        </p>
        <Button variant="outline" size="sm" className="mt-2" onClick={() => setStatus("idle")}>
          Envoyer une autre demande
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="glass-card space-y-5 p-7 sm:p-8" noValidate>
      {/* Piège anti-spam : invisible et hors du parcours clavier. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Ne pas remplir</label>
        <input id="website" type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="name">Nom complet *</Label>
          <Input
            id="name"
            placeholder="Votre nom"
            aria-invalid={!!errors.name}
            error={errors.name?.message}
            {...register("name")}
          />
        </div>
        <div>
          <Label htmlFor="company">Entreprise</Label>
          <Input
            id="company"
            placeholder="Nom de votre entreprise"
            aria-invalid={!!errors.company}
            error={errors.company?.message}
            {...register("company")}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="email">Email professionnel *</Label>
          <Input
            id="email"
            type="email"
            placeholder="vous@entreprise.ma"
            aria-invalid={!!errors.email}
            error={errors.email?.message}
            {...register("email")}
          />
        </div>
        <div>
          <Label htmlFor="phone">Téléphone</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="+212 6 00 00 00 00"
            aria-invalid={!!errors.phone}
            error={errors.phone?.message}
            {...register("phone")}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="needType">Type de besoin *</Label>
        <select
          id="needType"
          aria-invalid={!!errors.needType}
          className={cn(
            "flex h-12 w-full rounded-xl border bg-slate-900/[0.03] px-4 text-sm text-night-900 outline-none transition-colors focus:border-electric-500 dark:bg-white/[0.03] dark:text-white",
            errors.needType ? "border-red-500/60" : "border-slate-900/10 dark:border-white/10"
          )}
          {...register("needType")}
        >
          {NEED_TYPES.map((type) => (
            <option
              key={type}
              value={type}
              className="bg-white text-night-900 dark:bg-night-800 dark:text-white"
            >
              {type}
            </option>
          ))}
        </select>
        {errors.needType && (
          <p className="mt-1.5 text-xs text-red-400">{errors.needType.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="message">Message *</Label>
        <Textarea
          id="message"
          placeholder="Décrivez votre besoin ou votre projet..."
          aria-invalid={!!errors.message}
          error={errors.message?.message}
          {...register("message")}
        />
      </div>

      {serverError && (
        <div
          role="alert"
          className="flex items-start gap-2.5 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-600 dark:text-red-400"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <p>{serverError}</p>
        </div>
      )}

      <Button
        type="submit"
        variant="primary"
        size="lg"
        className={cn("w-full", isSubmitting && "opacity-70")}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
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
