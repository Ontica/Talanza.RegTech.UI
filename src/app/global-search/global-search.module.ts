/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';

import { ControlsModule } from '../controls/controls.module';
import { ContractsModule } from '../contracts/contracts.module';
import { DocumentsModule } from '../documents/documents.module';
import { ProceduresModule } from '../procedures/procedures.module';
import { ProjectMeetingsModule } from '../project-meetings/project-meetings.module';
import { ServiceDeskModule } from '../service-desk/service-desk.module';


import { ContractsService, DocumentService, ProcedureService } from '@app/services/regulation';

import { FAQService } from '../services/service-desk';

import { GlobalSearchRoutingModule } from './global-search-routing.module';

import { GlobalSearchMainPageComponent } from './main-page/gs-main-page.component';
import { GlobalAddComponent } from './global-add/global-add.component';


@NgModule({

  imports: [
    GlobalSearchRoutingModule,
    CommonModule,
    FormsModule,
    SharedModule,

    ProceduresModule,
    ControlsModule,
    ContractsModule,
    DocumentsModule,
    ServiceDeskModule,
    ProjectMeetingsModule
  ],

  declarations: [
    GlobalSearchMainPageComponent,
    GlobalAddComponent
  ],

  exports: [
    GlobalSearchMainPageComponent,
    GlobalAddComponent
  ],

  providers: [
    ContractsService,
    DocumentService,
    FAQService,
    ProcedureService
  ]

})
export class GlobalSearchModule { }
