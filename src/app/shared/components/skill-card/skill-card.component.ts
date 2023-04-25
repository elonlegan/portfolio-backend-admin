import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

import { Account, Role, Skill } from '@app/models';

@Component({
  selector: 'app-skill-card',
  templateUrl: './skill-card.component.html',
  styleUrls: ['./skill-card.component.scss'],
})
export class SkillCardComponent implements OnInit {
  Role = Role;
  @Input() skill: Skill;
  @Input() account: Account;
  @Output() delete: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onDelete(id: string) {
    this.delete.emit(id);
  }
}
