import { Menu, MenuItemConstructorOptions, BrowserWindow, shell } from 'electron';

export function createAppMenu(mainWindow: BrowserWindow) {
  const isMac = process.platform === 'darwin';
  console.log('isMac', isMac);

  const template: MenuItemConstructorOptions[] = [
    {
      label: 'File',
      submenu: [
        {
          label: 'Open',
          accelerator: 'CmdOrCtrl+O',
          click: () => {
            mainWindow.webContents.send('menu-open');
          }
        },
        isMac ? { role: 'close' } : { role: 'quit' }
      ]
    },
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        ...(isMac
          ? [
              { role: 'pasteAndMatchStyle' as 'pasteAndMatchStyle' },
              { role: 'delete' as 'delete' },
              { role: 'selectAll' as 'selectAll' },
              { type: 'separator' as 'separator' },
              {
                label: 'Speech',
                submenu: [
                  { role: 'startSpeaking' as 'startSpeaking' },
                  { role: 'stopSpeaking' as 'stopSpeaking' }
                ]
              }
            ]
          : [
              { role: 'delete' as 'delete' },
              { type: 'separator' as 'separator' },
              { role: 'selectAll' as 'selectAll' }
            ])
      ]
    },
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'forceReload' },
        { role: 'toggleDevTools' },
        { type: 'separator' },
        { role: 'resetZoom' },
        { role: 'zoomIn' },
        { role: 'zoomOut' },
        { type: 'separator' },
        { role: 'togglefullscreen' }
      ]
    },
    {
      label: 'Window',
      submenu: [
        { role: 'minimize' },
        { role: 'zoom' },
        { type: 'separator' },
        { role: 'front' },
        { type: 'separator' },
        { role: 'window' },
        { role: 'close' }
      ]
    },
    {
      role: 'help',
      submenu: [
        {
          label: 'Learn More',
          click: async () => {
            await shell.openExternal('https://electronjs.org');
          }
        }
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);

  return Menu;
}