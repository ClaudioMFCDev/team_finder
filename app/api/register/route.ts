import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {

    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json({ error: 'Faltan campos' }, { status: 400 });
    }
    const exists = await prisma.user.findUnique({ where: { username } });
    if (exists) {
      return NextResponse.json({ error: 'El usuario ya existe' }, { status: 400 });
    }
    // En producción: hashea la contraseña con bcrypt
    const user = await prisma.user.create({ data: { username, password } });
    return NextResponse.json({ id: user.id, username: user.username }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}