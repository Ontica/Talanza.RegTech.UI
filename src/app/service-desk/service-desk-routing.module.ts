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

@NgModule({

  imports: [
    RouterModule.forChild([
      {
        path: 'service-desk', component: MainLayoutComponent, canActivate: [SecurityGuardService],
        children: [{ path: 'search', component: MainLayoutComponent }]
      }
    ])],

  exports: [RouterModule]

})
export class ServiceDeskRoutingModule { }
