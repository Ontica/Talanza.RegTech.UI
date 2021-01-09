/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { NgModule } from '@angular/core';

import { DataObjectsServicesModule } from './data-objects/data-objects.services.module';
import { KnowledgeBaseServicesModule } from './knowledge-base/knowledge-base.services.module';
import { ProjectManagementServicesModule } from './project-management/project-management-services.module';
import { RegulationServicesModule } from './regulation/regulation.services.module';
import { StepsServicesModule } from './steps/steps.services.module';

@NgModule({

  imports: [
    DataObjectsServicesModule,
    KnowledgeBaseServicesModule,
    ProjectManagementServicesModule,
    RegulationServicesModule,
    StepsServicesModule
  ],

  exports: [
    DataObjectsServicesModule,
    KnowledgeBaseServicesModule,
    ProjectManagementServicesModule,
    RegulationServicesModule,
    StepsServicesModule
  ],

  providers: [

  ]

})
export class DataServicesModule { }
