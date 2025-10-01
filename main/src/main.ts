import { app, BrowserWindow, screen, ipcMain } from 'electron';
import { isDev } from 'electron-util/main';
import path from 'path';
import { format } from 'url';
import { createAppMenu } from './menu';

let mainWindow: BrowserWindow | null = null;

function createWindow(): void {
  const size = screen.getPrimaryDisplay().workAreaSize

  mainWindow = new BrowserWindow({
    x: 0,
    y: 0,
    width: size.width,
    height: size.height,
    minWidth: 1200,
    minHeight: 600,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      nodeIntegrationInWorker: true,
      preload: path.join(__dirname, 'preload.cjs')
    },
    show: false
  });

  ipcMain.on('savecontent', (e, content) => {
    console.log('savecontent', content, e)
  })

  createAppMenu(mainWindow);

  if (isDev) {
    mainWindow.loadURL('http://localhost:5500');
  } else {
    mainWindow.loadURL(
      format({
        pathname: path.join(__dirname, 'renderer/index.html'),
        protocol: 'file',
        slashes: true
      })
    );
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  mainWindow.webContents.on('devtools-opened', () => {
    mainWindow!.focus();
  });

  mainWindow.on('ready-to-show', () => {
    mainWindow!.show();
    mainWindow!.focus();

    if (isDev) {
      mainWindow!.webContents.openDevTools({ mode: 'right' });
    }
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
