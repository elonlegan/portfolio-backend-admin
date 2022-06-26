import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { Project } from '@app/models';

import { AccountService } from '@app/services';
import { ProjectService } from '@app/services';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit {
  account = this.accountService.accountValue;

  projects: Project[];
  allProjects: Project[];
  projectSearch: string;

  constructor(
    private accountService: AccountService,
    private projectService: ProjectService
  ) {}

  ngOnInit() {
    this.projectService
      .getAll()
      .pipe(first())
      .subscribe((projects) => {
        this.allProjects = projects;
        this.projects = projects;
      });
  }

  setProjects() {
    console.log(this.projectSearch);

    this.projects = this.allProjects.filter((project) =>
      project.title.includes(this.projectSearch)
    );
  }
}
