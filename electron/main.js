import { app, BrowserWindow } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      webSecurity: true
    },
    title: 'Organizador de Archivos IA',
    show: false // No mostrar hasta que esté listo
  });

  // En desarrollo, carga desde Vite dev server
  // En producción, carga el archivo HTML construido
  const isDev = process.env.NODE_ENV === 'development' || !app.isPackaged;
  
  if (isDev) {
    mainWindow.loadURL('http://localhost:3000');
    mainWindow.webContents.openDevTools();
  } else {
    // En producción, usar path relativo desde donde está el ejecutable
    // En electron-builder, los archivos se copian a resources/app.asar o resources/app
    // El dist folder está en el mismo nivel que electron cuando se empaqueta
    const distPath = path.join(__dirname, '..', 'dist', 'index.html');
    mainWindow.loadFile(distPath);
  }

  // Mostrar ventana cuando esté lista
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
