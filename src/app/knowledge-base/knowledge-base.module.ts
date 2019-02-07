/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '@app/shared/shared.module';
import { AngularMaterialModule } from '@app/shared/angular-material.module';

import { FaqEditorComponent } from './faqs/faq-editor.component';
import { FaqListComponent } from './faqs/faq-list.component';
import { FaqViewerComponent } from './faqs/faq-viewer.component';

import { PostingsListComponent } from './postings/postings-list.component';
import { PostingsEditorComponent } from './postings/postings-editor.component';


@NgModule({

  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    SharedModule
  ],

  declarations: [
    FaqEditorComponent,
    FaqListComponent,
    FaqViewerComponent,

    PostingsEditorComponent,
    PostingsListComponent,
  ],

  exports: [
    FaqListComponent,
    FaqViewerComponent,

    PostingsEditorComponent,
    PostingsListComponent,
  ]

})
export class KnowledgeBaseModule { }
