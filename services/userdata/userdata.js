"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var path = require("path");
var fse = require("fs-extra");
var basePath = path.join(electron_1.app.getAppPath(), 'userdata');
var coursesPath = path.join(basePath, 'courses');
var sidebarPath = path.join(basePath, 'sidebar.json');
function init() {
    console.log('app path:', electron_1.app.getAppPath());
    console.log('__dirname', __dirname);
    fse.mkdirs(coursesPath);
    fse.createFile(sidebarPath);
    electron_1.ipcMain.on('test', function (event, arg) {
        console.log('arg', arg);
    });
    // TODO: maybe use REST terminology?
    electron_1.ipcMain.on('create:course', function (event, arg) {
        console.log('create:course, arg:', arg);
        var filePath = path.join(coursesPath, arg.course.title + "-" + arg.course.id + ".course");
        fse.outputJSON(filePath, arg.course, function (err) {
            // TODO: maybe reply with a success or error message?
            if (err) {
                console.log(err);
            }
            else {
                console.log("Wrote " + arg.course.title + "-" + arg.course.id + ".course successfully!");
            }
        });
    });
    electron_1.ipcMain.on('load:courses', function (event, arg) {
        var courses = [];
        console.log('--- load:courses');
        fse.readdir(coursesPath, function (err, files) {
            if (err) {
                console.log(err);
            }
            else {
                files.forEach(function (file) {
                    console.log('reading:', file);
                    // TODO: is it bad to do this synchronously? otherwise how to know all are done?
                    //       since it's in the main process it should be fine...? keep an eye on it
                    var course = fse.readJSONSync(path.join(coursesPath, file));
                    console.log('got:', course);
                    courses.push(course);
                });
                console.log('sending back:');
                console.log(courses);
                event.sender.send('reply:load:courses', { courses: courses });
                console.log('---');
            }
        });
    });
    // Load the course order for the sidebar (IDs only)
    electron_1.ipcMain.on('load:sidebar-order', function (event, arg) {
        fse.readJSON(sidebarPath, function (err, data) {
            if (err) {
                console.log(err);
            }
            else {
                event.sender.send('reply:load:sidebar-order', data.order);
            }
        });
    });
    // Save the course order for the sidebar (IDs only)
    electron_1.ipcMain.on('save:sidebar-order', function (event, arg) {
        fse.outputJSON(sidebarPath, arg.order, function (err) {
            if (err) {
                console.log(err);
            }
            else {
                console.log('Wrote sidebar order successfully!');
            }
        });
    });
}
exports.init = init;
//# sourceMappingURL=userdata.js.map