'use client';

import { signOut, useSession } from 'next-auth/react';

export default function UserMenu() {
  const { data: session, status } = useSession();

  if (status === 'loading') return <p>Cargando...</p>;

  if (!session) {
    return <p>No estás autenticado</p>;
  }

  return (
    <div>
      <p>Hola, {session.user?.name ?? 'Usuario'}</p>
      <button
        onClick={() => signOut({ callbackUrl: '/' })}
        className="bg-red-600 text-white px-3 py-1 rounded"
      >
        Cerrar sesión
      </button>
    </div>
  );
}
