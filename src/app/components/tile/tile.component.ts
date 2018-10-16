import { Component, OnInit, Input } from '@angular/core';
import * as plural from 'plural';

import { Assignment } from '../../assignment';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss']
})
export class TileComponent implements OnInit {

  @Input() name: string;
  @Input() data: Assignment[];

  constructor() { }

  ngOnInit() {
    // TODO: add these globally?
    plural.addRule('homework', 'homework');
    plural.addRule('quiz', 'quizzes');

    console.log(this.name, this.data);
  }

  plural(s: string, n?: number) {
    return plural(s, n);
  }
}
