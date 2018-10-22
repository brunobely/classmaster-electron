import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-empty-grid',
  templateUrl: './empty-grid.component.html',
  styleUrls: ['./empty-grid.component.scss']
})
export class EmptyGridComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onAddAssignment(event) {
    console.log('add assignment pls', event);
  }

}
