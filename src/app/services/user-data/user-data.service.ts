import { Injectable } from '@angular/core';
import { Course } from '../../course';
import { CSCI_4131 } from '../../mock-4131';

import { ipcRenderer } from 'electron';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor() { }

  getCourse(id: number): Course {
    return CSCI_4131;
  }

  // Finds the course by its ID and updates the rest of the information.
  // ID is immutable. (Should it not be?)
  updateCourse(course: Course) {
    ipcRenderer.send('test', 'heyo');
  }
}
