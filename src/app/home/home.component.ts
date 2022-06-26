import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { Project, Week } from '@app/models';

import { AccountService } from '@app/services';
import { ProjectService } from '@app/services';

import * as moment from 'moment';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit {
  account = this.accountService.accountValue;

  projects: Project[];
  allProjects: Project[];
  weeks: Week[];
  selectedWeek: any;

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

        this.setWeeks(this.allProjects);
        this.setProjects();
      });
  }

  setWeeks(projects: Project[]) {
    let allWeeks = [];
    projects.forEach(({ weeks }) => {
      allWeeks = [...allWeeks, ...weeks];
    });

    allWeeks = allWeeks.filter(
      (week, index, self) =>
        index === self.findIndex((element) => element.value === week.value)
    );

    // sorting
    allWeeks = allWeeks.sort(this.compareWeeks);

    this.weeks = allWeeks;

    this.setClosestWeek(this.weeks);
  }

  compareWeeks(a, b) {
    if (a.value < b.value) {
      return -1;
    }
    if (a.value > b.value) {
      return 1;
    }
    return 0;
  }

  setClosestWeek(weeks) {
    const today = new Date();

    // this code was written on 2022/03/15 if you are in the future and the year "9999" is not too far away, change it
    let closest = '9999-01-01';

    weeks.forEach((week) => {
      const date = new Date(moment(week.value).format());

      if (date >= today && date < new Date(closest)) {
        closest = week;
      }
    });

    this.selectedWeek =
      weeks.indexOf(closest) > 0
        ? weeks.indexOf(closest) - 1
        : weeks.indexOf(closest);
  }

  setProjects() {
    this.projects = this.allProjects.filter(
      (project) =>
        project.weeks.filter(
          (week) => week.value === this.weeks[this.selectedWeek].value
        ).length > 0
    );
  }
}
