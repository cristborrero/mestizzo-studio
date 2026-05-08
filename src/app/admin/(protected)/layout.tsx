import { redirect } from 'next/navigation';
import { auth, signOut } from '@/auth';
import { AdminNav } from '../_components/AdminNav';
import { LogOut, User } from 'lucide-react';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user) redirect('/admin/login');

  return (
    <div className="flex min-h-screen bg-background text-foreground selection:bg-accent selection:text-white">
      {/* Sidebar */}
      <aside className="fixed bottom-0 left-0 top-0 hidden w-64 flex-col border-r border-border bg-background lg:flex">
        {/* Brand */}
        <div className="flex h-24 items-center px-10 border-b border-border">
          <div className="flex flex-col gap-1">
            <img 
              src="/logo/logo-mestizzo.svg" 
              alt="MESTIZZO Studio" 
              className="h-4 w-auto opacity-80"
            />
            <span className="text-[9px] font-black tracking-[0.3em] opacity-40 uppercase">ADMIN PANEL</span>
          </div>
        </div>

        {/* Nav */}
        <div className="flex-1 overflow-y-auto py-8">
          <AdminNav />
        </div>

        {/* User */}
        <div className="border-t border-border p-6">
          <div className="mb-4 flex items-center gap-3">
            {session.user.image ? (
              <img src={session.user.image} alt="" className="h-8 w-8 grayscale border border-border" />
            ) : (
              <div className="flex h-8 w-8 items-center justify-center border border-border bg-muted">
                <User size={14} className="opacity-40" />
              </div>
            )}
            <div className="flex flex-col min-w-0">
              <span className="truncate text-[10px] font-bold uppercase tracking-wider">
                {session.user.name?.split(' ')[0]}
              </span>
              <span className="truncate text-[9px] opacity-40 uppercase tracking-widest">
                {session.user.email}
              </span>
            </div>
          </div>
          
          <form
            action={async () => {
              'use server';
              await signOut({ redirectTo: '/admin/login' });
            }}
          >
            <button
              type="submit"
              className="group flex w-full items-center justify-between border border-border px-4 py-2 text-[9px] font-black uppercase tracking-[0.2em] transition-all hover:bg-accent hover:text-white"
            >
              Cerrar sesión
              <LogOut size={10} className="transition-transform group-hover:translate-x-1" />
            </button>
          </form>
        </div>
      </aside>

      {/* Main */}
      <div className="flex flex-1 flex-col overflow-hidden lg:ml-64">
        <main className="flex-1 overflow-y-auto p-12 scrollbar-thin">
          {children}
        </main>
      </div>
    </div>
  );
}
