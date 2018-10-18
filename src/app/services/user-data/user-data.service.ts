import { Injectable } from '@angular/core';
import { Course } from '../../course';
import { CSCI_4131 } from '../../mock-4131';

import { ipcRenderer } from 'electron';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor() { }

  getCourse(id: string): Course {
    return CSCI_4131;
  }

  async getCourses(callback) {
    ipcRenderer.once('reply:load:courses', (event, arg) => {
      console.log('Got courses:', arg.courses);
      callback(arg.courses);
    });
    ipcRenderer.send('load:courses', { });
  }

  createCourse(course: Course) {
    // Send course as a property of an object to enable future passing of more options
    ipcRenderer.send('create:course', { course });
  }

  // Finds the course by its ID and updates the rest of the information.
  // ID is immutable. (Should it not be?)
  updateCourse(course: Course) {
    ipcRenderer.send('test', 'heyo');
  }
}
