/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { NgModule } from '@angular/core';

import { ActivityService } from './activity.service';
import { GanttService } from './gantt.service';
import { ProcessModelsService } from './process-models.service';
import { ProjectMeetingService } from './project-meeting.service';
import { ProjectService } from './project.service';
import { TaskService } from './task.service';

@NgModule({

  providers: [
    ActivityService,
    GanttService,
    ProcessModelsService,
    ProjectMeetingService,
    ProjectService,
    TaskService
  ],

})
export class ProjectManagementServicesModule { }
