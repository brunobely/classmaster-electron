"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var path = require("path");
var fse = require("fs-extra");
var course_1 = require("../../src/app/course");
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
                    var course = course_1.Course.fromJSON(fse.readJSONSync(path.join(coursesPath, file)));
                    console.log('got:', course);
                    console.log(course.accent instanceof require('color'));
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
                // TODO: maybe send back an error to the renderer process
                console.log(err);
            }
            else {
                event.sender.send('reply:load:sidebar-order', { order: data.order });
            }
        });
    });
    // Update the course order for the sidebar (IDs only)
    electron_1.ipcMain.on('update:sidebar-order', function (event, arg) {
        fse.readJSON(sidebarPath, function (readErr, data) {
            fse.outputJSON(sidebarPath, __assign({}, data, { order: arg.order }), function (err) {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log('Wrote sidebar order successfully!');
                }
            });
        });
    });
}
exports.init = init;
//# sourceMappingURL=userdata.js.map