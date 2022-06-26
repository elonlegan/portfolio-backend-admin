import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { ProjectService } from '@app/services';
import { Project } from '@app/models';

@Component({ templateUrl: 'projects.component.html' })
export class ProjectsComponent implements OnInit {
  projects: Project[];

  constructor(private projectService: ProjectService) {}

  ngOnInit() {
    this.projectService
      .getAll()
      .pipe(first())
      .subscribe((projects) => (this.projects = projects));
  }
}
