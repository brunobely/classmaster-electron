import { ipcMain, BrowserWindow, screen, Display } from 'electron';

import * as path from 'path';
import { Course } from '../../src/app/course';

let auxWindows: BrowserWindow[] = [];

export function init(mainWindow: BrowserWindow, pathToIndex: string) {
  ipcMain.on('window:open:new-assignment', (event, arg) => {
    console.log('window:open:new-assignment');

    // Default is to center the window, so this is unnecessary
    // const mainBounds = mainWindow.getBounds();
    // const primaryDisplay: Display = screen.getDisplayNearestPoint({ x: mainBounds.x, y: mainBounds.y });

    const size = { width: 400, height: 250 };
    // Create the browser window.
    const win = new BrowserWindow({
      // TODO: pass better parameters for x/y (maybe middle of main window? maybe middle of screen?)
      // Default is to center the window, so this is unnecessary
      // x: (primaryDisplay.workAreaSize.width - size.width) / 2,
      // y: (primaryDisplay.workAreaSize.height - size.height) / 2,
      width: size.width,
      height: size.height,
      titleBarStyle: 'hidden',
      icon: path.join(__dirname, 'assets/icons/png/1024x1024.png'), // TODO: might need to change this later if changed elsewhere
      show: false,
      resizable: false,
    });

    // TODO: maybe use url.format here, and put 'test' under the `hash` property
    win.loadURL(path.join(pathToIndex, '#', 'new-assignment'));

    const index = auxWindows.length;
    auxWindows.push(win);

    // Optional: open DevTools
    win.webContents.openDevTools({ mode: 'detach' });

    win.once('ready-to-show', () => {
      win.show();
    });
    // Emitted when the window is closed.
    win.on('closed', () => {
      // Dereference the window object, usually you would store window
      // in an array if your app supports multi windows, this is the time
      // when you should delete the corresponding element.
      auxWindows = [...auxWindows.slice(0, index), ...auxWindows.slice(index)];
    });

  });
}
