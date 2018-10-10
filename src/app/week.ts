import { Assignment } from './assignment';

// TODO: maybe move all this boilerplate to a separate file and export `moment`
import * as Moment from 'moment';
import { extendMoment, DateRange } from 'moment-range';
const moment = extendMoment(Moment);

// TODO: naming
export class Week {
  number: number;
  dateRange: DateRange;
  assignments: Assignment[];
}
