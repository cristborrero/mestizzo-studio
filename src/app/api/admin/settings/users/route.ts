import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { authorizedUsers } from '@/lib/db/schema';
import { auth } from '@/auth';

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const body = await request.json();
    const { email } = body;

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Email inválido' }, { status: 400 });
    }

    if (email === 'cristborrero@gmail.com') {
      return NextResponse.json({ error: 'Este correo ya es admin maestro' }, { status: 400 });
    }

    const [newUser] = await db
      .insert(authorizedUsers)
      .values({ email, addedBy: session.user.email })
      .returning();

    return NextResponse.json(newUser);
  } catch (error: any) {
    if (error.code === '23505') { // Postgres unique violation
      return NextResponse.json({ error: 'El usuario ya está autorizado' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
