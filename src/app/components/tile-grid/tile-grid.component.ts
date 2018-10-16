import { Component, OnInit, Input } from '@angular/core';
import { Assignments } from '../../assignment';

@Component({
  selector: 'app-tile-grid',
  templateUrl: './tile-grid.component.html',
  styleUrls: ['./tile-grid.component.scss']
})
export class TileGridComponent implements OnInit {

  @Input() assignments: Assignments;

  displayOrder: string[] = ['homework', 'exam', 'quiz', 'test', 'test2'];

  constructor() { }

  ngOnInit() {
    console.log('assignments:', this.assignments);
  }

}
