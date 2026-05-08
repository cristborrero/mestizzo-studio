import { db } from '@/lib/db';
import { authorizedUsers } from '@/lib/db/schema';
import { desc } from 'drizzle-orm';
import { SettingsManager } from './SettingsManager';

export const dynamic = 'force-dynamic';

export default async function SettingsPage() {
  const users = await db.query.authorizedUsers.findMany({
    orderBy: [desc(authorizedUsers.createdAt)],
  });

  return (
    <div className="max-w-4xl space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-primary tracking-tight">Ajustes</h1>
      </div>
      
      <div className="rounded-xl border border-border bg-surface p-6">
        <h2 className="text-base font-medium text-primary">Control de Acceso</h2>
        <p className="mt-1 text-sm text-secondary">
          Gestiona qué correos electrónicos tienen permiso para iniciar sesión en el panel de administración.
          <br/>El correo cristborrero@gmail.com es el súper administrador predeterminado y no puede ser removido.
        </p>

        <div className="mt-6">
          <SettingsManager initialUsers={users} />
        </div>
      </div>
    </div>
  );
}
