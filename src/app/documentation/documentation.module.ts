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

import { DocumentationMainPageComponent } from './main-page/documentation-main-page.component';
import { DocumentationRoutingModule } from './documentation-routing.module';


@NgModule({

  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    AngularMaterialModule,
    SharedModule,

    DocumentationRoutingModule
  ],


  declarations: [
    DocumentationMainPageComponent,
  ],

  exports: [
    DocumentationMainPageComponent
  ],

  entryComponents: [

  ]

})
export class DocumentationModule { }
