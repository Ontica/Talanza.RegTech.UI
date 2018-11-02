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

import { ProceduresMainPageComponent } from '../procedures/main-page/procedures-main-page.component';


@NgModule({

  imports: [
    RouterModule.forChild([
      {
        path: 'procedures', component: MainLayoutComponent, canActivate: [SecurityGuardService],
        children: [{ path: 'search', component: ProceduresMainPageComponent }]
      }
    ])],

  exports: [RouterModule]

})
export class ProceduresRoutingModule { }
