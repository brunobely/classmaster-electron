import { Component, OnInit } from '@angular/core';
import { ipcRenderer } from 'electron';

@Component({
  selector: 'app-new-assignment',
  templateUrl: './new-assignment.component.html',
  styleUrls: ['./new-assignment.component.scss']
})
export class NewAssignmentComponent implements OnInit {

  title = '';

  constructor() { }

  ngOnInit() {
    ipcRenderer.on('window:data:new-assignment', (event, arg) => {
      console.log('event', event, 'data received:', arg);

    });
  }

  updateTitle(title) {
    this.title = title;
  }

}
