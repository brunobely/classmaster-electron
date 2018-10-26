import { Component, OnInit, Input } from '@angular/core';
import { ipcRenderer } from 'electron';
import { StoreService } from '../../services/store/store.service';
import { Assignment } from '../../assignment';

import * as uuidv1 from 'uuid/v1';

@Component({
  selector: 'app-new-assignment',
  templateUrl: './new-assignment.component.html',
  styleUrls: ['./new-assignment.component.scss']
})
export class NewAssignmentComponent implements OnInit {

  @Input() dismiss: () => void;

  // ! TODO: allow for assignments without due dates? how to build weeks? "no due date" section?
  // TODO: validate form

  title = ''; // TODO: focus title when this is shown
  dueDate: Date;
  // TODO: initialize type as the most recently used (save in store).
  //       Maybe setting to change this to most frequently used?
  type: string;

  constructor(public store: StoreService) { }

  ngOnInit() {
    ipcRenderer.on('window:data:new-assignment', (event, arg) => {
      console.log('event', event, 'data received:', arg);

    });
  }

  updateTitle(title) {
    this.title = title;
  }

  onCancel(event) {
    console.log('cancel', event);
    this.dismiss();
  }

  onAdd(event) {
    const assignment = {
      id: uuidv1(),
      title: this.title,
      dueDate: new Date(this.dueDate),
      type: this.type.toLocaleLowerCase(),
    };
    this.store.addAssignment(assignment);
    this.dismiss();
  }

}
