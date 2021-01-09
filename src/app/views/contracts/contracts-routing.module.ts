/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ContractsMainPageComponent } from '../contracts/main-page/contracts-main-page.component';


const routes: Routes = [
  { path: 'search', component: ContractsMainPageComponent },
  { path: '', redirectTo: 'search', pathMatch: 'full' }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContractsRoutingModule { }
