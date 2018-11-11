/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { NgModule } from '@angular/core';

import { KnowledgeBaseServicesModule } from './knowledge-base/knowledge-base.services.module';
import { ProjectManagementServicesModule } from './project-management/project-management-services.module';
import { RegulationServicesModule } from './regulation/regulation.services.module';

import { InboxService } from './inbox/inbox.service';
import { TicketService } from './service-desk/ticket.service';


@NgModule({

  imports: [
    KnowledgeBaseServicesModule,
    ProjectManagementServicesModule,
    RegulationServicesModule
  ],

  exports: [
    KnowledgeBaseServicesModule,
    ProjectManagementServicesModule,
    RegulationServicesModule
  ],

  providers: [
    InboxService,
    TicketService
  ]

})
export class ServicesModule { }
