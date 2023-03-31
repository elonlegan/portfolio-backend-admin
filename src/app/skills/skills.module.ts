import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { SkillsRoutingModule } from './skills-routing.module';
import { SkillsComponent } from './index/skills.component';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SkillsRoutingModule,
    SharedModule,
  ],
  declarations: [SkillsComponent],
})
export class SkillsModule {}
