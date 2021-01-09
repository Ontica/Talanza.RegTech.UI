/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardMainPageComponent } from './main-page/dashboard-main-page.component';


const routes: Routes = [
  { path: 'main', component: DashboardMainPageComponent },
  { path: 'compliance', component: DashboardMainPageComponent },
  { path: 'financial', component: DashboardMainPageComponent },
  { path: 'operations', component: DashboardMainPageComponent },
  { path: 'engineering', component: DashboardMainPageComponent },
  { path: '', redirectTo: 'main', pathMatch: 'full' }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
