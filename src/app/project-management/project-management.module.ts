/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { KnowledgeBaseModule } from '@app/knowledge-base/knowledge-base.module';
import { ProceduresModule } from '@app/procedures/procedures.module';
import { AngularMaterialModule } from '@app/shared/angular-material.module';
import { SharedModule } from '@app/shared/shared.module';


import { ActivityDesignerComponent } from './activity-designer/activity-designer.component';
import {
 ActivityModelFormComponent
} from './activity-designer/activity-model-form/activity-model-form.component';
import { ActivityEditorComponent } from './activity-editor/activity-editor.component';
import { ActivityFormComponent } from './activity-editor/activity-form/activity-form.component';
import { ActivityTasksComponent } from './activity-tasks/activity-tasks.component';
import { ActivityTimelineComponent } from './activity-timeline/activity-timeline.component';
import { GroupActivitiesByPipe } from './activity-timeline/group-activities-by.pipe';
import { ActivityInlineEditorComponent } from './activity-tree/activity-inline-editor.component';
import { ActivityTreeComponent } from './activity-tree/activity-tree.component';
import { AddEventDialogComponent } from './add-event-dialog/add-event-dialog.component';
import { DhtmlxGanttComponent } from './dhtmlx-gantt/dhtmlx-gantt.component';
import { ProjectsMainPageComponent } from './main-page/projects-main-page.component';
import { MoveActivityDialogComponent } from './move-activity-dialog/move-activity-dialog.component';
import { TemplatesMainPageComponent } from './templates/templates-main-page.component';

import { ProjectManagementRoutingModule } from './project-management-routing.module';

@NgModule({

  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    AngularMaterialModule,
    SharedModule,

    ProceduresModule,
    KnowledgeBaseModule,

    ProjectManagementRoutingModule
  ],


  declarations: [
    ActivityDesignerComponent,
    ActivityEditorComponent,
    ActivityFormComponent,
    ActivityInlineEditorComponent,
    ActivityModelFormComponent,
    ActivityTasksComponent,
    ActivityTimelineComponent,
    ActivityTreeComponent,
    AddEventDialogComponent,
    DhtmlxGanttComponent,
    GroupActivitiesByPipe,
    MoveActivityDialogComponent,
    ProjectsMainPageComponent,
    TemplatesMainPageComponent
  ],

  exports: [
    ProjectsMainPageComponent,
    TemplatesMainPageComponent
  ],

  entryComponents: [
    AddEventDialogComponent,
    MoveActivityDialogComponent
  ]

})
export class ProjectManagementModule { }
