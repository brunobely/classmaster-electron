import * as uuidv1 from 'uuid/v1';

export interface Assignments {
  [type: string]: Assignment[];
}

export class Assignment {
  id: string;
  title: string;
  dueDate?: Date;
  type: string;

  // TODO: maybe a constructor?

  static emptyWithType(type: string): Assignment {
    return {
      id: uuidv1(),
      title: '',
      type: type,
    };
  }
}
