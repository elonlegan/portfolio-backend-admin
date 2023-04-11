import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { SkillService } from '@app/services';
import { Skill } from '@app/models';

@Component({ templateUrl: 'list.component.html' })
export class ListComponent implements OnInit {
  skills: Skill[];

  constructor(private skillService: SkillService) {}

  ngOnInit() {
    this.skillService
      .getAll()
      .pipe(first())
      .subscribe((skills) => (this.skills = skills));
  }

  deleteProject(id: string) {
    const project = this.skills.find((x) => x.id === id);
    project.isDeleting = true;
    this.skillService
      .delete(id)
      .pipe(first())
      .subscribe(() => {
        this.skills = this.skills.filter((x) => x.id !== id);
      });
  }
}
