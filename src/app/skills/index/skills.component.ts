import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { AccountService, SkillService } from '@app/services';
import { Account, Role, Skill } from '@app/models';

@Component({ templateUrl: 'skills.component.html' })
export class SkillsComponent implements OnInit {
  Role = Role;
  skills: Skill[];
  account: Account;

  constructor(
    private skillService: SkillService,
    private accountService: AccountService
  ) {
    this.accountService.account.subscribe((res) => (this.account = res));
  }

  ngOnInit() {
    this.skillService
      .getAll()
      .pipe(first())
      .subscribe((skills) => (this.skills = skills));
  }

  deleteSkill(id: string) {
    const skill = this.skills.find((x) => x.id === id);
    skill.isDeleting = true;
    this.skillService
      .delete(id)
      .pipe(first())
      .subscribe(() => {
        this.skills = this.skills.filter((x) => x.id !== id);
      });
  }
}
