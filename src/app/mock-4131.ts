import { Week } from './week';
import { Assignment } from './assignment';

// TODO: maybe move all this boilerplate to a separate file and export `moment`
import * as Moment from 'moment';
import { extendMoment } from 'moment-range';
const moment = extendMoment(Moment);

export const ASSIGNMENTS_4131: { [assignmentType: string]: Assignment[] } = {
  'test': [
    {
      title: 'Homework 1',
      dueDate: new Date('2018-09-07'),
      type: 'homework',
    },
  ],
  'test2': [
    {
      title: 'Homework 1',
      dueDate: new Date('2018-09-07'),
      type: 'homework',
    },
  ],
  'homework': [
    {
      title: 'Homework 1',
      dueDate: new Date('2018-09-07'),
      type: 'homework',
    },
    {
      title: 'Homework 2',
      dueDate: new Date('2018-09-14'),
      type: 'homework',
    },
    {
      title: 'Homework 3',
      dueDate: new Date('2018-09-28'),
      type: 'homework',
    },
    {
      title: 'Homework 4',
      dueDate: new Date('2018-10-05'),
      type: 'homework',
    },
    {
      title: 'Homework 5',
      dueDate: new Date('2018-10-11'),
      type: 'homework',
    },
    {
      title: 'Homework 6',
      dueDate: new Date('2018-10-19'),
      type: 'homework',
    },
    {
      title: 'Homework 7',
      dueDate: new Date('2018-10-26'),
      type: 'homework',
    },
    {
      title: 'Homework 8',
      dueDate: new Date('2018-11-02'),
      type: 'homework',
    },
  ],
  'exam': [
    {
      title: 'Exam 1',
      dueDate: new Date('2018-10-04'),
      type: 'exam',
    },
    {
      title: 'Exam 2',
      dueDate: new Date('2018-10-18'),
      type: 'exam',
    },
    {
      title: 'Exam 3',
      dueDate: new Date('2018-11-01'),
      type: 'exam',
    },
  ],
  'quiz': [
    {
      title: 'Quiz 1',
      dueDate: new Date('2018-09-11'),
      type: 'quiz',
    },
    {
      title: 'Quiz 2',
      dueDate: new Date('2018-09-25'),
      type: 'quiz',
    },
    {
      title: 'Quiz 3',
      dueDate: new Date('2018-10-02'),
      type: 'quiz',
    },
    {
      title: 'Quiz 4',
      dueDate: new Date('2018-10-08'),
      type: 'quiz',
    },
    {
      title: 'Quiz 5',
      dueDate: new Date('2018-10-15'),
      type: 'quiz',
    },
    {
      title: 'Quiz 6',
      dueDate: new Date('2018-10-29'),
      type: 'quiz',
    },
  ],
};

export const WEEKS_4131: Week[] = [
  {
    number: 1,
    dateRange: moment.range(new Date('2018-09-02'), new Date('2018-09-08')),
    assignments: [
      {
        title: 'Homework 1',
        dueDate: new Date('2018-09-07'),
        type: 'homework',
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
        type: 'quiz',
      },
      {
        title: 'Homework 2',
        dueDate: new Date('2018-09-14'),
        type: 'homework',
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
        type: 'quiz',
      },
      {
        title: 'Homework 3',
        dueDate: new Date('2018-09-28'),
        type: 'homework',
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
        type: 'quiz',
      },
      {
        title: 'Exam 1',
        dueDate: new Date('2018-10-04'),
        type: 'exam',
      },
      {
        title: 'Homework 4',
        dueDate: new Date('2018-10-05'),
        type: 'homework',
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
        type: 'quiz',
      },
      {
        title: 'Homework 5',
        dueDate: new Date('2018-10-11'),
        type: 'homework',
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
        type: 'quiz',
      },
      {
        title: 'Exam 2',
        dueDate: new Date('2018-10-18'),
        type: 'exam',
      },
      {
        title: 'Homework 6',
        dueDate: new Date('2018-10-19'),
        type: 'homework',
      },
    ],
  },
  {
    number: 8,
    dateRange: moment.range(new Date('2018-10-21'), new Date('2018-10-27')),
    assignments: [
      {
        title: 'Homework 7',
        dueDate: new Date('2018-10-26'),
        type: 'homework',
      },
    ],
  },
  {
    number: 9,
    dateRange: moment.range(new Date('2018-10-28'), new Date('2018-11-03')),
    assignments: [
      {
        title: 'Quiz 6',
        dueDate: new Date('2018-10-29'),
        type: 'quiz',
      },
      {
        title: 'Exam 3',
        dueDate: new Date('2018-11-01'),
        type: 'exam',
      },
      {
        title: 'Homework 8',
        dueDate: new Date('2018-11-02'),
        type: 'homework',
      },
    ],
  }
];
