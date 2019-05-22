/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { AngularMaterialModule } from '@app/shared/angular-material.module';
import { SharedModule } from '@app/shared/shared.module';

import { KnowledgeBaseModule } from '@app/knowledge-base/knowledge-base.module';
import { ProceduresModule } from '@app/procedures/procedures.module';
import { ProcessesModule } from '@app/processes/processes.module';

import { ActivityEditorComponent } from './activity-editor/activity-editor.component';
import { ActivityFormComponent } from './activity-editor/activity-form/activity-form.component';
import { ActivityTasksComponent } from './activity-tasks/activity-tasks.component';
import { ActivityFilesComponent } from './activity-files/activity-files.component';
import { ActivityTimelineComponent } from './activity-timeline/activity-timeline.component';
import { GroupActivitiesByPipe } from './activity-timeline/group-activities-by.pipe';
import { ApplyFilterPipe } from './common/apply-filter.pipe';
import { ApplyFilesFilterPipe } from './common/apply-files-filter.pipe';

import { ActivityTreeComponent } from './activity-tree/activity-tree.component';
import { AddEventDialogComponent } from './add-event-dialog/add-event-dialog.component';

import { GanttChartComponent } from './gantt-chart/gantt-chart.component';
import { DhtmlxGanttComponent } from './dhtmlx-gantt/dhtmlx-gantt.component';

import { ProjectsMainPageComponent } from './main-page/projects-main-page.component';

import {
  MultiProjectsMainPageComponent
} from './multi-projects-main-page/multi-projects-main-page.component';

import { ProjectManagementRoutingModule } from './project-management-routing.module';
import { FilesGridComponent } from './files-grid/files-grid.component';



@NgModule({

  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,

    AngularMaterialModule,
    SharedModule,

    ProceduresModule,
    KnowledgeBaseModule,

    ProcessesModule,

    ProjectManagementRoutingModule
  ],


  declarations: [
    ActivityEditorComponent,
    ActivityFormComponent,
    ActivityTasksComponent,
    ActivityFilesComponent,
    ActivityTimelineComponent,
    ActivityTreeComponent,
    AddEventDialogComponent,
    DhtmlxGanttComponent,

    GroupActivitiesByPipe,
    ApplyFilterPipe,
    ApplyFilesFilterPipe,

    MultiProjectsMainPageComponent,
    ProjectsMainPageComponent,
    GanttChartComponent,
    FilesGridComponent
  ],

  exports: [
    MultiProjectsMainPageComponent,
    ProjectsMainPageComponent
  ],

  entryComponents: [
    AddEventDialogComponent
  ]

})
export class ProjectManagementModule { }
