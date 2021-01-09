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
import { KnowledgeBaseModule } from '@app/views/knowledge-base/knowledge-base.module';
import { ProceduresModule } from '../procedures/procedures.module';

import { GlobalSearchMainPageComponent } from './main-page/gs-main-page.component';
import { SearchResultsNavBarComponent } from './search-results-navbar/search-results-navbar.component';

import { GlobalSearchRoutingModule } from './global-search-routing.module';


@NgModule({

  imports: [
    CommonModule,
    FormsModule,
    SharedModule,

    GlobalSearchRoutingModule,

    ContractsModule,
    DocumentsModule,
    KnowledgeBaseModule,
    ProceduresModule
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
