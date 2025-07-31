'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import ApplicantForm from './ApplicantForm';


export default function RequestDetailPage() {
  const { id } = useParams();
  const [applicants, setApplicants] = useState<{ id: string; name: string; message: string }[]>([]);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/applicants?teamRequestId=${id}`)
      .then((res) => res.json())
      .then(setApplicants)
      .catch((err) => console.error('Error al cargar postulantes:', err));
  }, [id]);

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-8">
      <h1 className="text-2xl font-bold">Formulario de postulación</h1>
      <ApplicantForm teamRequestId={id as string} />

      <div>
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
      </div>
    </div>
  );
}
