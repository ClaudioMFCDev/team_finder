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

      {status === 'loading' ? (
        <span>Cargando...</span>
      ) : session ? (
        <div className="flex items-center space-x-4">
          {/* Botones adicionales para usuario logueado */}
          <Link href="/mis-pedidos">
            <button className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700">
              Mis pedidos
            </button>
          </Link>
          <Link href="/new-request">
            <button className="bg-green-600 px-4 py-2 rounded hover:bg-green-700">
              Crear pedido
            </button>
          </Link>
          <Link href="/">
            <button className="bg-purple-600 px-4 py-2 rounded hover:bg-purple-700">
              Ver todos
            </button>
          </Link>

          <span>Hola, {session.user?.name ?? session.user?.email}</span>
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="bg-red-600 px-3 py-1 rounded hover:bg-red-700"
          >
            Cerrar sesión
          </button>
        </div>
      ) : (
        <div className="flex items-center space-x-4">
          <Link href="/register">
            <button className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700">
              Registrarse
            </button>
          </Link>
          <Link href="/login">
            <button className="bg-green-600 px-4 py-2 rounded hover:bg-green-700">
              Iniciar sesión
            </button>
          </Link>
        </div>
      )}
    </nav>
  );
}
