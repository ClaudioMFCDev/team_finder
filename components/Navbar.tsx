'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

export default function Navbar() {
  const { data: session, status } = useSession();

  return (
    <nav className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center">
      <Link href="/" className="text-xl font-bold">
        Team Finder
      </Link>

      <div>
        {status === 'loading' ? (
          <span>Cargando...</span>
        ) : session ? (
          <div className="flex items-center space-x-4">
            <span>Hola, {session.user?.name ?? session.user?.email}</span>
            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              className="bg-red-600 px-3 py-1 rounded"
            >
              Cerrar sesión
            </button>
          </div>
        ) : (
          <Link href="/login" className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700">
            Iniciar sesión
          </Link>
        )}
      </div>
    </nav>
  );
}
