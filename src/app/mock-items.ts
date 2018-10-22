import { ContentItem } from './content-item';
import { CourseItem } from './course-item';
import { ContentType } from './content-type';
import * as Color from 'color';

export const MOCK_ITEMS: Array<ContentItem|CourseItem>[] = [
  [
    {
      id: '0',
      title: 'Class Schedule',
      accent: Color('#708090'),
      contentType: ContentType.Schedule,
      icon: {
        name: 'university',
        prefix: 'fas',
      },
    },
  ],
  [
    {
      id: '1',
      title: 'Today',
      accent: Color('#FFD700'),
      contentType: ContentType.Today,
      icon: {
        name: 'star',
        prefix: 'fas',
      },
    },
    {
      id: '2',
      title: 'Upcoming',
      accent: Color('#CD5C5C'),
      contentType: ContentType.Upcoming,
      icon: {
        name: 'calendar-alt',
        prefix: 'fas',
      },
    },
  ],
  // [
  //   {
  //     id: '3',
  //     title: 'Internet Programming',
  //     department: 'CSCI',
  //     code: '4131',
  //     accent: Color('#FF7F50'),
  //     contentType: ContentType.Course,
  //   },
  //   {
  //     id: '4',
  //     title: 'Advanced Algorithms & Data Structures',
  //     department: 'CSCI',
  //     code: '5421',
  //     accent: Color('#6495ED'),
  //     contentType: ContentType.Course,
  //   },
  //   {
  //     id: '5',
  //     title: 'Technical Writing',
  //     department: 'WRIT',
  //     code: '3562W',
  //     accent: Color('#483D8B'),
  //     contentType: ContentType.Course,
  //   },
  //   {
  //     id: '6',
  //     title: 'Solid Earth Dynamics',
  //     department: 'ESCI',
  //     code: '2201',
  //     accent: Color('#20B2AA'),
  //     contentType: ContentType.Course,
  //   },
  // ],
];
