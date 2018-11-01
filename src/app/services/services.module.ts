/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { NgModule } from '@angular/core';

import { ProcedureServicesModule } from './procedures/procedure.services.module';

import { ProjectManagementServicesModule } from './project-management/project-management-services.module';

import { UtilityServicesModule } from './utility/utility-services.module';


@NgModule({

  imports: [
    ProcedureServicesModule,
    ProjectManagementServicesModule,
    UtilityServicesModule
  ],

  exports: [
    ProcedureServicesModule,
    ProjectManagementServicesModule,
    UtilityServicesModule
  ],

})
export class ServicesModule { }
