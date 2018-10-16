export interface Assignments {
  [type: string]: Assignment[];
}

export class Assignment {
  title: string;
  dueDate: Date;
  type: string;
}
