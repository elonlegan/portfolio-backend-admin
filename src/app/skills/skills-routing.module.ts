import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SkillsComponent } from './index/skills.component';

const routes: Routes = [
  {
    path: '',
    component: SkillsComponent,
    children: [{ path: '', component: SkillsComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SkillsRoutingModule {}
