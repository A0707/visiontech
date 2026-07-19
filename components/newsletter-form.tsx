"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, Send } from "lucide-react";
import { cn } from "@/lib/utils";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error");
      return;
    }
    setStatus("submitting");
    await new Promise((resolve) => setTimeout(resolve, 900));
    setStatus("success");
    setEmail("");
  }

  if (status === "success") {
    return (
      <p className="flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-400">
        <CheckCircle2 className="h-4 w-4" />
        Inscription confirmée, merci !
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error") setStatus("idle");
          }}
          placeholder="Votre email professionnel"
          aria-label="Adresse email pour la newsletter"
          className={cn(
            "h-11 flex-1 rounded-xl border bg-slate-900/[0.03] px-4 text-sm text-night-900 outline-none transition-colors placeholder:text-slate-500 focus:border-electric-500 dark:bg-white/[0.03] dark:text-white dark:placeholder:text-slate",
            status === "error" ? "border-red-500/60" : "border-slate-900/10 dark:border-white/10"
          )}
        />
        <button
          type="submit"
          disabled={status === "submitting"}
          className="flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-electric-500 px-5 text-sm font-semibold text-white transition-colors hover:bg-electric-600 disabled:opacity-70"
        >
          <Send className="h-4 w-4" />
          S&apos;inscrire
        </button>
      </div>
      {status === "error" && <p className="mt-1.5 text-xs text-red-400">Adresse email invalide.</p>}
    </form>
  );
}
