import { Component, OnInit, Input } from '@angular/core';
import { Assignment } from '../../assignment';

@Component({
  selector: 'app-tile-row',
  templateUrl: './tile-row.component.html',
  styleUrls: ['./tile-row.component.scss']
})
export class TileRowComponent implements OnInit {

  @Input() assignment: Assignment;

  constructor() { }

  ngOnInit() {
  }

}
