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
import { ProceduresModule } from '../procedures/procedures.module';

import { ProjectExplorerComponent } from './project-explorer/project-explorer.component';

import { ProjectManagementRoutingModule } from './project-management-routing.module';

import { ActivityEditorComponent } from './editor/activity-editor.component';
import { ActivityCloseComponent } from './editor/tabs/activity-close.component';
import { ActivityUpdateComponent } from './editor/tabs/activity-update.component';

import { ProjectsMainPageComponent } from './main-page/projects-main-page.component';
import { GanttComponent } from './gantt/gantt.component';

import { ActivityWorklistComponent } from './create-activity/activity-worklist.component';

import { CreateActivityMenuComponent } from './create-activity/create-activity-menu.component';
import { SelectTypeActivityComponet } from './create-activity/wizard/select-type-activity.component';
import { WorklistActivityComponent } from './create-activity/wizard/worklist-activity.component';
import { CreateActivityWizard } from './create-activity/wizard/create-activity.wizard';

import { ProjectsFilterComponent } from './main-page/projects-filter.component';

/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */

@NgModule({
  imports: [ProjectManagementRoutingModule, SharedModule, CommonModule, FormsModule, ProceduresModule],
  declarations: [ProjectExplorerComponent,
                 ActivityEditorComponent, ActivityCloseComponent,
                 ProjectsMainPageComponent, GanttComponent,             
                 ActivityWorklistComponent, 
                 ActivityUpdateComponent, ProjectsFilterComponent,
                 CreateActivityMenuComponent, SelectTypeActivityComponet, WorklistActivityComponent,
                 CreateActivityWizard ],
  exports: [ProjectExplorerComponent, ActivityEditorComponent,
            ProjectsMainPageComponent, GanttComponent]
})
export class ProjectManagementModule { }
