"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ApplicantForm from "./ApplicantForm";

interface Applicant {
  id: string;
  name: string;
  message: string;
}
interface TeamRequestDetail {
  category: string;
  description: string;
}

export default function RequestDetailPage() {
  const { id } = useParams();
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [requestDetail, setRequestDetail] = useState<TeamRequestDetail | null>(null);

  useEffect(() => {
    if (!id) return;

    // Cargar detalles del pedido
    fetch(`/api/team-request/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Pedido no encontrado");
        return res.json();
      })
      .then((data) => setRequestDetail(data))
      .catch((err) => console.error("Error al cargar el pedido:", err));

    // Cargar postulantes
    fetch(`/api/applicants?teamRequestId=${id}`)
      .then((res) => res.json())
      .then(setApplicants)
      .catch((err) => console.error("Error al cargar postulantes:", err));
  }, [id]);

  if (!requestDetail) {
    return <p className="p-4">Cargando pedido...</p>;
  }

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-8">
      <div className="bg-gray-100 p-4 rounded shadow space-y-2">
        <h1 className="text-2xl font-bold mb-1 text-gray-950">{requestDetail.category} (postulantes: {applicants.length})</h1>
        <p className="text-gray-700 ">{requestDetail.description}</p>

        <div>
          <label className="text-sm font-medium text-gray-800">Link para compartir:</label>
          <div className="flex items-center space-x-2 mt-1">
            <input
              type="text"
              readOnly
              value={
                typeof window !== "undefined"
                  ? `${window.location.origin}/requests/${id}`
                  : ""
              }
              className="w-full px-2 py-1 border rounded text-sm bg-white text-gray-800"
            />
            <button
              onClick={() => {
                navigator.clipboard.writeText(
                  `${window.location.origin}/requests/${id}`
                );
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
            >
              Copiar
            </button>
          </div>
        </div>
      </div>

      <ApplicantForm teamRequestId={id as string} />

      {/* <div>
        <h2 className="text-xl font-semibold mb-2">Postulantes</h2>
        {applicants.length === 0 ? (
          <p className="text-gray-500">Todavía no hay postulantes.</p>
        ) : (
          <ul className="space-y-2">
            {applicants.map((applicant) => (
              <li key={applicant.id} className="border p-3 rounded shadow">
                <p className="font-semibold">{applicant.name}</p>
                <p className="text-sm text-gray-600">{applicant.message}</p>
              </li>
            ))}
          </ul>
        )}
      </div> */}
    </div>
  );
}
