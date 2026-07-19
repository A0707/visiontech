import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactSchema } from "@/lib/schemas/contact";

/**
 * Route de réception du formulaire de contact.
 *
 * Configuration requise côté hébergeur (variables d'environnement Vercel) :
 *   RESEND_API_KEY  — clé API Resend (https://resend.com)
 *   CONTACT_TO      — adresse qui reçoit les demandes (ex. contact@visiontech.ma)
 *   CONTACT_FROM    — expéditeur vérifié chez Resend (ex. site@visiontech.ma)
 *
 * Tant que ces variables ne sont pas définies, la route renvoie une erreur
 * explicite plutôt que de faire croire à l'utilisateur que son message est parti.
 */

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Certains champs sont invalides.",
        fields: parsed.error.flatten().fieldErrors,
      },
      { status: 422 }
    );
  }

  const data = parsed.data;

  // Piège anti-spam : un robot remplit ce champ caché, un humain jamais.
  // On répond 200 pour ne pas signaler au robot que sa soumission a été rejetée.
  if (data.website) {
    return NextResponse.json({ ok: true });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO;
  const from = process.env.CONTACT_FROM;

  if (!apiKey || !to || !from) {
    console.error(
      "[contact] Variables d'environnement manquantes : RESEND_API_KEY, CONTACT_TO et CONTACT_FROM doivent être définies."
    );
    return NextResponse.json(
      {
        error:
          "Le service d'envoi n'est pas encore configuré. Merci de nous joindre directement par téléphone ou WhatsApp.",
      },
      { status: 503 }
    );
  }

  const html = `
    <h2>Nouvelle demande depuis visiontech.ma</h2>
    <p><strong>Nom :</strong> ${escapeHtml(data.name)}</p>
    <p><strong>Entreprise :</strong> ${escapeHtml(data.company || "—")}</p>
    <p><strong>Email :</strong> ${escapeHtml(data.email)}</p>
    <p><strong>Téléphone :</strong> ${escapeHtml(data.phone || "—")}</p>
    <p><strong>Type de besoin :</strong> ${escapeHtml(data.needType)}</p>
    <hr />
    <p style="white-space: pre-wrap;">${escapeHtml(data.message)}</p>
  `;

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: data.email,
      subject: `[VisionTech] ${data.needType} — ${data.name}`,
      html,
    });

    if (error) {
      console.error("[contact] Échec de l'envoi Resend :", error);
      return NextResponse.json(
        { error: "L'envoi a échoué. Merci de réessayer ou de nous joindre par téléphone." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] Erreur inattendue :", err);
    return NextResponse.json(
      { error: "Une erreur est survenue. Merci de réessayer plus tard." },
      { status: 500 }
    );
  }
}
