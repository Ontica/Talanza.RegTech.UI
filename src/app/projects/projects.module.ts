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
import {  WorklistsModule } from '../worklists/worklists.module'

import { ProjectsMainPageComponent } from './main-page/projects-main-page.component';
import { GanttComponent } from './components/gantt.component';

import { ActivityAddComponent } from './editor/activity-add.component';
import { ActivitySelectorComponent } from './editor/activity-selector.component';
import { ActivityDescriptionComponent } from './editor/activity-description.component';
import { ActivityWorklistComponent } from './editor/activity-worklist.component';
import { ActivityInfoComponent } from './editor/activity-info.component';

import { ActivityEditorComponent } from './editor/activity-editor.component';
import { ActivityGeneralInfoComponent } from './editor/activity-general-info.component';
import { ActivityCurrentStateComponent } from './editor/activity-current-state.component';
import { ActivityNextStateComponent } from './editor/activity-next-state.component';
import { ActivityControlAndStateComponent } from './editor/activity-control-and-state.component';
import { ActivityAssignTaskComponent } from './editor/activity-assing-task.component';

import { ProjectsRoutingModule } from './projects-routing.module';

/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */

@NgModule({
  imports: [ProjectsRoutingModule, SharedModule, CommonModule, FormsModule,  WorklistsModule],
  declarations: [ProjectsMainPageComponent, GanttComponent,
                 ActivityAddComponent,ActivitySelectorComponent, ActivityDescriptionComponent,
                 ActivityWorklistComponent, ActivityInfoComponent,
                 ActivityEditorComponent, ActivityGeneralInfoComponent,
                ActivityNextStateComponent, ActivityCurrentStateComponent,
                 ActivityControlAndStateComponent,ActivityAssignTaskComponent],
  exports: [ProjectsMainPageComponent, GanttComponent]
})
export class ProjectsModule { }
