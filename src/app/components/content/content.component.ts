import {
  Component,
  OnInit,
  EventEmitter,
  Input,
  Output,
  OnChanges,
} from '@angular/core';
import * as ctType from '../../content-type';

import { ContentItem } from '../../content-item';
import { CourseItem } from '../../course-item';

import { WEEKS_4131, ASSIGNMENTS_4131, CSCI_4131 } from '../../mock-4131';
import { Course } from '../../course';
import { UserDataService } from '../../services/user-data/user-data.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit, OnChanges {
  ContentType = ctType.ContentType; // need this so we can reference ContentType in template

  @Input() selected: ContentItem|CourseItem;
  @Output() update = new EventEmitter<CourseItem>();

  course: Course;
  // weeks = WEEKS_4131;
  // assignments = ASSIGNMENTS_4131;

  constructor(private userDataService: UserDataService) { }

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.course) {
      console.log('old course', this.course.title);
    }

    if (this.selected.contentType === this.ContentType.Course) {
      if (!this.course || this.course.id !== this.selected.id) {
        this.course = this.userDataService.getCourse(this.selected.id);
        console.log('new course', this.course.title);
      }
    } else {
      this.course = null;
    }
  }

  updateTitle(e, courseItem: CourseItem) {
    e.preventDefault();
    console.log(e, courseItem);

    this.update.emit(courseItem); // TODO: maybe trim the title?
    e.target.blur();

    this.course.title = courseItem.title;
    this.userDataService.updateCourse(this.course);
  }

}
