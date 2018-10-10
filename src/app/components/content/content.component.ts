import {
  Component,
  OnInit,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import * as ctType from '../../content-type';

import { ContentItem } from '../../content-item';
import { CourseItem } from '../../course-item';

import { WEEKS_4131 } from '../../mock-4131-weeks';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  ContentType = ctType.ContentType; // need this so we can reference ContentType in template

  @Input() selected: ContentItem|CourseItem;
  @Output() update = new EventEmitter<ContentItem|CourseItem>();

  weeks = WEEKS_4131;

  constructor() { }

  ngOnInit() {
  }

  save(e, item: ContentItem|CourseItem) {
    e.preventDefault();
    console.log(e, item);

    this.update.emit(item); // TODO: maybe trim the title?
    e.target.blur();
  }

}
