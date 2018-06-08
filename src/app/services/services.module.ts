/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivityService, ActivityTreeService,
         GanttService, ProcessModelsService,
         ProjectService, ProjectMeetingService } from './project-management';

/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */
@NgModule({

  imports: [
    CommonModule,
  ],

  providers: [
    ActivityService,
    ActivityTreeService,
    GanttService,
    ProcessModelsService,
    ProjectMeetingService,
    ProjectService
  ],

})
export class ServicesModule { }
