import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectsComponent } from './index/projects.component';
import { SharedModule } from '@app/shared/shared.module';
import { AddEditComponent } from './add-edit/add-edit.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ProjectsRoutingModule,
    SharedModule,
    NgMultiSelectDropDownModule.forRoot(),
  ],
  declarations: [ProjectsComponent, AddEditComponent],
})
export class ProjectsModule {}
