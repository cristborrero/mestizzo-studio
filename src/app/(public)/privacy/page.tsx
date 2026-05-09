import Link from "next/link";

export const metadata = {
  title: "Política de Privacidad | MESTIZZO Studio",
  description: "Cómo recopilamos, usamos y protegemos tu información personal.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-background pt-32 pb-32 px-6 md:px-12">
      <div className="max-w-3xl mx-auto">
        <p className="text-accent text-[10px] font-black uppercase tracking-[0.4em] mb-5">
          Legal
        </p>
        <h1 className="text-4xl md:text-6xl font-light tracking-tight leading-[1.05] mb-4">
          Política de<br />
          <span className="font-medium">Privacidad.</span>
        </h1>
        <p className="text-secondary text-sm mb-16">Última actualización: enero 2026</p>

        <div className="prose prose-sm max-w-none space-y-10 text-foreground">

          <section>
            <h2 className="text-lg font-black uppercase tracking-[0.2em] mb-4">1. Responsable del tratamiento</h2>
            <p className="text-secondary leading-relaxed">
              MESTIZZO Studio es el responsable del tratamiento de los datos personales que nos facilites a través de este sitio web, formulario de contacto o proceso de cotización.
            </p>
            <p className="text-secondary leading-relaxed mt-3">
              Correo de contacto: <a href="mailto:infomestizzo@gmail.com" className="text-foreground underline underline-offset-4 hover:text-accent transition-colors">infomestizzo@gmail.com</a>
            </p>
          </section>

          <section>
            <h2 className="text-lg font-black uppercase tracking-[0.2em] mb-4">2. Datos que recopilamos</h2>
            <ul className="list-none space-y-2 text-secondary leading-relaxed">
              <li>— Nombre completo</li>
              <li>— Dirección de correo electrónico</li>
              <li>— Número de teléfono (opcional)</li>
              <li>— Nombre de empresa (opcional)</li>
              <li>— Descripción del proyecto y presupuesto estimado</li>
              <li>— Datos de pago procesados a través de PayPal (no almacenamos datos de tarjeta)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-black uppercase tracking-[0.2em] mb-4">3. Finalidad del tratamiento</h2>
            <p className="text-secondary leading-relaxed">
              Utilizamos tus datos para: responder a tu consulta o solicitud de proyecto, gestionar el proceso de cotización y pago, y comunicarnos contigo en relación con el servicio contratado.
            </p>
            <p className="text-secondary leading-relaxed mt-3">
              No utilizamos tus datos para marketing sin tu consentimiento explícito.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-black uppercase tracking-[0.2em] mb-4">4. Base legal</h2>
            <p className="text-secondary leading-relaxed">
              El tratamiento de tus datos se basa en tu consentimiento al enviar el formulario de contacto, y en la ejecución del contrato cuando realizas una cotización o pago.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-black uppercase tracking-[0.2em] mb-4">5. Conservación de datos</h2>
            <p className="text-secondary leading-relaxed">
              Conservamos tus datos durante el tiempo necesario para gestionar tu solicitud y, en caso de relación contractual, durante el período legalmente exigido.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-black uppercase tracking-[0.2em] mb-4">6. Tus derechos</h2>
            <p className="text-secondary leading-relaxed">
              Tenés derecho a acceder, rectificar, suprimir, limitar u oponerte al tratamiento de tus datos. Para ejercerlos, escribinos a{" "}
              <a href="mailto:infomestizzo@gmail.com" className="text-foreground underline underline-offset-4 hover:text-accent transition-colors">infomestizzo@gmail.com</a>.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-black uppercase tracking-[0.2em] mb-4">7. Terceros</h2>
            <p className="text-secondary leading-relaxed">
              Utilizamos <strong className="text-foreground font-medium">PayPal</strong> para el procesamiento de pagos y <strong className="text-foreground font-medium">Resend</strong> para el envío de correos. Estos proveedores cuentan con sus propias políticas de privacidad y garantías de seguridad.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-black uppercase tracking-[0.2em] mb-4">8. Cookies</h2>
            <p className="text-secondary leading-relaxed">
              Este sitio utiliza únicamente cookies técnicas necesarias para su funcionamiento. No utilizamos cookies de seguimiento o publicidad.
            </p>
          </section>

        </div>

        <div className="mt-20 pt-12 border-t border-border">
          <Link
            href="/"
            className="text-[10px] font-black uppercase tracking-[0.3em] text-secondary hover:text-foreground transition-colors"
          >
            ← Volver al inicio
          </Link>
        </div>
      </div>
    </main>
  );
}
