import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from './layout.component';
import { OverviewComponent } from './overview.component';

const accountsModule = () =>
  import('./accounts/accounts.module').then((x) => x.AccountsModule);

const projectsModule = () =>
  import('./projects/projects.module').then((x) => x.ProjectsModule);

const skillsModule = () =>
  import('./skills/skills.module').then((x) => x.SkillsModule);

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: OverviewComponent },
      { path: 'accounts', loadChildren: accountsModule },
      { path: 'projects', loadChildren: projectsModule },
      { path: 'skills', loadChildren: skillsModule },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
