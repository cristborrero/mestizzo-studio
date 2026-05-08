'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Pencil, Trash2, Search, X, Check, AlertTriangle, ArrowRight, ChevronRight } from 'lucide-react';
import type { Service } from '@/lib/db/schema';

const CATEGORIES = [
  'Identidad Corporativa y Branding',
  'Diseño Web y Producto Digital',
  'Marketing Digital y Redes Sociales',
  'Marketing Estratégico y Growth',
  'Inteligencia Artificial (AI)',
  'Fotografía y Video',
  'Animación y 3D',
  'Ilustración',
  'Editorial e Impresos',
  'Publicidad Exterior',
  'Merchandising y POP',
];

const EMPTY_FORM = {
  code: '', category: 'Identidad Corporativa y Branding', name: '', description: '', priceUsd: '', priceColRef: '',
};

const EASE = [0.16, 1, 0.3, 1] as const;

type FormData = typeof EMPTY_FORM;

interface Props {
  initialServices: Service[];
}

export function ServicesManager({ initialServices }: Props) {
  const [services, setServices] = useState<Service[]>(initialServices);
  const [search, setSearch] = useState('');
  const [filterCat, setFilterCat] = useState<string>('all');
  const [modal, setModal] = useState<{ mode: 'add' | 'edit'; service?: Service } | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Service | null>(null);
  const [form, setForm] = useState<FormData>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const filtered = useMemo(() => {
    return services.filter((s) => {
      const matchCat = filterCat === 'all' || s.category === filterCat;
      const q = search.toLowerCase();
      const matchSearch = !q || s.name.toLowerCase().includes(q) || s.code.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [services, search, filterCat]);

  function openAdd() {
    setForm(EMPTY_FORM);
    setError('');
    setModal({ mode: 'add' });
  }

  function openEdit(s: Service) {
    setForm({
      code: s.code,
      category: s.category,
      name: s.name,
      description: s.description ?? '',
      priceUsd: String(s.priceUsd),
      priceColRef: String(s.priceColRef ?? ''),
    });
    setError('');
    setModal({ mode: 'edit', service: s });
  }

  async function handleSave() {
    if (!form.code || !form.name || !form.priceUsd) {
      setError('Código, nombre y precio son requeridos');
      return;
    }
    setSaving(true);
    setError('');
    try {
      const isEdit = modal?.mode === 'edit';
      const url = isEdit
        ? `/api/admin/services/${modal.service!.id}`
        : '/api/admin/services';
      const res = await fetch(url, {
        method: isEdit ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error ?? 'Error al guardar');
        return;
      }
      const saved: Service = await res.json();
      setServices((prev) =>
        isEdit
          ? prev.map((s) => (s.id === saved.id ? saved : s))
          : [...prev, saved]
      );
      setModal(null);
    } catch {
      setError('Error de red');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(s: Service) {
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/services/${s.id}`, { method: 'DELETE' });
      if (!res.ok) return;
      setServices((prev) => prev.filter((x) => x.id !== s.id));
      setDeleteTarget(null);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-16">
      {/* Header */}
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div className="space-y-4">
          <span className="text-[10px] font-black uppercase tracking-[0.5em] text-accent mb-2 block">
            Admin Panel / Management
          </span>
          <h1 className="text-6xl md:text-7xl font-black tracking-tighter leading-none uppercase">
            Service <span className="text-outline">Catalog.</span>
          </h1>
          <p className="text-sm font-medium text-secondary uppercase tracking-widest">
            {services.length} items registered in the studio ecosystem.
          </p>
        </div>
        <button
          onClick={openAdd}
          className="group flex items-center gap-6 bg-foreground text-background px-10 py-6 rounded-full text-xs font-black uppercase tracking-[0.2em] hover:bg-accent hover:text-white transition-all duration-500"
        >
          Add New Service
          <Plus size={16} className="transition-transform group-hover:rotate-90" />
        </button>
      </div>

      {/* Filters & Search */}
      <div className="bg-surface rounded-[2.5rem] p-8 border border-border">
        <div className="flex flex-col lg:flex-row gap-8 items-center justify-between">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-6 top-1/2 h-5 w-5 -translate-y-1/2 opacity-20" />
            <input
              type="text"
              placeholder="SEARCH BY NAME OR CODE..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-background py-5 pl-16 pr-8 rounded-full text-xs font-bold tracking-widest outline-none border border-transparent focus:border-accent transition-all placeholder:opacity-20 uppercase"
            />
          </div>
          <div className="flex gap-3 flex-wrap justify-center">
            <FilterBtn active={filterCat === 'all'} onClick={() => setFilterCat('all')}>All</FilterBtn>
            {CATEGORIES.map((cat) => (
              <FilterBtn 
                key={cat} 
                active={filterCat === cat} 
                onClick={() => setFilterCat(cat)}
              >
                {cat}
              </FilterBtn>
            ))}
          </div>
        </div>
      </div>

      {/* Grid / Table Replacement */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <AnimatePresence mode="popLayout">
          {filtered.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="py-40 text-center bg-surface rounded-[3rem] border border-dashed border-border col-span-full"
            >
              <p className="text-[10px] font-black tracking-[0.4em] opacity-20 uppercase">No results found in this category</p>
            </motion.div>
          ) : (
            filtered.map((s) => (
              <motion.div 
                layout
                key={s.id} 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="group flex flex-col md:flex-row items-center justify-between p-8 bg-surface rounded-[2rem] border border-transparent hover:border-accent transition-all duration-500"
              >
                <div className="flex items-center gap-12 w-full">
                  <div className="hidden 2xl:flex h-14 w-14 items-center justify-center rounded-2xl bg-background border border-border text-[10px] font-black opacity-40 group-hover:opacity-100 group-hover:border-accent transition-all shrink-0">
                    {s.code}
                  </div>
                  <div className="space-y-1 flex-1 min-w-0">
                    <h3 className="text-xl lg:text-2xl font-black uppercase tracking-tight group-hover:text-accent transition-colors leading-tight truncate">
                      {s.name}
                    </h3>
                    <div className="flex items-center gap-3">
                      <span className="text-[9px] font-black tracking-[0.2em] text-accent uppercase shrink-0">{s.category}</span>
                      <div className="h-1 w-1 rounded-full bg-border shrink-0" />
                      <p className="text-[10px] font-medium text-secondary truncate">{s.description}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between w-full md:w-auto mt-6 md:mt-0 gap-8 shrink-0">
                  <div className="text-right">
                    <div className="text-2xl lg:text-3xl font-black tracking-tighter leading-none">${Number(s.priceUsd).toLocaleString()}</div>
                    <div className="text-[9px] font-bold opacity-30 tracking-widest uppercase mt-1">
                      {s.priceColRef ? `REF $${Number(s.priceColRef).toLocaleString('es-CO')} COP` : '—'}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => openEdit(s)}
                      className="h-14 w-14 rounded-full flex items-center justify-center bg-background border border-border hover:bg-foreground hover:text-white transition-all"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => setDeleteTarget(s)}
                      className="h-14 w-14 rounded-full flex items-center justify-center bg-background border border-border hover:bg-accent hover:text-white transition-all"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      {/* Add / Edit Modal */}
      <AnimatePresence>
        {modal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              className="absolute inset-0 bg-black/95 backdrop-blur-sm"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setModal(null)}
            />
            <motion.div
              className="relative w-full max-w-3xl bg-background p-16 rounded-[4rem] shadow-2xl border border-border"
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            >
              <div className="mb-16 flex items-center justify-between">
                <h2 className="text-4xl font-black tracking-tight uppercase leading-none">
                  {modal.mode === 'add' ? 'New Service' : 'Edit Service'}
                </h2>
                <button onClick={() => setModal(null)} className="h-12 w-12 rounded-full border border-border flex items-center justify-center hover:bg-accent hover:text-white transition-all">
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <Field label="Service Code">
                    <input
                      value={form.code}
                      onChange={(e) => setForm((f) => ({ ...f, code: e.target.value.toUpperCase() }))}
                      placeholder="e.g. BND-01"
                      className={inputCls}
                    />
                  </Field>
                  <Field label="Category">
                    <select
                      value={form.category}
                      onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                      className={inputCls}
                    >
                      {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                    </select>
                  </Field>
                </div>
                <Field label="Display Name">
                  <input
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    placeholder="ENTER SERVICE TITLE..."
                    className={inputCls}
                  />
                </Field>
                <Field label="Detailed Description">
                  <textarea
                    value={form.description}
                    onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                    placeholder="DESCRIBE SCOPE AND DELIVERABLES..."
                    rows={3}
                    className={`${inputCls} resize-none`}
                  />
                </Field>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-4 border-t border-border">
                  <Field label="Price (USD)">
                    <div className="relative">
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 font-black text-2xl opacity-20">$</span>
                      <input
                        type="number"
                        step="0.01"
                        value={form.priceUsd}
                        onChange={(e) => {
                          const val = e.target.value;
                          const cop = val && !isNaN(Number(val)) ? String(Math.round(Number(val) * 4000)) : '';
                          setForm((f) => ({ ...f, priceUsd: val, priceColRef: cop }));
                        }}
                        placeholder="0.00"
                        className={`${inputCls} pl-10 text-2xl`}
                      />
                    </div>
                  </Field>
                  <Field label="Price (COP) — Auto-Calc">
                    <div className="relative">
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 font-black text-2xl opacity-20">$</span>
                      <input
                        type="number"
                        step="1"
                        value={form.priceColRef}
                        onChange={(e) => setForm((f) => ({ ...f, priceColRef: e.target.value }))}
                        placeholder="0"
                        className={`${inputCls} pl-10 text-2xl`}
                      />
                    </div>
                  </Field>
                </div>
              </div>

              {error && (
                <div className="mt-10 p-6 bg-accent/5 border border-accent/20 rounded-2xl flex items-center gap-4 text-xs font-bold text-accent uppercase tracking-widest">
                  <AlertTriangle size={18} />
                  {error}
                </div>
              )}

              <div className="mt-16 flex justify-end gap-6">
                <button
                  onClick={() => setModal(null)}
                  className="text-[10px] font-black tracking-widest opacity-40 hover:opacity-100 uppercase"
                >
                  Discard Changes
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex items-center gap-4 bg-accent px-12 py-6 rounded-full text-[10px] font-black uppercase tracking-widest text-white shadow-xl shadow-accent/30 hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
                >
                  {saving ? 'Processing...' : 'Confirm Entry'}
                  <ArrowRight size={16} />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Delete confirm */}
      <AnimatePresence>
        {deleteTarget && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div className="absolute inset-0 bg-black/95" onClick={() => setDeleteTarget(null)} />
            <motion.div
              className="relative w-full max-w-md bg-background p-12 rounded-[3rem] border border-border shadow-2xl"
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
            >
              <div className="mb-6 flex items-center gap-4 text-accent">
                <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center">
                  <AlertTriangle size={24} />
                </div>
                <h2 className="text-2xl font-black uppercase tracking-tight">Confirm Deletion</h2>
              </div>
              <p className="text-xs font-medium leading-relaxed text-secondary uppercase tracking-widest mb-10">
                Are you sure you want to remove <span className="font-black text-foreground">{deleteTarget.name}</span> from the catalog? This action is permanent.
              </p>
              <div className="flex justify-end gap-6">
                <button
                  onClick={() => setDeleteTarget(null)}
                  className="text-[9px] font-black tracking-widest opacity-40 hover:opacity-100 uppercase"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(deleteTarget)}
                  disabled={saving}
                  className="bg-accent px-8 py-4 rounded-full text-[9px] font-black uppercase tracking-widest text-white hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
                >
                  {saving ? 'Deleting...' : 'Delete Item'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FilterBtn({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`
        px-6 py-3 rounded-full text-[9px] font-black uppercase tracking-widest transition-all
        ${active 
          ? 'bg-foreground text-background shadow-lg' 
          : 'bg-background border border-border hover:border-foreground'}
      `}
    >
      {children}
    </button>
  );
}

const inputCls =
  'w-full border-b-2 border-border bg-transparent py-4 text-sm font-black tracking-widest text-foreground placeholder:opacity-20 outline-none focus:border-accent transition-all uppercase';

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-3">
      <label className="text-[10px] font-black tracking-[0.3em] opacity-40 uppercase">{label}</label>
      {children}
    </div>
  );
}
