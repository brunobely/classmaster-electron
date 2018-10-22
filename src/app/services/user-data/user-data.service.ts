import { Injectable } from '@angular/core';
import { Course } from '../../course';
import { CSCI_4131 } from '../../mock-4131';

import { ipcRenderer } from 'electron';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor() { }

  // TODO: might want to return observables from these to facilitate calling and avoid callback hell

  getCourse(id: string): Course {
    return CSCI_4131;
  }

  getCourses(): Promise<Course[]> {
    return new Promise((resolve, reject) => {
      ipcRenderer.once('reply:load:courses', (event, arg) => {
        console.log('Got courses:', arg.courses);
        const courses = arg.courses.map(c => Course.fromJSON(c));
        resolve(courses);
      });
      ipcRenderer.send('load:courses', { });
    });
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


  // ----- Sidebar

  getSidebarOrder(): Promise<string[]> {
    return new Promise((resolve, reject) => {
      ipcRenderer.once('reply:load:sidebar-order', (event, arg) => {
        resolve(arg.order);
      });
      ipcRenderer.send('load:sidebar-order');
    });
  }

  /**
   * Updates the order of courses displayed on the application sidebar
   *
   * @param order array of course IDs
   */
  updateSidebarOrder(order: string[]) {
    ipcRenderer.send('update:sidebar-order', { order });
  }

  appendToSidebar(id: string) {
    this.getSidebarOrder().then(order => {
      console.log('order', order, 'id', id);
      this.updateSidebarOrder([...order, id]);
    });
  }
}
