import { app, BrowserWindow, screen } from 'electron';
import * as path from 'path';
import * as url from 'url';

import * as userdata from './services/userdata/userdata';
import * as windows from './services/windows/windows';

let win, serve, pathToIndex;
const args = process.argv.slice(1);
serve = args.some(val => val === '--serve');

function createWindow() {

  // const electronScreen = screen; // why?
  // const size = electronScreen.getPrimaryDisplay().workAreaSize;

  // Default is to center the window, so this is unnecessary
  // Does this return the display currently active or display number 1?
  // const screenSize = electronScreen.getPrimaryDisplay().workAreaSize;
  const size = { width: 1050, height: 600 };

  // Create the browser window.
  win = new BrowserWindow({
    // Default is to center the window, so this is unnecessary
    // x: (screenSize.width - size.width) / 2,
    // y: (screenSize.height - size.height) / 2,
    width: size.width,
    height: size.height,
    titleBarStyle: 'hidden',
    icon: path.join(__dirname, 'assets/icons/png/1024x1024.png'), // TODO: might need to change this later if changed elsewhere
    show: false,
  });

  if (serve) {
    require('electron-reload')(__dirname, {
      electron: require(`${__dirname}/node_modules/electron`)
    });
    pathToIndex = 'http://localhost:4200';
  } else {
    pathToIndex = url.format({
      pathname: path.join(__dirname, 'dist/index.html'),
      protocol: 'file:',
      slashes: true
    });
  }

  win.loadURL(pathToIndex);

  // Optional: open DevTools
  win.webContents.openDevTools(/*{ mode: 'detach' }*/);

  // TODO: this might get slow later, so maybe find another solution. How does Discord do their splash animation?
  //       Also make changes elsewhere in the app where this is used.
  // See: https://electronjs.org/docs/api/browser-window#showing-window-gracefully
  win.once('ready-to-show', () => {
    win.show();
  });
  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store window
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });

}

try {

  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on('ready', () => {
    createWindow();
    userdata.init();
    windows.init(win, pathToIndex);
  });

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
      createWindow();
    }
  });

} catch (e) {
  // Catch Error
  // throw e;
}
