import {
  Component,
  OnInit,
  EventEmitter,
  Input,
  Output,
  OnChanges,
} from '@angular/core';
import * as ctType from '../../content-type';
import { ContentType } from '../../content-type';

import { ContentItem } from '../../content-item';
import { CourseItem } from '../../course-item';

import { WEEKS_4131, ASSIGNMENTS_4131, CSCI_4131 } from '../../mock-4131';
import { Course } from '../../course';
import { UserDataService } from '../../services/user-data/user-data.service';
import { StoreService } from '../../services/store/store.service';
import { Icon } from '../../icon';

import * as Color from 'color';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit, OnChanges {
  ContentType = ctType.ContentType; // need this so we can reference ContentType in template

  @Output() update = new EventEmitter<CourseItem>();

  // weeks = WEEKS_4131;
  // assignments = ASSIGNMENTS_4131;

  constructor(public store: StoreService, private userDataService: UserDataService) { }

  ngOnInit() {
  }

  ngOnChanges() {
  }

  // ! TODO: this only returns the first course. delete it and maybe move the header into each content component?
  course(): Course {
    if (!this.store.courses) {
      return null;
    }
    // TODO: need to check for bounds or is `undefined` fine?
    return this.store.courses[this.store.selectedCourses[0]];
  }

  // ! TODO: this is only here while I don't implement multi-selection in content
  courseIndex(): number {
    return this.store.selectedCourses.length > 0 ? this.store.selectedCourses[0] : -1;
  }

  title(): string {
    console.log('selected:', this.store.selectedType);

    switch (this.store.selectedType) {
      case ContentType.Schedule:
        console.log('AAAAAAAAAAAAAAAA');
        return 'Schedule';
      case ContentType.Today:
        console.log('BBBBBBBBBBBBBBBB');
        return 'Today';
      case ContentType.Upcoming:
        console.log('CCCCCCCCCCCCCCCC');
        return 'Upcoming';
      case ContentType.Course:
        console.log('DDDDDDDDDDDDDDDD');
        console.log(this.course());
        console.log(this.course().title);

        return this.course().title;
    }
    return 'ERROR: invalid content type';
  }

  icon(): Icon {
    return this.store.defaultIcons[this.store.selectedType];
  }

  accent(): Color {
    return Color('#777777');
  }

  updateTitle(e, title: string) {
    e.preventDefault();
    console.log(e, title);

    // this.update.emit(courseItem); // TODO: maybe trim the title?
    this.store.updateCourseTitle(this.courseIndex(), title);

    e.target.blur();

    // this.course.title = courseItem.title;
    // this.userDataService.updateCourse(this.course);
  }

}
