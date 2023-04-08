import { Week } from './week';

export class Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  date: Date;
  url: string;
  repositoryUrl: string;
  isDeleting?: boolean;
}
