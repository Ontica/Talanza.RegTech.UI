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

import { HomeMainPageComponent } from './main-page/home-main-page.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'home', component: MainLayoutComponent, canActivate: [SecurityGuardService],
        children: [{ path: 'search', component: HomeMainPageComponent }]
      }
    ])],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
