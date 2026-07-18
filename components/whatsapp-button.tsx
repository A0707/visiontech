"use client";

import { MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "212600000000"; // TODO: remplacer par le numéro officiel VisionTech
const DEFAULT_MESSAGE = "Bonjour VisionTech, je souhaite avoir plus d'informations sur vos services.";

export function WhatsAppButton() {
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(DEFAULT_MESSAGE)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contacter VisionTech sur WhatsApp"
      className="group fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-lg shadow-[#25D366]/30 transition-transform duration-300 hover:scale-110 active:scale-95 md:h-16 md:w-16"
    >
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20" />
      <MessageCircle
        className="relative h-7 w-7 text-white md:h-8 md:w-8"
        strokeWidth={2}
        fill="white"
      />
      <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-lg bg-night-800 px-3 py-2 text-sm text-white opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100">
        Discuter sur WhatsApp
      </span>
    </a>
  );
}
