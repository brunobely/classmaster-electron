// TODO: maybe move all this boilerplate to a separate file and export `moment`
import * as Moment from 'moment';
import { extendMoment } from 'moment-range';
const moment = extendMoment(Moment);

export function BASE_WEEK() {
  return [
    {
      number: 1,
      dateRange: moment.range(new Date('2018-09-02'), new Date('2018-09-08')),
      assignments: [],
    },
    {
      number: 2,
      dateRange: moment.range(new Date('2018-09-09'), new Date('2018-09-15')),
      assignments: [],
    },
    {
      number: 3,
      dateRange: moment.range(new Date('2018-09-16'), new Date('2018-09-22')),
      assignments: [],
    },
    {
      number: 4,
      dateRange: moment.range(new Date('2018-09-23'), new Date('2018-09-29')),
      assignments: [],
    },
    {
      number: 5,
      dateRange: moment.range(new Date('2018-09-30'), new Date('2018-10-06')),
      assignments: [],
    },
    {
      number: 6,
      dateRange: moment.range(new Date('2018-10-07'), new Date('2018-10-13')),
      assignments: [],
    },
    {
      number: 7,
      dateRange: moment.range(new Date('2018-10-14'), new Date('2018-10-20')),
      assignments: [],
    },
    {
      number: 8,
      dateRange: moment.range(new Date('2018-10-21'), new Date('2018-10-27')),
      assignments: [],
    },
    {
      number: 9,
      dateRange: moment.range(new Date('2018-10-28'), new Date('2018-11-03')),
      assignments: [],
    },
    {
      number: 10,
      dateRange: moment.range(new Date('2018-11-04'), new Date('2018-11-10')),
      assignments: [],
    },
    {
      number: 11,
      dateRange: moment.range(new Date('2018-11-11'), new Date('2018-11-17')),
      assignments: [],
    },
    {
      number: 12,
      dateRange: moment.range(new Date('2018-11-18'), new Date('2018-11-24')),
      assignments: [],
    },
    {
      number: 13,
      dateRange: moment.range(new Date('2018-11-25'), new Date('2018-12-01')),
      assignments: [],
    },
    {
      number: 14,
      dateRange: moment.range(new Date('2018-12-02'), new Date('2018-12-08')),
      assignments: [],
    },
    {
      number: 15,
      dateRange: moment.range(new Date('2018-12-09'), new Date('2018-12-15')),
      assignments: [],
    },
    {
      number: 16,
      dateRange: moment.range(new Date('2018-12-16'), new Date('2018-12-20')),
      assignments: [],
    }
  ];
}
