"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export type ContactSubmission = {
  name: string;
  email: string;
  phone: string;
  company: string;
  services: string[];
  brief: string;
  budget: string;
};

export async function submitContactForm(data: ContactSubmission) {
  try {
    const { name, email, phone, company, services, brief, budget } = data;

    if (process.env.NODE_ENV === "development") {
      console.log("=== [DEV] Contact Form Submission ===");
      console.log({ name, email, phone, company, services, brief, budget });
      return { success: true };
    }

    await resend.emails.send({
      from: "MESTIZZO Studio <noreply@mestizzo.studio>",
      to: ["infomestizzo@gmail.com"],
      replyTo: email,
      subject: `Nueva solicitud de ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #FE0048;">Nueva Solicitud de Contacto</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px; font-weight: bold;">Nombre</td><td style="padding: 8px;">${name}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">Email</td><td style="padding: 8px;"><a href="mailto:${email}">${email}</a></td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">Teléfono</td><td style="padding: 8px;">${phone || "—"}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">Empresa</td><td style="padding: 8px;">${company || "—"}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">Servicios</td><td style="padding: 8px;">${services.join(", ")}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">Presupuesto</td><td style="padding: 8px;">${budget}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold; vertical-align: top;">Brief</td><td style="padding: 8px; white-space: pre-wrap;">${brief}</td></tr>
          </table>
        </div>
      `,
    });

    return { success: true };
  } catch (error) {
    console.error("Error sending contact email:", error);
    return { success: false, error: "Error al enviar el formulario." };
  }
}
