import { ElectronHandler, VersionsHandler } from '../../main/src/preload';

declare global {
  interface Window {
    electron: ElectronHandler;
    versions: VersionsHandler;
  }
}

export {};
