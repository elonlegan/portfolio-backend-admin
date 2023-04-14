import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Skill } from '@app/models';

@Component({
  selector: 'app-skill-pill',
  templateUrl: './skill-pill.component.html',
  styleUrls: ['./skill-pill.component.scss'],
})
export class SkillPillComponent implements OnInit {
  @Input() skill: Skill;

  constructor(private doms: DomSanitizer) {}

  ngOnInit(): void {}

  myStyle(): object {
    let mySubString = this.skill.customStyles
      .replaceAll(`.skill-pill#${this.skill.title}`, '')
      .replaceAll('{', '')
      .replaceAll('}', '');
    mySubString += `background-color: ${this.skill.color}; `;

    return this.doms.bypassSecurityTrustStyle(mySubString);
  }
}
