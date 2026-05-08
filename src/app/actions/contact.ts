"use server";

import { Resend } from "resend";
import { sanitizeString } from "@/lib/security";

const resend = new Resend(process.env.RESEND_API_KEY);

export type ContactSubmission = {
  name: string;
  email: string;
  phone: string;
  company: string;
  services: string[];
  brief: string;
  budget: string;
  honeypot?: string; // Invisible field for bot detection
};

export async function submitContactForm(data: ContactSubmission) {
  try {
    // 1. Honeypot check: If the hidden field is filled, it's likely a bot.
    if (data.honeypot) {
      console.warn("[SECURITY] Honeypot triggered. Possible bot submission.");
      return { success: true }; // Return success to fool the bot, but do nothing.
    }

    const { name, email, phone, company, services, brief, budget } = data;

    // 2. Sanitize all user inputs before using them in HTML
    const sName = sanitizeString(name);
    const sEmail = sanitizeString(email);
    const sPhone = sanitizeString(phone || "");
    const sCompany = sanitizeString(company || "");
    const sBrief = sanitizeString(brief);
    const sBudget = sanitizeString(budget);
    const sServices = services.map(s => sanitizeString(s)).join(", ");

    if (process.env.NODE_ENV === "development") {
      console.log("=== [DEV] Contact Form Submission (Sanitized) ===");
      console.log({ sName, sEmail, sPhone, sCompany, sServices, sBrief, sBudget });
      return { success: true };
    }

    await resend.emails.send({
      from: "MESTIZZO Studio <noreply@mestizzo.studio>",
      to: ["infomestizzo@gmail.com"],
      replyTo: sEmail,
      subject: `Nueva solicitud de ${sName}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border: 1px solid #eeeeee;">
          <h2 style="color: #FE0048; margin-top: 0;">Nueva Solicitud de Contacto</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr style="border-bottom: 1px solid #f9f9f9;"><td style="padding: 10px; font-weight: bold; width: 30%;">Nombre</td><td style="padding: 10px;">${sName}</td></tr>
            <tr style="border-bottom: 1px solid #f9f9f9;"><td style="padding: 10px; font-weight: bold;">Email</td><td style="padding: 10px;"><a href="mailto:${sEmail}" style="color: #FE0048;">${sEmail}</a></td></tr>
            <tr style="border-bottom: 1px solid #f9f9f9;"><td style="padding: 10px; font-weight: bold;">Teléfono</td><td style="padding: 10px;">${sPhone || "—"}</td></tr>
            <tr style="border-bottom: 1px solid #f9f9f9;"><td style="padding: 10px; font-weight: bold;">Empresa</td><td style="padding: 10px;">${sCompany || "—"}</td></tr>
            <tr style="border-bottom: 1px solid #f9f9f9;"><td style="padding: 10px; font-weight: bold;">Servicios</td><td style="padding: 10px;">${sServices}</td></tr>
            <tr style="border-bottom: 1px solid #f9f9f9;"><td style="padding: 10px; font-weight: bold;">Presupuesto</td><td style="padding: 10px;">${sBudget}</td></tr>
            <tr><td style="padding: 10px; font-weight: bold; vertical-align: top;">Brief</td><td style="padding: 10px; white-space: pre-wrap; background-color: #fcfcfc;">${sBrief}</td></tr>
          </table>
          <p style="margin-top: 20px; font-size: 12px; color: #999999;">Esta es una notificación automática del sistema de cotizaciones de MESTIZZO Studio.</p>
        </div>
      `,
    });

    return { success: true };
  } catch (error) {
    console.error("Error sending contact email:", error);
    return { success: false, error: "Error al enviar el formulario." };
  }
}
