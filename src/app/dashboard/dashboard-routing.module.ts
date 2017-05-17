/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MainLayoutComponent } from '../shared';

import { HomeComponent } from './home/home.component';

@NgModule({
  imports: [RouterModule.forChild([
    {
      path: '', redirectTo: 'default', pathMatch: 'full'
    },
    {
      path: '', component: MainLayoutComponent,
      children: [{ path: 'default', component: HomeComponent }]
    }
  ])],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
