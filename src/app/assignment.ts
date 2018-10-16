export interface Assignments {
  [type: string]: Assignment[];
}

export class Assignment {
  id: number;
  title: string;
  dueDate: Date;
  type: string;
}
