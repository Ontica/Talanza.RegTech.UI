/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DataAnalyticsMainPageComponent } from './main-page/data-analytics-main-page.component';


const routes: Routes = [
  { path: 'main', component: DataAnalyticsMainPageComponent },
  { path: 'fmp', component: DataAnalyticsMainPageComponent },
  { path: 'cnih', component: DataAnalyticsMainPageComponent },
  { path: '', redirectTo: 'main', pathMatch: 'full' }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DataAnalyticsRoutingModule { }
