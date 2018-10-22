import { app, ipcMain } from 'electron';

import * as path from 'path';
import * as fse from 'fs-extra';
import { Course } from '../../src/app/course';

const basePath: string = path.join(app.getAppPath(), 'userdata');
const coursesPath: string = path.join(basePath, 'courses');
const sidebarPath: string = path.join(basePath, 'sidebar.json');

export function init() {
  console.log('app path:', app.getAppPath());
  console.log('__dirname', __dirname);

  fse.mkdirs(coursesPath);
  fse.createFile(sidebarPath);

  ipcMain.on('test', (event, arg) => {
    console.log('arg', arg);
  });

  // TODO: maybe use REST terminology?
  ipcMain.on('create:course', (event, arg) => {
    console.log('create:course, arg:', arg);

    const filePath = path.join(coursesPath, `${arg.course.title}-${arg.course.id}.course`);
    fse.outputJSON(filePath, arg.course, err => {
      // TODO: maybe reply with a success or error message?
      if (err) {
        console.log(err);
      } else {
        console.log(`Wrote ${arg.course.title}-${arg.course.id}.course successfully!`);
      }
    });
  });

  ipcMain.on('load:courses', (event, arg) => {
    const courses: Course[] = [];
    console.log('--- load:courses');

    fse.readdir(coursesPath, (err, files) => {
      if (err) {
        console.log(err);
      } else {
        files.forEach(file => {
          console.log('reading:', file);
          // TODO: is it bad to do this synchronously? otherwise how to know all are done?
          //       since it's in the main process it should be fine...? keep an eye on it
          const course = Course.fromJSON(fse.readJSONSync(path.join(coursesPath, file)));
          console.log('got:', course);
          console.log(course.accent instanceof require('color'));
          courses.push(course);
        });

        console.log('sending back:');
        console.log(courses);

        event.sender.send('reply:load:courses', { courses });
        console.log('---');
      }
    });
  });

  // Load the course order for the sidebar (IDs only)
  ipcMain.on('load:sidebar-order', (event, arg) => {
    fse.readJSON(sidebarPath, (err, data) => {
      if (err) {
        // TODO: maybe send back an error to the renderer process
        console.log(err);
      } else {
        event.sender.send('reply:load:sidebar-order', { order: data.order });
      }
    });
  });

  // Update the course order for the sidebar (IDs only)
  ipcMain.on('update:sidebar-order', (event, arg) => {
    fse.readJSON(sidebarPath, (readErr, data) => {
      fse.outputJSON(sidebarPath, { ...data, order: arg.order }, err => {
        if (err) {
          console.log(err);
        } else {
          console.log('Wrote sidebar order successfully!');
        }
      });
    });
  });
}
