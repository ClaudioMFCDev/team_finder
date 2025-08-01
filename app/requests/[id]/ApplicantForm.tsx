"use client";

import { useState, FormEvent } from "react";

type Props = {
  teamRequestId: string;
};

export default function ApplicantForm({ teamRequestId }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSuccess(false);
    setError("");

    try {
      const res = await fetch("/api/applicants", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, teamRequestId }),
      });

      if (!res.ok) {
        const data = await res.json();
        console.error("Error del servidor:", data);
        if (data.errors) {
          setError("Por favor completá todos los campos correctamente.");
        } else if (
          data.error === "Ya te has postulado a esta solicitud con este email."
        ) {
          setError(data.error);
        } else {
          setError("Ocurrió un error al enviar la solicitud.");
        }
        return;
      }

      setName("");
      setEmail("");
      setMessage("");
      setSuccess(true);
    } catch (err) {
      setError("Error inesperado.");
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
        required
      />
      <input
        name="email"
        type="email"
        placeholder="Tu correo electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 w-full mb-2 text-black"
        required
      />
      <textarea
        placeholder="Mensaje al creador del equipo"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="border p-2 w-full text-gray-800"
        required
      />
      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Postularme
      </button>
      {success && <p className="text-green-700">¡Solicitud enviada!</p>}
      {error && <p className="text-red-600">{error}</p>}
    </form>
  );
}
