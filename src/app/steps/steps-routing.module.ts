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

import { StepsMainPageComponent } from './main-page/steps-main-page.component';

@NgModule({

  imports: [
    RouterModule.forChild([
      {
        path: 'steps', component: MainLayoutComponent,
        canActivate: [SecurityGuardService],
        children: [
          { path: 'list', component: StepsMainPageComponent },
          { path: 'documentation', component: StepsMainPageComponent },
          { path: '', redirectTo: 'list', pathMatch: 'full' }
        ]
      }
    ])],

  exports: [RouterModule]

})
export class StepsRoutingModule { }
