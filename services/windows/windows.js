"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var path = require("path");
var auxWindows = [];
function init(mainWindow, pathToIndex) {
    electron_1.ipcMain.on('window:open:new-assignment', function (event, arg) {
        // Default is to center the window, so this is unnecessary
        // const mainBounds = mainWindow.getBounds();
        // const primaryDisplay: Display = screen.getDisplayNearestPoint({ x: mainBounds.x, y: mainBounds.y });
        var size = { width: 400, height: 250 };
        // Create the browser window.
        var win = new electron_1.BrowserWindow({
            // TODO: pass better parameters for x/y (maybe middle of main window? maybe middle of screen?)
            // Default is to center the window, so this is unnecessary
            // x: (primaryDisplay.workAreaSize.width - size.width) / 2,
            // y: (primaryDisplay.workAreaSize.height - size.height) / 2,
            width: size.width,
            height: size.height,
            titleBarStyle: 'hidden',
            icon: path.join(__dirname, 'assets/icons/png/1024x1024.png'),
            show: false,
            resizable: false,
        });
        // TODO: maybe use url.format here, and put 'test' under the `hash` property
        win.loadURL(path.join(pathToIndex, '#', 'new-assignment'));
        var index = auxWindows.length;
        auxWindows.push(win);
        // Optional: open DevTools
        win.webContents.openDevTools({ mode: 'detach' });
        win.once('ready-to-show', function () {
            win.show();
        });
        // Emitted when the window is closed.
        win.on('closed', function () {
            // Dereference the window object, usually you would store window
            // in an array if your app supports multi windows, this is the time
            // when you should delete the corresponding element.
            auxWindows = auxWindows.slice(0, index).concat(auxWindows.slice(index));
        });
    });
}
exports.init = init;
//# sourceMappingURL=windows.js.map