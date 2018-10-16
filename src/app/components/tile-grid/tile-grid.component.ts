import { Component, OnInit, Input } from '@angular/core';
import { Assignments } from '../../assignment';

@Component({
  selector: 'app-tile-grid',
  templateUrl: './tile-grid.component.html',
  styleUrls: ['./tile-grid.component.scss']
})
export class TileGridComponent implements OnInit {

  @Input() assignments: Assignments;

  displayOrder: string[] = ['homework', 'exam', 'quiz'];
  columnIndices: number[];

  constructor() { }

  ngOnInit() {
    // Generates an array of the first displayOrder.length/2 even numbers
    this.columnIndices = Array(Math.ceil(this.displayOrder.length / 2)).fill(0).map((_, i) => 2 * i);

    console.log(this.columnIndices);
    console.log('assignments:', this.assignments);
  }

}
