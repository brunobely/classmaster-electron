import { Assignments } from './assignment';
import { Week } from './week';
import { Icon } from './icon';
import * as Color from 'color';

import { BASE_WEEK } from './mock-base-week';

// TODO: maybe move all this boilerplate to a separate file and export `moment`
import * as Moment from 'moment';
import { extendMoment } from 'moment-range';
const moment = extendMoment(Moment);

export class Course {
  id: number;
  title: string;
  code: string;
  department: string;
  assignments: Assignments;
  accent: Color;
  icon: Icon;

  constructor(id: number, title: string, code: string, department: string, assignments: Assignments, accent: Color, icon?: Icon) {
    this.id = id;
    this.title = title;
    this.code = code;
    this.department = department;
    this.assignments = assignments;
    this.accent = accent;
    this.icon = icon;
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
}
