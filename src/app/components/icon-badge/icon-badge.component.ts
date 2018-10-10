import { Component, OnChanges, Input } from '@angular/core';
import * as Color from 'color';

import { Icon } from '../../icon';

@Component({
  selector: 'app-icon-badge',
  templateUrl: './icon-badge.component.html',
  styleUrls: ['./icon-badge.component.scss']
})
export class IconBadgeComponent implements OnChanges {

  @Input() accent: Color;
  @Input() icon: Icon;

  computedStyle;

  constructor() { }

  ngOnChanges() {
    this.computedStyle = {
      'border-color': this.accent.lighten(0.05),
      'color': this.accent.hex().toString(),
    };
    console.log('icon style:', this.computedStyle);
  }

}
