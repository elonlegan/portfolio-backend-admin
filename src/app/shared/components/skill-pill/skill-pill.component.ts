import { Component, Input, OnInit } from '@angular/core';
import { Skill } from '@app/models';

@Component({
  selector: 'app-skill-pill',
  templateUrl: './skill-pill.component.html',
  styleUrls: ['./skill-pill.component.scss'],
})
export class SkillPillComponent implements OnInit {
  @Input() skill: Skill;

  constructor() {}

  ngOnInit(): void {
    console.log(this.skill);
  }
  showData(): void {
    console.log(this.skill);
  }

  myStyle(): object {
    return { 'background-color': this.skill.color };
  }
}
