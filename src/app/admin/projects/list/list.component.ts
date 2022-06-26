import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { ProjectService } from '@app/services';
import { Project } from '@app/models';

@Component({ templateUrl: 'list.component.html' })
export class ListComponent implements OnInit {
  projects: Project[];

  constructor(private projectService: ProjectService) {}

  ngOnInit() {
    this.projectService
      .getAll()
      .pipe(first())
      .subscribe((projects) => (this.projects = projects));
  }

  deleteProject(id: string) {
    const project = this.projects.find((x) => x.id === id);
    project.isDeleting = true;
    this.projectService
      .delete(id)
      .pipe(first())
      .subscribe(() => {
        this.projects = this.projects.filter((x) => x.id !== id);
      });
  }
}
