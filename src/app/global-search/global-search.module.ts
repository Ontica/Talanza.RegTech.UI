/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '@app/shared/shared.module';

import { ContractsModule } from '../contracts/contracts.module';
import { DocumentsModule } from '../documents/documents.module';
import { ProceduresModule } from '../procedures/procedures.module';
import { ServiceDeskModule } from '../service-desk/service-desk.module';

import { GlobalSearchMainPageComponent } from './main-page/gs-main-page.component';
import { SearchResultsNavBarComponent } from './search-results-navbar/search-results-navbar.component';

import { GlobalSearchRoutingModule } from './global-search-routing.module';

@NgModule({

  imports: [
    CommonModule,
    FormsModule,
    SharedModule,

    ContractsModule,
    DocumentsModule,
    ServiceDeskModule,
    ProceduresModule,

    GlobalSearchRoutingModule
  ],

  declarations: [
    GlobalSearchMainPageComponent,
    SearchResultsNavBarComponent
  ],

  exports: [
    GlobalSearchMainPageComponent
  ]

})
export class GlobalSearchModule { }
