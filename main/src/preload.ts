import { IpcRendererEvent, contextBridge, ipcRenderer } from "electron";
export type Channels = 'ipc-client' | 'savecontent';

const electronHandler = {
  ipcRenderer: {
    sendMessage(channel: Channels, ...args: unknown[]) {
      ipcRenderer.send( channel, ...args);
    },
    on(channel: Channels, func: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) => func(...args);
      ipcRenderer. on(channel, subscription);
      return () => {
        ipcRenderer.removeListener(channel, subscription);
      };
    },
    once(channel: Channels, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
  },
};

const versionsHandler = {
  chrome: process.versions["chrome"],
  node: process.versions["node"],
  electron: process.versions["electron"],
};

contextBridge.exposeInMainWorld('electron', electronHandler);
contextBridge.exposeInMainWorld(' versions', versionsHandler);

export type ElectronHandler = typeof electronHandler;
export type VersionsHandler = typeof versionsHandler;
