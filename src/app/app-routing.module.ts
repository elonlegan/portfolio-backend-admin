import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { AuthGuard } from './helpers';
import { Role } from './models';

const accountModule = () =>
  import('./account/account.module').then((x) => x.AccountModule);
const accountsModule = () =>
  import('./accounts/accounts.module').then((x) => x.AccountsModule);
const profileModule = () =>
  import('./profile/profile.module').then((x) => x.ProfileModule);
const projectsModule = () =>
  import('./projects/projects.module').then((x) => x.ProjectsModule);
const skillsModule = () =>
  import('./skills/skills.module').then((x) => x.SkillsModule);

const routes: Routes = [
  { path: '', redirectTo: '/projects', pathMatch: 'full' },
  { path: 'account', loadChildren: accountModule },
  { path: 'profile', loadChildren: profileModule, canActivate: [AuthGuard] },
  { path: 'projects', loadChildren: projectsModule, canActivate: [AuthGuard] },
  { path: 'skills', loadChildren: skillsModule, canActivate: [AuthGuard] },
  {
    path: 'accounts',
    loadChildren: accountsModule,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] },
  },

  // otherwise redirect to home
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
