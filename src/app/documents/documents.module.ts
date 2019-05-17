/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AngularMaterialModule } from '@app/shared/angular-material.module';

import { SharedModule } from '@app/shared/shared.module';

import { DocumentsMainPageComponent } from './main-page/documents-main-page.component';
import { DocumentsTableViewComponent } from './views/documents-table-view.component';

import { KnowledgeBaseModule } from '@app/knowledge-base/knowledge-base.module';

import { DocumentsRoutingModule } from './documents-routing.module';
import { DocumentEditorComponent } from './document-editor/document-editor.component';


@NgModule({

  imports: [
    CommonModule,
    FormsModule,
    SharedModule,

    AngularMaterialModule,

    KnowledgeBaseModule,

    DocumentsRoutingModule
  ],

  declarations: [
    DocumentsMainPageComponent,
    DocumentsTableViewComponent,
    DocumentEditorComponent
  ],

  exports: [
    DocumentsMainPageComponent,
    DocumentsTableViewComponent
  ]

})
export class DocumentsModule { }
