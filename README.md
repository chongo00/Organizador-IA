
# Organizador de Archivos (AI File Organizer)

Aplicación web que te ayuda a organizar archivos en carpetas según sus nombres, usando inteligencia artificial para sugerir agrupaciones y generar scripts automatizados.

## ¿Qué hace este proyecto?

- Escanea los nombres de los archivos en una carpeta seleccionada desde tu navegador.
- Utiliza un modelo de IA para sugerir agrupaciones por prefijos significativos (por ejemplo, series, proyectos, etc.).
- Muestra el plan de organización en pantalla.
- Genera un script ejecutable (Bash para macOS/Linux o PowerShell para Windows) que crea las carpetas y mueve los archivos según el plan.

## Requisitos

- Node.js 16+ (o versión compatible con Vite)
- npm o yarn

## Instalación y ejecución local

1. Clona o descarga el repositorio y sitúate en la carpeta del proyecto.

2. Instala dependencias:

   ```powershell
   npm install
   

3. Configura la clave del servicio de IA.

   La aplicación lee la clave desde una variable de entorno expuesta al cliente por Vite. Crea un archivo `.env.local` en la raíz del proyecto con la siguiente variable (sustituye `YOUR_KEY` por tu clave):

   ```text
   VITE_GEMINI_API_KEY=YOUR_KEY
   ```

   > **Nota:** Si usas otra implementación de backend para proteger la clave, adapta las instrucciones. No incluyas claves reales en el repositorio.

4. Ejecuta la aplicación en modo desarrollo:

   ```powershell
   npm run dev
   ```

5. Abre el navegador en la URL que muestre Vite (por defecto http://localhost:5173).

## Cómo usar la app

1. Selecciona la carpeta que quieres analizar (el navegador leerá los nombres de los archivos localmente).
2. Pulsa "Analizar con IA" para que la aplicación genere un plan de organización.
3. Revisa el plan propuesto y, si te gusta, descarga o copia el script generado.
4. Ejecuta el script en la carpeta objetivo para mover los archivos.

## Variables de entorno y seguridad

- `VITE_GEMINI_API_KEY`: clave del servicio de IA (se usa en el cliente si así está configurado). Considera crear un pequeño backend para no exponer claves en clientes públicos.

## Desarrollo y pruebas

- Para compilar o crear una versión de producción, usa:

  ```powershell
  npm run build
  ```

- Para previsualizar la versión de producción:

  ```powershell
  npm run preview
  ```

## Autor

Creado por **chongo00**.

