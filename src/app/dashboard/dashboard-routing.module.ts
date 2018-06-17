/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MainLayoutComponent } from '../shared';

import { SecurityGuardService } from '../core';


@NgModule({
  imports: [RouterModule.forChild([ {
      path: 'dashboard', component: MainLayoutComponent, canActivate: [SecurityGuardService]
    }
  ])],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
