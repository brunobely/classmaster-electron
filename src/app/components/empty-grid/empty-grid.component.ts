import { Component, OnInit } from '@angular/core';
import { ipcRenderer } from 'electron';
import { StoreService } from '../../services/store/store.service';

@Component({
  selector: 'app-empty-grid',
  templateUrl: './empty-grid.component.html',
  styleUrls: ['./empty-grid.component.scss']
})
export class EmptyGridComponent implements OnInit {

  showNewAssignmentModal = false;

  constructor(private store: StoreService) { }

  ngOnInit() {
  }

  onModalOverlayClick(event) {
    console.log('clicked modal overlay', event);
    this.dismissModal();
  }

  onAddAssignment(event) {
    event.preventDefault(); // why does clicking this button trigger a re-render/check?

    console.log('add assignment pls', event);

    // TODO: for now will use a modal overlay, might go with multiple windows later but will
    //       require a change in the store.
    // See `electron-redux` and https://medium.com/getstation/what-we-learned-from-data-persistence-in-our-growing-electron-app-72c9ad19fce

    // // TODO: maybe implement a service that handles windows?
    // ipcRenderer.send('window:open:new-assignment', {
    //   course: this.store.getFirstSelected(),
    // });

    this.showNewAssignmentModal = true;

    // // TODO: enhance user experience like switching to the window instead of killing
    // //       the existing one and opening a new one, if there already is an open one
    // window.open('/test', 'add_course', 'nodeIntegration=yes');
  }

  dismissModal() {
    this.showNewAssignmentModal = false;
  }

}
