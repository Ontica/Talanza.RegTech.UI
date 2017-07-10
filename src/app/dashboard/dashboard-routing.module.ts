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

import { SecurityGuardService } from '../core';

@NgModule({
  imports: [RouterModule.forChild([
    {
      path: '', redirectTo: 'smoke-tests', pathMatch: 'full'
    },
    {
      path: '', component: MainLayoutComponent, canActivate: [SecurityGuardService],
      children: [{ path: 'smoke-tests', component: HomeComponent }]
    }
  ])],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
