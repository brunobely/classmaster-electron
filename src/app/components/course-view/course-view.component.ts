import { Component, OnInit } from '@angular/core';
import { Course } from '../../course';
import { StoreService } from '../../services/store/store.service';

@Component({
  selector: 'app-course-view',
  templateUrl: './course-view.component.html',
  styleUrls: ['./course-view.component.scss']
})
export class CourseViewComponent implements OnInit {

  constructor(private store: StoreService) { }

  ngOnInit() {
  }

  selectedCourse(): Course {
    if (!this.store.courses) {
      return null;
    }
    // TODO: need to check for bounds or is `undefined` fine?
    return this.store.courses[this.store.selectedCourses[0]];
  }

}
