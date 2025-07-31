// app/page.tsx

export default function Home() {
  return (
    <div className="p-8 space-y-4">
      <h1 className="text-2xl font-bold">Bienvenido a Team Finder</h1>
      <ul className="space-y-2">
        <li>
          <a href="/requests" className="text-blue-600 underline">
            Ver pedidos de equipo
          </a>
        </li>
        <li>
          <a href="/new-request" className="text-blue-600 underline">
            Crear nuevo pedido
          </a>
        </li>
      </ul>
    </div>
  );
}