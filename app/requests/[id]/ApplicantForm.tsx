'use client';

import { useState, FormEvent } from 'react';

type Props = {
  teamRequestId: string;
};

export default function ApplicantForm({ teamRequestId }: Props) {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSuccess(false);
    setError('');

    try {
      const res = await fetch('/api/applicants', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, message, teamRequestId }),
      });

      if (!res.ok) {
        const data = await res.json();
        if (data.errors) {
          setError('Por favor completá todos los campos correctamente.');
        } else {
          setError('Ocurrió un error al enviar la solicitud.');
        }
        return;
      }

      setName('');
      setMessage('');
      setSuccess(true);
    } catch (err) {
      setError('Error inesperado.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Tu nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 w-full text-gray-800"
      />
      <textarea
        placeholder="Mensaje al creador del equipo"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="border p-2 w-full text-gray-800"
      />
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
        Postularme
      </button>
      {success && <p className="text-green-700">¡Solicitud enviada!</p>}
      {error && <p className="text-red-600">{error}</p>}
    </form>
  );
}
