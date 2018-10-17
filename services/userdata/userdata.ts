import { app, ipcMain } from 'electron';

export function init() {
  console.log('app path:', app.getAppPath());
  ipcMain.on('test', (event, arg) => {
    console.log('arg', arg);
  });
}
