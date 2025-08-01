# Team Finder

**Team Finder** es una aplicación web que permite a usuarios crear y gestionar solicitudes de equipo para juegos en línea (como League of Legends, Valorant, etc.). Otros jugadores pueden postularse a estas solicitudes de forma simple y sin necesidad de registrarse, proporcionando su nombre, email y un mensaje.

## 🛠 Stack Tecnológico

- **Next.js 14** con App Router
- **TypeScript**
- **Prisma ORM** con base de datos **SQLite**
- **Tailwind CSS** para estilos
- **Autenticación con NextAuth.js**
- **Servidor local / desarrollo sin backend externo**

## 🔍 Funcionalidades

- Registro de usuarios y login seguro.
- Creación de solicitudes de equipo con título, categoría y descripción.
- Vista de pedidos disponibles directamente en la página de inicio.
- Cada pedido muestra:
  - Su categoría (juego)
  - Descripción
  - Creador
  - Cantidad de postulantes
- Un usuario puede postularse a pedidos ajenos ingresando su nombre, email y mensaje.
- No se permite que el creador se postule a su propio pedido.
- Un mismo email no puede postularse más de una vez al mismo pedido (validación por email único).
- Navbar fijo con navegación simple y estilizado con botones.
- Imagen de fondo personalizada con ajustes de brillo, saturación y contraste para mejor estética visual.

## 👩‍💻 Participantes

- **Jason Pelis** - Desarrollo Fullstack
- **Cynthia Sotelo** - Colaboradora / Testing / Revisión

## ▶️ Cómo iniciar el proyecto

1. Clonar el repositorio:

   ```bash
   git clone <URL_DEL_REPO>
   cd team-finder
   ```

2. Instalar dependencias:

   ```bash
   npm install
   ```

3. Aplicar la base de datos local y correr migraciones:

   ```bash
   npx prisma migrate reset --force
   ```

4. Iniciar el servidor de desarrollo:

   ```bash
   npm run dev
   ```

5. ¡Listo! Accedé a la app desde `http://localhost:3000`

## 📁 Estructura general del proyecto

```
/app
  /api
    /applicants
    /requests
  /requests
  /auth
  /components
/prisma
  schema.prisma
/lib
  prisma.ts
  authOptions.ts
```

