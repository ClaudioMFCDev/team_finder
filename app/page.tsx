import prisma from "@/lib/prisma";
import Link from 'next/link';
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions"; // Ajustá la ruta según tengas el archivo



export default async function Home() {

  // Get Session dentro de
  const session = await getServerSession(authOptions);
  const pedidos = await prisma.teamRequest.findMany({
    include: { applicants: true, user: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Pedidos recientes</h1>
      <div className="space-y-4">
        {pedidos.map((pedido) => (
          <div key={pedido.id} className="border rounded p-4">
            <h2 className="text-xl font-semibold">{pedido.category}</h2>
            <p>{pedido.description}</p>
            <p className="text-sm text-gray-500">
              Creado por: {pedido.user.username}
            </p>
            {session?.user?.id !== pedido.userId && (
              <Link
                href={`/requests/${pedido.id}`}
                className="text-blue-600 hover:underline"
              >
                Postularse
              </Link>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
