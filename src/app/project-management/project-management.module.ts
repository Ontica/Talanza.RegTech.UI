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

import { AngularMaterialModule } from '@app/shared/angular-material.module';

import { SharedModule } from '../shared/shared.module';

import { ProceduresModule } from '../procedures/procedures.module';
import { ControlsModule } from '../controls/controls.module';

import { ActivityTreeComponent } from './activity-tree/activity-tree.component';
import { ActivityInlineEditorComponent } from './activity-tree/activity-inline-editor.component';

import { ActivityEditorComponent } from './activity-editor/activity-editor.component';
import { ActivityDesignerComponent } from './activity-designer/activity-designer.component';

import { AddEventDialogComponent } from './add-event-dialog/add-event-dialog.component';

import { GanttComponent } from './gantt/gantt.component';
import { ProjectManagementRoutingModule } from './project-management-routing.module';
import { ProjectsFilterComponent } from './main-page/projects-filter.component';

import { ProjectsMainPageComponent } from './main-page/projects-main-page.component';
import { TemplatesMainPageComponent } from './templates/templates-main-page.component';

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
    AngularMaterialModule,

    ControlsModule,
    SharedModule,
    ProceduresModule,
    ProjectManagementRoutingModule
  ],


  declarations: [

    ActivityDesignerComponent,

    ActivityEditorComponent,
    ActivityInlineEditorComponent,
    ActivityTreeComponent,

    AddEventDialogComponent,

    GanttComponent,
    ProjectsFilterComponent,

    ProjectsMainPageComponent,
    TemplatesMainPageComponent,

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
    TemplatesMainPageComponent,

    OldActivityEditorComponent,
    OldProjectTreeComponent
  ],

  entryComponents: [AddEventDialogComponent]

})
export class ProjectManagementModule { }
