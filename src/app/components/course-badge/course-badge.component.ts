import { Component, Input, OnChanges } from '@angular/core';
import * as Color from 'color';

@Component({
  selector: 'app-course-badge',
  templateUrl: './course-badge.component.html',
  styleUrls: ['./course-badge.component.scss'],
})
export class CourseBadgeComponent implements OnChanges {

  @Input() department: string;
  @Input() code: string;
  @Input() accent: Color;

  computedStyle;

  constructor() { }

  ngOnChanges() {
    console.log('course badge ngOnChanges', this.department, this.code, this.accent);

    if (this.accent) {
      console.log('accent exists', this.accent);
      console.log(this.accent.lighten);
      console.log(this.accent.lighten(0.5));
    } else {
      console.log('accent does not exist', this.accent);
      console.log(this.accent.lighten);
      console.log(this.accent.lighten(0.5));
    }
    this.computedStyle = {
      'border-color': this.accent.lighten(0.05),
      'color': this.accent.hex(),
    };
  }

}
