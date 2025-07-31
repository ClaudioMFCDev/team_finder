'use client';
import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Error al registrar');
        return;
      }
      // Redirige al login tras registro exitoso
      router.push('/login');
    } catch (err) {
      console.error(err);
      setError('Error inesperado.');
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-8">
      <div className="w-full max-w-md border p-6 shadow">
        <h1 className="text-2xl font-bold mb-6 text-center">Registro</h1>
        {error && <p className="text-red-600 mb-4">{error}</p>}
        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            placeholder="Usuario"
            value={username}
            onChange={e => setUsername(e.target.value)}
            className="border p-2 w-full text-gray-800"
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="border p-2 w-full text-gray-800"
            required
          />
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded w-full"
          >
            Registrarse
          </button>
        </form>
        <p className="mt-4 text-sm text-center">
          ¿Ya tenés cuenta?{' '}
          <a href="/login" className="text-blue-600 underline">
            Inicia sesión
          </a>
        </p>
      </div>
    </main>
  );
}