export interface Assignments {
  [type: string]: Assignment[];
}

export class Assignment {
  id: string;
  title: string;
  dueDate: Date;
  type: string;

  // TODO: maybe a constructor?
}
