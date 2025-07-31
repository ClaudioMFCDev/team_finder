import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { z, ZodError } from 'zod';

const ApplicantSchema = z.object({
  name: z.string().min(1),
  message: z.string().min(1),
  teamRequestId: z.string().cuid(),
});

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const data = ApplicantSchema.parse(json);

    const applicant = await prisma.applicant.create({
      data: {
        name: data.name,
        message: data.message,
        teamRequestId: data.teamRequestId,
      },
    });

    return NextResponse.json(applicant, { status: 201 });
  } catch (err) {
    if (err instanceof ZodError) {
      return NextResponse.json({ errors: err.issues }, { status: 400 });
    }
    console.error(err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const teamRequestId = url.searchParams.get('teamRequestId');

  const where = teamRequestId ? { teamRequestId } : {};
  const applicants = await prisma.applicant.findMany({
    where,
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json(applicants);
}
