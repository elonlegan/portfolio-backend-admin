import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProjectsComponent } from './index/projects.component';

const routes: Routes = [
  {
    path: '',
    component: ProjectsComponent,
    children: [{ path: '', component: ProjectsComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectsRoutingModule {}
