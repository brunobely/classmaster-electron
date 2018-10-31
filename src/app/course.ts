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
    const noDueDate = []; // ! TODO: incorporate this into timeline? at beginning? at end?

    // TODO: optimize this
    // TODO: also cache this somehow and invalidate when changing assignments
    for (const w of weeks) {
      for (const type in this.assignments) {
        if (this.assignments.hasOwnProperty(type)) { // this is good practice with 'const ... in', recall why (find a link)
          for (const assignment of this.assignments[type]) {
            if (!assignment.dueDate) {
              noDueDate.push(assignment);
            } else if (w.dateRange.contains(assignment.dueDate)) {
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
      // TODO: should assignments with no due date appear first or last? using last for now
      //       how to make sure sort is stable? maybe just sort by name? or add a creation date?
      // ^ maybe just add an 'position' or 'order' property, which will also help support moving stuff
      //   ^ which only applies to assignments on the same date
      this.assignments[type].sort((a, b) => {
        if (a.dueDate && b.dueDate) {
          return a.dueDate.getTime() - b.dueDate.getTime();
        } else if (a.dueDate) {
          return -1;
        } else if (b.dueDate) {
          return 1;
        } else {
          // return 0; // could be unstable

          // Empty titles (new assignments) come last
          if (a.title && b.title) {
            return a.title.localeCompare(b.title);
          } else if (a.title) {
            return -1;
          } else if (b.title) {
            return 1;
          } else {
            return -1;
          }
        }
      });
    } else {
      this.assignments[type] = [assignment];
      this.displayOrder.push(type);
    }
  }

  removeAssignment(assignment: Assignment) {
    const type = assignment.type;

    if (!this.assignments || !(type in this.assignments)) {
      return; // TODO: handle errors
    }

    // Need to remove the type altogether
    if (this.assignments[type].length === 1) {
      delete this.assignments[type];
      const position = this.displayOrder.findIndex(t => t === type);
      this.displayOrder.splice(position, 1);

      // // See: https://stackoverflow.com/questions/679915/how-do-i-test-for-an-empty-javascript-object
      // // because Object.keys(new Date()).length === 0;
      // // we have to do some additional check
      // if (Object.keys(this.assignments).length === 0 && this.assignments.constructor === Object) {
      //   // TODO: should this just be kept as an empty object?
      //   this.assignments = null;
      // }
      // // TODO: should this just be kept as an empty array?
      // if (this.displayOrder.length === 0) {
      //   this.displayOrder = null;
      // }
      // // TODO: make sure both of those execute every time. They should always be in sync.
    } else {
      const position = this.assignments[type].findIndex(a => a.id === assignment.id);
      if (position < 0) {
        return; // TODO: handle errors
      }
      this.assignments[type].splice(position, 1);
    }
  }

  updateAssignment(assignment: Assignment) {
    // TODO: handle errors, throw exceptions if needed?
    const type = assignment.type;
    const position = this.assignments[type].findIndex(a => a.id === assignment.id);
    this.assignments[type][position] = assignment;
  }

  // TODO: allow for reordering of assignments

}
