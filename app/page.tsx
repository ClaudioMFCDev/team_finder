import prisma from "@/lib/prisma";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions"; // Ajustá la ruta según tengas el archivo

export default async function Home() {
  const session = await getServerSession(authOptions);
  const pedidos = await prisma.teamRequest.findMany({
    include: { applicants: true, user: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Imagen de fondo con filtros */}
      <div
        className="absolute inset-0 bg-cover bg-center filter saturate-50 brightness-50 contrast-90 z-0"
        style={{ backgroundImage: "url('/lolbg.jpeg')" }}
      />

      {/* Capa superior con contenido */}
      <div className="relative z-10 p-6 text-white">
        <h1 className="text-2xl font-bold mb-4">Pedidos recientes</h1>
        <div className="space-y-4">
          {pedidos.map((pedido) => (
            <div
              key={pedido.id}
              className="bg-black bg-opacity-60 border border-white/20 rounded p-4"
            >
              <h2 className="text-xl font-semibold">{pedido.category}</h2>
              <h3 className="text-lg">
                (postulantes: {pedido.applicants.length})
              </h3>
              <p>{pedido.description}</p>
              <p className="text-sm text-gray-300">
                Creado por: {pedido.user.username}
              </p>
              {session?.user?.id !== pedido.userId && (
                <Link
                  href={`/requests/${pedido.id}`}
                  className="text-blue-400 hover:underline"
                >
                  Postularse
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
