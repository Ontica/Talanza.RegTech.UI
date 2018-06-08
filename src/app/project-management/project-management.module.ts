/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ProceduresModule } from '../procedures/procedures.module';
import { ControlsModule } from '../controls/controls.module';

import { ActivityEditorComponent } from './activity-editor/activity-editor.component';
import { ActivityTreeComponent } from './activity-tree/activity-tree.component';
import { GanttComponent } from './gantt/gantt.component';
import { ProjectManagementRoutingModule } from './project-management-routing.module';
import { ProjectsFilterComponent } from './main-page/projects-filter.component';
import { ProjectsMainPageComponent } from './main-page/projects-main-page.component';


// Old version components

import { ActivityTypeSelectorComponent } from './create-activity-wizard/steps/activity-type-selector.component';
import { CreateActivityMenuComponent } from './create-activity-wizard/create-activity-menu.component';
import { CreateActivityWizardController } from './create-activity-wizard/steps/wizard-controller.component';
import { ProjectModelSelectorComponent } from './create-activity-wizard/steps/project-model-selector.component';


import { CloseActivityComponent } from './old-editor/tabs/close-activity.component';
import { OldActivityEditorComponent } from './old-editor/old-activity-editor.component';
import { OldProjectTreeComponent } from './old-project-tree/old-project-tree.component';

/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */
@NgModule({

  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    ControlsModule,
    SharedModule,
    ProceduresModule,
    ProjectManagementRoutingModule
  ],


  declarations: [
    ActivityEditorComponent,
    ActivityTreeComponent,
    GanttComponent,
    ProjectsFilterComponent,
    ProjectsMainPageComponent,

    /* Old version components */

    ActivityTypeSelectorComponent,
    CloseActivityComponent,
    CreateActivityMenuComponent,
    CreateActivityWizardController,

    OldProjectTreeComponent,
    OldActivityEditorComponent,
    ProjectModelSelectorComponent
  ],

  exports: [
    GanttComponent,
    ProjectsMainPageComponent,

    OldActivityEditorComponent,
    OldProjectTreeComponent
  ]

})
export class ProjectManagementModule { }
