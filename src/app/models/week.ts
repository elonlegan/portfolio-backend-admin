import { Project } from './project';

export class Week {
  id: string;
  value: string;
  projects: string[] | Project[];
}
