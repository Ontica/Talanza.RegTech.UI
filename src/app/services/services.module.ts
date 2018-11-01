/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivityService, GanttService,
         ProcessModelsService, ProjectService,
         ProjectMeetingService } from './project-management';

import { CataloguesService } from './catalogues.service';


@NgModule({

  imports: [
    CommonModule,
  ],

  providers: [
    ActivityService,
    CataloguesService,
    GanttService,
    ProcessModelsService,
    ProjectMeetingService,
    ProjectService
  ],

})
export class ServicesModule { }
