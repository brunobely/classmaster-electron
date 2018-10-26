import { Assignments, Assignment } from './assignment';
import { Week } from './week';
import { Icon } from './icon';
import * as Color from 'color';

import { BASE_WEEK } from './mock-base-week';

// TODO: maybe move all this boilerplate to a separate file and export `moment`
import * as Moment from 'moment';
import { extendMoment } from 'moment-range';
const moment = extendMoment(Moment);

export class Course {

  constructor(
    public id: string,
    public title: string,
    public accent: Color,
    public code?: string,
    public department?: string,
    public assignments?: Assignments,
    public icon?: Icon,
    public displayOrder?: string[]) {
  }

  static fromJSON(json: any): Course {
    const accent = Color({
      r: json.accent.color[0],
      g: json.accent.color[1],
      b: json.accent.color[2],
    });
    return new Course(json.id, json.title, accent, json.code, json.department, json.assignments, json.icon, json.displayOrder);
  }

  // TODO: make this into a calculated property that changes with get/set to assignments?
  // TODO: or maybe call Week.weeksFrom(course.assignments)?
  //       would transition well into allowing multiple courses to be shown simultaneously
  weeks(): Week[] {
    // TODO: get base weeks from a new service called term service
    const weeks: Week[] = BASE_WEEK();

    // TODO: optimize this
    // TODO: also cache this somehow and invalidate when changing assignments
    for (const w of weeks) {
      for (const type in this.assignments) {
        if (this.assignments.hasOwnProperty(type)) {
          for (const assignment of this.assignments[type]) {
            if (w.dateRange.contains(assignment.dueDate)) {
              w.assignments.push(assignment);
            } else {
              // Can short-circuit since assignments must be in sorted order
              // TODO: remove this break if this changes
              // break;
            }
          }
        }
      }
    }

    console.log(`built weeks for ${this.department} ${this.code}:`);
    console.log(weeks);
    return weeks;
  }

  addAssignment(assignment: Assignment) {
    const type = assignment.type;

    if (!this.assignments) {
      this.assignments = {};
      this.displayOrder = [];
    }

    if (type in this.assignments) {
      // TODO: binary search when inserting
      this.assignments[type].push(assignment);
      this.assignments[type].sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime());
    } else {
      this.assignments[type] = [assignment];
      this.displayOrder.push(type);
    }
  }

  // TODO: allow for reordering of assignments

}
