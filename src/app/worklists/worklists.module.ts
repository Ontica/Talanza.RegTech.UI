/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ContractsModule } from '../contracts/contracts.module';

import { WorklistsMainPageComponent } from './task-list/worklists-main-page.component';

import { WorklistsRoutingModule } from './worklists-routing.module';

import { TaskFormEditorComponent } from './editor/task-form-editor.component';
import { TaskCloseComponent } from './editor/task-close.component';
import { TaskUpdateComponent } from './editor/task-update.component';

import { ProjectsMainPageComponent } from './main-page/projects-main-page.component';
import { GanttComponent } from './gantt/gantt.component';

import { ActivityAddComponent } from './create-activity/activity-add.component';
import { ActivitySelectorComponent } from './create-activity/activity-selector.component';
import { ActivityDescriptionComponent } from './create-activity/activity-description.component';
import { ActivityWorklistComponent } from './create-activity/activity-worklist.component';
import { ActivityInfoComponent } from './create-activity/activity-info.component';

//import { ActivityEditorComponent } from './create-activity/activity-editor.component';
//import { ActivityGeneralInfoComponent } from './create-activity/activity-general-info.component';
//import { ActivityCurrentStateComponent } from './create-activity/activity-current-state.component';
//import { ActivityNextStateComponent } from './create-activity/activity-next-state.component';
//import { ActivityControlAndStateComponent } from './create-activity/activity-control-and-state.component';
//import { ActivityAssignTaskComponent } from './create-activity/activity-assing-task.component';

/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */

@NgModule({
  imports: [WorklistsRoutingModule, SharedModule, CommonModule, FormsModule, ContractsModule],
  declarations: [WorklistsMainPageComponent, 
                 TaskFormEditorComponent, TaskCloseComponent,
                 ProjectsMainPageComponent, GanttComponent,
                 ActivityAddComponent,ActivitySelectorComponent, ActivityDescriptionComponent,
                 ActivityWorklistComponent, ActivityInfoComponent,
                 TaskUpdateComponent],                 
  exports: [WorklistsMainPageComponent,
            ProjectsMainPageComponent, GanttComponent,]
})
export class WorklistsModule { }
