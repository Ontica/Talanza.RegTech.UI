/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProceduresMainPageComponent } from '../procedures/main-page/procedures-main-page.component';


const routes: Routes = [
  { path: 'search', component: ProceduresMainPageComponent }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProceduresRoutingModule { }
