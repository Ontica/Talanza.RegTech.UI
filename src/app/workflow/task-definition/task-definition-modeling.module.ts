/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/Common';

import { TaskGeneralInfoComponent } from './task-general-info.component';
import { TaskEditorWindowComponent } from './task-editor.window.component';

@NgModule({
  imports: [CommonModule],
  declarations: [TaskEditorWindowComponent, TaskGeneralInfoComponent],
  exports: [TaskEditorWindowComponent, TaskGeneralInfoComponent]
})
export class TaskDefinitionModelingModule {}