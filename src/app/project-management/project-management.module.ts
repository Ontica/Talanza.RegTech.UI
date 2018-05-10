/**
 * @license
 * Copyright (c) 2017-2018 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ProceduresModule } from '../procedures/procedures.module';
import { ControlsModule } from '../controls/controls.module';

import { ProjectManagementRoutingModule } from './project-management-routing.module';

import { ProjectsMainPageComponent } from './main-page/projects-main-page.component';
import { ProjectsFilterComponent } from './main-page/projects-filter.component';

import { ActivityTreeComponent } from './activity-tree/activity-tree.component';

import { GanttComponent } from './gantt/gantt.component';
import { GanttViewerComponent } from './gantt/gantt-viewer.component';

import { ActivityEditorComponent } from './activity-editor/activity-editor.component';


// Old version components

import { CreateActivityMenuComponent } from './create-activity-wizard/create-activity-menu.component';
import { ActivityTypeSelectorComponent } from './create-activity-wizard/steps/activity-type-selector.component';
import { ProjectModelSelectorComponent } from './create-activity-wizard/steps/project-model-selector.component';
import { CreateActivityWizardController } from './create-activity-wizard/steps/wizard-controller.component';

import { OldProjectTreeComponent } from './old-project-tree/old-project-tree.component';
import { OldActivityEditorComponent } from './old-editor/old-activity-editor.component';
import { CloseActivityComponent } from './old-editor/tabs/close-activity.component';


/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */
@NgModule({
  imports: [ProjectManagementRoutingModule, SharedModule, CommonModule, FormsModule, 
            ProceduresModule, ControlsModule],
            
  declarations: [ProjectsMainPageComponent, 
                 ProjectsFilterComponent,
                 ActivityTreeComponent,
                 GanttComponent,
                 GanttViewerComponent,
                 ActivityEditorComponent,                 
                 
                 CreateActivityMenuComponent, ActivityTypeSelectorComponent, ProjectModelSelectorComponent,
                 CreateActivityWizardController, OldProjectTreeComponent, 
                 OldActivityEditorComponent, CloseActivityComponent],

  exports: [ProjectsMainPageComponent, GanttComponent, 
            OldProjectTreeComponent, OldActivityEditorComponent ]
})
export class ProjectManagementModule { }
