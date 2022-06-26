import { Week } from './week';

export class Project {
  id: string;
  title: string;
  imageUrl: string;
  startWeek: Week;
  finishWeek: Week;
  weeks: Week[];
  isDeleting?: boolean;
  isSendingReport?: boolean;
}
