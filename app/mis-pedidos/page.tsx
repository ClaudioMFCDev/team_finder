import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import prisma from "@/lib/prisma";

export default async function MisPedidosPage() {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  if (!userId) return <p>No estás logueado.</p>;

  const teamRequests = await prisma.teamRequest.findMany({
    where: { userId },
    include: { applicants: true }, // Asegurate de que esta relación exista en el modelo
  });

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Mis pedidos</h1>
      {teamRequests.map((request) => (
        <div key={request.id} className="border p-4 mb-2 rounded-lg">
          <h2 className="text-lg font-semibold">{request.category}</h2>
          <p>{request.description}</p>
        </div>
      ))}
    </div>
  );
}
