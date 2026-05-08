'use client';

import { useState } from 'react';
import { Plus, Trash2, Mail, ShieldAlert, ArrowRight, UserCheck, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { AuthorizedUser } from '@/lib/db/schema';

interface Props {
  initialUsers: AuthorizedUser[];
}

const MASTER_ADMIN = 'cristborrero@gmail.com';

export function SettingsManager({ initialUsers }: Props) {
  const [users, setUsers] = useState<AuthorizedUser[]>(initialUsers);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const res = await fetch('/api/admin/settings/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Error al agregar usuario');
      }

      const newUser = await res.json();
      setUsers((prev) => [newUser, ...prev]);
      setEmail('');
      setSuccess('Acceso autorizado correctamente');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: number) {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/settings/users/${id}`, { method: 'DELETE' });
      if (res.ok) setUsers((prev) => prev.filter((u) => u.id !== id));
    } finally {
      setLoading(false);
    }
  }

  const totalAuthorized = users.length + 1; // +1 for master admin

  return (
    <div className="space-y-16">

      {/* ── Header ── */}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-2">
          <h1 className="text-6xl font-black tracking-tight leading-none uppercase">
            ACCESO &amp; <span className="text-outline">PERMISOS</span>
          </h1>
          <div className="flex items-center gap-4">
            <div className="h-px w-12 bg-accent" />
            <p className="text-[10px] font-black tracking-[0.4em] opacity-40 uppercase">
              {totalAuthorized} USUARIO{totalAuthorized !== 1 ? 'S' : ''} AUTORIZADO{totalAuthorized !== 1 ? 'S' : ''}
            </p>
          </div>
        </div>
        {/* Security badge */}
        <div className="flex items-center gap-3 border border-border px-6 py-3">
          <Lock size={12} className="text-accent" />
          <span className="text-[9px] font-black tracking-[0.3em] uppercase opacity-60">
            PANEL RESTRINGIDO — SOLO ADMIN
          </span>
        </div>
      </div>

      {/* ── Add user ── */}
      <div className="border-y border-border py-10 space-y-6">
        <div className="space-y-1">
          <h2 className="text-xs font-black tracking-[0.3em] uppercase">AUTORIZAR NUEVO ACCESO</h2>
          <p className="text-[10px] text-secondary tracking-widest uppercase leading-relaxed">
            El usuario recibirá acceso inmediato al panel administrativo.
          </p>
        </div>

        <form onSubmit={handleAdd} className="flex flex-col sm:flex-row gap-0 border border-border focus-within:border-accent transition-colors max-w-2xl">
          <div className="flex flex-1 items-center gap-3 px-6 py-4 bg-background">
            <Mail size={14} className="shrink-0 opacity-30" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="USUARIO@EJEMPLO.COM"
              className="w-full bg-transparent text-[10px] font-black tracking-widest uppercase outline-none placeholder:opacity-20 text-foreground"
            />
          </div>
          <button
            type="submit"
            disabled={loading || !email}
            className="group flex items-center justify-between gap-4 bg-foreground px-8 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-background transition-all hover:bg-accent hover:text-white disabled:opacity-30"
          >
            {loading ? 'PROCESANDO…' : 'AUTORIZAR'}
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </button>
        </form>

        <AnimatePresence>
          {error && (
            <motion.p
              key="error"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2 text-[10px] font-black tracking-widest uppercase text-accent"
            >
              <ShieldAlert size={12} /> {error}
            </motion.p>
          )}
          {success && (
            <motion.p
              key="success"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2 text-[10px] font-black tracking-widest uppercase opacity-60"
            >
              ✓ {success}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* ── Users list ── */}
      <div className="space-y-8">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <h2 className="text-xs font-black tracking-[0.3em] uppercase">USUARIOS CON ACCESO</h2>
          <span className="text-[10px] font-medium opacity-40 uppercase tracking-widest">LISTA COMPLETA</span>
        </div>

        <div className="border-grid grid grid-cols-1 divide-y divide-border">

          {/* Master admin (pinned, non-deletable) */}
          <div className="flex items-center justify-between px-8 py-6 bg-muted">
            <div className="flex items-center gap-6">
              <div className="h-2 w-2 rounded-full bg-accent animate-pulse" />
              <div className="space-y-0.5">
                <p className="text-sm font-black tracking-tight">{MASTER_ADMIN}</p>
                <p className="text-[9px] font-black tracking-[0.3em] opacity-40 uppercase">Superadmin permanente</p>
              </div>
            </div>
            <span className="inline-flex items-center gap-1.5 border border-accent px-4 py-1.5 text-[9px] font-black uppercase tracking-widest text-accent">
              <UserCheck size={10} /> MASTER ADMIN
            </span>
          </div>

          {/* Dynamic users */}
          <AnimatePresence mode="popLayout">
            {users.map((user) => (
              <motion.div
                layout
                key={user.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, height: 0 }}
                className="group flex items-center justify-between px-8 py-6 transition-colors hover:bg-muted"
              >
                <div className="flex items-center gap-6">
                  <div className="h-2 w-2 rounded-full bg-border group-hover:bg-secondary transition-colors" />
                  <p className="text-sm font-medium tracking-tight">{user.email}</p>
                </div>
                <button
                  onClick={() => handleDelete(user.id)}
                  disabled={loading}
                  className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest opacity-30 hover:opacity-100 hover:text-accent transition-all group-hover:opacity-60"
                >
                  <Trash2 size={12} /> REVOCAR
                </button>
              </motion.div>
            ))}
          </AnimatePresence>

          {users.length === 0 && (
            <div className="px-8 py-16 text-center">
              <p className="text-[10px] font-black tracking-[0.4em] opacity-20 uppercase">
                No hay usuarios adicionales autorizados
              </p>
            </div>
          )}
        </div>
      </div>

      {/* ── Security footer ── */}
      <div className="border border-border p-8 flex items-start gap-6">
        <ShieldAlert size={20} className="shrink-0 text-accent mt-0.5" />
        <div className="space-y-1">
          <h4 className="text-[10px] font-black uppercase tracking-[0.3em]">PROTOCOLO DE SEGURIDAD</h4>
          <p className="text-[9px] text-secondary uppercase leading-relaxed tracking-wider">
            Los cambios en esta lista son inmediatos. Los usuarios revocados perderán acceso en su próxima interacción.
            Las credenciales master no pueden modificarse desde este panel por razones de seguridad.
          </p>
        </div>
      </div>

    </div>
  );
}
