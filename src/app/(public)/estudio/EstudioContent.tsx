"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

const VALORES = [
  {
    num: "01",
    title: "Autoría sobre producción.",
    desc: "No fabricamos sitios. Diseñamos piezas. Cada proyecto lleva la firma de quien lo concibió y la responsabilidad de quien lo entrega.",
  },
  {
    num: "02",
    title: "Menos clientes, más presencia.",
    desc: "Trabajamos con un número reducido de marcas por ciclo para garantizar que cada una reciba lo que merece: atención total.",
  },
  {
    num: "03",
    title: "Tecnología al servicio del criterio.",
    desc: "Las herramientas evolucionan. El criterio no se delega. Usamos IA y código de vanguardia para amplificar la visión, no para reemplazarla.",
  },
  {
    num: "04",
    title: "El resultado es el único estándar.",
    desc: "No medimos el éxito en horas ni entregables. Lo medimos en el impacto que el trabajo tiene para la marca que lo encargó.",
  },
];

const EQUIPO = [
  {
    name: "Cristián Borrero",
    role: "Fundador & Director Creativo",
    location: "Bogotá · Londres",
    bio: "Diseñador de sistemas y arquitecto de marcas. Construye identidades que sobreviven al ruido.",
  },
  {
    name: "Studio Team",
    role: "Diseño, Desarrollo & Estrategia",
    location: "Remoto — Global",
    bio: "Un equipo selecto de especialistas convocados proyecto a proyecto según lo que la marca necesita.",
  },
];

const CLIENTS = [
  "Norte Colectivo", "Palma Studio", "Vertex Group",
  "Sirka", "Atlas Films", "Manuk",
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export default function EstudioContent() {
  return (
    <main className="min-h-screen bg-background pt-32 pb-32 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mb-24"
        >
          <p className="text-accent text-[10px] font-black uppercase tracking-[0.4em] mb-5">
            02 — Estudio
          </p>
          <h1 className="text-5xl md:text-7xl font-light tracking-tight leading-[1.05] max-w-4xl">
            Creamos para los que se niegan<br />
            <span className="font-medium">a ser ordinarios.</span>
          </h1>
        </motion.div>

        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: EASE }}
          className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-32 pb-32 border-b border-border"
        >
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-secondary mb-8">
              Manifiesto
            </p>
            <div className="space-y-6 text-lg font-light text-foreground leading-relaxed">
              <p>
                MESTIZZO Studio nació del rechazo. Del rechazo a la mediocridad como estándar, al volumen como métrica de éxito, a la tecnología como sustituto del criterio.
              </p>
              <p>
                Somos un atelier digital boutique. Trabajamos con marcas que tienen algo real que decir y la ambición de decirlo con la mejor ejecución posible.
              </p>
              <p className="text-accent font-medium">
                No somos para todos. Somos para los que entienden que el diseño de autor es una inversión, no un gasto.
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-end">
            <div className="bg-surface rounded-3xl p-10 space-y-6">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-secondary mb-2">Fundado</p>
                <p className="text-2xl font-light">2026</p>
              </div>
              <div className="h-px bg-border" />
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-secondary mb-2">Mercados</p>
                <p className="text-foreground font-light">Colombia · España · EEUU</p>
              </div>
              <div className="h-px bg-border" />
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-secondary mb-2">Modelo</p>
                <p className="text-foreground font-light">Atelier boutique · Proyectos selectos</p>
              </div>
              <div className="h-px bg-border" />
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-secondary mb-2">Especialidad</p>
                <p className="text-foreground font-light">Branding · Web · AI · Media</p>
              </div>
            </div>
          </div>
        </motion.section>

        <section className="mb-32 pb-32 border-b border-border">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[10px] font-black uppercase tracking-[0.4em] text-secondary mb-12"
          >
            Nuestra forma de hacer
          </motion.p>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12"
          >
            {VALORES.map((v) => (
              <motion.div key={v.num} variants={itemVariants} className="flex gap-6">
                <span className="text-[10px] font-black text-accent mt-1 shrink-0">{v.num}</span>
                <div>
                  <h3 className="text-lg font-medium mb-2">{v.title}</h3>
                  <p className="text-secondary font-light leading-relaxed">{v.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        <section className="mb-32 pb-32 border-b border-border">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[10px] font-black uppercase tracking-[0.4em] text-secondary mb-12"
          >
            Las personas detrás del trabajo
          </motion.p>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {EQUIPO.map((p) => (
              <motion.div
                key={p.name}
                variants={itemVariants}
                className="group bg-surface rounded-3xl p-10 hover:bg-foreground transition-colors duration-500"
              >
                <div className="w-16 h-16 rounded-full bg-border group-hover:bg-white/10 mb-8 transition-colors duration-500" role="img" aria-label={`Foto de ${p.name}`} />
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-secondary group-hover:text-white/40 mb-2 transition-colors duration-500">
                  {p.location}
                </p>
                <h3 className="text-xl font-medium mb-1 group-hover:text-white transition-colors duration-500">
                  {p.name}
                </h3>
                <p className="text-accent text-[10px] font-black uppercase tracking-[0.25em] mb-4">
                  {p.role}
                </p>
                <p className="text-secondary group-hover:text-white/60 font-light leading-relaxed transition-colors duration-500">
                  {p.bio}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        <section className="mb-32 pb-32 border-b border-border">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[10px] font-black uppercase tracking-[0.4em] text-secondary mb-12"
          >
            Han confiado en nosotros
          </motion.p>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-2 md:grid-cols-3 gap-px bg-border"
          >
            {CLIENTS.map((client) => (
              <motion.div
                key={client}
                variants={itemVariants}
                className="bg-background py-10 px-8 flex items-center justify-center"
              >
                <span className="text-sm font-medium text-secondary hover:text-foreground transition-colors duration-300 text-center">
                  {client}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </section>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
          className="flex flex-col md:flex-row items-start md:items-end justify-between gap-10"
        >
          <div>
            <h2 className="text-4xl md:text-6xl font-light leading-[1.1] mb-4">
              Trabajemos<br />
              <span className="font-medium">juntos.</span>
            </h2>
            <p className="text-secondary font-light max-w-sm leading-relaxed">
              Aceptamos proyectos selectos. Si tenés una marca con criterio y la ambición de llevarla al siguiente nivel, hablemos.
            </p>
          </div>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-3 bg-accent text-white px-10 py-5 rounded-full font-black text-[10px] uppercase tracking-[0.3em] hover:scale-105 transition-transform shrink-0"
          >
            Iniciar Proyecto
            <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" aria-hidden="true" />
          </Link>
        </motion.div>

      </div>
    </main>
  );
}
