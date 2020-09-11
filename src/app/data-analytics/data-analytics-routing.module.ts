/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SecurityGuardService } from '@app/core';

import { MainLayoutComponent } from '@app/shared';

import { DataAnalyticsMainPageComponent } from './main-page/data-analytics-main-page.component';


@NgModule({

  imports: [
    RouterModule.forChild([
      {
        path: 'data', component: MainLayoutComponent,
        canActivate: [SecurityGuardService],
        children: [
          { path: 'main', component: DataAnalyticsMainPageComponent },
          { path: 'fmp', component: DataAnalyticsMainPageComponent },
          { path: 'cnih', component: DataAnalyticsMainPageComponent },
          { path: '', redirectTo: 'main', pathMatch: 'full' }
        ]
      }
    ])],

  exports: [RouterModule]

})
export class DataAnalyticsRoutingModule { }
