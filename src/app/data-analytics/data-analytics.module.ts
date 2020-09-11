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

import { DataAnalyticsRoutingModule } from './data-analytics-routing.module';
import { DataAnalyticsMainPageComponent } from './main-page/data-analytics-main-page.component';


@NgModule({

  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    AngularMaterialModule,
    SharedModule,

    DataAnalyticsRoutingModule
  ],


  declarations: [
    DataAnalyticsMainPageComponent,
  ],

  exports: [
    DataAnalyticsMainPageComponent
  ],

  entryComponents: [

  ]

})
export class DataAnalyticsModule { }
