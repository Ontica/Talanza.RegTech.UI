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

import { LibraryMainPageComponent } from './main-page/library-main-page.component';

import { LibraryRoutingModule } from './library-routing.module';


@NgModule({

  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    AngularMaterialModule,
    SharedModule,

    LibraryRoutingModule
  ],


  declarations: [
    LibraryMainPageComponent,
  ],

  exports: [
    LibraryMainPageComponent
  ],

  entryComponents: [

  ]

})
export class LibraryModule { }
