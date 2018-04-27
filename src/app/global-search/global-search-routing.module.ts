/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SecurityGuardService } from '../core';

import { MainLayoutComponent } from '../shared';

import { GlobalSearchMainPageComponent } from './main-page/gs-main-page.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'search', component: MainLayoutComponent, canActivate: [SecurityGuardService],
        children: [{ path: 'search/:keywords', component: GlobalSearchMainPageComponent }]
      }
    ])],
  exports: [RouterModule]
})
export class GlobalSearchRoutingModule { }
