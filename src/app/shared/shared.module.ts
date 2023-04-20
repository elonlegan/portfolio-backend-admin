import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { WeekPipe } from './pipes/week.pipe';
import { ProjectCardComponent } from './components/project-card/project-card.component';
import { SkillCardComponent } from './components/skill-card/skill-card.component';
import { SkillPillComponent } from './components/skill-pill/skill-pill.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    WeekPipe,
    ProjectCardComponent,
    SkillCardComponent,
    SkillPillComponent,
  ],
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  exports: [
    HeaderComponent,
    FooterComponent,
    WeekPipe,
    ProjectCardComponent,
    SkillCardComponent,
    SkillPillComponent,
  ],
})
export class SharedModule {}
