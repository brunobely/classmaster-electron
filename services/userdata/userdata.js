"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
function init() {
    console.log('app path:', electron_1.app.getAppPath());
    electron_1.ipcMain.on('test', function (event, arg) {
        console.log('arg', arg);
    });
}
exports.init = init;
//# sourceMappingURL=userdata.js.map