import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { authorizedUsers } from '@/lib/db/schema';
import { auth } from '@/auth';
import { eq } from 'drizzle-orm';

export async function DELETE(request: Request, props: { params: Promise<{ id: string }> }) {
  try {
    const params = await props.params;
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const id = parseInt(params.id, 10);
    if (isNaN(id)) {
      return NextResponse.json({ error: 'ID inválido' }, { status: 400 });
    }

    await db.delete(authorizedUsers).where(eq(authorizedUsers.id, id));

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
