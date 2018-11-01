/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { NgModule } from '@angular/core';

import { ProjectManagementServicesModule } from './project-management/project-management-services.module';

import { RegulationServicesModule } from './regulation/regulation.services.module';


@NgModule({

  imports: [
    ProjectManagementServicesModule,
    RegulationServicesModule
  ],

  exports: [
    ProjectManagementServicesModule,
    RegulationServicesModule
  ],

})
export class ServicesModule { }
