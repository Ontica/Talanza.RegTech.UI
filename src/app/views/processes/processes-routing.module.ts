/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProcessesMainPageComponent } from './main-page/processes-main-page.component';

const routes: Routes = [
  { path: 'obligations-tree', component: ProcessesMainPageComponent },
  { path: 'process-diagram', component: ProcessesMainPageComponent },
  { path: 'documentation', component: ProcessesMainPageComponent },
  { path: '', redirectTo: 'obligations-tree', pathMatch: 'full' }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProcessesRoutingModule { }
