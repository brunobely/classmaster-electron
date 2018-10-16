import { Week } from './week';
import { Assignment } from './assignment';

// TODO: maybe move all this boilerplate to a separate file and export `moment`
import * as Moment from 'moment';
import { extendMoment } from 'moment-range';
const moment = extendMoment(Moment);

export const ASSIGNMENTS_4131: { [assignmentType: string]: Assignment[] } = {
  'test': [
    {
      id: 0,
      title: 'Homework 1',
      dueDate: new Date('2018-09-07'),
      type: 'homework',
    },
  ],
  'test2': [
    {
      id: 1,
      title: 'Homework 1',
      dueDate: new Date('2018-09-07'),
      type: 'homework',
    },
  ],
  'homework': [
    {
      id: 2,
      title: 'Homework 1',
      dueDate: new Date('2018-09-07'),
      type: 'homework',
    },
    {
      id: 3,
      title: 'Homework 2',
      dueDate: new Date('2018-09-14'),
      type: 'homework',
    },
    {
      id: 4,
      title: 'Homework 3',
      dueDate: new Date('2018-09-28'),
      type: 'homework',
    },
    {
      id: 5,
      title: 'Homework 4',
      dueDate: new Date('2018-10-05'),
      type: 'homework',
    },
    {
      id: 6,
      title: 'Homework 5',
      dueDate: new Date('2018-10-11'),
      type: 'homework',
    },
    {
      id: 7,
      title: 'Homework 6',
      dueDate: new Date('2018-10-19'),
      type: 'homework',
    },
    {
      id: 8,
      title: 'Homework 7',
      dueDate: new Date('2018-10-26'),
      type: 'homework',
    },
    {
      id: 9,
      title: 'Homework 8',
      dueDate: new Date('2018-11-02'),
      type: 'homework',
    },
  ],
  'exam': [
    {
      id: 10,
      title: 'Exam 1',
      dueDate: new Date('2018-10-04'),
      type: 'exam',
    },
    {
      id: 11,
      title: 'Exam 2',
      dueDate: new Date('2018-10-18'),
      type: 'exam',
    },
    {
      id: 12,
      title: 'Exam 3',
      dueDate: new Date('2018-11-01'),
      type: 'exam',
    },
  ],
  'quiz': [
    {
      id: 13,
      title: 'Quiz 1',
      dueDate: new Date('2018-09-11'),
      type: 'quiz',
    },
    {
      id: 14,
      title: 'Quiz 2',
      dueDate: new Date('2018-09-25'),
      type: 'quiz',
    },
    {
      id: 15,
      title: 'Quiz 3',
      dueDate: new Date('2018-10-02'),
      type: 'quiz',
    },
    {
      id: 16,
      title: 'Quiz 4',
      dueDate: new Date('2018-10-08'),
      type: 'quiz',
    },
    {
      id: 17,
      title: 'Quiz 5',
      dueDate: new Date('2018-10-15'),
      type: 'quiz',
    },
    {
      id: 18,
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
        id: 1,
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
        id: 2,
        title: 'Quiz 1',
        dueDate: new Date('2018-09-11'),
        type: 'quiz',
      },
      {
        id: 3,
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
        id: 4,
        title: 'Quiz 2',
        dueDate: new Date('2018-09-25'),
        type: 'quiz',
      },
      {
        id: 5,
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
        id: 6,
        title: 'Quiz 3',
        dueDate: new Date('2018-10-02'),
        type: 'quiz',
      },
      {
        id: 7,
        title: 'Exam 1',
        dueDate: new Date('2018-10-04'),
        type: 'exam',
      },
      {
        id: 8,
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
        id: 9,
        title: 'Quiz 4',
        dueDate: new Date('2018-10-08'),
        type: 'quiz',
      },
      {
        id: 10,
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
        id: 11,
        title: 'Quiz 5',
        dueDate: new Date('2018-10-15'),
        type: 'quiz',
      },
      {
        id: 12,
        title: 'Exam 2',
        dueDate: new Date('2018-10-18'),
        type: 'exam',
      },
      {
        id: 13,
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
        id: 14,
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
        id: 15,
        title: 'Quiz 6',
        dueDate: new Date('2018-10-29'),
        type: 'quiz',
      },
      {
        id: 16,
        title: 'Exam 3',
        dueDate: new Date('2018-11-01'),
        type: 'exam',
      },
      {
        id: 17,
        title: 'Homework 8',
        dueDate: new Date('2018-11-02'),
        type: 'homework',
      },
    ],
  }
];
