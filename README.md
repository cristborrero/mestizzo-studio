# MESTIZZO Studio — Boutique Agency Platform

![MESTIZZO Banner](https://mestizzo.studio/banner.png) <!-- Placeholder para tu banner real -->

**MESTIZZO** es una plataforma digital de alta gama diseñada para una agencia boutique. Combina una estética visual minimalista y editorial con una infraestructura técnica robusta y escalable.

---

## ✨ Características Principales

- **Interacción Fluida:** Simulación de fluidos en tiempo real mediante WebGL (FluidCanvas) para una experiencia de usuario inmersiva.
- **Multi-Step Contact Form:** Formulario de contacto inteligente con validación en tiempo real y persistencia de datos (Zustand).
- **Admin Dashboard:** Panel de administración protegido para gestionar servicios, presupuestos y solicitudes.
- **Arquitectura de Vanguardia:** Implementación de Server Actions, Drizzle ORM y Auth.js v5 para máxima seguridad y performance.
- **Diseño Editorial:** Tipografía curada, dark mode premium y micro-animaciones con Framer Motion.

---

## 🛠️ Stack Tecnológico

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **Estilos:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Base de Datos:** [Neon](https://neon.tech/) + [Drizzle ORM](https://orm.drizzle.team/)
- **Autenticación:** [Auth.js v5](https://authjs.dev/) (Google OAuth)
- **Animaciones:** [Framer Motion](https://www.framer.com/motion/)
- **Estado Global:** [Zustand](https://zustand-demo.pmnd.rs/)
- **Emails:** [Resend](https://resend.com/)

---

## 🚀 Inicio Rápido

### 1. Clonar y Configurar
```bash
git clone https://github.com/cristborrero/mestizzo-studio.git
cd srm-quote
npm install
```

### 2. Variables de Entorno
Copia el archivo de ejemplo y completa tus credenciales:
```bash
cp .env.example .env.local
```

### 3. Base de Datos
Sincroniza el esquema con tu base de datos de Neon:
```bash
npx drizzle-kit push
```

### 4. Modo Desarrollo
```bash
npm run dev
```
La aplicación estará disponible en [http://localhost:3000](http://localhost:3000).

---

## 🏛️ Estructura del Proyecto

```bash
src/
├── app/          # App Router (Public & Admin Protected)
├── actions/      # Next.js Server Actions
├── components/   # UI Components & Interaction Logic
├── lib/          # Shared Utilities, DB Config & Stores
└── validation/   # Logic for data integrity (Zustand/Server)
```

---

## 🤝 Contacto

Desarrollado por **MESTIZZO Studio**.  
Transformamos tu visión en un legado digital.

- **Web:** [mestizzo.studio](https://mestizzo.studio)
- **GitHub:** [@cristborrero](https://github.com/cristborrero)

---
*© 2026 MESTIZZO Studio. Todos los derechos reservados.*
