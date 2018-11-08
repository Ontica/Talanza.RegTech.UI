/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '@app/shared/shared.module';
import { AngularMaterialModule } from '@app/shared/angular-material.module';


import { PostingsListComponent } from './postings/postings-list.component';
import { PostingsEditorComponent } from './postings/postings-editor.component';


@NgModule({

  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    SharedModule
  ],

  declarations: [
    PostingsEditorComponent,
    PostingsListComponent,
  ],

  exports: [
    PostingsEditorComponent,
    PostingsListComponent,
  ]

})
export class KnowledgeBaseModule { }
