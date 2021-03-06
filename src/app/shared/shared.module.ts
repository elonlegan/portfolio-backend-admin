import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { WeekPipe } from './pipes/week.pipe';
import { ProjectCardComponent } from './components/project-card/project-card.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    WeekPipe,
    ProjectCardComponent,
  ],
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  exports: [HeaderComponent, FooterComponent, WeekPipe, ProjectCardComponent],
})
export class SharedModule {}
