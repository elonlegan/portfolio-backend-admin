import { Component, OnInit, Input } from '@angular/core';

import { Project } from '@app/models';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss'],
})
export class ProjectCardComponent implements OnInit {
  @Input() project: Project;

  constructor() {}

  ngOnInit(): void {}
}
