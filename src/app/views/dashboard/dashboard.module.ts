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
import { ChartModule } from '@syncfusion/ej2-angular-charts';


import { CategoryService, ColumnSeriesService, LegendService, TooltipService } from '@syncfusion/ej2-angular-charts';
import { DataLabelService, LineSeriesService} from '@syncfusion/ej2-angular-charts';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardMainPageComponent } from './main-page/dashboard-main-page.component';


@NgModule({

  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    AngularMaterialModule,
    SharedModule,
    ChartModule,

    DashboardRoutingModule
  ],

  declarations: [
    DashboardMainPageComponent,
  ],

  exports: [
     DashboardMainPageComponent
  ],

  providers: [CategoryService, ColumnSeriesService,
    LegendService, TooltipService,
    DataLabelService, LineSeriesService],

})
export class DashboardModule { }
