import { Injectable } from '@angular/core';
import { UserDataService } from '../user-data/user-data.service';
import { Course } from '../../course';
import { CourseItem } from '../../course-item';
import { ContentType } from '../../content-type';
import { Icon } from '../../icon';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  public courses: Course[];
  public selectedType: ContentType;
  public selectedCourses: number[]; // indices referring to `courses`

  // TODO: get rid of these, keep courses in order
  public sidebarOrder: string[];
  public sidebarCourseItems: CourseItem[];

  // Default icon by content type
  public defaultIcons: Icon[] = [
    { // Schedule
      name: 'university',
      prefix: 'fas',
    },
    { // Today
      name: 'star',
      prefix: 'fas',
    },
    { // Upcoming
      name: 'calendar-alt',
      prefix: 'fas',
    },
    { // Course
      name: 'square',
      prefix: 'fas',
    }
  ];

  constructor(private userDataService: UserDataService) { }

  load(): Promise<boolean> {
    this.selectedType = ContentType.Schedule;
    this.selectedCourses = [];

    return new Promise((resolve, reject) => {
      this.userDataService.getCourses()
        .then(courses => {
          this.courses = courses;
          // return this.userDataService.getSidebarOrder();
        });
        // .then(ord => {
        //   console.log('got sidebar order:', ord);

        //   let order: string[];
        //   if (ord) {
        //     order = ord;
        //   } else {
        //     order = this.courses.map(c => c.id);
        //     this.userDataService.updateSidebarOrder(order);
        //   }
        //   this.sidebarCourseItems = order.map(id => CourseItem.from(this.courses.find(c => c.id === id)));
        //   console.log('order:', order);
        //   console.log('sidebar course items:', this.sidebarCourseItems);

        // });
    });
  }

  /**
   * Adds a new course to the data store.
   *
   * @param course - The course to be added
   * @param position - The position in the sidebar to insert the course
   *
   * @returns The index of the newly inserted course
   */
  addCourse(course: Course, position?: number): number {
    if (position) {
      this.courses = [
        ...this.courses.slice(0, position),
        course,
        ...this.courses.slice(position)
      ];
      return position;
    } else {
      this.courses = [...this.courses, course];
      return this.courses.length - 1;
    }
  }

  updateCourseTitle(index: number, title: string) {
    this.courses[index].title = title;
  }


  // ----- Sidebar selection

  selectType(type: ContentType.Schedule|ContentType.Today|ContentType.Upcoming) {
    this.selectedType = type;
    this.selectedCourses = [];
  }

  selectCourse(index: number) {
    this.selectedType = ContentType.Course;
    this.selectedCourses = [index];
  }

  addCourseToSelection(index: number) {
    this.selectedType = ContentType.Course;
    this.selectedCourses = [...this.selectedCourses, index];
  }

  removeCourseFromSelection(index: number) {
    this.selectedCourses = this.selectedCourses.filter(i => i !== index);
  }

}
