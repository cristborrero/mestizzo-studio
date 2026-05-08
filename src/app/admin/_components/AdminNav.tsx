'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Package, Settings, ChevronRight } from 'lucide-react';

const links = [
  { href: '/admin',          label: 'DASHBOARD',  icon: LayoutDashboard, exact: true },
  { href: '/admin/services', label: 'SERVICIOS',  icon: Package,         exact: false },
  { href: '/admin/settings', label: 'AJUSTES',    icon: Settings,        exact: false },
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="space-y-1">
      {links.map(({ href, label, icon: Icon, exact }) => {
        const active = exact ? pathname === href : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            className={`group relative flex items-center justify-between px-8 py-3 transition-all ${
              active
                ? 'bg-foreground text-background'
                : 'text-foreground hover:bg-muted'
            }`}
          >
            <div className="flex items-center gap-4">
              <Icon size={14} className={active ? '' : 'opacity-40'} />
              <span className="text-[10px] font-black tracking-[0.2em]">{label}</span>
            </div>
            {active && (
              <ChevronRight size={12} />
            )}
            {!active && (
              <ChevronRight size={12} className="opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-1" />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
