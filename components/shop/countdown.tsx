"use client";

import { useEffect, useState } from "react";
import { Flame } from "lucide-react";

function formatRemaining(ms: number) {
  const totalMinutes = Math.max(0, Math.floor(ms / 60000));
  const days = Math.floor(totalMinutes / (60 * 24));
  const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
  const minutes = totalMinutes % 60;
  if (days > 0) return `${days}j ${String(hours).padStart(2, "0")}h`;
  return `${String(hours).padStart(2, "0")}h ${String(minutes).padStart(2, "0")}min`;
}

/** Compte à rebours pour une offre flash réelle et limitée dans le temps. */
export function Countdown({ hours, className }: { hours: number; className?: string }) {
  const [endsAt] = useState(() => Date.now() + hours * 3600 * 1000);
  const [remaining, setRemaining] = useState(() => endsAt - Date.now());

  useEffect(() => {
    const id = setInterval(() => setRemaining(endsAt - Date.now()), 30000);
    return () => clearInterval(id);
  }, [endsAt]);

  if (remaining <= 0) return null;

  return (
    <span
      className={className ?? "inline-flex items-center gap-1.5 rounded-full bg-red-500/10 px-3 py-1 text-xs font-semibold text-red-600 dark:text-red-400"}
    >
      <Flame className="h-3.5 w-3.5" />
      Offre valable encore {formatRemaining(remaining)}
    </span>
  );
}
