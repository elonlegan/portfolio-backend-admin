import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Skill } from '@app/models';
import { SkillService } from '@app/services';

@Component({
  selector: 'app-skill-pill',
  templateUrl: './skill-pill.component.html',
  styleUrls: ['./skill-pill.component.scss'],
})
export class SkillPillComponent implements OnInit {
  @Input() skill: Skill;

  constructor(private doms: DomSanitizer, private skillService: SkillService) {}

  ngOnInit(): void {}

  myStyle(): object {
    let mySubString = this.skill.customStyles
      .replaceAll(
        `.skill-pill--${this.skillService.camelizeTitle(this.skill.title)}`,
        ''
      )
      .replaceAll('.skill-pill', '')
      .replaceAll('{', '')
      .replaceAll('}', '');
    mySubString = `background-color: ${this.skill.color}; ${mySubString}`;

    return this.doms.bypassSecurityTrustStyle(mySubString);
  }
}
