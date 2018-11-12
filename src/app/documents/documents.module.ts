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

import { DocumentsMainPageComponent } from './main-page/documents-main-page.component';
import { DocumentsTableViewComponent } from './views/documents-table-view.component';

import { DocumentsRoutingModule } from './documents-routing.module';


@NgModule({

  imports: [
    CommonModule,
    FormsModule,
    SharedModule,

    DocumentsRoutingModule
  ],

  declarations: [
    DocumentsMainPageComponent,
    DocumentsTableViewComponent
  ],

  exports: [
    DocumentsMainPageComponent,
    DocumentsTableViewComponent
  ]

})
export class DocumentsModule { }
