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
    this.computedStyle = {
      'border-color': this.accent.lighten(0.05),
      'color': this.accent.hex(),
    };
  }

}
