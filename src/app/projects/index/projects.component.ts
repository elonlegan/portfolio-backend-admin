import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { AccountService, ProjectService } from '@app/services';
import { Account, Project, Role } from '@app/models';

@Component({ templateUrl: 'projects.component.html' })
export class ProjectsComponent implements OnInit {
  Role = Role;
  projects: Project[];
  account: Account;

  constructor(
    private projectService: ProjectService,
    private accountService: AccountService
  ) {
    this.accountService.account.subscribe((res) => (this.account = res));
  }

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
