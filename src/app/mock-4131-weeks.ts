import { Week } from './week';

// TODO: maybe move all this boilerplate to a separate file and export `moment`
import * as Moment from 'moment';
import { extendMoment } from 'moment-range';
const moment = extendMoment(Moment);

export const WEEKS_4131: Week[] = [
  {
    number: 1,
    dateRange: moment.range(new Date('2018-09-02'), new Date('2018-09-08')),
    assignments: [
      {
        title: 'Homework 1',
        dueDate: new Date('2018-09-07'),
      },
    ],
  },
  {
    number: 2,
    dateRange: moment.range(new Date('2018-09-09'), new Date('2018-09-15')),
    assignments: [
      {
        title: 'Quiz 1',
        dueDate: new Date('2018-09-11'),
      },
      {
        title: 'Homework 2',
        dueDate: new Date('2018-09-14'),
      },
    ],
  },
  {
    number: 3,
    dateRange: moment.range(new Date('2018-09-16'), new Date('2018-09-22')),
    assignments: [],
  },
  {
    number: 4,
    dateRange: moment.range(new Date('2018-09-23'), new Date('2018-09-29')),
    assignments: [
      {
        title: 'Quiz 2',
        dueDate: new Date('2018-09-25'),
      },
      {
        title: 'Homework 3',
        dueDate: new Date('2018-09-28'),
      },
    ],
  },
  {
    number: 5,
    dateRange: moment.range(new Date('2018-09-30'), new Date('2018-10-06')),
    assignments: [
      {
        title: 'Quiz 3',
        dueDate: new Date('2018-10-02'),
      },
      {
        title: 'Exam 1',
        dueDate: new Date('2018-10-04'),
      },
      {
        title: 'Homework 4',
        dueDate: new Date('2018-10-05'),
      },
    ],
  },
  {
    number: 6,
    dateRange: moment.range(new Date('2018-10-07'), new Date('2018-10-13')),
    assignments: [
      {
        title: 'Quiz 4',
        dueDate: new Date('2018-10-08'),
      },
      {
        title: 'Homework 5',
        dueDate: new Date('2018-10-11'),
      },
    ],
  },
  {
    number: 7,
    dateRange: moment.range(new Date('2018-10-14'), new Date('2018-10-20')),
    assignments: [
      {
        title: 'Quiz 5',
        dueDate: new Date('2018-10-15'),
      },
      {
        title: 'Exam 2',
        dueDate: new Date('2018-10-18'),
      },
      {
        title: 'Homework 5',
        dueDate: new Date('2018-10-19'),
      },
    ],
  }
];
