# Team Finder

Proyecto con Next.js, TypeScript, Prisma y SQLite.

## 🚀 Instrucciones para levantar el proyecto

### 1. Cloná el repositorio y pararse en la carpeta raiz (con cd team-finder)

```bash
git clone https://github.com/usuario/team-finder.git
cd team-finder
```

### 2. Instalá las dependencias

```bash
npm install
```

### 3. Configurá la base de datos local

Usamos **SQLite**, no necesita instalación.

Asegurate de tener el archivo `.env.local` con el siguiente contenido:

```
DATABASE_URL="file:./dev.db"
```

> Si no existe, crealo manualmente en la raíz del proyecto.

### 4. Generá y sincronizá la base de datos

```bash
npx prisma migrate reset --force
```

Esto:
- Borra y recrea la base de datos.
- Corre los seeds si hay (opcional).
- Refleja los modelos de Prisma.

### 5. Levantá el servidor de desarrollo

```bash
npm run dev
```

Abrí `http://localhost:3000` para ver el proyecto en el navegador.

---

## 🧠 Notas

- Para ver tus propios pedidos: `/mis-pedidos`
- Para ver todos los pedidos: `/`
- Registro y login están implementados con NextAuth.
- La base de datos es local y no requiere configuración extra.
