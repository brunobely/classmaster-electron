import { Component, OnInit } from '@angular/core';
import { ipcRenderer } from 'electron';
import { StoreService } from '../../services/store/store.service';

@Component({
  selector: 'app-empty-grid',
  templateUrl: './empty-grid.component.html',
  styleUrls: ['./empty-grid.component.scss']
})
export class EmptyGridComponent implements OnInit {

  constructor(private store: StoreService) { }

  ngOnInit() {
  }

  onAddAssignment(event) {
    event.preventDefault(); // why does clicking this button trigger a re-render/check?

    console.log('add assignment pls', event);

    // TODO: maybe implement a service that handles windows?
    ipcRenderer.send('window:open:new-assignment', {
      course: this.store.getFirstSelected(),
    });

    // // TODO: enhance user experience like switching to the window instead of killing
    // //       the existing one and opening a new one, if there already is an open one
    // window.open('/test', 'add_course', 'nodeIntegration=yes');
  }

}
