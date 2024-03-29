import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

import { Account, Project, Role } from '@app/models';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss'],
})
export class ProjectCardComponent implements OnInit {
  Role = Role;
  @Input() project: Project;
  @Input() account: Account;
  @Output() delete: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onDelete(id: string) {
    this.delete.emit(id);
  }
}
