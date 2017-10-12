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

import { ActivityListGridComponent } from './activity-list/activity-list-grid.component';

import { WorklistsRoutingModule } from './worklists-routing.module';

import { ActivityEditorComponent } from './editor/activity-editor.component';
import { ActivityCloseComponent } from './editor/tabs/activity-close.component';
import { ActivityUpdateComponent } from './editor/tabs/activity-update.component';

import { ProjectsMainPageComponent } from './main-page/projects-main-page.component';
import { GanttComponent } from './gantt/gantt.component';

import { ActivityAddComponent } from './create-activity/activity-add.component';
import { ActivitySelectorComponent } from './create-activity/activity-selector.component';
import { ActivityDescriptionComponent } from './create-activity/activity-description.component';
import { ActivityWorklistComponent } from './create-activity/activity-worklist.component';
import { ActivityInfoComponent } from './create-activity/activity-info.component';

/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */

@NgModule({
  imports: [WorklistsRoutingModule, SharedModule, CommonModule, FormsModule, ContractsModule],
  declarations: [ActivityListGridComponent, 
                 ActivityEditorComponent, ActivityCloseComponent,
                 ProjectsMainPageComponent, GanttComponent,
                 ActivityAddComponent,ActivitySelectorComponent, ActivityDescriptionComponent,
                 ActivityWorklistComponent, ActivityInfoComponent,
                 ActivityUpdateComponent],                 
  exports: [ActivityListGridComponent,
            ProjectsMainPageComponent, GanttComponent,]
})
export class WorklistsModule { }
