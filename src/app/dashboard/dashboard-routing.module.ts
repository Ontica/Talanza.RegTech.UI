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

import { DashboardMainPageComponent } from './main-page/dashboard-main-page.component';


@NgModule({

  imports: [
    RouterModule.forChild([
      {
        path: 'dashboard', component: MainLayoutComponent,
        canActivate: [SecurityGuardService],
        children: [
          { path: 'main', component: DashboardMainPageComponent },
          { path: 'compliance', component: DashboardMainPageComponent },
          { path: 'financial', component: DashboardMainPageComponent },
          { path: 'operations', component: DashboardMainPageComponent },
          { path: 'engineering', component: DashboardMainPageComponent },
          { path: '', redirectTo: 'main', pathMatch: 'full' }
        ]
      }
    ])],

  exports: [RouterModule]

})
export class DashboardRoutingModule { }
