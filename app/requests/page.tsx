// app/requests/page.tsx
import prisma from '@/lib/prisma';
import Link from 'next/link';

type RequestType = Awaited<ReturnType<typeof prisma.teamRequest.findMany>>[number];

export default async function RequestsPage() {
  // Traemos todos los pedidos, los más recientes primero
  const requests: RequestType[] = await prisma.teamRequest.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Pedidos de equipo</h1>
      {requests.length === 0 ? (
        <p className="text-gray-500">Aún no hay pedidos creados.</p>
      ) : (
        <ul className="space-y-4">
          {requests.map((req) => (
            <li key={req.id} className="border p-4 rounded shadow">
              <h2 className="text-xl font-semibold">{req.category}</h2>
              <p className="text-gray-600 capitalize mb-1">
                Objetivo: {req.objective}
              </p>
              <p className="mb-2">{req.description}</p>
              <p className="text-sm text-gray-400 mb-2">
                Creado por {req.createdBy} el{' '}
                {new Date(req.createdAt).toLocaleDateString()}
              </p>
              <Link
                href={`/requests/${req.id}`}
                className="text-blue-600 hover:underline"
              >
                Postularse
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
