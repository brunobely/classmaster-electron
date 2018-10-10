import { Component, OnChanges, Input } from '@angular/core';

import { Week } from '../../week';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnChanges {

  @Input() weeks: Week[];

  today: Date;

  constructor() { }

  ngOnChanges() {
    this.today = new Date();
  }

}
