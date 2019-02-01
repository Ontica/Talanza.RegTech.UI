/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { NgModule } from '@angular/core';

import { GanttService } from './gantt.service';
import { ProjectMeetingService } from './project-meeting.service';
import { ProjectTemplateService } from './project-template.service';
import { ProjectService } from './project.service';
import { TaskService } from './task.service';

@NgModule({

  providers: [
    GanttService,
    ProjectMeetingService,
    ProjectTemplateService,
    ProjectService,
    TaskService
  ],

})
export class ProjectManagementServicesModule { }
