import { ContentItem } from './content-item';
import { ContentType } from './content-type';

import { Course } from './course';

export class CourseItem extends ContentItem {
  code: string;
  department: string;

  static from(course: Course): CourseItem {
    return {
      id: course.id,
      title: course.title,
      department: course.department,
      code: course.code,
      contentType: ContentType.Course,
      accent: course.accent,
      icon: course.icon,
    };
  }
}
