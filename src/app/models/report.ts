import { Week } from './week';
import { Project } from './project';
import { Account } from './account';

export class Report {
  id: string;
  hours: number;
  project: Project;
  user: Account;
  week: Week;
}
