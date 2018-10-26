import { Injectable } from '@angular/core';
import { UserDataService } from '../user-data/user-data.service';
import { Course } from '../../course';
import { CourseItem } from '../../course-item';
import { ContentType } from '../../content-type';
import { Icon } from '../../icon';
import { Assignment } from '../../assignment';

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
          return this.userDataService.getSidebarOrder();
        })
        .then(ord => {
          // console.log('got sidebar order:', ord);

          let order: string[];
          // TODO: maybe try to preserve the order that does exist then append the rest
          //       in the case that ord.length > 0 but !== this.courses.length?
          if (ord && ord.length === this.courses.length) {
            order = ord;
          } else {
            order = this.courses.map(c => c.id);
            this.userDataService.updateSidebarOrder(order);
          }
          const coursesInOrder = order.map(id => this.courses.find(c => c.id === id));
          this.courses = coursesInOrder;
          // this.sidebarCourseItems = order.map(id => CourseItem.from(this.courses.find(c => c.id === id)));
          // console.log('order:', order);
          // console.log('sidebar course items:', this.sidebarCourseItems);

        });
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
    let pos = position;

    if (position) {
      this.courses = [
        ...this.courses.slice(0, position),
        course,
        ...this.courses.slice(position),
      ];
    } else {
      this.courses = [...this.courses, course];
      pos = this.courses.length - 1;
    }

    this.userDataService.createCourse(course);
    this.userDataService.appendToSidebar(course.id);

    return pos;
  }

  getFirstSelected(): Course {
    // TODO: refactor so that courses and selectedCourses are initialized with empty arrays
    if (this.courses && this.selectedCourses) {
      return this.courses[this.selectedCourses[0]];
    }
    return null;
  }

  updateCourseTitle(index: number, title: string) {
    // BUG: saw an instance where this.courses[index] returned undefined. Maybe I clicked the UI too fast
    //      but it would be nice to find out how to reproduce it.
    this.courses[index].title = title;

    this.userDataService.updateCourse(this.courses[index]);
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


  // --- Assignments

  /**
   * Adds a new assignment to the specified course.
   *
   * This method automatically adds the course at the appropriate position in the
   * assignments array for the corresponding type, keeping the array sorted by due date.
   *
   * @param assignment - The assignment to be added
   * @param course - (Optional) The course to which the assignment should be added. If omitted, uses the first selected course.
   */
  // TODO: handling types by ignoring case. Maybe come back to this sometime
  addAssignment(assignment: Assignment, course: Course = this.getFirstSelected()) {
    const position = this.courses.findIndex(c => c.id === course.id);

    // TODO: does this count as mutating state...? how to go about it? the addAssignment method is useful
    //       because it updates the displayOrder (among others things in the future, potentially)
    course.addAssignment(assignment);

    console.log('THIS.COURSES (before)', this.courses);
    this.courses = [
      ...this.courses.slice(0, position),
      course,
      ...this.courses.slice(position + 1),
    ];
    console.log('THIS.COURSES (after)', this.courses);

    this.userDataService.updateCourse(course);
  }

}
