# BackendAPP - Gestión de Créditos

Este proyecto contiene el backend de la aplicación de gestión de créditos.

## Tecnologías utilizadas

- Node.js
- Express
- MySQL
- Render (despliegue)
- Dotenv

## Endpoints disponibles

- `POST /api/clientes` – Crear un nuevo cliente
- `POST /api/creditos` – Registrar un nuevo crédito
- `GET /api/clientes_creditos` – Obtener clientes junto con sus créditos
- `GET /api/clientes?cedula=XXXXX` – Buscar cliente por cédula

## Variables de entorno

Asegúrate de tener un archivo `.env` con:

```env
DB_HOST=...
DB_PORT=...
DB_USER=...
DB_PASSWORD=...
DB_NAME=...
PORT=5000
```
Iniciar localmente
```bash
Copiar
Editar
npm install
node server.js
```
Enlace desplegado
👉 https://backendapp-twgq.onrender.com
