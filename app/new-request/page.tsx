'use client';

import { useSession, signIn } from 'next-auth/react';
import { getServerSession } from 'next-auth/next';
import RequestForm from '../../components/RequestForm';

export default function NewRequestPage() {
  const { data: session, status } = useSession();

  // Mientras se carga la sesión…
  if (status === 'loading') {
    return <p className="p-8">Cargando sesión…</p>;
  }

  // Si no hay sesión, mostramos botón para iniciar sesión
  if (!session) {
    return (
      <div className="p-8 text-center">
        <p className="mb-4">Debes iniciar sesión para crear un pedido.</p>
      </div>
    );
  }

  // Si está autenticado, renderizamos el formulario
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-4">Crear nuevo pedido de equipo</h1>
      <RequestForm />
    </div>
  );
}
