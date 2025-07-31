// app/api/requests/route.ts
import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/authOptions';
import type { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  // Verificar sesión del usuario
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
  }

  // Parsear datos desde la petición
  const { category, objective, description } = await request.json();

  // Crear el pedido y asociarlo al usuario autenticado
  const newRequest = await prisma.teamRequest.create({
    data: {
      createdBy: session.user.name || '',
      category,
      objective,
      description,
      user: {
        connect: { id: session.user.id as string },
      },
    },
  });

  return NextResponse.json(newRequest, { status: 201 });
}
