import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { SkillService } from '@app/services';
import { Skill } from '@app/models';

@Component({ templateUrl: 'skills.component.html' })
export class SkillsComponent implements OnInit {
  skills: Skill[];

  constructor(private skillService: SkillService) {}

  ngOnInit() {
    this.skillService
      .getAll()
      .pipe(first())
      .subscribe((skills) => (this.skills = skills));
  }
}
