/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StepsMainPageComponent } from './main-page/steps-main-page.component';


const routes: Routes = [
  { path: 'processes', component: StepsMainPageComponent },
  { path: 'activities', component: StepsMainPageComponent },
  { path: 'events', component: StepsMainPageComponent },
  { path: 'all', component: StepsMainPageComponent },
  { path: 'documentation', component: StepsMainPageComponent },
  { path: '', redirectTo: 'processes', pathMatch: 'full' }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StepsRoutingModule { }
