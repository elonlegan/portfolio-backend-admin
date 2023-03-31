import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { SkillsRoutingModule } from './skills-routing.module';
import { ListComponent } from './list/list.component';
import { AddEditComponent } from './add-edit/add-edit.component';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SkillsRoutingModule,
    SharedModule,
  ],
  declarations: [ListComponent, AddEditComponent],
})
export class SkillsModule {}
