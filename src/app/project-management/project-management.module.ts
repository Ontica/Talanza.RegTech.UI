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
import { WidgetsModule } from '@app/shared/widgets/widgets.module';

import { DataObjectsModule } from '@app/data-objects/data-objects.module';
import { KnowledgeBaseModule } from '@app/knowledge-base/knowledge-base.module';
import { ProceduresModule } from '@app/procedures/procedures.module';
import { ProcessesModule } from '@app/processes/processes.module';

import { ActivityEditorComponent } from './activity-editor/activity-editor.component';
import { ActivityFormComponent } from './activity-editor/activity-form/activity-form.component';
import { ActivityTasksComponent } from './activity-tasks/activity-tasks.component';

import { ActivityFilesComponent } from './activity-files/activity-files.component';
import { FilesGridComponent } from './files-grid/files-grid.component';

import { ActivityTimelineComponent } from './activity-timeline/activity-timeline.component';
import { GroupActivitiesByPipe } from './activity-timeline/group-activities-by.pipe';

import { ApplyFilterPipe } from './common/apply-filter.pipe';
import { ApplyFilesFilterPipe } from './common/apply-files-filter.pipe';

import { ActivityTreeComponent } from './activity-tree/activity-tree.component';
import { AddEventDialogComponent } from './add-event-dialog/add-event-dialog.component';
import { ChangeDateDialogComponent } from './change-date-dialog/change-date-dialog.component';
import { CheckProcessesDialogComponent } from './check-processes-dialog/check-processes-dialog.component';
import { ExportActivitiesDialogComponent } from './export-activities-dialog/export-activities-dialog.component';

import { GanttChartComponent } from './gantt-chart/gantt-chart.component';
import { DhtmlxGanttComponent } from './dhtmlx-gantt/dhtmlx-gantt.component';

import { ProjectsMainPageComponent } from './main-page/projects-main-page.component';

import {
  MultiProjectsMainPageComponent
} from './multi-projects-main-page/multi-projects-main-page.component';

import { ProjectFilesMainPageComponent } from './project-files-main-page/project-files-main-page.component';

import { ActivityDataObjectsListComponent } from './activity-data-objects/activity-data-objects-list.component';
import { ActivityDataObjectComponent } from './activity-data-objects/activity-data-object.component';


import { ReportSomethingDialogComponent } from './report-something-dialog/report-something-dialog.component';

import { ProjectManagementRoutingModule } from './project-management-routing.module';


@NgModule({

  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,

    AngularMaterialModule,
    SharedModule,
    WidgetsModule,


    DataObjectsModule,
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
    ChangeDateDialogComponent,
    CheckProcessesDialogComponent,
    ExportActivitiesDialogComponent,

    DhtmlxGanttComponent,

    GroupActivitiesByPipe,
    ApplyFilterPipe,
    ApplyFilesFilterPipe,

    MultiProjectsMainPageComponent,
    ProjectsMainPageComponent,
    GanttChartComponent,
    FilesGridComponent,
    ProjectFilesMainPageComponent,
    ReportSomethingDialogComponent,
    ActivityDataObjectsListComponent,
    ActivityDataObjectComponent
  ],

  exports: [
    MultiProjectsMainPageComponent,
    ProjectsMainPageComponent,
    ProjectFilesMainPageComponent
  ],

  entryComponents: [
    AddEventDialogComponent,
    ChangeDateDialogComponent,
    ExportActivitiesDialogComponent
  ]

})
export class ProjectManagementModule { }
