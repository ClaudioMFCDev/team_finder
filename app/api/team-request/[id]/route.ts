// app/api/team-request/[id]/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
    
  const url = new URL(request.url);
  const segments = url.pathname.split('/');
  const id = segments[segments.length - 1];

  const teamRequest = await prisma.teamRequest.findUnique({
    where: { id },
    select: {
      category: true,
      description: true,
    },
  });

  if (!teamRequest) {
    return NextResponse.json({ error: 'Pedido no encontrado' }, { status: 404 });
  }

  return NextResponse.json(teamRequest);
}
