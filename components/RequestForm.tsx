"use client";
import { useState, FormEvent, ChangeEvent } from "react";

type FormData = {
  category: string;
  objective: "aprender" | "divertirse" | "competir" | "";
  description: string;
};

export default function RequestForm() {
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState<FormData>({
    category: "",
    objective: "",
    description: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Error al crear pedido");
      setSubmitted(true); // Mostrar mensaje de éxito
      setForm({ category: "", objective: "", description: "" });
    } catch (err) {
      console.error(err);
    }
  };

  if (submitted) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl">¡Petición de equipo creada con éxito!</h2>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 space-y-4">
      <input
        name="category"
        placeholder="Video juego (e.g. Fornite)"
        value={form.category}
        onChange={handleChange}
        className="border p-2 w-full mb-2 text-black"
        required
      />

      <select
        name="objective"
        value={form.objective}
        onChange={handleChange}
        className="border p-2 w-full mb-2 text-black"
        required
      >
        <option value="" disabled>
          Objetivo
        </option>
        <option value="aprender">Aprender</option>
        <option value="divertirse">Divertirse</option>
        <option value="competir">Competir</option>
      </select>

      <textarea
        name="description"
        placeholder="Descripción"
        value={form.description}
        onChange={handleChange}
        className="border p-2 w-full mb-2 text-black"
        required
      />

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Crear pedido
      </button>
    </form>
  );
}
