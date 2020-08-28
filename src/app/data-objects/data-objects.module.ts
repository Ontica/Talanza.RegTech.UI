/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularMaterialModule } from '@app/shared/angular-material.module';

import { SharedModule } from '@app/shared/shared.module';

import { KnowledgeBaseModule } from '@app/knowledge-base/knowledge-base.module';

import { DataObjectsListComponent } from './data-objects-list/data-objects-list.component';
import { DataObjectDesignerComponent } from './data-object-designer/data-object-designer.component';
import { DataSourceSelectorComponent } from './data-source-selector/data-source-selector.component';

@NgModule({

  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    SharedModule,

    KnowledgeBaseModule
  ],

  declarations: [
    DataObjectDesignerComponent,
    DataObjectsListComponent,
    DataSourceSelectorComponent,
  ],

  exports: [
    DataObjectDesignerComponent,
    DataObjectsListComponent,
    DataSourceSelectorComponent
  ]

})
export class DataObjectsModule { }
